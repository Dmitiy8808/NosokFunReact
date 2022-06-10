using API.Entitities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductsRepo _productsRepo;

        public ProductsController(IProductsRepo productsRepo)
        {
            _productsRepo = productsRepo;
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {  
            return  Ok(await _productsRepo.GetProducts().ToListAsync());
        }

        [HttpGet]
        [Route("{id}")]
        public  async Task<ActionResult<Product>> GetProduct(int id)
        {  
            return Ok(await _productsRepo.GetProduct(id));
        }
    }
}