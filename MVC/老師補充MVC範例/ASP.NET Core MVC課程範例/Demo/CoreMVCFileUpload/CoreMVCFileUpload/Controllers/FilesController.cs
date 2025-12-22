using Microsoft.AspNetCore.Mvc;
using MyExtensions;
using System.IO.Compression;
using System.Net.Mime;

namespace CoreMVCFileUpload.Controllers
{
    public class FilesController : Controller
    {
        private readonly IWebHostEnvironment _webHostEnvironment;

        public FilesController(IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
        }

        public IActionResult Index()
        {
            string WebRootPath = _webHostEnvironment.WebRootPath;
            DirectoryInfo di = new DirectoryInfo(
                  Path.Combine(WebRootPath, "Uploads"));
            var query = di.EnumerateFiles("*.*").Select((file, index) =>
                            new DownloadFile
                            {
                                ID = index + 1,
                                FileName = file.Name,
                                FileSize = file.Length.ToFileSize(),
                                CreationTime = file.CreationTime
                            });
            return View(query);
        }

        public IActionResult Upload()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Upload(IEnumerable<IFormFile> files)
        {
            if (files.Count() != 0)
            {
                foreach (IFormFile file in files)
                {
                    string WebRootPath = _webHostEnvironment.WebRootPath;
                    string SourceFilename = Path.GetFileName(file.FileName);
                    string TargetFilename = Path.Combine(WebRootPath, "Uploads", SourceFilename);
                    using (FileStream stream = new FileStream(TargetFilename, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }
                }
            }
            else 
            { 
                ModelState.AddModelError("files", "尚未選取上傳檔案!"); 
            }
            if (ModelState.IsValid)
            {
                return RedirectToAction(nameof(Index));
            }
            return View();
        }
        public FileResult Download(string FileName)
        {
            string WebRootPath = _webHostEnvironment.WebRootPath;
            string DownloadFilename = Path.Combine(WebRootPath, "Uploads", FileName);
            ContentDisposition cd = new ContentDisposition
            {
                FileName = FileName,     // 設定下載檔案名稱
                // Inline= false,        // 禁止直接顯示檔案內容
            };
            Response.Headers.Append("Content-Disposition", cd.ToString());
            var fs = System.IO.File.OpenRead(DownloadFilename);
            return File(fs, MediaTypeNames.Application.Octet);
        }

        public FileResult DownloadAll()
        {
            string WebRootPath = _webHostEnvironment.WebRootPath;
            string ZipFilename = "All.zip";
            string UploadsFolder = Path.Combine(WebRootPath, "Uploads");
            string DownloadFileName = Path.Combine(WebRootPath, ZipFilename);
            if (System.IO.File.Exists(DownloadFileName))
            {
                System.IO.File.Delete(DownloadFileName);
            }
            ZipFile.CreateFromDirectory(UploadsFolder, DownloadFileName);
            ContentDisposition cd = new ContentDisposition
            {
                FileName = ZipFilename,
                // Inline= false,        // 禁止直接顯示檔案內容
            };
            Response.Headers.Append("Content-Disposition", cd.ToString());
            var fs = System.IO.File.OpenRead(DownloadFileName);
            return File(fs, MediaTypeNames.Application.Octet);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public FileResult DownloadSelectedFiles(string[] Filenames)
        {
            string WebRootPath = _webHostEnvironment.WebRootPath;
            string ZipFilename = "Download.zip";
            string UploadsFolder = Path.Combine(WebRootPath, "Uploads");
            string DownloadFileName = Path.Combine(WebRootPath, ZipFilename);
            if (System.IO.File.Exists(DownloadFileName))
            {
                System.IO.File.Delete(DownloadFileName);
            }
            ZipArchive Zip = ZipFile.Open(DownloadFileName, ZipArchiveMode.Create);
            foreach (string File in Filenames)
            {
                string Filename = Path.Combine(UploadsFolder, File);
                Zip.CreateEntryFromFile(Filename, File, CompressionLevel.Optimal);
            }
            ContentDisposition cd = new ContentDisposition
            {
                FileName = ZipFilename, 
                //Inline = false,             //禁止直接顥示
            };
            Zip.Dispose();
            Response.Headers.Append("Content-Disposition", cd.ToString());
            FileStream fs = System.IO.File.OpenRead(DownloadFileName);
            return File(fs, MediaTypeNames.Application.Octet);
        }

    }
}
