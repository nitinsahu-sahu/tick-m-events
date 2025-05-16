import React, { useEffect, useRef, useState } from "react";
import { Box, Button, IconButton } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import CropIcon from '@mui/icons-material/Crop';
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from "react-image-crop";

import "react-image-crop/dist/ReactCrop.css";

import { PageTitleSection } from "src/components/page-title-section";
import { HeadingCommon } from "src/components/multiple-responsive-heading/heading";
import { SearchBar } from "../search-bar";
import "react-quill/dist/quill.snow.css";
import { EventInformation } from "../event-information";
import { SecurityAndConfirmation } from "../security-&-confirm";
import { canvasPreview } from "../canvasPreview";

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  );
}

export function EventDetailsView() {
  const [eventLogo, setEventLogo] = useState<string | null>(null);
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [crop, setCrop] = useState<Crop>();
  const [imgSrc, setImgSrc] = useState('');
  const [showCrop, setShowCrop] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEventThemeLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      // Create object URL for preview
      const previewUrl = URL.createObjectURL(e.target.files[0]);
      setEventLogo(previewUrl);
      setImgSrc(previewUrl);
    }
  };

  const handleDownload = () => {
    if (!eventLogo) return;

    const link = document.createElement('a');
    link.href = eventLogo;
    link.download = 'event-banner.png'; // or extract filename from the original file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleToggleCrop = () => {
    setShowCrop(!showCrop);
    if (!showCrop && imgRef.current) {
      const { width, height } = imgRef.current;
      setCrop(centerAspectCrop(width, height, 16 / 9));
    }
  };

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, 16 / 9));
  };

  const handleCropComplete = (newCrop: PixelCrop) => {
    setCompletedCrop(newCrop);
  };

  const handleApplyCrop = async () => {
    if (imgRef.current && previewCanvasRef.current && completedCrop) {
      try {
        // Create a new canvas for the cropped image
        const canvas = document.createElement('canvas');
        canvas.width = completedCrop.width;
        canvas.height = completedCrop.height;

        await canvasPreview(
          imgRef.current,
          canvas,
          completedCrop,
        );

        // Convert canvas to blob
        canvas.toBlob((blob) => {
          if (blob) {
            const newPreviewUrl = URL.createObjectURL(blob);

            // Clean up previous URLs
            if (eventLogo) URL.revokeObjectURL(eventLogo);
            if (imgSrc) URL.revokeObjectURL(imgSrc);

            // Update both states
            setEventLogo(newPreviewUrl);
            setImgSrc(newPreviewUrl);
            setShowCrop(false);

          }
        }, 'image/png', 1);
      } catch (error) {
        console.error('Cropping error:', error);
      }
    }
  };

  // Clean up object URLs when component unmounts
  useEffect(() => () => {
    if (eventLogo) {
      URL.revokeObjectURL(eventLogo);
    }
    if (imgSrc) {
      URL.revokeObjectURL(imgSrc);
    }
  }, [eventLogo, imgSrc]);

  return (
    <Box sx={{ padding: "20px" }}>
      {/* Title & Search Bar */}
      <PageTitleSection
        title="Create and Manage My Events"
        desc=""
      />

      {/* Event Banner Preview */}
      <Box
        sx={{
          width: "100%",
          height: { xs: '200px', sm: '250px', md: '320px' },
          borderRadius: "15px",
          overflow: "hidden",
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
          marginBottom: "20px",
          position: 'relative'
        }}
      >
        {eventLogo ? (
          <>
            {showCrop ? (
              <ReactCrop
                crop={crop}
                onChange={(c) => setCrop(c)}
                onComplete={handleCropComplete}
                aspect={16 / 9}
              >
                <img
                  ref={imgRef}
                  alt="Crop me"
                  src={imgSrc}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '320px',
                    display: 'block' // Ensure proper rendering
                  }}
                  onLoad={handleImageLoad}
                />
              </ReactCrop>
            ) : (
              <img
                key={eventLogo} // Force re-render when URL changes
                src={eventLogo}
                alt="Event Banner"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "bottom",
                  borderRadius: 3,
                  display: 'block' // Ensure proper rendering
                }}
              />
            )}

            <Box sx={{ position: 'absolute', top: 10, right: 10, display: 'flex', gap: 1 }}>
              <IconButton onClick={handleDownload} sx={{ backgroundColor: 'rgba(255,255,255,0.7)' }}>
                <DownloadIcon />
              </IconButton>
              {/* <IconButton onClick={handleToggleCrop} sx={{ backgroundColor: 'rgba(255,255,255,0.7)' }}>
                <CropIcon />
              </IconButton> */}
            </Box>
          </>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <HeadingCommon title="No Banner select" variant="body2" />
          </Box>
        )}
      </Box>

      {showCrop && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2, gap: 2 }}>
          <Button variant="contained" onClick={handleApplyCrop}>
            Apply Crop
          </Button>
          <Button variant="outlined" onClick={() => setShowCrop(false)}>
            Cancel
          </Button>
        </Box>
      )}

      {/* Hidden canvas for cropping preview */}
      <canvas
        ref={previewCanvasRef}
        style={{
          display: 'none',
          objectFit: 'contain',
          width: '100%',
          height: '320px',
        }}
      />

      {/* My section */}
      <EventInformation handleEventThemeLogo={handleEventThemeLogo} fileInputRef={fileInputRef} />

      {/* security & Confirmation */}
      <SecurityAndConfirmation />
    </Box>
  );
}
