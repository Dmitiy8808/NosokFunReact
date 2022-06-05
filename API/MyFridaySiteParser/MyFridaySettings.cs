using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Interfaces;

namespace API.MyFridaySiteParser
{
    public class MyFridaySettings : IParserSettings
    {
        public string BaseUrl { get; set; } = "https://myfriday.ru/allsocks";
        public string Prefix { get; set; } = "?PAGEN_1={CurrentId}";
        public int StartPont { get; set; }
        public int EndPont { get; set; }
    }
}