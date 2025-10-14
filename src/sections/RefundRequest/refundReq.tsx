import {
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Box,
  Chip,
  Avatar,
  Button,
  CircularProgress,
  Alert,
  Tooltip,
  TextField,
  MenuItem,
  InputAdornment,
  Card,
  CardContent,Modal,
  Grid,
  Divider,
  IconButton,
  Stack
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PaymentIcon from '@mui/icons-material/Payment';
import NotesIcon from '@mui/icons-material/Notes';
import { getAdminRefundReq } from "src/redux/actions/admin/refund-requests";
import { AppDispatch, RootState } from "src/redux/store";
import { formatEventDate } from "src/hooks/formate-time";

import { DashboardContent } from "src/layouts/dashboard";
import { RefundRequestTyp } from "./utils";

// Modal Style
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {
    xs: '95%', // Full width on mobile with small margins
    sm: '90%', // Slightly larger on small screens
    md: '85%', // Medium on tablets
    lg: '80%', // Large on desktop
    xl: '75%'  // Extra large screens
  },
  maxWidth: '1200px',
  maxHeight: {
    xs: '85vh', // Smaller height on mobile
    sm: '90vh', // Larger on bigger screens
  },
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: {
    xs: 2, // Less padding on mobile
    sm: 3, // More padding on larger screens
    md: 4
  },
  overflow: 'auto'
};

// Status Card Component
const StatusCard = ({ status, amount, date }: { status: string; amount: number; date: string }) => {
  const getStatusConfig = (statuss: string) => {
    const config = {
      approved: { color: '#4CAF50', bgcolor: '#E8F5E8', label: 'Approved' },
      pending: { color: '#FF9800', bgcolor: '#FFF3E0', label: 'Pending' },
      rejected: { color: '#F44336', bgcolor: '#FFEBEE', label: 'Rejected' },
      refunded: { color: '#2196F3', bgcolor: '#E3F2FD', label: 'Refunded' },
      cancelled: { color: '#9E9E9E', bgcolor: '#F5F5F5', label: 'Cancelled' }
    };
    return config[statuss as keyof typeof config] || config.pending;
  };

  const statusConfig = getStatusConfig(status);

  return (
    <Card sx={{ bgcolor: statusConfig.bgcolor, border: `1px solid ${statusConfig.color}20` }}>
      <CardContent>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="h6" fontWeight="bold" color={statusConfig.color}>
              {statusConfig.label}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Requested on {formatEventDate(date)}
            </Typography>
          </Box>
          <Box textAlign={{ xs: 'left', sm: 'right' }}>
            <Typography variant="h5" fontWeight="bold" color={statusConfig.color}>
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'XAF' }).format(amount)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Refund Amount
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

// Info Row Component
const InfoRow = ({ icon, label, value, color = "primary" }: { icon: React.ReactNode; label: string; value: string; color?: string }) => (
  <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ mb: 2 }}>
    <Box sx={{ color, mt: 0.5 }}>{icon}</Box>
    <Box flex={1}>
      <Typography variant="body2" color="text.secondary" fontWeight="medium">
        {label}
      </Typography>
      <Typography variant="body1" fontWeight="medium">
        {value}
      </Typography>
    </Box>
  </Stack>
);

export function RefundReq() {
  const dispatch = useDispatch<AppDispatch>();
  const { refundReqs, loading, error } = useSelector((state: RootState) => state?.admin);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedRequest, setSelectedRequest] = useState<RefundRequestTyp | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getAdminRefundReq());
  }, [dispatch]);

  // Get status chip color
  const getStatusColor = (status: string): "success" | "warning" | "error" | "info" | "default" => {
    switch (status) {
      case 'approved':
        return 'success';
      case 'pending':
        return 'warning';
      case 'rejected':
        return 'error';
      case 'refunded':
        return 'info';
      case 'cancelled':
        return 'default';
      default:
        return 'default';
    }
  };

  // Format currency
  const formatCurrency = (amount: number): string =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'XAF'
    }).format(amount);

  // Filter refund requests based on search and status
  const filteredRefundReqs: RefundRequestTyp[] = refundReqs?.filter((request: RefundRequestTyp) => {
    const matchesSearch =
      request.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.reason?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || request.refundStatus === statusFilter;

    return matchesSearch && matchesStatus;
  }) || [];

  // Handler functions
  const handleViewDetails = (request: RefundRequestTyp): void => {
   setSelectedRequest(request);
    setModalOpen(true);
    // Implement view details logic
  };
 const handleCloseModal = (): void => {
    setModalOpen(false);
    setSelectedRequest(null);
  };
  const handleApprove = (request: RefundRequestTyp): void => {
    console.log('Approve request:', request);
    // Implement approve logic
  };

  const handleReject = (request: RefundRequestTyp): void => {
    console.log('Reject request:', request);
    // Implement reject logic
  };

  // Table headers
  const headers: string[] = [
    'User',
    'Event Date',
    'Refund Amount',
    'Tickets',
    'Status',
    'Request Date',
    'Actions'
  ];

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        Error loading refund requests: {error}
      </Alert>
    );
  }

  return (
    <DashboardContent>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Refund Requests
      </Typography>

      {/* Filters and Search */}
      <Card sx={{ mb: 3, p: 2 }}>
        <CardContent>
          <Box display="flex" gap={2} alignItems="center" flexWrap="wrap">
            <TextField
              placeholder="Search by name, email or reason..."
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ minWidth: 300 }}
              size="small"
            />

            <TextField
              select
              label="Status"
              value={statusFilter}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStatusFilter(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FilterListIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ minWidth: 150 }}
              size="small"
            >
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="approved">Approved</MenuItem>
              <MenuItem value="rejected">Rejected</MenuItem>
              <MenuItem value="refunded">Refunded</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </TextField>

            <Typography variant="body2" color="text.secondary" sx={{ ml: 'auto' }}>
              Showing {filteredRefundReqs.length} of {refundReqs?.length || 0} requests
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Table or No Data */}
      {filteredRefundReqs.length > 0 ? (
        <TableContainer component={Paper} elevation={3}>
          <Table sx={{ minWidth: 650 }} aria-label="refund requests table">
            <TableHead>
              <TableRow sx={{ bgcolor: '#1F8FCD' }}>
                {headers.map((header: string) => (
                  <TableCell
                    key={header}
                    sx={{
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '0.9rem',
                      py: 2,
                       bgcolor: '#1F8FCD'
                    }}
                    align="center"
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRefundReqs.map((request: RefundRequestTyp) => (
                <TableRow
                  key={request._id}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    '&:hover': { backgroundColor: '#f5f5f5' }
                  }}
                >
                  {/* User */}
                  <TableCell align="center">
                    <Box display="flex" alignItems="center" justifyContent="center">
                      <Avatar
                        src={request.user?.avatar?.url}
                        sx={{ width: 32, height: 32, mr: 1 }}
                      >
                        {request.user?.name?.charAt(0)}
                      </Avatar>
                      <Box textAlign="left">
                        <Typography variant="body2" fontWeight="medium">
                          {request.user?.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {request.user?.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  {/* Event Date */}
                  <TableCell align="center">
                    <Typography variant="body2">
                      {formatEventDate(request.eventDate)}
                    </Typography>
                  </TableCell>


                  {/* Refund Amount */}
                  <TableCell align="center">
                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      color="error.main"
                    >
                      {request.refundAmount} XAF
                    </Typography>
                  </TableCell>

                  {/* Tickets */}
                  <TableCell align="center">
                    <Box>
                      {request.tickets?.slice(0, 2).map((ticket: any, index: number) => (
                        <Typography key={ticket._id || index} variant="caption" display="block">
                          {ticket.quantity}x {ticket.ticketType}
                        </Typography>
                      ))}
                      {request.tickets?.length > 2 && (
                        <Typography variant="caption" color="text.secondary">
                          +{request.tickets.length - 2} more
                        </Typography>
                      )}
                    </Box>
                  </TableCell>

                  {/* Status */}
                  <TableCell align="center">
                    <Chip
                      label={request.refundStatus.charAt(0).toUpperCase() + request.refundStatus.slice(1)}
                      color={getStatusColor(request.refundStatus)}
                      size="small"
                    />
                  </TableCell>

                  {/* Request Date */}
                  <TableCell align="center">
                    <Typography variant="body2">
                      {formatEventDate(request.createdAt)}
                    </Typography>
                  </TableCell>

                  {/* Actions */}
                  <TableCell align="center">
                    <Box display="flex" gap={1} justifyContent="center">
                      <Button
                        variant="outlined"
                        size="small"
                        color="primary"
                        onClick={() => handleViewDetails(request)}
                      >
                        View
                      </Button>
                      {request.refundStatus === 'pending' && (
                        <>
                          <Button
                            variant="contained"
                            size="small"
                            color="success"
                            onClick={() => handleApprove(request)}
                          >
                            Approve
                          </Button>
                          <Button
                            variant="contained"
                            size="small"
                            color="error"
                            onClick={() => handleReject(request)}
                          >
                            Reject
                          </Button>
                        </>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        // No Data Available UI
        <Paper
          elevation={3}
          sx={{
            p: 6,
            textAlign: 'center',
            mt: 2,
            backgroundColor: '#fafafa'
          }}
        >
          <Box sx={{ color: 'text.secondary' }}>
            <Typography variant="h5" gutterBottom color="text.secondary">
              {searchTerm || statusFilter !== 'all' ? '🔍 No Matching Results' : '📭 No Refund Requests'}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              {searchTerm || statusFilter !== 'all'
                ? 'No refund requests match your search criteria. Try adjusting your filters.'
                : 'There are no refund requests to display at the moment.'
              }
            </Typography>
            {(searchTerm || statusFilter !== 'all') && (
              <Button
                variant="outlined"
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                }}
              >
                Clear Filters
              </Button>
            )}
          </Box>
        </Paper>
      )}

      {/* Summary Stats */}
      {filteredRefundReqs.length > 0 && (
        <Box mt={2} display="flex" gap={2} flexWrap="wrap">
          <Chip
            label={`Total: ${filteredRefundReqs.length}`}
            variant="outlined"
            color="primary"
          />
          <Chip
            label={`Pending: ${filteredRefundReqs.filter((req: RefundRequestTyp) => req.refundStatus === 'pending').length}`}
            variant="outlined"
            color="warning"
          />
          <Chip
            label={`Approved: ${filteredRefundReqs.filter((req: RefundRequestTyp) => req.refundStatus === 'approved').length}`}
            variant="outlined"
            color="success"
          />
          <Chip
            label={`Rejected: ${filteredRefundReqs.filter((req: RefundRequestTyp) => req.refundStatus === 'rejected').length}`}
            variant="outlined"
            color="error"
          />
        </Box>
      )}

        {/* Refund Details Modal */}
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="refund-details-modal"
        aria-describedby="refund-request-details"
      >
        <Box sx={modalStyle}>
          {selectedRequest && (
            <>
              {/* Header */}
              <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={3}>
                <Box>
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Refund Request Details
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Request ID: {selectedRequest._id}
                  </Typography>
                </Box>
                <IconButton onClick={handleCloseModal} size="small">
                  <CloseIcon />
                </IconButton>
              </Box>

              <Grid container spacing={3}>
                {/* Left Column - Status and Basic Info */}
                <Grid item xs={12} lg={8}>
                  <StatusCard
                    status={selectedRequest.refundStatus}
                    amount={selectedRequest.refundAmount}
                    date={selectedRequest.createdAt}
                  />

                  {/* User Information */}
                  <Card sx={{ mt: 3 }}>
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <PersonIcon color="primary" />
                        User Information
                      </Typography>
                      <Stack spacing={2}>
                        <Box display="flex" alignItems="center" gap={2}>
                          <Avatar
                            src={selectedRequest.user?.avatar?.url}
                            sx={{ width: 50, height: 50 }}
                          >
                            {selectedRequest.user?.name?.charAt(0)}
                          </Avatar>
                          <Box>
                            <Typography variant="body1" fontWeight="bold">
                              {selectedRequest.user?.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {selectedRequest.user?.email}
                            </Typography>
                          </Box>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>

                  {/* Ticket Details */}
                  <Card sx={{ mt: 3 }}>
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <ReceiptIcon color="primary" />
                        Ticket Details
                      </Typography>
                      <Stack spacing={2}>
                        {selectedRequest.tickets?.map((ticket, index) => (
                          <Box key={ticket._id} sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                            <Grid container spacing={2} alignItems="center">
                              <Grid item xs={12} sm={6}>
                                <Typography variant="body1" fontWeight="medium">
                                  {ticket.ticketType}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Quantity: {ticket.quantity}
                                </Typography>
                              </Grid>
                              <Grid item xs={12} sm={6} textAlign={{ xs: 'left', sm: 'right' }}>
                                <Typography variant="body1" fontWeight="bold">
                                  {formatCurrency(ticket.unitPrice)}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Total: {formatCurrency(ticket.unitPrice * ticket.quantity)}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Box>
                        ))}
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Right Column - Event and Payment Info */}
                <Grid item xs={12} lg={4}>
                  {/* Event Information */}
                  <Card>
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <EventIcon color="primary" />
                        Event Information
                      </Typography>
                      <Stack spacing={2}>
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Event Date
                          </Typography>
                          <Typography variant="body1" fontWeight="medium">
                            {formatEventDate(selectedRequest.eventDate)}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Event ID
                          </Typography>
                          <Typography variant="body1" fontWeight="medium">
                            {selectedRequest.event?._id}
                          </Typography>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>

                  {/* Payment Information */}
                  <Card sx={{ mt: 3 }}>
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <PaymentIcon color="primary" />
                        Payment Information
                      </Typography>
                      <Stack spacing={2}>
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Payment Method
                          </Typography>
                          <Typography variant="body1" fontWeight="medium" textTransform="capitalize">
                            {selectedRequest.paymentMethod?.replace('_', ' ')}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Order Total
                          </Typography>
                          <Typography variant="body1" fontWeight="bold" color="primary.main">
                            {formatCurrency(selectedRequest.totalAmount)}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Refund Amount
                          </Typography>
                          <Typography variant="h6" fontWeight="bold" color="success.main">
                            {formatCurrency(selectedRequest.refundAmount)}
                          </Typography>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>

                  {/* Reason & Notes */}
                  <Card sx={{ mt: 3 }}>
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <NotesIcon color="primary" />
                        Refund Reason
                      </Typography>
                      <Typography variant="body1" sx={{ mt: 1, p: 2, bgcolor: 'grey.50', borderRadius: 1, fontStyle: 'italic' }}>
                        {selectedRequest.reason}
                      </Typography>

                      {selectedRequest.adminNotes && (
                        <>
                          <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                            <NotesIcon color="secondary" />
                            Admin Notes
                          </Typography>
                          <Typography variant="body1" sx={{ mt: 1, p: 2, bgcolor: 'warning.light', borderRadius: 1 }}>
                            {selectedRequest.adminNotes}
                          </Typography>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              {/* Action Buttons */}
              <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="flex-end">
                  <Button variant="outlined" onClick={handleCloseModal}>
                    Close
                  </Button>
                  {selectedRequest.refundStatus === 'pending' && (
                    <>
                      <Button variant="contained" color="success" onClick={() => handleApprove(selectedRequest)}>
                        Approve Refund
                      </Button>
                      <Button variant="contained" color="error" onClick={() => handleReject(selectedRequest)}>
                        Reject Request
                      </Button>
                    </>
                  )}
                </Stack>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </DashboardContent>
  );
}