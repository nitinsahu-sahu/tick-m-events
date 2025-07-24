import React from "react";
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
  InputLabel,
  Select,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { ServiceRequestTable } from "src/components/tables/service-request-table";

interface FormData {
  service: string;
  location: string;
  dateTime: string;
  budget: string;
  description: string;
  additionalOptions: string;
  file: File | null;
}

export function RequestAService({ requests }: any) {
  const [formData, setFormData] = React.useState<FormData>({
    service: "",
    location: "",
    dateTime: "",
    budget: "",
    description: "",
    additionalOptions: "",
    file: null,
  });

  const [previewOpen, setPreviewOpen] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    // Here you would typically send the data to your backend
    console.log({
      ...formData,
      file: formData.file ? formData.file.name : null,
    });

    setPreviewOpen(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData(prev => ({
        ...prev,
        file: e.target.files![0]
      }));
    }
  };

  return (
    <Box
      sx={{
        p: 3,
        my: 3,
        borderRadius: 3,
        backgroundColor: "#fff",
        border: "1px solid #E0E0E0",
        boxShadow: 3,
        mx: "auto",
      }}
    >
      <Typography variant="h6" gutterBottom>
          Finalize Contract
        </Typography>
        <ServiceRequestTable
          requests={requests}
          onActionClick={(row) => {
            console.log("Clicked row:", row);
          }}
          type="2"
        />

      <Typography variant="h6" gutterBottom>
        Service Request Form
      </Typography>

      {/* Type of Service */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Type of Service Needed</InputLabel>
        <Select
          value={formData.service}
          onChange={(e) => setFormData(prev => ({ ...prev, service: e.target.value }))}
          label="Type of Service Needed"
        >
          <MenuItem value="photography">Photography</MenuItem>
          <MenuItem value="catering">Catering</MenuItem>
          <MenuItem value="decoration">Decoration</MenuItem>
        </Select>
      </FormControl>

      {/* Event Location */}
      <TextField
        fullWidth
        label="Event Location"
        margin="normal"
        name="location"
        value={formData.location}
        onChange={handleChange}
      />

      {/* Date & Time */}
      <TextField
        fullWidth
        type="datetime-local"
        margin="normal"
        name="dateTime"
        value={formData.dateTime}
        onChange={handleChange}
      />

      {/* Estimated Budget */}
      <TextField
        fullWidth
        label="Estimated Budget"
        margin="normal"
        name="budget"
        value={formData.budget}
        onChange={handleChange}
      />

      {/* Full Description */}
      <TextField
        fullWidth
        label="Full Description of Requirements"
        multiline
        rows={4}
        margin="normal"
        name="description"
        value={formData.description}
        onChange={handleChange}
      />

      {/* File Upload */}
      <Button component="label" variant="outlined" sx={{ mt: 2 }}>
        Choose File
        <input type="file" hidden onChange={handleFileChange} />
      </Button>
      {formData.file && (
        <Typography variant="body2" sx={{ mt: 1 }}>
          Selected: {formData.file.name}
        </Typography>
      )}

      {/* Additional Options */}
      <TextField
        fullWidth
        label="Additional Options"
        multiline
        rows={3}
        margin="normal"
        name="additionalOptions"
        value={formData.additionalOptions}
        onChange={handleChange}
      />

      {/* Buttons */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setPreviewOpen(true)}
        >
          Preview Request
        </Button>
        <Button variant="outlined">Save as Draft</Button>
      </Box>

      {/* Preview Dialog */}
      <Dialog open={previewOpen} onClose={() => setPreviewOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Preview Your Request</DialogTitle>
        <DialogContent>
          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Service Type:</strong> {formData.service}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Location:</strong> {formData.location}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Date & Time:</strong> {formData.dateTime}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Budget:</strong> {formData.budget}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Description:</strong>
            </Typography>
            <Typography variant="body1" paragraph sx={{ whiteSpace: 'pre-line' }}>
              {formData.description}
            </Typography>
            {formData.additionalOptions && (
              <>
                <Typography variant="subtitle1" gutterBottom>
                  <strong>Additional Options:</strong>
                </Typography>
                <Typography variant="body1" paragraph sx={{ whiteSpace: 'pre-line' }}>
                  {formData.additionalOptions}
                </Typography>
              </>
            )}
            {formData.file && (
              <Typography variant="subtitle1" gutterBottom>
                <strong>Attached File:</strong> {formData.file.name}
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPreviewOpen(false)}>Back to Edit</Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Send Request
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}