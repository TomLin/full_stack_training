using System.ComponentModel.DataAnnotations;

namespace CustomerWebsite.ViewModels
{
    public class ContactViewModel : IValidatableObject
    {
        
        [Required(ErrorMessage="姓名未填寫")]
        [StringLength(maximumLength:8, ErrorMessage = "長度大於3小於8", MinimumLength = 3)]
        [Display(Name="姓名 Name")]
        public string Name { get; set; }

        [EmailAddress(ErrorMessage ="郵件格式錯誤")]
        [Display(Name = "電子郵件 Email")]
        public string? Email { get; set; }

        [Display(Name = "連絡電話 Phone")]
        public string? Phone { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (string.IsNullOrEmpty(Email) && string.IsNullOrEmpty(Phone))
            {
                yield return new ValidationResult("電子郵件與電話，至少填寫一項");
            }
        }
    }
}