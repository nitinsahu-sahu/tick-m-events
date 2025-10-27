import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Grid, useMediaQuery, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { HeadingCommon } from 'src/components/multiple-responsive-heading/heading';
import { useFrame } from './view/FrameContext';

interface FilterCardProps {
  title: string;
  isVideoMode: boolean;
  onShare?: (img: string) => void;
  frameSize: { width: number; height: number };
}

export const FilterCard: React.FC<FilterCardProps> = ({ title, isVideoMode, onShare, frameSize }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const { selectedFrame } = useFrame();
  const [mode, setMode] = useState(isVideoMode ? 'video' : 'photo');
  const [selectedFilter, setSelectedFilter] = useState('none');
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [showFilterEdit, setShowFilterEdit] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startDrag, setStartDrag] = useState({ x: 0, y: 0 });
  const [currentCamera, setCurrentCamera] = useState<'user' | 'environment'>('user');

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoCanvasRef = useRef<HTMLCanvasElement>(null); // New canvas for video processing
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [recordedVideoURL, setRecordedVideoURL] = useState<string | null>(null);
  const [cameraRestartTrigger, setCameraRestartTrigger] = useState(0);
  const [isProcessingVideo, setIsProcessingVideo] = useState(false);

  // Responsive dimensions
  const previewWidth = isMobile ? 300 : isTablet ? 350 : 400;
  const previewHeight = isMobile ? 225 : isTablet ? 262 : 300;

  // Get available cameras and switch between them
  const switchCamera = async () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }

    const newCamera = currentCamera === 'user' ? 'environment' : 'user';
    setCurrentCamera(newCamera);

    // Restart camera with new facing mode
    setCameraRestartTrigger(prev => prev + 1);
  };

  // Start camera on mount and when restart is triggered
  useEffect(() => {
    const localVideoRef = videoRef.current;

    const constraints = {
      video: { 
        facingMode: currentCamera,
        width: { ideal: 1280 },
        height: { ideal: 720 }
      }, 
      audio: mode === 'video'
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        if (localVideoRef) {
          localVideoRef.srcObject = stream;
        }

        if (mode === 'video') {
          const recorder = new MediaRecorder(stream);
          recorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
              setRecordedChunks((prev) => [...prev, event.data]);
            }
          };
          recorder.onstop = () => {
            // Removed blob creation here
          };
          setMediaRecorder(recorder);
        }
      })
      .catch((err) => {
        console.error('Error accessing camera:', err);
        // Fallback to basic constraints if specific facing mode fails
        navigator.mediaDevices.getUserMedia({ video: true, audio: mode === 'video' })
          .then((stream) => {
            if (localVideoRef) {
              localVideoRef.srcObject = stream;
            }
          })
          .catch((fallbackErr) => {
            console.error('Fallback camera access failed:', fallbackErr);
          });
      });

    return () => {
      if (localVideoRef && localVideoRef.srcObject) {
        (localVideoRef.srcObject as MediaStream).getTracks().forEach((track) => track.stop());
      }
      setMediaRecorder(null);
      setRecordedChunks([]);
    };
  }, [mode, cameraRestartTrigger, currentCamera]);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (context && video.videoWidth > 0 && video.videoHeight > 0) {
        // Set canvas to match the display size
        canvas.width = previewWidth;
        canvas.height = previewHeight;
        
        // Calculate the aspect ratios
        const videoAspect = video.videoWidth / video.videoHeight;
        const canvasAspect = canvas.width / canvas.height;
        
        let renderWidth: number;
        let renderHeight: number;
        let offsetX: number;
        let offsetY: number;
        
        if (videoAspect > canvasAspect) {
          // Video is wider than canvas - fit to width
          renderWidth = canvas.width;
          renderHeight = renderWidth / videoAspect;
          offsetX = 0;
          offsetY = (canvas.height - renderHeight) / 2;
        } else {
          // Video is taller than canvas - fit to height
          renderHeight = canvas.height;
          renderWidth = renderHeight * videoAspect;
          offsetX = (canvas.width - renderWidth) / 2;
          offsetY = 0;
        }
        
        // Clear canvas and draw video frame maintaining aspect ratio
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(video, offsetX, offsetY, renderWidth, renderHeight);
        
        const imageData = canvas.toDataURL('image/png');
        setCapturedPhoto(imageData);
        
        // Reset zoom and center for editing
        setZoom(1);
        setOffset({ x: canvas.width / 2, y: canvas.height / 2 });
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
  
  const generateFinalImage = (): Promise<string | null> =>
    new Promise((resolve) => {
      if (!capturedPhoto || !canvasRef.current) {
        resolve(null);
        return;
      }

      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(null);
        return;
      }

      // Set canvas to high resolution for better quality
      const scaleFactor = 2; // Increase for higher quality
      canvas.width = previewWidth * scaleFactor;
      canvas.height = previewHeight * scaleFactor;

      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = capturedPhoto;

      img.onload = () => {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Apply the same transformations as in display
        const scaledWidth = previewWidth * zoom * scaleFactor;
        const scaledHeight = previewHeight * zoom * scaleFactor;
        const dx = (offset.x * scaleFactor) - scaledWidth / 2;
        const dy = (offset.y * scaleFactor) - scaledHeight / 2;

        // Apply filter
        ctx.filter = selectedFilter !== 'none' ? `${selectedFilter}(1)` : 'none';
        
        // Draw the image with the same transformations as display
        ctx.drawImage(img, dx, dy, scaledWidth, scaledHeight);

        if (selectedFrame) {
          const frameImg = new Image();
          frameImg.crossOrigin = 'anonymous';
          frameImg.src = selectedFrame;

          frameImg.onload = () => {
            ctx.filter = 'none';
            // Draw frame at high resolution
            ctx.drawImage(frameImg, 0, 0, canvas.width, canvas.height);
            const finalImage = canvas.toDataURL('image/png');
            resolve(finalImage);
          };
          
          frameImg.onerror = () => {
            // If frame fails to load, still return the image
            const finalImage = canvas.toDataURL('image/png');
            resolve(finalImage);
          };
        } else {
          const finalImage = canvas.toDataURL('image/png');
          resolve(finalImage);
        }
      };
      
      img.onerror = () => {
        resolve(null);
      };
    });

  const downloadImage = async () => {
    const finalImage = await generateFinalImage();
    if (!finalImage) return;

    const link = document.createElement('a');
    link.href = finalImage;
    link.download = 'framed-photo.png';
    link.click();
  };

  // Process video with frame
  const processVideoWithFrame = async (videoBlob: Blob): Promise<Blob> => 
    new Promise((resolve, reject) => {
      if (!selectedFrame || !videoCanvasRef.current) {
        resolve(videoBlob); // Return original if no frame selected
        return;
      }

      const video = document.createElement('video');
      const canvas = videoCanvasRef.current;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        resolve(videoBlob);
        return;
      }

      video.src = URL.createObjectURL(videoBlob);
      video.muted = true;
      
      const frameImg = new Image();
      frameImg.crossOrigin = 'anonymous';
      frameImg.src = selectedFrame;

      const chunks: Blob[] = [];
      let videoMediaRecorder: MediaRecorder;

      frameImg.onload = () => {
        video.onloadedmetadata = () => {
          // Set canvas size to match video
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;

          // Create a new MediaRecorder for the processed video
          const stream = canvas.captureStream(30); // 30 FPS
          videoMediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });

          videoMediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
              chunks.push(event.data);
            }
          };

          videoMediaRecorder.onstop = () => {
            const processedBlob = new Blob(chunks, { type: 'video/webm' });
            URL.revokeObjectURL(video.src);
            resolve(processedBlob);
          };

          videoMediaRecorder.start();

          // Process each frame
          const drawFrame = () => {
            if (video.paused || video.ended) {
              videoMediaRecorder.stop();
              return;
            }

            // Draw video frame
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            
            // Draw frame overlay
            ctx.drawImage(frameImg, 0, 0, canvas.width, canvas.height);

            requestAnimationFrame(drawFrame);
          };

          video.play();
          drawFrame();
        };
      };

      frameImg.onerror = () => {
        resolve(videoBlob); // Return original if frame fails to load
      };

      video.onerror = () => {
        reject(new Error('Video processing failed'));
      };
    });

  const handleSaveVideo = async () => {
    if (!recordedVideoURL) return;

    setIsProcessingVideo(true);
    try {
      // Fetch the recorded video blob
      const response = await fetch(recordedVideoURL);
      const videoBlob = await response.blob();

      // Process the video with frame
      const processedBlob = await processVideoWithFrame(videoBlob);

      // Create download link for processed video
      const url = URL.createObjectURL(processedBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `framed-video-${new Date().getTime()}.webm`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      // Clean up
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error processing video:', error);
      // Fallback to original video download
      const a = document.createElement('a');
      a.href = recordedVideoURL;
      a.download = `video-${new Date().getTime()}.webm`;
      a.click();
    } finally {
      setIsProcessingVideo(false);
    }
  };

  useEffect(() => {
    if (recordedChunks.length > 0 && mediaRecorder?.state !== 'recording') {
      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      setRecordedVideoURL(url);
    }
  }, [recordedChunks, mediaRecorder]);

  const handleRetake = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    
    setCapturedPhoto(null);
    setShowFilterEdit(false);
    setZoom(1);
    setOffset({ x: 0, y: 0 });
    setSelectedFilter('none');
    setCameraRestartTrigger(prev => prev + 1);
  };

  return (
    <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3,md:0 } }}>
      <Box
        sx={{
          backgroundColor: '#fff',
          borderRadius: 2.5,
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          p: { xs: 2, sm: 3 },
          minHeight: 500,
        }}
      >
        <HeadingCommon title={title} weight={600} baseSize="20px" />

        {/* Mode Switch and Camera Controls */}
        <Box sx={{ 
          display: 'flex', 
          gap: 2, 
          mb: 2, 
          justifyContent: 'center', 
          flexWrap: 'wrap',
          flexDirection: { xs: 'column', sm: 'row' }
        }}>
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
              minWidth: { xs: '100%', sm: 130 },
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
              minWidth: { xs: '100%', sm: 130 },
            }}
          >
            Video Mode
          </Button>
          
          {/* Camera Switch Button - Only show when not in captured photo mode */}
          {!capturedPhoto && (
            <Button
              onClick={switchCamera}
              variant="outlined"
              sx={{
                borderColor: '#0B2E4C',
                color: '#0B2E4C',
                borderRadius: 1,
                textTransform: 'none',
                minWidth: { xs: '100%', sm: 130 },
              }}
            >
              Switch Camera ({currentCamera === 'user' ? 'Front' : 'Back'})
            </Button>
          )}
        </Box>

        {/* Camera Preview or Captured Image */}
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          {capturedPhoto ? (
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                maxWidth: previewWidth,
                height: previewHeight,
                overflow: 'hidden',
                borderRadius: 2,
                cursor: capturedPhoto && showFilterEdit ? 'grab' : 'default',
                margin: '0 auto',
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
                  width: `${zoom * 100}%`,
                  height: `${zoom * 100}%`,
                  top: `${offset.y - (zoom * previewHeight) / 2}px`,
                  left: `${offset.x - (zoom * previewWidth) / 2}px`,
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
          ) : mode === 'video' && recordedVideoURL ? (
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                maxWidth: previewWidth,
                height: previewHeight,
                borderRadius: '12px',
                overflow: 'hidden',
                backgroundColor: '#000',
                margin: '0 auto',
              }}
            >
              <video
                src={recordedVideoURL}
                controls
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              >
                <track kind="captions" srcLang="en" label="English captions" />
              </video>

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
                    borderRadius: '12px',
                  }}
                />
              )}
            </Box>
          ) : (
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                maxWidth: previewWidth,
                height: previewHeight,
                borderRadius: '12px',
                overflow: 'hidden',
                backgroundColor: '#000',
                margin: '0 auto',
              }}
            >
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              >
                <track kind="captions" srcLang="en" label="English captions" />
              </video>

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
                    borderRadius: '12px',
                  }}
                />
              )}
            </Box>
          )}

          <canvas
            ref={canvasRef}
            width={previewWidth}
            height={previewHeight}
            style={{ display: 'none' }}
          />
          {/* Hidden canvas for video processing */}
          <canvas
            ref={videoCanvasRef}
            style={{ display: 'none' }}
          />
        </Box>

        {/* Filter Options */}
        {capturedPhoto && showFilterEdit && (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: 1, 
            mb: 2,
            flexWrap: 'wrap' 
          }}>
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
                  fontSize: { xs: '0.8rem', sm: '0.875rem' },
                }}
              >
                {filter}
              </Button>
            ))}
          </Box>
        )}
        
        {capturedPhoto && showFilterEdit && (
          <Box sx={{ 
            textAlign: 'center', 
            m: 1, 
            color: '#666', 
            fontSize: { xs: 12, sm: 14 } 
          }}>
            Use your mouse wheel to zoom in/out. Click and drag to reposition the photo.
          </Box>
        )}

        {/* Action Buttons */}
        <Grid container spacing={2} justifyContent="center">
          {mode === 'photo' && !capturedPhoto ? (
            <Grid item xs={12} sm={6} md={4}>
              <Button
                onClick={handleCapture}
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: '#0B2E4C',
                  borderRadius: 1,
                  textTransform: 'none',
                  py: 1.2,
                }}
              >
                Capture
              </Button>
            </Grid>
          ) : mode === 'video' ? (
            <>
              <Box sx={{ textAlign: 'center', mb: 2, width: '100%' }}>
                {recordedVideoURL ? (
                  <>
                    <Box
                      sx={{
                        position: 'relative',
                        width: '100%',
                        maxWidth: previewWidth,
                        height: previewHeight,
                        borderRadius: '12px',
                        overflow: 'hidden',
                        backgroundColor: '#000',
                        margin: '0 auto',
                        mt: { xs: 2, sm: 2, md: 2 },
                      }}
                    >
                      <video
                        src={recordedVideoURL}
                        controls
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      >
                        <track kind="captions" srcLang="en" label="English captions" />
                      </video>

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
                            borderRadius: '12px',
                          }}
                        />
                      )}
                    </Box>

                    <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
                      <Grid item xs={12} sm={6} md={4}>
                        <Button
                          fullWidth
                          onClick={handleSaveVideo}
                          variant="contained"
                          disabled={isProcessingVideo}
                          sx={{ 
                            backgroundColor: '#0B2E4C', 
                            borderRadius: 1, 
                            textTransform: 'none',
                            py: 1.2,
                          }}
                        >
                          {isProcessingVideo ? 'Processing...' : 'Save Video'}
                        </Button>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <Button
                          fullWidth
                          onClick={() => {
                            setRecordedChunks([]);
                            setRecordedVideoURL(null);
                          }}
                          variant="outlined"
                          sx={{ 
                            borderColor: '#0B2E4C', 
                            color: '#0B2E4C', 
                            borderRadius: 1, 
                            textTransform: 'none',
                            py: 1.2,
                          }}
                        >
                          Retake
                        </Button>
                      </Grid>
                    </Grid>
                  </>
                ) : (
                  <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12} sm={6} md={4}>
                      <Button
                        onClick={() => {
                          if (mediaRecorder && mediaRecorder.state !== 'recording') {
                            setRecordedChunks([]);
                            mediaRecorder.start();
                          }
                        }}
                        disabled={!mediaRecorder || mediaRecorder.state === 'recording'}
                        variant="contained"
                        fullWidth
                        sx={{ 
                          backgroundColor: '#0B2E4C', 
                          borderRadius: 1, 
                          textTransform: 'none',
                          py: 1.2,
                          mt:1,
                        }}
                      >
                        Start Recording
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <Button
                        onClick={() => mediaRecorder?.state === 'recording' && mediaRecorder.stop()}
                        disabled={!mediaRecorder || mediaRecorder.state !== 'recording'}
                        variant="outlined"
                        fullWidth
                        sx={{ 
                          borderColor: '#0B2E4C', 
                          color: '#0B2E4C', 
                          borderRadius: 1, 
                          textTransform: 'none',
                          py: 1.2,
                           mt:1,
                        }}
                      >
                        Stop Recording
                      </Button>
                    </Grid>
                  </Grid>
                )}
              </Box>
            </>
          ) : (
            <>
              <Grid item xs={12} sm={6} md={4}>
                <Button
                  fullWidth
                  onClick={downloadImage}
                  variant="contained"
                  sx={{
                    backgroundColor: '#0B2E4C',
                    borderRadius: 1,
                    textTransform: 'none',
                    py: 1.2,
                  }}
                >
                  Save Photo
                </Button>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Button
                  fullWidth
                  onClick={handleRetake}
                  variant="outlined"
                  sx={{
                    borderColor: '#0B2E4C',
                    color: '#0B2E4C',
                    borderRadius: 1,
                    textTransform: 'none',
                    py: 1.2,
                  }}
                >
                  Retake
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </Box>
    </Container>
  );
};