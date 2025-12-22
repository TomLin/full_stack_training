using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FetchUploadFileToWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadFileController : ControllerBase
    {
        [HttpPost]
        public async Task<string> PostData([FromForm]ViewModel vm)
        {
            return $"{vm.FileName}上傳成功!";
        }
    }
}
