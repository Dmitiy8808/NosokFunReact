using AngleSharp.Html.Dom;

namespace API.Interfaces
{
    public interface IParser<T> where T : class
    {
        HashSet<T> Parse(string htmDocument);
    }
}