import { useState, useRef, ChangeEvent } from 'react';
import {
  Box,
  Button,
  Typography,
  TextField,
  IconButton,
  Input,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Close';

export const EventCustomization = () => {
  const [sections, setSections] = useState([
    'Header',
    'Event Description',
    'Ticketing System',
    'Location',
    'Contact & Sharing',
  ]);
  const [newSection, setNewSection] = useState('');
  const [primaryColor, setPrimaryColor] = useState('#003366');
  const [secondaryColor, setSecondaryColor] = useState('#007bff');
  const [previewImage, setPreviewImage] = useState<string>('./assets/images/cover/6.png');
  const [eventLogoPreview, setEventLogoPreview] = useState<string>('./assets/images/cover/5.png');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const logoFileInputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEventLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSection = () => {
    if (newSection.trim() !== '') {
      setSections([...sections, newSection]);
      setNewSection('');
    }
  };

  const handleDeleteSection = (index: any) => {
    const updated = [...sections];
    updated.splice(index, 1);
    setSections(updated);
  };

  return (
    <Box
      boxShadow={3}
      borderRadius={3}
      p={{ xs: 2, sm: 3, md: 4 }}
      bgcolor="white"
      mt={3}
    >
      <Typography variant="h6" fontSize={{ xs: 15, sm: 20, md: 26 }} fontWeight={500} gutterBottom>
        Event Page Customization
      </Typography>

      {/* Theme Color Selection */}
      <Box mt={3}>
        <Typography variant="subtitle1" fontSize={{ xs: 12, sm: 16, md: 20 }} fontWeight={500}>
          Theme Color Selection
        </Typography>
        <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={4} mt={2}>
          <Box flex={1}>
            <Typography fontSize={{ xs: 12, sm: 14, md: 16 }} fontWeight={500}>Primary Color:</Typography>
            <input
              type="color"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              style={{ width: '100%', height: '40px', border: 'none' }}
            />
          </Box>
          <Box flex={1}>
            <Typography fontSize={{ xs: 12, sm: 14, md: 16 }} fontWeight={500}>Secondary Color:</Typography>
            <input
              type="color"
              value={secondaryColor}
              onChange={(e) => setSecondaryColor(e.target.value)}
              style={{ width: '100%', height: '40px', border: 'none' }}
            />
          </Box>
        </Box>
      </Box>

      {/* Background Image Upload */}
      <Box mt={4}>
        <Typography variant="subtitle1" fontSize={{ xs: 12, sm: 16, md: 20 }} fontWeight={500} gutterBottom>
          Background Image Upload
        </Typography>

        <Input
          type="file"
          fullWidth
          disableUnderline
          inputRef={fileInputRef}
          onChange={handleFileChange}
          inputProps={{ accept: 'image/*' }} // Only accept image files
          sx={{
            border: '1px solid #ccc',
            borderRadius: 1,
            padding: '8px',
            marginBottom: 2
          }}
        />

        <Box mt={2}>
          <img
            src={previewImage}
            alt="Background Preview"
            style={{
              width: '100%',
              borderRadius: 8,
              maxHeight: '300px',
              objectFit: 'cover'
            }}
          />
        </Box>
      </Box>

      {/* Event Logo Upload */}
      <Box mt={4}>
        <Typography variant="subtitle1" fontSize={{ xs: 12, sm: 16, md: 20 }} fontWeight={500} gutterBottom>
          Event Logo Upload
        </Typography>

        <Input
          type="file"
          fullWidth
          disableUnderline
          inputRef={logoFileInputRef}
          onChange={handleLogoFileChange}
          inputProps={{
            accept: 'image/*' // Only accept image files
          }}
          sx={{
            border: '1px solid #ccc',
            borderRadius: 1,
            padding: '8px',
            marginBottom: 2,
            '&:hover': {
              borderColor: '#000'
            }
          }}
        />

        <Box mt={2} maxWidth="200px">
          <img
            src={eventLogoPreview}
            alt="Logo Preview"
            style={{
              width: '100%',
              borderRadius: 8,
              aspectRatio: '1/1', // Ensures square shape
              objectFit: 'contain', // Keeps logo fully visible
              backgroundColor: '#f5f5f5', // Light background for visibility
              border: '1px solid #eee' // Subtle border
            }}
          />
        </Box>
      </Box>

      {/* Content Layout */}
      <Box mt={4}>
        <Typography variant="subtitle1" fontSize={{ xs: 12, sm: 16, md: 20 }} fontWeight={500} gutterBottom>
          Content Layout Customization
        </Typography>
        <Typography variant="body2" color="text.secondary" fontSize={{ xs: 12, sm: 14, md: 16 }} fontWeight={500}>
          Drag & Drop to rearrange sections:
        </Typography>
        <List>
          {sections.map((section, index) => (
            <ListItem
              key={index}
              sx={{
                border: '1px solid #ccc',
                borderRadius: 2,
                my: 1,
                px: 2,
                py: 1
              }}
              secondaryAction={
                <IconButton edge="end" onClick={() => handleDeleteSection(index)}>
                  <DeleteIcon color="error" />
                </IconButton>
              }
            >
              <ListItemText primary={section} />
            </ListItem>
          ))}
        </List>

        <Box
          mt={2}
          borderRadius={2}
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            border: '1px solid #ccc',
            overflow: 'hidden',
            width: '100%',
          }}
        >
          <TextField
            fullWidth
            placeholder="New Section Name"
            value={newSection}
            onChange={(e) => setNewSection(e.target.value)}
            variant="outlined"
            size="small"
            InputProps={{
              sx: {
                border: 'none',
                '& fieldset': { border: 'none' },
                borderRadius: 0,
                pl: 2,
              },
            }}
          />

          <Button
            onClick={handleAddSection}
            sx={{
              backgroundColor: '#072F4A',
              color: 'white',
              px: 3,
              borderRadius: 0,
              whiteSpace: 'nowrap',
              '&:hover': {
                backgroundColor: '#051F33',
              },
            }}
          >
            Add Section
          </Button>
        </Box>

      </Box>

      {/* Save Button */}
      <Box mt={4}>
        <Button
          fullWidth
          variant="contained"
          sx={{
            backgroundColor: '#072F4A',
            color: 'white',
            py: 1.5,
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 'bold',
          }}
        >
          Apply Changes
        </Button>
      </Box>
    </Box>
  );
};


