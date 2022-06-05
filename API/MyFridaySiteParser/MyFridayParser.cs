using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AngleSharp.Html.Dom;
using AngleSharp.Html.Parser;
using API.Interfaces;

namespace API.MyFridaySiteParser
{
    public class MyFridayParser : IParser<String>
    {
        public HashSet<String> Parse(string htmDocument)
        {
            var parser = new HtmlParser();
            var document =  parser.ParseDocument(htmDocument);

            var haslist = new HashSet<String>();
            var hrefs = document.QuerySelectorAll("a").Where(href => href.ClassName != null 
                                                    && href.ClassName.Contains("catalog-section-item-image-element intec-image-effect"));
            foreach (var href in hrefs)
            {
                haslist.Add(href.GetAttribute("href"));
            }

            return haslist;
        }
    }
}