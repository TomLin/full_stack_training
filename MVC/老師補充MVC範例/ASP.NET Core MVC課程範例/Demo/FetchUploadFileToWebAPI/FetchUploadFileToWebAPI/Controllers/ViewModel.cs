namespace FetchUploadFileToWebAPI.Controllers
{
    public class ViewModel
    {
        public string FileName { get; set; }

        public IFormFile ImageFile { get; set; }

        public bool Archive {  get; set; }
    }
}