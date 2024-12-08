namespace FezWebSiteApi.Pictures
{
    using FezWebSiteApi.Models;
    using Microsoft.AspNetCore.Mvc;

    [ApiController]
    public class PictureController : ControllerBase
    {
        private readonly IPictureService _pictureService;

        public PictureController(
            IPictureService pictureService)
        {
            _pictureService = pictureService;
        }

        // Endpoint to get a list of all pictures with file path and file name
        [HttpGet]
        [Route("api/pictures")]
        public ActionResult<IEnumerable<Picture>> GetPictures(int page = 1, int pageSize = 10)
        {
            var pictures = _pictureService.GetPictures(page, pageSize);
            return Ok(pictures);
        }

        // Endpoint to get a specific image by filename
        [HttpGet]
        [Route("api/image")]
        public ActionResult GetImage(string fileName)
        {
            var imageBytes = _pictureService.GetImageByFileName(fileName);

            if (imageBytes == null)
            {
                return NotFound();
            }

            // Get file extension to determine MIME type
            var fileExtension = Path.GetExtension(fileName).ToLower();

            return fileExtension switch
            {
                ".jpg" => File(imageBytes, "image/jpeg"),
                ".png" => File(imageBytes, "image/png"),
                ".gif" => File(imageBytes, "image/gif"),
                ".webp" => File(imageBytes, "image/webp"),
                _ => File(imageBytes, "application/octet-stream"),
            };
        }
    }
}
