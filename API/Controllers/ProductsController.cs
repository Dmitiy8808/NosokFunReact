using API.Entitities;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductsRepo _productsRepo;

        public ProductsController(IProductsRepo productsRepo)
        {
            _productsRepo = productsRepo;
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts(string? orderBy, string? searchTerm)
        {  
            var query = _productsRepo.GetProducts()
                        .Sort(orderBy)
                        .Search(searchTerm);

            return await query.ToListAsync();

        }

        [HttpGet]
        [Route("{id}")]
        public  async Task<ActionResult<Product>> GetProduct(int id)
        {  
            var product = await _productsRepo.GetProduct(id);

            if (product == null) return NotFound();

            return Ok(product);
        }
    }
}