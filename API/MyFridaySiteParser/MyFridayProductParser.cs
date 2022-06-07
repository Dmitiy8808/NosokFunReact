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
        private string pattern;
        private string text;
        private string productstructure;
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
            var price = document.QuerySelectorAll("div").Where(div => div.ClassName != null 
                                                    && div.ClassName.Contains("catalog-element-price-discount")).FirstOrDefault().TextContent.Trim().Split("р")[0].Trim().Replace(".", ",");
            var pictureUrl = document.QuerySelectorAll("a").Where(a => a.ClassName != null 
                                                    && a.ClassName.Contains("catalog-element-gallery-picture intec-image")).FirstOrDefault().GetAttribute("href");
            var properties = document.QuerySelectorAll("div").Where(div => div.ClassName != null 
                                                   && div.ClassName == "catalog-element-property");
            foreach (var property in properties)
            {
                if (property.FirstElementChild.TextContent.Trim() == "Узор")
                {
                     pattern = property.LastElementChild.TextContent.Trim();
                }
                if (property.FirstElementChild.TextContent.Trim() == "Текст на носках")
                {
                     text = property.LastElementChild.TextContent.Trim();
                }
                if (property.FirstElementChild.TextContent.Trim() == "Состав")
                {
                     productstructure = property.LastElementChild.TextContent.Trim();
                }
            }

            var product = new Product {
                Name = name.Trim(),
                Article = article.Trim(),
                Size = size.Trim(),
                Pattern = pattern,
                Text = text,
                InStock = true,
                Price = decimal.Parse(price),
                ProductStructure = productstructure,
                PictureUrl = pictureUrl,
                Type = "All",
                QuantityInStock = 10,
            };

            return product;
        }
    }
}