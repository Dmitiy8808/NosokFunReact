using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entitities;
using API.Interfaces;

namespace API.Repositories
{
    public class ProductRepo : IProductRepo
    {
        private readonly StoreContext _context;

        public ProductRepo(StoreContext context)
        {
            _context = context;
        }
        public void AddRange(IEnumerable<Product> item)
        {
            _context.Products.AddRange(item);
            _context.SaveChanges();
        }
    }
}