using BobCorn.Domain.Entities;
using MediatR;
using System.Collections.Immutable;

namespace BobCorn.Application.Features.PurchaseProduct
{
    public record GetPurchasedProductQuery(Guid userId) : IRequest<IImmutableList<PurchasedProduct>>;
}
