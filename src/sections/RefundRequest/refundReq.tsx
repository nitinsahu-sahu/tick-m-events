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
  CardContent
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminRefundReq } from "src/redux/actions/admin/refund-requests";
import { AppDispatch, RootState } from "src/redux/store";
import { formatEventDate } from "src/hooks/formate-time";
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { DashboardContent } from "src/layouts/dashboard";
import { RefundRequestTyp } from "./utils";


export function RefundReq() {
  const dispatch = useDispatch<AppDispatch>();
  const { refundReqs, loading, error } = useSelector((state: RootState) => state?.admin);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

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
    console.log('View details:', request);
    // Implement view details logic
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

                  {/* Reason */}
                  {/* <TableCell align="center">
                    <Tooltip title={request.reason} arrow>
                      <Typography
                        variant="body2"
                        sx={{
                          maxWidth: 150,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {request.reason}
                      </Typography>
                    </Tooltip>
                  </TableCell> */}

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
    </DashboardContent>
  );
}