import { Image } from '@commercetools/platform-sdk';
import { convertImagesToReactImageGalleryItems } from '@utils/utils';
import { useRef, useState } from 'react';
import ReactImageGallery, { ReactImageGalleryItem } from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import styles from './Slider.module.scss';

interface SliderProps {
  images: Image[] | undefined;
}

export function Slider({ images }: SliderProps) {
  const galleryRef = useRef<ReactImageGallery>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const slides: ReactImageGalleryItem[] = convertImagesToReactImageGalleryItems(images, isFullscreen, styles.sliderImg);

  const handleImageClick = () => {
    if (galleryRef.current) {
      if (isFullscreen) {
        galleryRef.current.exitFullScreen();
      } else {
        galleryRef.current.fullScreen();
      }
      setIsFullscreen(!isFullscreen);
    }
  };

  const handleMouseEnter = () => {
    if (galleryRef.current) {
      galleryRef.current.pause();
    }
  };

  const handleMouseLeave = () => {
    if (galleryRef.current) {
      galleryRef.current.play();
    }
  };

  const handleScreenChange = (isFullScreen: boolean) => {
    setIsFullscreen(isFullScreen);
    if (isFullScreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  return (
    <div className={styles.sliderWrapper}>
      <ReactImageGallery
        ref={galleryRef}
        showNav={isFullscreen}
        showBullets={!isFullscreen}
        lazyLoad
        autoPlay
        showThumbnails={isFullscreen}
        useBrowserFullscreen={false}
        items={slides}
        onScreenChange={handleScreenChange}
        showFullscreenButton={false}
        showPlayButton={false}
        onClick={handleImageClick}
        onMouseOver={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    </div>
  );
}
