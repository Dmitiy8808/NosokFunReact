namespace API.Interfaces
{
    public interface IParserSettings
    {
        public string BaseUrl { get; set; }
        public string Prefix { get; set; }
        public int StartPont { get; set; }
        public int EndPont { get; set; }
    }
}