using BobCorn.Domain.Entities;
using BobCorn.Domain.Interfaces;
using MediatR;

namespace BobCorn.Application.Features.PurchaseProduct
{
    public sealed class GetPurchasedProductQueryHandler : IRequestHandler<GetPurchasedProductQuery, IEnumerable<PurchasedProduct>>
    {
        private readonly IProductRepository _productRepositry;

        public GetPurchasedProductQueryHandler(IProductRepository productRepository) => _productRepositry = productRepository;

        public async Task<IEnumerable<PurchasedProduct>> Handle(GetPurchasedProductQuery request, CancellationToken cancellationToken)
        {
            return await _productRepositry.GetPastPurchaseAsync(request.userId);
        }
    }
}
