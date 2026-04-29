using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using Microsoft.IdentityModel.Tokens;
using Dapper;
using Microsoft.Data.SqlClient;
using BobCorn.Domain.Entities;
using BobCorn.Domain.Interfaces;
using Microsoft.Extensions.Configuration;

namespace BobCorn.Infrastructure.Services
{
    public sealed class TokenService : ITokenService
    {
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;

        public TokenService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = configuration.GetConnectionString("DefaultConnection")!;
        }

        public string GenerateAccessToken(User user)
        {
            var key = new SymmetricSecurityKey(Convert.FromBase64String(_configuration["Jwt:Secret"]!));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            var token = new JwtSecurityToken(
                    issuer: _configuration["Jwt:Issuer"],
                    audience: _configuration["Jwt:Audience"],
                    claims: claims,
                    expires: DateTime.UtcNow.AddMinutes(int.Parse(_configuration["Jwt:AccessTokenExpiryMinutes"]!)),
                    signingCredentials: credentials
                  );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public string GenerateRefreshToken()
        {
            var bytes = RandomNumberGenerator.GetBytes(64);

            return Convert.ToBase64String(bytes);
        }

        public async Task RevokeRefreshTokenAsync(Guid userId, string token, CancellationToken cancellationToken = default)
        {
            await using var connection = new SqlConnection(_connectionString);

            await connection.ExecuteAsync(
                @"UPDATE Refreshtokens SET IsRevoked = 1 WHERE UserId = @UserId AND Token = @Token",
                new { UserId = userId, Token = token });
        }

        public async Task SaveRefreshTokenAsync(Guid userId, string token, CancellationToken cancellationToken = default)
        {
            await using var connection = new SqlConnection(_connectionString);

            var expiry = int.Parse(_configuration["Jwt:RefreshTokenExpiryDays"]!);

            await connection.ExecuteAsync(
                @"INSERT INTO Refreshtokens (UserId, Token, ExpriresAt)
                  VALUES (@UserId, @Token, @ExpiresAt)",
                new { UserId = userId, Token = token, ExpriresAt = DateTime.UtcNow.AddDays(expiry) });
        }

        public async Task<bool> ValidateRefreshTokenAsync(Guid userId, string token, CancellationToken cancellationToken = default)
        {
            await using var connection = new SqlConnection(_connectionString);

            var result = await connection.QuerySingleOrDefaultAsync<bool>(
                @"SELECT CAST(1 AS BIT) FROM RefreshTokens
                  WHERE UserId = @UserId AND Token = @Token
                  AND IsRevoked = 0 AND ExpiresAt > GETUTCDATE()",
                new { UserId = userId, Token = token });

            return result;
        }
    }
}
