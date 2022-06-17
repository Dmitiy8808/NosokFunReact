using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entitities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories
{
    public class ProductsRepo : IProductsRepo
    {
        
        private readonly StoreContext _context;

        public ProductsRepo(StoreContext context)
        {
            _context = context;
            
        }
        public void AddRange(IEnumerable<Product> item) //TODO Сделать метод асинхронным. 
        {
            _context.Products.AddRange(item);
            _context.SaveChanges();         
        }

        public IQueryable<Product> GetProducts()
        {
            return  _context.Products;
        }

        public async Task<Product> GetProduct(int id)
        {
            return await _context.Products.Where(x =>x.Id == id).FirstOrDefaultAsync();
        }
    }
}