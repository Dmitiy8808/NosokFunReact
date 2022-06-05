using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entitities;
using API.Interfaces;

namespace API.MyFridaySiteParser
{
    public class ParsingService : IParsingService
    {
        public async Task<string[]> GetSocsHrefs()
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

        public async Task<Product> GetParseProduct()
        {
            var myFridayProductSettings = new MyFridayProductSettings();
            myFridayProductSettings.Prefix = "allsocks/nabor_zabornaya_lirika/";
            var htmlLoader = new HtmlLoader(myFridayProductSettings);
            var myFridayProductParser = new MyFridayProductParser();
            var htmlPage = await htmlLoader.GetSourceByPagePrefix();
            var product = myFridayProductParser.Parse(htmlPage);
            return product;
        }
    }
}