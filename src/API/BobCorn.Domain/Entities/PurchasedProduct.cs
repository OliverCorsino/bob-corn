namespace BobCorn.Domain.Entities
{
    public sealed class PurchasedProduct
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public DateTime PurchasedAt { get; set; }
        public bool IsShipped { get; set; }
        public DateTime? ShippedAt { get; set; }
    }
}
