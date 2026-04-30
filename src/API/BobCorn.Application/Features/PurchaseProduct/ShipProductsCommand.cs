using BobCorn.Domain.Entities;
using MediatR;

namespace BobCorn.Application.Features.PurchaseProduct
{
    public record ShipProductsCommand(IEnumerable<PurchasedProduct> ProductsToShip) : IRequest<Unit>;
}
