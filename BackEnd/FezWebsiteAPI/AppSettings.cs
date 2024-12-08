namespace FezWebSiteApi
{
    public class AppSettings
    {
        public string? BaseUri { get; set; } = "https://localhost:7294";
        public string? RootImagePath { get; set; }
        public int MaxThreads { get; set; }
    }

}
