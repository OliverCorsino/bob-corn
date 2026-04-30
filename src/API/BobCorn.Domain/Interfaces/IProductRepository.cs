using BobCorn.Domain.Entities;

namespace BobCorn.Domain.Interfaces
{
    public interface IProductRepository
    {
        Task<IEnumerable<PurchasedProduct>> GetPastPurchaseAsync(Guid userId);
        Task PurchaseAsync(Guid userId);
        Task MarkAsShippedAsycn(Guid purchaseId);
    }
}
