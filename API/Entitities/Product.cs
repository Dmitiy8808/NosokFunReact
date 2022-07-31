using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entitities
{
    public class Product
    {
        
        public int Id { get; set; }
        public string Name { get; set; }
        public string Article { get; set; }
        public ProductSize Size { get; set; }
        public string Description { get; set; }
        public string Pattern { get; set; }
        public string Text { get; set; }
        public string ProductStructure { get; set; }
        public bool InStock { get; set; }
        public decimal Price { get; set; }
        public string PictureUrl { get; set; }
        public string Type { get; set; }
        public int QuantityInStock { get; set; }
    }

    public enum ProductSize
    {
        [Description("34-37")]
        Small = 0,
        [Description("38-41")]
        Medium = 1,
        [Description("42-46")]
        Large = 2  
    }
}