using CustomerLastOrder.Models;

namespace CustomerLastOrder.ViewModels
{
    public class CustomerOrdersVM
    {
        public string CustomerId { get; set; } = null!;

        public string CompanyName { get; set; } = null!;

        public ICollection<Order> Orders { get; set; }


    }
}
