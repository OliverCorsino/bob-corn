using MediatR;

namespace BobCorn.Application.Features.PurchaseProduct
{
    public record PurchaseProductCommand(Guid UserId) : IRequest<Unit>;
}
