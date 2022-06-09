using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entitities;

namespace API.Interfaces
{
    public interface IProductRepo
    {
        public void AddRange(IEnumerable<Product> item);
    }
}