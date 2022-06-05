using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AngleSharp.Html.Dom;
using AngleSharp.Html.Parser;
using API.Entitities;
using API.Interfaces;

namespace API.MyFridaySiteParser
{
    public class MyFridayProductParser : IProductParser<Product>
    {
        public Product Parse(string htmDocument)
        {
            var parser = new HtmlParser();
            var document =  parser.ParseDocument(htmDocument);
            var name = document.QuerySelectorAll("h1").Where(h1 => h1.ClassName != null 
                                                    && h1.ClassName.Contains("intec-header")).FirstOrDefault().TextContent;
            var article = document.QuerySelectorAll("span").Where(span => span.ClassName != null 
                                                    && span.ClassName.Contains("catalog-element-article-value")).FirstOrDefault().TextContent;
            var size =  document.QuerySelectorAll("div").Where(div => div.ClassName != null 
                                                    && div.ClassName.Contains("catalog-element-offers-property-value-content")).FirstOrDefault().TextContent; //TODO Парсить нужно в массив размеров подумать
            var design = document.QuerySelectorAll("div").Where(div => div.ClassName != null 
                                                    && div.ClassName.Contains("catalog-element-property-value")).ToArray()[0].TextContent;
            var structure = document.QuerySelectorAll("div").Where(div => div.ClassName != null 
                                                    && div.ClassName.Contains("catalog-element-property-value")).ToArray()[1].TextContent;
            var price = document.QuerySelectorAll("div").Where(div => div.ClassName != null 
                                                    && div.ClassName.Contains("catalog-element-price-discount")).FirstOrDefault().TextContent;
            var pictureUrl = document.QuerySelectorAll("a").Where(a => a.ClassName != null 
                                                    && a.ClassName.Contains("catalog-element-gallery-picture intec-image")).FirstOrDefault().TextContent;
        
            var trimPrice = price.Trim();
            var spitPrice = trimPrice.Split("р")[0].Split(" ")[0] + trimPrice.Split("р")[0].Split(" ")[1];
        // public decimal Price { get; set; }
        // public string PictureUrl { get; set; }
        // public string Type { get; set; }
        // public int QuantityInStock { get; set; }
            var product = new Product {
                Name = name.Trim(),
                Article = article.Trim(),
                Size = size.Trim(),
                Design = design.Trim(),
                Structure = structure.Trim(),
                InStock = true,
                Price = decimal.Parse(price.Trim().Split("р")[0]),



            };

            return product;
        }
    }
}