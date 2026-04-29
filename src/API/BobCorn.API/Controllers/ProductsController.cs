using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

namespace BobCorn.API.Controllers
{
    [Route("api/products")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ISender _sender;

        public ProductsController(ISender sender) => _sender = sender;

        [HttpPost("purchase")]
        [Authorize(Roles = "Customer")]
        [EnableRateLimiting("BobCornRatePolicy")]
        public IActionResult PurchaseCorn()
        {
            return Ok(new { message = "Corn purchased successfully."});
        }
    }
}
