using BobCorn.Domain.Interfaces;
using MediatR;

namespace BobCorn.Application.Features.PurchaseProduct
{
    public sealed class ShipProductsCommandHandler : IRequestHandler<ShipProductsCommand, Unit>
    {
        private readonly IProductRepository _productRepository;

        public ShipProductsCommandHandler(IProductRepository productRepository) => _productRepository = productRepository;

        public async Task<Unit> Handle(ShipProductsCommand request, CancellationToken cancellationToken)
        {
            await _productRepository.MarkAsShippedAsycn(request.ProductsToShip);

            return Unit.Value;
        }
    }
}
