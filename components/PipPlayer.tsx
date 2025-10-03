import React, { useEffect, useRef } from 'react';

interface PipPlayerProps {
  url: string;
  onClose: () => void;
}

export const PipPlayer: React.FC<PipPlayerProps> = ({ url, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Check if PiP is supported
    if (!document.pictureInPictureEnabled) {
      console.error('Picture-in-Picture is not supported in this browser.');
      onClose();
      return;
    }

    const enterPip = async () => {
      try {
        await video.play();
        await video.requestPictureInPicture();
      } catch (error) {
        console.error('Failed to enter Picture-in-Picture mode:', error);
        // If PiP fails (e.g., user denies permission), call onClose to clean up
        onClose();
      }
    };

    const handleCanPlay = () => {
      enterPip();
    };
    
    // The 'leavepictureinpicture' event fires when the user closes the PiP window
    video.addEventListener('leavepictureinpicture', onClose);
    // Use 'canplay' event to ensure video is ready before requesting PiP
    video.addEventListener('canplay', handleCanPlay);

    // Set the video source to trigger loading
    video.src = url;

    // Cleanup function to remove event listeners
    return () => {
      video.removeEventListener('leavepictureinpicture', onClose);
      video.removeEventListener('canplay', handleCanPlay);
      // Ensure we exit PiP mode if the component unmounts unexpectedly
      if (document.pictureInPictureElement === video) {
        document.exitPictureInPicture();
      }
    };
  }, [url, onClose]);

  // The video element is hidden from the normal document flow but is required for the PiP API
  return (
    <video
      ref={videoRef}
      controls
      muted
      playsInline
      style={{ display: 'none' }}
      onLoadedMetadata={(e) => {
        // Some browsers require the video to have dimensions.
        e.currentTarget.width = e.currentTarget.videoWidth;
        e.currentTarget.height = e.currentTarget.videoHeight;
      }}
    />
  );
};
