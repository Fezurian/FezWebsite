namespace FezWebSiteApi.Pictures
{
    using FezWebSiteApi.Models;

    public interface IPictureService
    {
        public IEnumerable<Picture> GetPictures(int page = 1, int pageSize = 10);

        public byte[] GetImageByFileName(string fileName);
    }
}