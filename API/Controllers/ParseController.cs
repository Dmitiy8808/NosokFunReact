using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Interfaces;
using API.MyFridaySiteParser;
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
            return await _parsingSeervice.GetSocsHrefs();
        }
    }
}