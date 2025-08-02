import React, { useCallback } from "react";
import {
  Box, Paper, Button, Chip, TextField, Typography, Dialog, DialogTitle, DialogContent, Avatar,
  DialogActions,
  InputAdornment,
} from "@mui/material";
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";

import { ServiceRequestTable } from "src/components/tables/service-request-table";
import { AppDispatch } from "src/redux/store";
import { createContractSigned } from "src/redux/actions/contract.action";

interface FormData {
  service: string;
  location: string;
  eventTime: string;
  finalBudget: string;
  explainReq: string;
}

interface ApiResult {
  status: number;
  type: string;
  message: any;
  // Add other properties if needed
}

export function RequestAService({ requests }: any) {
  const dispatch = useDispatch<AppDispatch>();

  const [showRequestForm, setShowRequestForm] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState<any>(null);

  const [formData, setFormData] = React.useState<FormData>({
    service: "",
    location: "",
    eventTime: "",
    finalBudget: "",
    explainReq: "",
  });
  const [previewOpen, setPreviewOpen] = React.useState(false);

  // Update formData when selectedRow changes
  React.useEffect(() => {
    if (selectedRow) {
      setFormData({
        service: selectedRow?.serviceRequestId?.serviceType || "",
        location: selectedRow?.eventId?.location || "",
        eventTime: "",
        finalBudget: "",
        explainReq: "",
      });
    }
  }, [selectedRow]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignedContract = (row: any) => {
    setSelectedRow(row);
    setShowRequestForm(!showRequestForm);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPreviewOpen(true);
  };

  const handleConfirm = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    const finalContractEntry = new FormData();
    finalContractEntry.append("eventReqId", selectedRow?._id);
    finalContractEntry.append("eventId", selectedRow?.eventId?._id);
    finalContractEntry.append("serviceRequestId", selectedRow?.serviceRequestId?._id);
    finalContractEntry.append("providerId", selectedRow?.providerId?._id);
    finalContractEntry.append("service", formData.service);
    finalContractEntry.append("eventTime", formData.eventTime);
    finalContractEntry.append("location", formData.location);
    finalContractEntry.append("finalBudget", `${formData.finalBudget} XAF`);
    finalContractEntry.append("explainReq", formData.explainReq);


    try {
      const result = await dispatch(createContractSigned(finalContractEntry)) as ApiResult;
      if (result?.status === 201) {
        toast.success("Requested Successfully...");
        setPreviewOpen(false);
        setShowRequestForm(false);
      } else {
        toast.error(result?.message || "Service creation failed");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    }
  }, [dispatch, formData, selectedRow])

  const renderHTML = (htmlString: string) => <Box dangerouslySetInnerHTML={{ __html: htmlString }} />;

  return (
    <Box
      sx={{
        p: 3,
        my: 3,
        borderRadius: 3,
        backgroundColor: "#fff",
        border: "1px solid #E0E0E0",
        boxShadow: 3,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Finalize Contract
      </Typography>
      <ServiceRequestTable
        handleSignedContract={handleSignedContract}
        requests={requests}
        type="2"
      />

      {showRequestForm && (
        <form onSubmit={handleSubmit}>
          <Box mt={2}>
            <Typography variant="h6" gutterBottom>
              Service Accepted Form
            </Typography>

            <TextField
              required
              fullWidth
              label="Service Type"
              margin="normal"
              name="service"
              value={formData.service}
              onChange={handleChange}
            />

            <TextField
              required
              fullWidth
              label="Event Location"
              margin="normal"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />

            <TextField
              required
              fullWidth
              type="datetime-local"
              margin="normal"
              name="eventTime"
              value={formData.eventTime}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              required
              fullWidth
              label="Final Budget"
              margin="normal"
              name="finalBudget"
              value={formData.finalBudget}
              onChange={handleChange}
              InputProps={{
                endAdornment: <InputAdornment position="end">XAF</InputAdornment>,
              }}
            />

            <TextField
              required
              fullWidth
              label="Explain Full Requirements"
              multiline
              rows={4}
              margin="normal"
              name="explainReq"
              value={formData.explainReq}
              onChange={handleChange}
            />

            <Button
              variant="contained"
              size="small"
              type="submit"
              sx={{
                backgroundColor: "#08043bff",
                color: 'white',
                width: "100%",
                mt: 2
              }}
            >
              Preview Contract
            </Button>
          </Box>
        </form>
      )}

      <Dialog open={previewOpen} onClose={() => setPreviewOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Contract Details Preview</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Chip
              label={`Status: ${selectedRow?.status.replace(/-/g, ' ')}`}
              color={selectedRow?.status === 'accepted-by-provider' ? 'success' : 'warning'}
            />
            <Chip
              label={`Contract Status: ${selectedRow?.contractStatus}`}
              color={selectedRow?.contractStatus === 'pending' ? 'warning' : 'success'}
            />
          </Box>

          <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Event Information
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar
                src={selectedRow?.organizerId?.avatar?.url}
                alt={selectedRow?.organizerId?.name}
                sx={{ mr: 2 }}
              />
              <Box>
                <Typography><strong>Organizer:</strong> {selectedRow?.organizerId?.name}</Typography>
                <Typography variant="body2">{selectedRow?.organizerId?.email}</Typography>
              </Box>
            </Box>

            <Typography><strong>Event Name:</strong> {selectedRow?.eventId?.eventName}</Typography>
            <Typography><strong>Date:</strong> {new Date(selectedRow?.eventId?.date).toLocaleDateString()}</Typography>
            <Typography><strong>Time:</strong> {selectedRow?.eventId?.time}</Typography>
            <Typography><strong>Location:</strong> {selectedRow?.eventId?.location}</Typography>
            <Typography mt={1}><strong>Description:</strong></Typography>
            {renderHTML(selectedRow?.eventId?.description || '')}
          </Paper>

          <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Service Provider Details
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar
                src={selectedRow?.providerId?.avatar?.url}
                alt={selectedRow?.providerId?.name}
                sx={{ mr: 2 }}
              />
              <Box>
                <Typography><strong>Provider:</strong> {selectedRow?.providerId?.name}</Typography>
                <Typography variant="body2">{selectedRow?.providerId?.email}</Typography>
              </Box>
            </Box>

            <Typography><strong>Service Type:</strong> {selectedRow?.serviceRequestId?.serviceType}</Typography>
            <Typography><strong>Original Budget:</strong> {selectedRow?.serviceRequestId?.budget}</Typography>
            <Typography><strong>Organizer Budget:</strong> {selectedRow?.orgBudget} XAF</Typography>
            <Typography><strong>Organizer Requirements:</strong> {selectedRow?.orgRequirement}</Typography>
            <Typography mt={1}><strong>Service Description:</strong></Typography>
            {renderHTML(selectedRow?.serviceRequestId?.description || '')}
          </Paper>

          <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Provider Proposal
            </Typography>
            <Typography><strong>Proposed Amount:</strong> {selectedRow?.providerProposal?.amount} XAF</Typography>
            <Typography><strong>Duration:</strong> {selectedRow?.providerProposal?.days} day(s)</Typography>
            <Typography><strong>Message:</strong> {selectedRow?.providerProposal?.message}</Typography>
          </Paper>

          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Contract Terms
            </Typography>
            <Typography><strong>Final Agreed Budget:</strong> {formData.finalBudget}</Typography>
            <Typography><strong>Event Time:</strong> {formData.eventTime}</Typography>
            <Typography><strong>Additional Requirements:</strong></Typography>
            <Typography>{formData.explainReq || 'None specified'}</Typography>

            {selectedRow?.serviceRequestId?.additionalOptions && (
              <>
                <Typography mt={2}><strong>Service Options:</strong></Typography>
                {renderHTML(selectedRow?.serviceRequestId?.additionalOptions)}
              </>
            )}
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPreviewOpen(false)}>Back to Edit</Button>
          <Button
            onClick={(e) => handleConfirm(e)}
            variant="contained"
            color="primary"
          >
            Confirm and Send Contract
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}