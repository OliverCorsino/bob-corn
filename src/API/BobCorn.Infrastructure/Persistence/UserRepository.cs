using BobCorn.Domain.Entities;
using BobCorn.Domain.Interfaces;
using Dapper;
using Microsoft.Data.SqlClient;

namespace BobCorn.Infrastructure.Persistence
{
    public sealed class UserRepository : IUserRepository
    {
        private readonly string _connectionString;

        public UserRepository(string connectionString) => _connectionString = connectionString;

        public async Task AddAsync(User user, CancellationToken cancellationToken = default)
        {
            await using var connection = new SqlConnection(_connectionString);

            await connection.ExecuteAsync(
                @"INSERT INTO Users (Id, Email, Password, FullName, Role)
                  VALUES (@Id, @Email, @Password, @FullName, @Role)", user);
        }

        public async Task<User?> GetByEmailAsync(string email, CancellationToken cancellationToken = default)
        {
            await using var connection = new SqlConnection(_connectionString);

            return await connection.QuerySingleOrDefaultAsync<User>(
                "SELECT * FROM Users WHERE Email = @Email AND IsActive = 1", new { Email = email });
        }

        public async Task<User?> GetById(Guid id, CancellationToken cancellationToken = default)
        {
            await using var connection = new SqlConnection(_connectionString);

            return await connection.QuerySingleOrDefaultAsync<User>(
                "SELECT * FROM Users WHERE Id = @Id AND IsActive = 1", new { Id = id });
        }
    }
}
