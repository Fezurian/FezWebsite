namespace FezWebSiteApi.Pictures
{
    using FezWebSiteApi.Models;

    public class PictureService : IPictureService
    {
        private readonly AppSettings _settings;
        private readonly IPictureRepository _pictureRepository;

        public PictureService(
            AppSettings settings,
            IPictureRepository pictureRepository)
        {
            this._settings = settings;
            this._pictureRepository = pictureRepository;
        }

        // Method to get paginated pictures
        public IEnumerable<Picture> GetPictures(int page = 1, int pageSize = 10)
        {
            // Validate and cap page size to a maximum of 50
            pageSize = Math.Min(pageSize, 50);

            // Get the list of image file paths
            var filePaths = GetImageFilePaths().Skip((page - 1) * pageSize).Take(pageSize);

            // Create the list of pictures
            var pictures = new List<Picture>();
            foreach (var filePath in filePaths)
            {
                pictures.Add(new Picture
                {
                    FilePath = filePath,
                    FileName = Path.GetFileName(filePath)
                });
            }

            return pictures;
        }

        // Method to get the full image by filename
        public byte[] GetImageByFileName(string fileName)
        {
            var filePaths = GetImageFilePaths();
            var filePath = filePaths.FirstOrDefault(f => Path.GetFileName(f).Equals(fileName, StringComparison.OrdinalIgnoreCase));

            if (filePath == null)
                return []; // File not found

            return File.ReadAllBytes(filePath);
        }

        // Method to get the file paths and filenames
        private IEnumerable<string> GetImageFilePaths()
        {
            // Ensure the directory exists
            if (Directory.Exists(_settings.RootImagePath))
            {
                // Get all image files (including from subdirectories)
                var files = Directory.GetFiles(_settings.RootImagePath, "*.*", SearchOption.AllDirectories);

                // Filter for image file types (jpg, png, gif, webp)
                return files.Where(file => file.EndsWith(".jpg", StringComparison.OrdinalIgnoreCase) ||
                                            file.EndsWith(".png", StringComparison.OrdinalIgnoreCase) ||
                                            file.EndsWith(".gif", StringComparison.OrdinalIgnoreCase) ||
                                            file.EndsWith(".webp", StringComparison.OrdinalIgnoreCase));
            }

            return Enumerable.Empty<string>();
        }
    }
}