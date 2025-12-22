using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CoreMVCValidation.ViewModels
{
    public class ContactsViewModel : IValidatableObject
    {
        [Required(ErrorMessage ="姓名欄位未填寫")]
        [StringLength(maximumLength:8, MinimumLength =3, ErrorMessage ="姓名至少需要3個字元")]
        [Display(Name="姓名")]
        public string? Name { get; set; }

        [EmailAddress(ErrorMessage = "電子郵件格式錯誤")]
        [Display(Name="電子郵件")]
        public string? Email { get; set; }

        [Display(Name = "電話號碼")]
        public string? Phone { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (string.IsNullOrEmpty(Email) && string.IsNullOrEmpty(Phone))
            {
                yield return new ValidationResult("電子郵件和電話號碼必須至少填寫一個欄位!", new string[] { "Email", "Phone" });
            }
        }
    }
}
