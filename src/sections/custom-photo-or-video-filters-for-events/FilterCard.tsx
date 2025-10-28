import React, { useEffect, useRef, useState } from 'react';
import { Box, IconButton } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import VideocamIcon from '@mui/icons-material/Videocam';
import FlipCameraIosIcon from '@mui/icons-material/FlipCameraIos';
import ReplayIcon from '@mui/icons-material/Replay';
import SaveIcon from '@mui/icons-material/Save';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import StopIcon from '@mui/icons-material/Stop';

import { useFrame } from './view/FrameContext';


interface FilterCardProps {
  title: string;
  isVideoMode: boolean;
  onShare?: (img: string) => void;
  frameSize: { width: number; height: number };
}

export const FilterCard: React.FC<FilterCardProps> = ({ title, isVideoMode, onShare, frameSize }) => {
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
  const videoCanvasRef = useRef<HTMLCanvasElement>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [recordedVideoURL, setRecordedVideoURL] = useState<string | null>(null);
  const [cameraRestartTrigger, setCameraRestartTrigger] = useState(0);
  const [isProcessingVideo, setIsProcessingVideo] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  // Full screen dimensions
  const fullScreenStyle = {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 9999,
  };

  // Get available cameras and switch between them
  const switchCamera = async () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }

    const newCamera = currentCamera === 'user' ? 'environment' : 'user';
    setCurrentCamera(newCamera);
    setCameraRestartTrigger(prev => prev + 1);
  };

  // Start camera on mount and when restart is triggered
  useEffect(() => {
    const localVideoRef = videoRef.current;

    const constraints = {
      video: { 
        facingMode: currentCamera,
        width: { ideal: 1920 },
        height: { ideal: 1080 }
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
          const recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
          recorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
              setRecordedChunks((prev) => [...prev, event.data]);
            }
          };
          recorder.onstop = () => {
            // Recording stopped handler
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
    };
  }, [mode, cameraRestartTrigger, currentCamera]);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (context && video.videoWidth > 0 && video.videoHeight > 0) {
        // Set canvas to match video resolution for high quality
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // Draw video frame
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const imageData = canvas.toDataURL('image/png');
        setCapturedPhoto(imageData);
        
        // Reset zoom and center for editing
        setZoom(1);
        setOffset({ x: canvas.width / 2, y: canvas.height / 2 });
        setShowFilterEdit(true);
      }
    }
  };

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

      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = capturedPhoto;

      img.onload = () => {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Apply the same transformations as in display
        const scaledWidth = canvas.width * zoom;
        const scaledHeight = canvas.height * zoom;
        const dx = offset.x - scaledWidth / 2;
        const dy = offset.y - scaledHeight / 2;

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
            // Draw frame
            ctx.drawImage(frameImg, 0, 0, canvas.width, canvas.height);
            const finalImage = canvas.toDataURL('image/png');
            resolve(finalImage);
          };
          
          frameImg.onerror = () => {
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
        resolve(videoBlob);
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
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;

          const stream = canvas.captureStream(30);
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

          const drawFrame = () => {
            if (video.paused || video.ended) {
              videoMediaRecorder.stop();
              return;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            ctx.drawImage(frameImg, 0, 0, canvas.width, canvas.height);

            requestAnimationFrame(drawFrame);
          };

          video.play();
          drawFrame();
        };
      };

      frameImg.onerror = () => {
        resolve(videoBlob);
      };

      video.onerror = () => {
        reject(new Error('Video processing failed'));
      };
    });

  const handleSaveVideo = async () => {
    if (!recordedVideoURL) return;

    setIsProcessingVideo(true);
    try {
      const response = await fetch(recordedVideoURL);
      const videoBlob = await response.blob();

      const processedBlob = await processVideoWithFrame(videoBlob);

      const url = URL.createObjectURL(processedBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `framed-video-${new Date().getTime()}.webm`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error processing video:', error);
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
    setRecordedVideoURL(null);
    setRecordedChunks([]);
    setIsRecording(false);
    setCameraRestartTrigger(prev => prev + 1);
  };

  const startRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== 'recording') {
      setRecordedChunks([]);
      mediaRecorder.start();
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder?.state === 'recording') {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  return (
    <Box sx={fullScreenStyle}>
      {/* Header with minimal controls */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10000,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%)',
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <IconButton
          onClick={() => setMode(mode === 'photo' ? 'video' : 'photo')}
          sx={{
            color: 'white',
            backgroundColor: 'rgba(255,255,255,0.2)',
            '&:hover': { backgroundColor: 'rgba(255,255,255,0.3)' }
          }}
        >
          {mode === 'photo' ? <VideocamIcon /> : <CameraAltIcon />}
        </IconButton>

        <IconButton
          onClick={switchCamera}
          sx={{
            color: 'white',
            backgroundColor: 'rgba(255,255,255,0.2)',
            '&:hover': { backgroundColor: 'rgba(255,255,255,0.3)' }
          }}
        >
          <FlipCameraIosIcon />
        </IconButton>
      </Box>

      {/* Camera Preview or Captured Content */}
      <Box sx={{ 
        width: '100%', 
        height: '100%', 
        backgroundColor: '#000',
        position: 'relative'
      }}>
        {capturedPhoto ? (
          <Box
            sx={{
              width: '100%',
              height: '100%',
              position: 'relative',
              overflow: 'hidden',
              cursor: showFilterEdit ? 'grab' : 'default',
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
                top: `${offset.y - (zoom * 100) / 2}%`,
                left: `${offset.x - (zoom * 100) / 2}%`,
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
                }}
              />
            )}
          </Box>
        ) : mode === 'video' && recordedVideoURL ? (
          <Box
            sx={{
              width: '100%',
              height: '100%',
              position: 'relative',
              backgroundColor: '#000',
            }}
          >
            <video
              src={recordedVideoURL}
              controls
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            >
              <track kind="captions" src="" srcLang="en" label="English" />
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
                }}
              />
            )}
          </Box>
        ) : (
          <Box
            sx={{
              width: '100%',
              height: '100%',
              position: 'relative',
              backgroundColor: '#000',
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
              <track kind="captions" src="" srcLang="en" label="English" />
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
                }}
              />
            )}
          </Box>
        )}

        <canvas
          ref={canvasRef}
          style={{ display: 'none' }}
        />
        <canvas
          ref={videoCanvasRef}
          style={{ display: 'none' }}
        />
      </Box>

      {/* Bottom Controls */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 10000,
          background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%)',
          p: 3,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 3
        }}
      >
        {mode === 'photo' && !capturedPhoto ? (
          <IconButton
            onClick={handleCapture}
            sx={{
              width: 70,
              height: 70,
              backgroundColor: 'white',
              '&:hover': { backgroundColor: '#f0f0f0' },
              border: '2px solid white'
            }}
          >
            <CameraAltIcon sx={{ fontSize: 30, color: 'black' }} />
          </IconButton>
        ) : mode === 'video' ? (
          recordedVideoURL ? (
            <>
              <IconButton
                onClick={handleSaveVideo}
                disabled={isProcessingVideo}
                sx={{
                  color: 'white',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.3)' }
                }}
              >
                <SaveIcon />
              </IconButton>
              <IconButton
                onClick={handleRetake}
                sx={{
                  color: 'white',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.3)' }
                }}
              >
                <ReplayIcon />
              </IconButton>
            </>
          ) : (
            <IconButton
              onClick={isRecording ? stopRecording : startRecording}
              sx={{
                width: 70,
                height: 70,
                backgroundColor: isRecording ? '#ff4444' : 'white',
                '&:hover': { 
                  backgroundColor: isRecording ? '#ff6666' : '#f0f0f0' 
                },
                border: '2px solid white',
                animation: isRecording ? 'pulse 1s infinite' : 'none',
                '@keyframes pulse': {
                  '0%': { transform: 'scale(1)' },
                  '50%': { transform: 'scale(1.1)' },
                  '100%': { transform: 'scale(1)' }
                }
              }}
            >
              {isRecording ? (
                <StopIcon sx={{ fontSize: 30, color: 'white' }} />
              ) : (
                <FiberManualRecordIcon sx={{ fontSize: 30, color: 'red' }} />
              )}
            </IconButton>
          )
        ) : (
          <>
            <IconButton
              onClick={downloadImage}
              sx={{
                color: 'white',
                backgroundColor: 'rgba(255,255,255,0.2)',
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.3)' }
              }}
            >
              <SaveIcon />
            </IconButton>
            <IconButton
              onClick={handleRetake}
              sx={{
                color: 'white',
                backgroundColor: 'rgba(255,255,255,0.2)',
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.3)' }
              }}
            >
              <ReplayIcon />
            </IconButton>
          </>
        )}
      </Box>

      {/* Instructions for photo editing */}
      {capturedPhoto && showFilterEdit && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 100,
            left: 0,
            right: 0,
            textAlign: 'center',
            color: 'white',
            fontSize: 14,
            backgroundColor: 'rgba(0,0,0,0.5)',
            py: 1,
            zIndex: 10000
          }}
        >
          Pinch to zoom • Drag to reposition
        </Box>
      )}
    </Box>
  );
};