using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace UseASPNETCoreIdentity.Data
{
    public class ApplicationUser : IdentityUser
    {
	[MaxLength(3)]
        public string CountryCode { get; set; }
    }
}
