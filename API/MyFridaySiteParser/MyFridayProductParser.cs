using System.Net;
using AngleSharp.Html.Parser;
using API.Entitities;
using API.Interfaces;
using Microsoft.Extensions.Hosting.Internal;

namespace API.MyFridaySiteParser
{
    public class MyFridayProductParser : IProductParser<Product>
    {
        private string pattern = ""; // неуверен насколько это правильно
        private string text = "";
        private string productstructure = "";
        private string description = "";
        public Product Parse(string htmDocument)
        {   
            pattern = ""; // неуверен насколько это правильно
            text = "";
            productstructure = "";
            description = "";
            var parser = new HtmlParser();
            var document =  parser.ParseDocument(htmDocument);
           
            var name = document.QuerySelectorAll("h1").Where(h1 => h1.ClassName != null 
                                                    && h1.ClassName.Contains("intec-header")).FirstOrDefault().TextContent;
            var article = document.QuerySelectorAll("span").Where(span => span.ClassName != null 
                                                    && span.ClassName.Contains("catalog-element-article-value")).FirstOrDefault().TextContent;
            var size =  document.QuerySelectorAll("div").Where(div => div.ClassName != null 
                                                    && div.ClassName.Contains("catalog-element-offers-property-value-content")).FirstOrDefault().TextContent; //TODO Парсить нужно в массив размеров подумать
            
            
            try
            {
                description = document.QuerySelectorAll("div").Where(div => div.ClassName != null 
                                                    && div.ClassName.Contains("catalog-element-section-description intec-ui-markup-text")).FirstOrDefault().TextContent.Trim().Replace("\n", " ") ;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Ошибка {ex.Message} в продукте {name}");
                description = "";

            }
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
                Description = description,
                Pattern = pattern,
                Text = text,
                InStock = true,
                Price = decimal.Parse(price),
                ProductStructure = productstructure,
                PictureUrl = pictureUrl,
                Type = "All",
                QuantityInStock = 10,
            };

            DownloadImage(pictureUrl);

            return product;
        }

        public static async Task DownloadImage(string pictureUrl)
        {
            HttpClient client = new HttpClient();
            var fileName = pictureUrl.Split('/').Last(); 
            var dirPathSplit = pictureUrl.Split('/');
            var dirAppPath = $@"wwwroot\{dirPathSplit[1]}\{dirPathSplit[2]}\{dirPathSplit[3]}";
            var dirServerPath = Path.Combine(Directory.GetCurrentDirectory(), dirAppPath);
            if (!Directory.Exists(dirServerPath))
            {
                Directory.CreateDirectory(dirServerPath);
            }
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), dirAppPath, fileName);
            Uri uri = new Uri("http://myfriday.ru" + pictureUrl);
            var response = await client.GetAsync(uri);
            using (var fs = new FileStream(
                filePath, 
                FileMode.Create))
            {
                await response.Content.CopyToAsync(fs);
            }

            
        }
    }
}