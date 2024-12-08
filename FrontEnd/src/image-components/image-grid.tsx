import React, { useEffect, useState } from 'react';

const defaultImage = '/images/image-not-found.webp'; // Fallback image path

interface ImageMetadata {
  fileName: string;
}

const ImageGrid: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1); // Current page for pagination
  const pageSize = 10; // Number of items per page

  useEffect(() => {
    const fetchImagesMetadata = async () => {
      try {
        console.log('/api/pictures?page=${page}&pageSize=${pageSize}', page, pageSize)
        const response = await fetch(`/api/pictures?page=${page}&pageSize=${pageSize}`); // Call proxy endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch image metadata');
        }
        const data: ImageMetadata[] = await response.json();

        // Fetch image URLs using the second route
        const imageUrls = await Promise.all(
          data.map(async (item) => {
            try {
              console.log('/api/image?fileName=', encodeURIComponent(item.fileName))
              const imageResponse = await fetch(`/api/image?fileName=${encodeURIComponent(item.fileName)}`); // Call proxy endpoint
              if (!imageResponse.ok) {
                throw new Error('Failed to fetch image');
              }
              return imageResponse.url; // Use the fetched image's URL
            } catch {
              return defaultImage; // Fallback if fetching the image fails
            }
          })
        );

        setImages(imageUrls);
      } catch (err) {
        setError(true);
        console.error(err);
      }
    };

    fetchImagesMetadata();
  }, [page]); // Refetch when the page changes

  return (
    <div className="container mx-auto mt-4">
      {images.length === 0 && error ? (
        <div className="col-span-full text-center text-xl text-red-500">
          <img
            src={defaultImage} // Fallback image when all fetches fail
            alt="not found"
            className="w-[300px] h-[300px] object-cover rounded-lg mx-auto"
          />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4">
          {images.map((imageUrl, index) => (
            <div key={index} className="relative">
              <div className="border border-gray-300 rounded-lg overflow-hidden shadow-md">
                <img
                  src={imageUrl} // Use the fetched image URL
                  alt={`Gallery item ${index + 1}`}
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 space-x-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 disabled:bg-gray-200"
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="text-lg font-semibold">Page {page}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ImageGrid;
