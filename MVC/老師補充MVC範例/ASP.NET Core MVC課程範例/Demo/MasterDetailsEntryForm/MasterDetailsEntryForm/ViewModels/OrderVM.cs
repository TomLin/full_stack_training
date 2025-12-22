using System.ComponentModel.DataAnnotations;

namespace MasterDetailsEntryForm.ViewModels
{
    public class OrderVM
    {
        public int OrderId { get; set; }
        public string CustomerId { get; set; }
        public DateTime? RequiredDate { get; set; } 
        public OrderDetailsVM[] OrderDetails { get; set; }
    }
}