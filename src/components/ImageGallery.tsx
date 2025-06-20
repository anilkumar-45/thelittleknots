
import { useState } from 'react';
import { ProductImage } from '@/types/Product';

interface ImageGalleryProps {
  images: ProductImage[];
  productName: string;
}

const ImageGallery = ({ images, productName }: ImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
        <span className="text-gray-500">No images available</span>
      </div>
    );
  }

  // Sort images by display order
  const sortedImages = [...images].sort((a, b) => a.display_order - b.display_order);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
        <img
          src={sortedImages[selectedImage]?.image_url}
          alt={`${productName} - Main`}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Thumbnail Images */}
      {sortedImages.length > 1 && (
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {sortedImages.slice(0, 4).map((image, index) => (
            <button
              key={image.id}
              onClick={() => setSelectedImage(index)}
              className={`aspect-square overflow-hidden rounded-lg border-2 transition-all duration-200 hover:opacity-75 ${
                selectedImage === index 
                  ? 'border-primary ring-2 ring-primary/20' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <img
                src={image.image_url}
                alt={`${productName} - ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
