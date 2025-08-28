import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Grid, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { HeadingCommon } from 'src/components/multiple-responsive-heading/heading';
import { useFrame } from './view/FrameContext';

interface FilterCardProps {
  title: string;
  isVideoMode: boolean;
}

export const FilterCard: React.FC<FilterCardProps> = ({ title, isVideoMode }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { selectedFrame } = useFrame();
  const [mode, setMode] = useState(isVideoMode ? 'video' : 'photo');
  const [selectedFilter, setSelectedFilter] = useState('none');
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [showFilterEdit, setShowFilterEdit] = useState(false);
  const [zoom, setZoom] = useState(1); // Default zoom
  const [offset, setOffset] = useState({ x: 0, y: 0 }); // For dragging
  const [isDragging, setIsDragging] = useState(false);
  const [startDrag, setStartDrag] = useState({ x: 0, y: 0 });

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Start camera on mount
  useEffect(() => {
    const localVideoRef = videoRef.current;

    if (mode === 'photo') {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (localVideoRef) {
            localVideoRef.srcObject = stream;
          }
        })
        .catch((err) => {
          console.error('Error accessing camera:', err);
        });
    }

    return () => {
      if (localVideoRef && localVideoRef.srcObject) {
        (localVideoRef.srcObject as MediaStream)
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, [mode]);


  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        context.drawImage(videoRef.current, 0, 0, 400, 300);
        const imageData = canvasRef.current.toDataURL('image/png');
        setCapturedPhoto(imageData);
        // Auto-center on capture
        setOffset({ x: 200, y: 150 }); // Half of canvas width/height
        setZoom(1); // Reset zoom

        setShowFilterEdit(true);
      }
    }
  };

  const filters = ['none', 'sepia', 'grayscale', 'blur'];
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartDrag({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const dx = e.clientX - startDrag.x;
      const dy = e.clientY - startDrag.y;
      setStartDrag({ x: e.clientX, y: e.clientY });
      setOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    const delta = -e.deltaY;
    setZoom((prev) => Math.max(0.5, Math.min(3, prev + delta * 0.001)));
  };

  const downloadImage = () => {
    if (!capturedPhoto || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    // Clear canvas first
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Create photo image
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = capturedPhoto;
    img.onload = () => {
      // Apply zoom and offset by drawing scaled and moved image
      const scaledWidth = 400 * zoom;
      const scaledHeight = 300 * zoom;
      const dx = offset.x - scaledWidth / 2;
      const dy = offset.y - scaledHeight / 2;

      // Draw photo with zoom and position
      ctx.filter = selectedFilter !== 'none' ? `${selectedFilter}(1)` : 'none';
      ctx.drawImage(img, dx, dy, scaledWidth, scaledHeight);

      // Overlay frame (if any)
      if (selectedFrame) {
        const frameImg = new Image();
        frameImg.crossOrigin = 'anonymous'; 
        frameImg.src = selectedFrame;
        frameImg.onload = () => {
          ctx.filter = 'none';
          ctx.drawImage(frameImg, 0, 0, 400, 300);

          // Export and download
          const finalImage = canvas.toDataURL('image/png');
          const link = document.createElement('a');
          link.href = finalImage;
          link.download = 'framed-photo.png';
          link.click();
        };
      } else {
        // If no frame, just download the photo
        const finalImage = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = finalImage;
        link.download = 'photo.png';
        link.click();
      }
    };
  };

  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        borderRadius: 2.5,
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        p: 3,
        minHeight: 500,
      }}
    >
      <HeadingCommon title={title} weight={600} baseSize="20px" />

      {/* Mode Switch */}
      <Box sx={{ display: 'flex', gap: 2, mb: 2, justifyContent: 'center' }}>
        <Button
          variant={mode === 'photo' ? 'contained' : 'outlined'}
          onClick={() => {
            setMode('photo');
            setCapturedPhoto(null);
            setShowFilterEdit(false);
          }}
          sx={{
            backgroundColor: mode === 'photo' ? '#0B2E4C' : 'transparent',
            color: mode === 'photo' ? '#fff' : '#0B2E4C',
            borderColor: '#0B2E4C',
            borderRadius: 1,
            textTransform: 'none',
            minWidth: 130,
          }}
        >
          Photo Mode
        </Button>
        <Button
          variant={mode === 'video' ? 'contained' : 'outlined'}
          onClick={() => setMode('video')}
          sx={{
            backgroundColor: mode === 'video' ? '#0B2E4C' : 'transparent',
            color: mode === 'video' ? '#fff' : '#0B2E4C',
            borderColor: '#0B2E4C',
            borderRadius: 1,
            textTransform: 'none',
            minWidth: 130,
          }}
        >
          Video Mode
        </Button>
      </Box>

      {/* Camera Preview or Captured Image */}
      <Box sx={{ textAlign: 'center', mb: 2 }}>
        {capturedPhoto ? (
          <Box
            sx={{
              position: 'relative',
              width: isMobile ? '100%' : 400,
              height: 300,
              overflow: 'hidden',
              borderRadius: 2,
              cursor: capturedPhoto && showFilterEdit ? 'grab' : 'default',
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
          >
            {/* Photo as background */}
            <Box
              sx={{
                position: 'absolute',
                width: `${zoom * 400}px`,
                height: `${zoom * 300}px`,
                top: `${offset.y - (zoom * 300) / 2}px`,
                left: `${offset.x - (zoom * 400) / 2}px`,
                backgroundImage: `url(${capturedPhoto})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: selectedFilter !== 'none' ? `${selectedFilter}(1)` : 'none',
                pointerEvents: 'none',
              }}
            />
            {/* Frame overlay */}
            {selectedFrame && (
              <Box
                component="img"
                src={selectedFrame}
                alt="Frame"
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  pointerEvents: 'none',
                  borderRadius: 2,
                }}
              />
            )}
          </Box>


        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            style={{
              width: isMobile ? '100%' : 400,
              height: 300,
              borderRadius: '12px',
              backgroundColor: '#000',
            }}
          >
            <track kind="captions" srcLang="en" label="English captions" />
          </video>

        )}

        <canvas
          ref={canvasRef}
          width={400}
          height={300}
          style={{ display: 'none' }}
        />
      </Box>

      {/* Filter Options */}
      {capturedPhoto && showFilterEdit && (
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 2 }}>
          {filters.map((filter) => (
            <Button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              variant={selectedFilter === filter ? 'contained' : 'outlined'}
              sx={{
                textTransform: 'none',
                borderRadius: 1,
                px: 2,
                py: 0.5,
                backgroundColor: selectedFilter === filter ? '#0B2E4C' : '#fff',
                color: selectedFilter === filter ? '#fff' : '#000',
                borderColor: '#0B2E4C',
              }}
            >
              {filter}
            </Button>
          ))}
        </Box>
      )}
      {capturedPhoto && showFilterEdit && (
        <Box sx={{ textAlign: 'center', m: 1, color: '#666', fontSize: 14 }}>
          Use your mouse wheel to zoom in/out. Click and drag to reposition the photo.
        </Box>
      )}


      {/* Action Buttons */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Button
            fullWidth
            onClick={handleCapture}
            disabled={mode !== 'photo'}
            variant="contained"
            sx={{
              backgroundColor: '#0B2E4C',
              borderRadius: 1,
              textTransform: 'none',
            }}
          >
            Capture
          </Button>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Button
            fullWidth
            onClick={() => setShowFilterEdit(true)}
            disabled={!capturedPhoto}
            variant="contained"
            sx={{
              backgroundColor: '#0B2E4C',
              borderRadius: 1,
              textTransform: 'none',
            }}
          >
            Edit Filters
          </Button>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Button
            fullWidth
            disabled={!capturedPhoto}
            variant="contained"
            sx={{
              backgroundColor: '#0B2E4C',
              borderRadius: 1,
              textTransform: 'none',
            }}
          >
            Share
          </Button>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button
            fullWidth
            onClick={downloadImage}
            disabled={!capturedPhoto}
            variant="contained"
            sx={{
              backgroundColor: '#0B2E4C',
              borderRadius: 1,
              textTransform: 'none',
            }}
          >
            Save Image
          </Button>
        </Grid>

      </Grid>
    </Box>
  );
};
