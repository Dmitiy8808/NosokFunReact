using AngleSharp.Html.Parser;
using API.Interfaces;
using System.Net;

namespace API.MyFridaySiteParser
{
    public class HtmlLoader : IHtmlLoader
    {
        readonly HttpClient _httpclient;
        readonly string _url;

        public HtmlLoader(IParserSettings settings)
        {
            _httpclient = new HttpClient();  
            _url = $"{settings.BaseUrl}/{settings.Prefix}";
        }

        public async Task<string> GetSourceByPageId(int id)
        {
            var currentUrl = _url.Replace("{CurrentId}", id.ToString());
            var response = await _httpclient.GetAsync(currentUrl);
            string source = null;
            var parser = new HtmlParser();

            if(response != null && response.StatusCode == HttpStatusCode.OK)
            {
                source = await response.Content.ReadAsStringAsync();
            }

            return source;

        }
    }
}