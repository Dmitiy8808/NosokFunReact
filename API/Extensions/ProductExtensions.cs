using API.Entitities;

namespace API.Extensions
{
    public static class ProductExtensions
    {
        public static IQueryable<Product> Sort(this IQueryable<Product> query, string? orderBy)
        {
            if (string.IsNullOrWhiteSpace(orderBy)) return query.OrderBy(p => p.Name);
            
            query = orderBy switch
            {
                "price" => query.OrderBy(p => p.Price),
                "priceDesc" => query.OrderByDescending(p => p.Price),
                _ => query.OrderBy(p => p.Name)  //Кейс по умолчанию 
                // добавить сотритровку по скидке популярности/рейтингу обновлению 
            };

            return query;
        }

        public static IQueryable<Product> Search(this IQueryable<Product> query, string? searchTerm)
        {
            if (string.IsNullOrWhiteSpace(searchTerm)) return query;

            var lowerCaseSearchterm = searchTerm.Trim().ToLower();

            return query.Where(p => p.Name.ToLower().Contains(lowerCaseSearchterm));

        }
    }

}