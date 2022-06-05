using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IProductParser<T> where T : class
    {
        T Parse(string htmDocument);
    }
}