using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using API.Entitities;
using API.Interfaces;

namespace API.MyFridaySiteParser
{
    public class ParsingService : IParsingService
    {
        private readonly IProductsRepo _productRepo;

        public ParsingService(IProductsRepo productRepo)
        {
            _productRepo = productRepo;
        }
        public async Task<string[]> GetSocksHrefs()
        {
           
            var pagehrefsHashSet = new HashSet<String>();
            var myFridaySettings = new MyFridaySettings();
            myFridaySettings.StartPont = 1;
            myFridaySettings.EndPont = 6;
            var htmlLoader = new HtmlLoader(myFridaySettings);
            var myFridayParser = new MyFridayHrefParser();
            for (int i = myFridaySettings.StartPont; i <= myFridaySettings.EndPont; i++)
            {
                var htmlPage = await htmlLoader.GetSourceByPageId(i);
                var pagehrefs = myFridayParser.Parse(htmlPage);
                pagehrefsHashSet.UnionWith(pagehrefs);
            }
            Console.WriteLine(pagehrefsHashSet.ToArray().Count());
            
            return pagehrefsHashSet.ToArray();
        }

        public async Task<List<Product>> GetParseProduct()
        {
            var myFridayProductSettings = new MyFridayProductSettings();
            var myFridayProductParser = new MyFridayProductParser();
            var socksHrefs  =   await GetSocksHrefs();
            var productList = new List<Product>();
            foreach (var href in socksHrefs)
            {
                myFridayProductSettings.Prefix = href;
                var htmlLoader = new HtmlLoader(myFridayProductSettings);
                var htmlPage = await htmlLoader.GetSourceByPagePrefix();
                var product = myFridayProductParser.Parse(htmlPage);
                productList.Add(product);
            }
            _productRepo.AddRange(productList);
            return productList;
        }

        
    }
}