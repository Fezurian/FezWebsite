import React, { useEffect, useState } from 'react';

const defaultImage = '/images/image-not-found.webp';

const ImageGrid: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    // Fetch images from localhost:5000/images
    const fetchImages = async () => {
      try {
        const response = await fetch('http://localhost:5000/images');
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }
        const data = await response.json();
        setImages(data.images || []); // Assuming the response contains an array of image URLs in a "images" field
      } catch (err) {
        setError(true);
        console.error(err);
      }
    };

    fetchImages();
  }, []); // Empty dependency array ensures this only runs once

  // Check if the image URL is valid
  const getImageSrc = (url: string) => {
    // Check if the URL is invalid or empty
    if (!url || !url.startsWith('http')) {
      return defaultImage;
    }
    return url;
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4 mt-4">
      {images.length === 0 && error ? (
        <div className="col-span-full text-center text-xl text-red-500">
          <img
            src={getImageSrc('')} // Use fallback image if URL is empty or invalid
            alt="not found" // More descriptive alt text
            className="w-[300px] h-[300px] object-cover rounded-lg mx-auto"
          />
        </div>

      ) : (
        images.map((imageUrl, index) => (
          <div key={index} className="relative">
            <div className="border border-gray-300 rounded-lg overflow-hidden shadow-md">
              <img
                src={getImageSrc(imageUrl)} // Use fallback image if URL is empty or invalid
                alt={`Gallery item ${index + 1}`} // More descriptive alt text
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ImageGrid;
