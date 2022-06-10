using API.Entitities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ParseController : ControllerBase
    {
        private readonly IParsingService _parsingSeervice;

        public ParseController(IParsingService parsingSeervice)
        {
            _parsingSeervice = parsingSeervice;
        }

        [HttpGet]
        public async Task<string[]> GetHtmlLoader()
        {  
            return await _parsingSeervice.GetSocksHrefs();
        }

        [HttpGet]
        [Route("product")]
        public async Task<List<Product>> Getproduct()
        {  
            return await _parsingSeervice.GetParseProduct();
        }
    }
}