using System.ComponentModel.DataAnnotations;

namespace CoreMVCChart.Controllers
{
    public class CustomerCount
    {
        [Key]
        [Display(Name ="國家")]
        public string Country { get; set; }

        [Display(Name ="客戶人數")]
        public int Count { get; set; }
    }
}