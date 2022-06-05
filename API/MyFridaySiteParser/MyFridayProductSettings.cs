using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Interfaces;

namespace API.MyFridaySiteParser
{
    public class MyFridayProductSettings : IParserSettings
    {
        public string BaseUrl { get; set; } = "https://myfriday.ru";
        public string Prefix { get; set; } 
        public int StartPont { get; set; }
        public int EndPont { get; set; }
    }
}