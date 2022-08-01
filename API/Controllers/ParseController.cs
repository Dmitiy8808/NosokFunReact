using API.Entitities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ParseController : ControllerBase
    {
        private readonly IParsingService _parsingService;

        public ParseController(IParsingService parsingService)
        {
            _parsingService = parsingService;
        }

        [HttpGet]
        public async Task<string[]> GetHtmlLoader()
        {  
            return await _parsingService.GetSocksHrefs();
        }

        [HttpGet]
        [Route("product")]
        public async Task<List<Product>> Getproduct()
        {  
            return await _parsingService.GetParseProduct();
        }
    }
}