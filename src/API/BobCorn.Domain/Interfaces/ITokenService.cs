using BobCorn.Domain.Entities;

namespace BobCorn.Domain.Interfaces
{
    public interface ITokenService
    {
        string GenerateAccessToken(User user);
        string GenerateRefreshToken();
        Task SaveRefreshTokenAsync(Guid userId, string token, CancellationToken cancellationToken = default);
        Task<bool> ValidateRefreshTokenAsync(Guid userId, string token, CancellationToken cancellationToken= default);
        Task RevokeRefreshTokenAsync(Guid userId, string token, CancellationToken cancellationToken = default);
    }
}
