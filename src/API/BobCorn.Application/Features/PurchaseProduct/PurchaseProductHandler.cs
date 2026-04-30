using BobCorn.Domain.Entities;
using BobCorn.Domain.Interfaces;
using MediatR;

namespace BobCorn.Application.Features.PurchaseProduct
{
    public sealed class PurchaseProductHandler : IRequestHandler<PurchaseProductCommand, Unit>
    {
        private readonly IProductRepository _productRepository;

        public PurchaseProductHandler(IProductRepository productRepository) => _productRepository = productRepository;

        public async Task<Unit> Handle(PurchaseProductCommand request, CancellationToken cancellationToken)
        {
            await _productRepository.PurchaseAsync(request.UserId);

            return Unit.Value;
        }
    }
}
