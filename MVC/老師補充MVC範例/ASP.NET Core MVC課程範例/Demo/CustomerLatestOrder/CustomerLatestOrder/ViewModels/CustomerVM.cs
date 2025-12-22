namespace CustomerLastOrder.ViewModels
{
    public class CustomerVM
    {
        public string CustomerId { get; set; } = null!;

        public string CompanyName { get; set; } = null!;

        public OrderVM LatestOrder { get; set; }


    }
}
