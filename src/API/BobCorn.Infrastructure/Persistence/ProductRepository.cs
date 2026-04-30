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

        public async Task MarkAsShippedAsycn(IEnumerable<PurchasedProduct> purchasedProducts)
        {
            var updateScript = "UPDATE PurchasedProduct SET IsShipped = 1, ShippedAt = GETUTCDATE() WHERE Id = @Id";
            await using var connection = new SqlConnection(_connectionString);


            await connection.ExecuteAsync(updateScript, purchasedProducts);
        }

        public async Task PurchaseAsync(Guid userId)
        {
            await using var connection = new SqlConnection(_connectionString);

            await connection.ExecuteAsync("INSERT INTO PurchasedProduct (UserId) VALUES (@UserId)", new { UserId = userId });
        }
    }
}
