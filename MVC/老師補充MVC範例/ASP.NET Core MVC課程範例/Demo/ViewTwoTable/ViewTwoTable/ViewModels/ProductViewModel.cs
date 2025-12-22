using System.ComponentModel.DataAnnotations;

namespace ViewTwoTable.ViewModels
{
    public class ProductViewModel
    {
        [Key]
        public string ProductName { get; set; }
        public string CompanyName { get; set; }
    }
}