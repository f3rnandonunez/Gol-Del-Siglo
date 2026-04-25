import { useEffect, useState } from 'react';

export function useImagePreload(imageSources: string[]): boolean {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!imageSources || imageSources.length === 0) {
      setIsLoaded(true);
      return;
    }

    let loadedCount = 0;
    const totalImages = imageSources.length;

    const handleImageLoad = () => {
      loadedCount++;
      if (loadedCount === totalImages) {
        setIsLoaded(true);
      }
    };

    const handleImageError = () => {
      loadedCount++;
      if (loadedCount === totalImages) {
        setIsLoaded(true); // Continuar aunque falle alguna imagen
      }
    };

    imageSources.forEach((src) => {
      const img = new Image();
      img.onload = handleImageLoad;
      img.onerror = handleImageError;
      img.src = src;
    });

    return () => {
      loadedCount = totalImages; // Prevenir actualizaciones al desmontar
    };
  }, [imageSources]);

  return isLoaded;
}
