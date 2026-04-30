using BobCorn.Application.Features.PurchaseProduct;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using System.Security.Claims;
using System.Threading.Tasks;

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
        public async Task<IActionResult> PurchaseCorn()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userId == null)
            {
                return Unauthorized();
            }

            try
            {
                var command = new PurchaseProductCommand(Guid.Parse(userId));

                await _sender.Send(command);

                return Ok(new { message = "Corn purchased successfully." });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
