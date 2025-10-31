import {
  Modal, Box, Typography, Button, Avatar, Divider, Chip,
  IconButton, Dialog, DialogTitle, DialogContent, DialogActions,
  Paper, Stack, Grid
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Close as CloseIcon,
  Print as PrintIcon,
  Event as EventIcon,
  LocationOn as LocationIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Schedule as ScheduleIcon,
  AttachMoney as MoneyIcon,
  Description as DescriptionIcon,
  CheckCircle as CheckIcon,
  Cancel as CancelIcon,
  AccessTime as TimeIcon
} from "@mui/icons-material";
import { useRef } from "react";
import { HeadingCommon } from "../multiple-responsive-heading/heading";

const ModalContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: '1000px',
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[24],
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
  maxHeight: '90vh',
  overflowY: 'auto',
  [theme.breakpoints.up('sm')]: {
    width: '85%',
  },
  [theme.breakpoints.up('md')]: {
    width: '80%',
  },
}));

const SectionHeader = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
  paddingBottom: theme.spacing(1),
  borderBottom: `3px solid ${theme.palette.primary.main}`,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const DetailItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
  backgroundColor: 'rgba(0, 0, 0, 0.02)',
  borderRadius: theme.shape.borderRadius,
  border: '1px solid rgba(0, 0, 0, 0.05)',
}));

const DetailLabel = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  minWidth: '160px',
  color: theme.palette.text.primary,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const DetailValue = styled(Typography)(({ theme }) => ({
  flex: 1,
  fontWeight: 500,
}));

const HtmlContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: 'rgba(0, 0, 0, 0.02)',
  borderRadius: theme.shape.borderRadius,
  border: '1px solid rgba(0, 0, 0, 0.05)',
  '& p': {
    marginBottom: theme.spacing(1),
    lineHeight: 1.6,
  },
  '& h3, & h4': {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    color: theme.palette.primary.main,
  },
  '& ul, & ol': {
    paddingLeft: theme.spacing(3),
    marginBottom: theme.spacing(1),
  },
  '& li': {
    marginBottom: theme.spacing(0.5),
  },
}));

const StatusChip = styled(Chip)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '0.75rem',
  textTransform: 'capitalize',
}));

const PrintContainer = styled(Box)(({ theme }) => ({
  '@media print': {
    body: {
      margin: 0,
      padding: '20px',
      background: 'white !important',
      color: 'black !important'
    },
    '.no-print': { display: 'none !important' },
    '.print-section': {
      breakInside: 'avoid',
      marginBottom: '20px'
    },
    '*': {
      '-webkit-print-color-adjust': 'exact !important',
      'color-adjust': 'exact !important'
    }
  }
}));

const HeaderSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(3),
  position: 'relative',
  overflow: 'hidden',
}));

const LogoSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const LogoStamp = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(45deg, #FF6B6B 0%, #FF8E53 100%)',
  color: 'white',
  border: '3px solid white',
  width: 50,
  height: 50,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bold',
  fontSize: '12px',
  textAlign: 'center',
  lineHeight: 1.1,
  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
}));

interface DetailsModalProps {
  open: boolean;
  onClose: () => void;
  data: any;
}

export const ServiceRequestModal = ({ open, onClose, data }: DetailsModalProps) => {
  const printRef = useRef<HTMLDivElement>(null);

  if (!data) return null;

  const handlePrint = () => {
    const printContent = printRef.current;
    if (!printContent) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const allStyles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
      .map(style => style.outerHTML)
      .join('\n');

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Service Request - ${data.eventId?.eventName || 'Details'}</title>
          <meta charset="utf-8">
          <style>
            @media print {
              body { margin: 0; padding: 20px; background: white !important; color: black !important; }
              .no-print { display: none !important; }
              .print-section { break-inside: avoid; margin-bottom: 20px; }
              * { -webkit-print-color-adjust: exact !important; color-adjust: exact !important; }
            }
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; }
            .contract-header { 
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
              color: white !important; padding: 25px; border-radius: 12px 12px 0 0; 
            }
            .section-paper { 
              border: 1px solid #E8EAF6; border-radius: 12px; padding: 20px; 
              margin-bottom: 20px; background: white !important; position: relative;
              box-shadow: 0 2px 12px rgba(0,0,0,0.08); 
            }
          </style>
          ${allStyles}
        </head>
        <body>
          <div class="print-content">${printContent.innerHTML}</div>
          <script>window.onload = function() { window.print(); setTimeout(() => window.close(), 100); };</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const PrintContent = () => (
    <div ref={printRef}>

      <LogoSection sx={{ justifyContent: 'space-between' }}>
        <Box flex={1}>
          <Typography variant="h4" fontWeight="bold" sx={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
            📋 Service Request Details
          </Typography>
          <Typography variant="subtitle1" sx={{ opacity: 0.9, mt: 1 }}>
            Event: <strong>{data.eventId?.eventName || 'N/A'}</strong>
          </Typography>
        </Box>
        <LogoStamp>
          TICK-M<br />EVENTS
        </LogoStamp>
      </LogoSection>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          Organized by: <strong>{data.organizerId?.name}</strong>
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          Generated on: {new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </Typography>
      </Box>

      <Box sx={{ py: 3 }}>
        <Grid container spacing={3}>
          {/* Left Column */}
          <Grid item xs={12} md={6}>
            <Paper className="section-paper">
              <SectionHeader variant="h6">
                <EventIcon /> Event Information
              </SectionHeader>
              <Stack spacing={2}>
                <DetailItem>
                  <DetailLabel variant="body2">
                    <ScheduleIcon sx={{ fontSize: 18 }} />
                    Date & Time:
                  </DetailLabel>
                  <DetailValue variant="body2">
                    {new Date(data.eventId?.date).toLocaleDateString()} at {data.eventId?.time}
                  </DetailValue>
                </DetailItem>

                <DetailItem>
                  <DetailLabel variant="body2">
                    <LocationIcon sx={{ fontSize: 18 }} />
                    Location:
                  </DetailLabel>
                  <DetailValue variant="body2">
                    {data.eventId?.location}
                  </DetailValue>
                </DetailItem>
              </Stack>
            </Paper>

            <Paper className="section-paper" sx={{ mt: 2 }}>
              <SectionHeader variant="h6">
                <DescriptionIcon /> Service Request
              </SectionHeader>
              <Stack spacing={2}>
                <DetailItem>
                  <DetailLabel variant="body2">Service Type:</DetailLabel>
                  <DetailValue variant="body2">
                    <StatusChip
                      label={data.serviceRequestId?.serviceType}
                      color="primary"
                      size="small"
                    />
                  </DetailValue>
                </DetailItem>

                <DetailItem>
                  <DetailLabel variant="body2">
                    <MoneyIcon sx={{ fontSize: 18 }} />
                    Budget:
                  </DetailLabel>
                  <DetailValue variant="body2">
                    {data.serviceRequestId?.budget}
                  </DetailValue>
                </DetailItem>

                <DetailItem>
                  <DetailLabel variant="body2">Organizer Status:</DetailLabel>
                  <DetailValue variant="body2">
                    <StatusChip
                      label={data.orgStatus}
                      color={
                        data.orgStatus === 'accepted' ? 'success' :
                          data.orgStatus === 'rejected' ? 'error' :
                            data.orgStatus === 'request' ? 'info' : 'info'
                      }
                    />
                  </DetailValue>
                </DetailItem>

                <DetailItem>
                  <DetailLabel variant="body2">Organizer Requirement:</DetailLabel>
                  <DetailValue variant="body2" textTransform="capitalize">
                    {data.orgRequirement}
                  </DetailValue>
                </DetailItem>
              </Stack>
            </Paper>

            {data.providerHasProposed && (
              <Paper className="section-paper" sx={{ mt: 2 }}>
                <SectionHeader variant="h6">
                  <CheckIcon /> Provider Proposal
                </SectionHeader>
                <Stack spacing={2}>
                  <DetailItem>
                    <DetailLabel variant="body2">Proposed Amount:</DetailLabel>
                    <DetailValue variant="body2">
                      <StatusChip
                        label={`${data.providerProposal?.amount} XAF` || 'NA'}
                        color={data.providerProposal?.amount ? "success" : "default"}
                        size="small"
                        variant="outlined"
                      />
                    </DetailValue>
                  </DetailItem>

                  <DetailItem>
                    <DetailLabel variant="body2">
                      <TimeIcon sx={{ fontSize: 18 }} />
                      Duration:
                    </DetailLabel>
                    <DetailValue variant="body2">
                      {data.providerProposal?.days} days
                    </DetailValue>
                  </DetailItem>

                  <DetailItem>
                    <DetailLabel variant="body2">Status:</DetailLabel>
                    <DetailValue variant="body2">
                      <StatusChip
                        label={data.providerStatus}
                        color={
                          data.providerStatus === 'accepted' ? 'success' :
                            data.providerStatus === 'rejected' ? 'error' :
                              data.providerStatus === 'request' ? 'info' : 'info'
                        }
                      />
                    </DetailValue>
                  </DetailItem>
                </Stack>
              </Paper>
            )}
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} md={6}>
            <Paper className="section-paper">
              <SectionHeader variant="h6">
                <PersonIcon /> Organizer Details
              </SectionHeader>
              <Stack spacing={2}>
                <DetailItem>
                  <DetailLabel variant="body2">Name:</DetailLabel>
                  <DetailValue variant="body2">
                    {data.organizerId?.name}
                  </DetailValue>
                </DetailItem>

                <DetailItem>
                  <DetailLabel variant="body2">
                    <EmailIcon sx={{ fontSize: 18 }} />
                    Email:
                  </DetailLabel>
                  <DetailValue variant="body2">
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: { xs: 120, sm: 180 },
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                        filter: 'blur(4px)',
                        userSelect: 'none',
                        WebkitUserSelect: 'none',
                        MozUserSelect: 'none',
                        // '&:hover': {
                        //   filter: 'blur(0px)', // Remove blur on hover to reveal
                        //   transition: 'filter 0.3s ease'
                        // }
                      }}
                    >
                      {data.organizerId?.email}
                    </Typography>
                  </DetailValue>
                </DetailItem>
              </Stack>
            </Paper>

            <Paper className="section-paper" sx={{ mt: 2 }}>
              <SectionHeader variant="h6">
                <DescriptionIcon /> Event Description
              </SectionHeader>
              <HtmlContent dangerouslySetInnerHTML={{ __html: data.eventId?.description || '' }} />
            </Paper>

            <Paper className="section-paper" sx={{ mt: 2 }}>
              <SectionHeader variant="h6">
                <DescriptionIcon /> Service Details
              </SectionHeader>
              <HtmlContent dangerouslySetInnerHTML={{ __html: data.serviceRequestId?.description || '' }} />
            </Paper>

            {data.providerHasProposed && data.providerProposal?.message && (
              <Paper className="section-paper" sx={{ mt: 2 }}>
                <SectionHeader variant="h6">
                  <DescriptionIcon /> Provider Message
                </SectionHeader>
                <HtmlContent dangerouslySetInnerHTML={{ __html: data.providerProposal?.message || '' }} />
              </Paper>
            )}
          </Grid>
        </Grid>

        {/* Footer */}
        <Box sx={{
          textAlign: 'center',
          mt: 4,
          pt: 3,
          borderTop: '2px dashed #e0e0e0',
          opacity: 0.8,
          fontSize: '12px',
          color: 'text.secondary',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <LogoStamp sx={{ width: 24, height: 24, fontSize: '8px', marginRight: '8px' }}>
            TM
          </LogoStamp>
          Tick-M Events Official Document
        </Box>
      </Box>
    </div>
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          background: 'white'
        }
      }}
    >
      <DialogTitle sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        py: 3,
        position: 'relative'
      }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h5" fontWeight="bold">
            Service Request Details
          </Typography>
          <Typography variant="subtitle2" sx={{ opacity: 0.9 }}>
            {data.eventId?.eventName}
          </Typography>
        </Box>

        <LogoSection sx={{ mb: 0, justifyContent: 'flex-end' }}>
          <LogoStamp sx={{ width: 45, height: 45, fontSize: '11px' }}>
            TICK-M<br />EVENTS
          </LogoStamp>
        </LogoSection>

        <IconButton
          onClick={onClose}
          sx={{ color: 'white', ml: 2 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ py: 2 }}>
        <PrintContent />
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2, gap: 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          startIcon={<CloseIcon />}
          sx={{ borderRadius: 2, px: 3 }}
        >
          Close
        </Button>
        <Button
          onClick={handlePrint}
          variant="contained"
          startIcon={<PrintIcon />}
          sx={{
            borderRadius: 2,
            px: 3,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
          }}
        >
          Download
        </Button>
      </DialogActions>
    </Dialog>
  );
};