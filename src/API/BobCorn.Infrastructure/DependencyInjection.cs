using BobCorn.Domain.Interfaces;
using BobCorn.Infrastructure.Persistence;
using BobCorn.Infrastructure.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace BobCorn.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("DefaultConnection")!;

            services.AddScoped<IUserRepository>(_ => new UserRepository(connectionString));
            services.AddScoped<ITokenService, TokenService>();

            return services;
        }
    }
}
