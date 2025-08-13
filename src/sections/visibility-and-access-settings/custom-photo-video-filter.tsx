import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  Grid,
  Button,
  Input,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { toast } from 'react-toastify';
import axios from "../../redux/helper/axios";


interface SocialPlatforms {
  facebook: boolean;
  instagram: boolean;
  tiktok: boolean;
  whatsapp: boolean;
  // Add other platforms if needed
}

export const CustomPhotoVideoFilter = ({ __events }: any) => {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [filterImages, setFilterImages] = useState<string[]>([
    '/assets/images/cover/7.png',
    '/assets/images/cover/8.png',
    '/assets/images/cover/9.png',
    '/assets/images/cover/10.png',
  ]);
  const [frameAspectRatio, setFrameAspectRatio] = useState<number | null>(null);
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);
  const [selectedSocial, setSelectedSocial] = useState<SocialPlatforms>({
    facebook: false,
    instagram: false,
    tiktok: false,
    whatsapp: false,
  });

  // const handleSocialChange = (event: any) => {
  //   setSelectedSocial({
  //     ...selectedSocial,
  //     [event.target.name]: event.target.checked,
  //   });
  // };
  useEffect(() => {
    // If photoFrame exists, use its frameUrls, otherwise use empty list
    if (__events?.photoFrame?.frameUrls?.length) {
      setFilterImages(__events.photoFrame.frameUrls);
    } else {
      setFilterImages([]);
    }

    // Also reset selected filter
    setSelectedFilter(null);
  }, [__events?.photoFrame]);

  const checkImageTransparency = (file: File): Promise<boolean> =>
    new Promise((resolve) => {
      const img = new Image();
      img.onload = function () {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          resolve(false);
          return;
        }

        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

        for (let i = 3; i < imageData.length; i += 4) {
          if (imageData[i] < 255) {
            resolve(true); // Transparent pixel found
            return;
          }
        }

        resolve(false); // No transparency
      };

      img.src = URL.createObjectURL(file);
    });


  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const fileArray = Array.from(files);

    const results = await Promise.all(
      fileArray.map(async (file) => {
        if (file.type !== "image/png") {
          toast.warning(`${file.name} is not a PNG file and not transparent.`);
          return null;
        }

        const isTransparent = await checkImageTransparency(file);
        if (!isTransparent) {
          toast.warning(`${file.name} is not transparent.`);
          return null;
        }

        return file; // valid PNG with transparency
      })
    );

    const validTransparentPngs = results.filter((file): file is File => file !== null);

    if (validTransparentPngs.length === 0) return;

    // Update state
    setFilesToUpload((prev) => [...prev, ...validTransparentPngs]);

    const newPreviewUrls = validTransparentPngs.map((file) =>
      URL.createObjectURL(file)
    );
    setFilterImages((prev) => [...prev, ...newPreviewUrls]);

    // Optional reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };


  const eventCoverImage = __events?.customization?.eventLogo?.url || '/assets/images/cover/1.png';

  const handleApplyFilter = async () => {
    if (!__events?._id) {
      toast.warning("Please select an event before applying.");
      return;
    }

    if (filesToUpload.length === 0) {
      toast.warning("Please select filter images to apply.");
      return;
    }

    try {
      const uploadedUrls: string[] = [];

      await Promise.all(filesToUpload.map(async (file) => {
        const formData = new FormData();
        formData.append("eventId", __events?._id);
        formData.append("frame", file);

        try {
          const response = await axios.post("/custom-frame/save-frame", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });

          if (response.status === 200 || response.status === 201) {
            toast.success("Frame saved successfully!");
            const frameData = response.data?.data;
            const latestUrl = frameData?.frameUrls?.slice(-1)[0]; // Get the newest added URL
            if (latestUrl) uploadedUrls.push(latestUrl);
          } else {
            toast.error("Failed to upload frame.");
          }

        } catch (err: any) {
          const backendMessage = err?.response?.data?.message || "Upload failed.";
          toast.error(backendMessage);
        }
      }));

      // Add real URLs to preview grid
      setFilterImages((prev) => [...prev, ...uploadedUrls]);

      // Clear uploaded files
      setFilesToUpload([]);

    } catch (error) {
      toast.error("Upload failed. Try again.");
      console.error(error);
    }
  };
  const applySelectedFilter = async () => {
    if (!__events?._id) {
      toast.warning("Please select an event before applying.");
      return;
    }
    if (!selectedFilter) {
      toast.warning("Please select a filter template.");
      return;
    }

    try {
      const response = await axios.put('/custom-frame/select-frame', {
        eventId: __events?._id,
        selectedFrameUrl: selectedFilter,
      });

      if (response.status === 200) {
        toast.success("Selected filter applied successfully!");
      } else {
        toast.error("Failed to apply selected filter.");
      }
    } catch (err: any) {
      const backendMessage = err?.response?.data?.message || "Applying filter failed.";
      toast.error(backendMessage);
    }
  };

  return (
    <Box boxShadow={3} borderRadius={3} p={{ xs: 2, sm: 3, md: 4 }} bgcolor="white" mt={3}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h6" fontSize={{ xs: 15, sm: 20, md: 26 }} fontWeight={500}>
          Custom Photo & Video Filters
        </Typography>
      </Box>
      {/* Enable Checkbox */}
      <Box mb={2}>
        <FormControlLabel
          control={<Checkbox />}
          label="Enable Custom Filters"
        />
      </Box>

      {/* Filter Templates */}
      <Box mb={3}>
        <Typography variant="subtitle1" fontSize={{ xs: 12, sm: 16, md: 20 }} fontWeight={500} gutterBottom>
          Choose Filter Template
        </Typography>
        <Grid container spacing={2}>


          <Grid container spacing={2}>
            {filterImages.map((filename, index) => (
              <Grid item xs={6} sm={3} mt={3} key={index}>
                <Box
                  sx={{
                    position: 'relative',
                    borderRadius: 2,
                    overflow: 'hidden',
                    border: selectedFilter === filename ? '3px solid #0B2E4C' : 'none',
                    cursor: 'pointer',
                  }}
                >
                  <Box
                    onClick={async (e) => {
                      e.stopPropagation();
                      const isUploadedUrl = filename.startsWith('http') || filename.includes('/uploads/');
                      if (isUploadedUrl && __events?._id) {
                        try {
                          const res = await axios.delete("/custom-frame/delete-frame", {
                            params: {
                              eventId: __events?._id,
                              frameUrl: filename,
                            },
                          });
                          if (res.status === 200) {
                            toast.success("Filter deleted .");
                          } else {
                            toast.error("Failed to delete filter.");
                          }
                        } catch (error) {
                          toast.error("Error deleting filter.");
                          console.error(error);
                        }
                      }

                      setFilterImages((prev) => prev.filter((_, i) => i !== index));
                      const updatedFiles = [...filesToUpload];
                      updatedFiles.splice(index, 1);
                      setFilesToUpload(updatedFiles);

                      if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                      }

                      if (selectedFilter === filename) {
                        setSelectedFilter(null);
                      }
                    }}
                    sx={{
                      position: 'absolute',
                      top: 5,
                      right: 5,
                      background: '#fff',
                      borderRadius: '50%',
                      width: 24,
                      height: 24,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      color: '#333',
                      zIndex: 3,
                      cursor: 'pointer',
                      boxShadow: 1,
                    }}
                  >
                    ×
                  </Box>

                  {/* Image */}
                  <Box onClick={() => setSelectedFilter(filename)}>
                    <img
                      src={filename}
                      alt={`Filter ${index + 1}`}
                      style={{ width: '100%', height: 'auto' }}
                    />
                  </Box>
                </Box>
              </Grid>
            ))}

          </Grid>

        </Grid>
      </Box>

      {/* Upload Custom Filter */}
      <Box mb={3}>
        <Typography variant="subtitle1" fontSize={{ xs: 12, sm: 16, md: 20 }} fontWeight={500} gutterBottom>
          Upload Custom Filter
        </Typography>

        {/* 🆕 Instruction Text */}
        <Typography
          variant="body2"
          color="text.secondary"
          fontSize={{ xs: 12, sm: 14 }}
          mb={1}
        >
          Please upload <strong>PNG images with a transparent background</strong>.
        </Typography>

        <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2} alignItems="center">
          <Input
            inputRef={fileInputRef}
            type="file"
            inputProps={{ multiple: true }}
            onChange={handleFileUpload}
            disableUnderline
            sx={{ border: "1px solid black", padding: "8px", borderRadius: 2 }}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#0B2E4C",
              color: "#fff",
              padding: "11px",
              width: "70%",
            }}
            onClick={handleApplyFilter}
          >
            Apply Upload Filter
          </Button>
        </Box>
      </Box>

      {/* Live Preview */}
      <Box mb={3}>
        <Typography
          variant="subtitle1"
          fontSize={{ xs: 12, sm: 16, md: 20 }}
          fontWeight={500}
          gutterBottom
        >
          Live Preview
        </Typography>

        <Box
          bgcolor="#E5E5E5"
          borderRadius={2}
          display="flex"
          justifyContent="center"
          alignItems="center"
          position="relative"
          overflow="hidden"
          sx={{
            aspectRatio: frameAspectRatio ? `${frameAspectRatio}` : '1 / 1',
            maxWidth: 320,
            mx: 'auto',
            width: '100%',
          }}
        >

          {selectedFilter ? (
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: '100%',
                maxWidth: 300,
                maxHeight: 300,
              }}
            >
              <img
                src={eventCoverImage}
                alt="Base Preview"
                style={{
                  width: '45%',
                  height: '70%',
                  objectFit: 'cover',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 1,
                }}
              />

              {/* Frame overlay */}
              <img
                src={selectedFilter}
                alt="Frame Overlay"
                onLoad={(e) => {
                  const img = e.currentTarget;
                  const ratio = img.naturalWidth / img.naturalHeight;
                  setFrameAspectRatio(ratio);
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  zIndex: 2,
                  pointerEvents: 'none',
                }}
              />

            </Box>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No filter selected
            </Typography>
          )}
        </Box>
      </Box>
      <Button
        fullWidth
        variant="contained"
        sx={{
          backgroundColor: '#072F4A',
          color: 'white',
          py: 1.5,
          borderRadius: 3,
          textTransform: 'none',
          fontWeight: 'bold',
        }}
        onClick={applySelectedFilter}
      >
        Apply Filters
      </Button>
    </Box>
  );
};