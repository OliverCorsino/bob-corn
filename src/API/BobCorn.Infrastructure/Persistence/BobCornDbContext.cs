using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Data;

namespace BobCorn.Infrastructure.Persistence
{
    public sealed class BobCornDbContext
    {
        private readonly string _connectionString;

        public BobCornDbContext(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("BobCornDB")
                ?? throw new ArgumentNullException(nameof(configuration), "Connection string not provided.");
        }

        public IDbConnection CreateConnection() => new SqlConnection(_connectionString);
    }
}
