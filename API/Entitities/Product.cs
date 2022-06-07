using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entitities
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Article { get; set; }
        public string Size { get; set; }
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
}