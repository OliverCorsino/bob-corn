using BobCorn.Domain.Entities;
using System.Collections.Immutable;

namespace BobCorn.Domain.Interfaces
{
    public interface IProductRepository
    {
        Task<IEnumerable<PurchasedProduct>> GetPastPurchaseAsync(Guid userId);
        Task PurchaseAsync(PurchasedProduct purchase);
        Task MarkAsShippedAsycn(Guid purchaseId);
    }
}
