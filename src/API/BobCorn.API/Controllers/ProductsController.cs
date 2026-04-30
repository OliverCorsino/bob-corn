using BobCorn.Application.Features.PurchaseProduct;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using System.Security.Claims;

namespace BobCorn.API.Controllers
{
    [Route("api/products")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ISender _sender;

        public ProductsController(ISender sender) => _sender = sender;

        [HttpGet("")]
        [Authorize(Roles = "Customer")]
        public async Task<IActionResult> GetPurchasedAsync()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userId == null)
            {
                return Unauthorized();
            }

            var query = new GetPurchasedProductQuery(Guid.Parse(userId));
            var result = await _sender.Send(query);

            return Ok(result);
        }

        [HttpPost("purchase")]
        [Authorize(Roles = "Customer")]
        [EnableRateLimiting("BobCornRatePolicy")]
        public IActionResult PurchaseCorn()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userId == null)
            {
                return Unauthorized();
            }

            return Ok(new { message = "Corn purchased successfully."});
        }
    }
}
