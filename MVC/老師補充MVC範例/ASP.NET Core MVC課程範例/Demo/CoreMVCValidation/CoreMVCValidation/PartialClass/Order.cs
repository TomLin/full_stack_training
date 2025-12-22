using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CoreMVCValidation.Models
{
    public partial class Order : IValidatableObject
    {
        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (RequiredDate > OrderDate.Value.AddMonths(1))
            {
                yield return new ValidationResult(
                      "訂購商品必須在1個月內取貨", new string[] { "OrderDate", "RequiredDate" });
            }
        }
    }
}
