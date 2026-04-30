using BobCorn.Domain.Entities;
using BobCorn.Domain.Interfaces;
using Dapper;
using Microsoft.Data.SqlClient;

namespace BobCorn.Infrastructure.Persistence
{
    public sealed class ProductRepository : IProductRepository
    {
        private readonly string _connectionString;

        public ProductRepository(string connectionString) => _connectionString = connectionString;

        public async Task<IEnumerable<PurchasedProduct>> GetPastPurchaseAsync(Guid userId)
        {
            await using var connection = new SqlConnection(_connectionString);

            return await connection.QueryAsync<PurchasedProduct>(
                "SELECT * FROM PurchasedProduct WHERE UserId = @UserId", new { UserId = userId });
        }

        public Task MarkAsShippedAsycn(Guid purchaseId)
        {
            throw new NotImplementedException();
        }

        public Task PurchaseAsync(PurchasedProduct purchase)
        {
            throw new NotImplementedException();
        }
    }
}
