using CoreMVCCategoryProduct.Resources;
using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;

namespace CoreMVCCategoryProduct.Models
{
    internal class ProductMetadata
    {
        [Required(ErrorMessageResourceName = "ProductNameEmpty", ErrorMessageResourceType = typeof(WebResource))]
        [Display(Name = "ProductName", ResourceType = typeof(WebResource))]
        [StringLength(40, ErrorMessage = "{0}最多{1}個字元")]
        public string ProductName { get; set; }

        [DisplayFormat(DataFormatString = "{0:C}")]
        [Display(Name = "產品單價")]
        public decimal? UnitPrice { get; set; }

        [Display(Name = "訂購單位")]
        [Range(1, 100, ErrorMessage = "{0}必須介於{1}~{2}之間")]
        public short? UnitsOnOrder { get; set; }
    }

}