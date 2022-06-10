using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entitities;

namespace API.Interfaces
{
    public interface IProductsRepo
    {
        public void AddRange(IEnumerable<Product> item);
        public IQueryable<Product> GetProducts();
        public Task<Product> GetProduct(int id);
    }
}