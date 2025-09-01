import React, { useCallback, useEffect, useState } from 'react';
import {
  Box, Typography, TableContainer, Table, TableHead, TableRow, TableCell,
  TableBody, Paper, Chip, IconButton, Button, Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle, Grid, Stack, TextField,
  Divider, MenuItem, CircularProgress, Collapse, Select, FormControl, InputLabel
} from '@mui/material';
import {
  Visibility as EyeIcon,
  Chat as ChatIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  KeyboardArrowDown as ArrowDownIcon,
  KeyboardArrowUp as ArrowUpIcon
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/redux/store';
import { getMyBids, withdrawnMyBids, updateBid } from 'src/redux/actions/provider/projects/place-a-bd.action';
import { Link, useNavigate } from 'react-router-dom';
import { formatEventDate } from 'src/hooks/formate-time';
import { ProviderOrganizerInfoModal } from 'src/components/modal/provider-orgnizer-info-modal';

export function ProviderBidsList() {
  const dispatch = useDispatch<AppDispatch>();
  const { _mybids } = useSelector((state: RootState) => state?.provider);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [statusUpdates, setStatusUpdates] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBid, setSelectedBid] = useState<any>(null);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<any>({});

  const handleViewOpenDialog = (bid: any) => {
    setSelectedOrg(bid);
    setOpenViewDialog(true);
  };
  // ✨ New state for Edit Form
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [bidData, setBidData] = useState<any>({
    bidAmount: '',
    deliveryTime: '',
    deliveryUnit: 'Days',
    proposal: ''
  });
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [milestones, setMilestones] = useState<any[]>([
    { id: Date.now(), milestorneName: '', amount: '', currency: 'XAF' }
  ]);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    dispatch(getMyBids());
  }, [dispatch]);

  const handleOpenDialog = (bid: any) => {
    setSelectedBid(bid);
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedBid(null);
  };
  const handleWithdrawBid = async () => {
    if (selectedBid) {
      await dispatch(withdrawnMyBids(selectedBid?._id) as any);
      handleCloseDialog();
    }
  };

  // ---- New Handlers for Edit ----
  const handleEditOpen = (bid: any) => {
    setSelectedBid(bid);
    setBidData({
      bidAmount: bid.bidAmount || '',
      deliveryTime: bid.deliveryTime || '',
      deliveryUnit: bid.deliveryUnit || 'Days',
      proposal: bid.proposal || ''
    });
    setMilestones(bid.milestones || [
      { id: Date.now(), milestorneName: '', amount: '', currency: 'XAF' }
    ]);
    setCharCount(bid.proposal?.length || 0);
    setOpenEditDialog(true);
  };
  const handleEditClose = () => {
    setOpenEditDialog(false);
    setSelectedBid(null);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setBidData({ ...bidData, [name]: value });
    if (name === 'proposal') {
      setCharCount(value.length);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const bidAmount = Number(bidData.bidAmount);
    const milestoneSum = milestones.reduce((acc, m) => acc + Number(m.amount || 0), 0);

    // ✅ Proposal validation
    if (bidData.proposal.length < 100) {
      setErrors({ proposal: "Proposal must be at least 100 characters" });
      setLoading(false);
      return;
    }

    // ✅ Milestone validation
    if (bidAmount !== milestoneSum) {
      setErrors({ milestones: `Milestone total (${milestoneSum}) must equal Bid Amount (${bidAmount}).` });
      setLoading(false);
      return;
    }

    const updatedBid = {
      ...bidData,
      milestones,
    };

    try {
      await dispatch(updateBid(selectedBid?._id, updatedBid) as any);
      handleEditClose();
    } catch (err) {
      console.error("Error updating bid:", err);
    } finally {
      setLoading(false);
    }
  };


  const addMilestone = () => {
    setMilestones([...milestones, { id: Date.now(), milestorneName: '', amount: '', currency: 'XAF' }]);
  };
  const removeMilestone = (id: any) => {
    setMilestones(milestones.filter(m => m.id !== id));
  };
  const handleMilestoneChange = (id: any, field: string, value: string) => {
    setMilestones(milestones.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

  const handleStatusChange = (bidId: string, newStatus: string) => {
    setStatusUpdates(prev => ({
      ...prev,
      [bidId]: newStatus
    }));

    // Here you would typically save the status change to your backend
    console.log(`Updating bid ${bidId} status to:`, newStatus);
    // dispatch(updateBidStatus(bidId, newStatus));
  };

  const toggleRowExpand = (bidId: string) => {
    setExpandedRow(expandedRow === bidId ? null : bidId);
  };
  return (
    <Box sx={{ p: 3 }}>
      {/* Withdraw Confirmation */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Withdraw Bid Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to withdraw your bid on {selectedBid?.projectId?.eventId?.eventName}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleWithdrawBid} color="error">Yes, Withdraw Bid</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Bid Form Dialog */}
      <Dialog open={openEditDialog} onClose={handleEditClose} maxWidth="md" fullWidth>
        <DialogTitle>Edit Your Bid</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>

            {/* --- Bid Amount & Delivery --- */}
            <Typography variant="h6" mb={2}>Bid Details</Typography>
            <Grid container spacing={2} mb={3}>
              <Grid item xs={12} md={5}>
                <TextField
                  fullWidth
                  name="bidAmount"
                  label="Bid Amount (XAF)"
                  value={bidData.bidAmount}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={7}>
                <Stack direction="row" spacing={2}>
                  <TextField
                    name="deliveryTime"
                    label="Delivery Time"
                    value={bidData.deliveryTime}
                    onChange={handleInputChange}
                    fullWidth
                  />
                  <TextField
                    select
                    name="deliveryUnit"
                    value={bidData.deliveryUnit}
                    onChange={handleInputChange}
                    sx={{ minWidth: 120 }}
                  >
                    <MenuItem value="Days">Days</MenuItem>
                    <MenuItem value="Weeks">Weeks</MenuItem>
                    <MenuItem value="Months">Months</MenuItem>
                  </TextField>
                </Stack>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            {/* --- Proposal --- */}
            <Typography variant="h6" mb={1}>Proposal</Typography>
            <TextField
              fullWidth
              multiline
              minRows={4}
              name="proposal"
              value={bidData.proposal}
              onChange={handleInputChange}
              helperText={`${charCount} characters (min 100 required)`}
              sx={{ mb: 3 }}
            />

            <Divider sx={{ my: 3 }} />

            {/* --- Milestones --- */}
            <Typography variant="h6" mb={2}>Milestone Payments</Typography>
            {milestones.map((milestone, index) => (
              <Grid container spacing={2} key={milestone.id} mb={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    placeholder={`Milestone ${index + 1}`}
                    value={milestone.milestorneName}
                    onChange={(e) => handleMilestoneChange(milestone.id, 'milestorneName', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    placeholder="Amount"
                    value={milestone.amount}
                    onChange={(e) => handleMilestoneChange(milestone.id, 'amount', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <TextField
                    select
                    fullWidth
                    value={milestone.currency}
                    onChange={(e) => handleMilestoneChange(milestone.id, 'currency', e.target.value)}
                  >
                    <MenuItem value="XAF">XAF</MenuItem>
                    <MenuItem value="USD">USD</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} md={1}>
                  <IconButton onClick={() => removeMilestone(milestone.id)}>
                    <RemoveIcon />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
            {errors?.milestones && (
              <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                {errors.milestones}
              </Typography>
            )}

            <Button onClick={addMilestone} startIcon={<AddIcon />}>Add Milestone</Button>

            {/* --- Submit --- */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="success"
              sx={{ mt: 3 }}
            >
              {loading ? <CircularProgress size={16} /> : "Update Bid"}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Client Info */}
      <ProviderOrganizerInfoModal
        isModalOpen={openViewDialog}
        handleCloseModal={() => setOpenViewDialog(false)}
        select={selectedOrg}
      />

      {/* Bids Table */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="bids table">
          <TableHead>
            <TableRow sx={{ backgroundColor: 'grey.800' }} >
              <TableCell sx={{ color: 'black', fontWeight: 'bold', py: 2 }}>Project</TableCell>
              <TableCell sx={{ color: 'black', fontWeight: 'bold', py: 2 }}>Time to bid</TableCell>
              <TableCell sx={{ color: 'black', fontWeight: 'bold', py: 2 }}>Bid Rank</TableCell>
              <TableCell sx={{ color: 'black', fontWeight: 'bold', py: 2 }}>Winning Bid</TableCell>
              <TableCell sx={{ color: 'black', fontWeight: 'bold', py: 2 }}>Your Bid</TableCell>
              <TableCell sx={{ color: 'black', fontWeight: 'bold', py: 2 }}>Actions Taken</TableCell>
              <TableCell sx={{ color: 'black', fontWeight: 'bold', py: 2 }}>Client Information</TableCell>
              <TableCell sx={{ color: 'black', fontWeight: 'bold', py: 2 }}>Chat Initiated</TableCell>
              <TableCell sx={{ color: 'black', fontWeight: 'bold', py: 2 }}>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {_mybids?.map((bid: any, index: number) => (
              <React.Fragment key={index}>
                <TableRow
                  sx={{
                    boxShadow: bid?.status === 'withdrawn' ? 'inset 0 0 8px rgba(244, 67, 54, 0.6)' : 'none',
                    borderTop: '1px solid',
                    borderColor: 'grey.700',
                    '&:hover': { backgroundColor: 'grey.600' },
                    cursor: 'pointer'
                  }}
                  onClick={() => toggleRowExpand(bid._id)}
                >
                  <TableCell sx={{ py: 2 }}>
                    <Typography
                      component={Link}
                      to={`/project/${bid.projectId?._id}`}
                      sx={{
                        color: 'black',
                        textDecoration: 'none',
                        cursor: 'pointer',
                        '&:hover': {
                          textDecoration: 'underline',
                        }
                      }}
                    >
                      {bid.projectId?.eventId?.eventName}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ py: 2 }}>{formatEventDate(bid?.createdAt)}</TableCell>
                  <TableCell sx={{ py: 2 }}>#{bid?.bidInfo?.yourBidRank} of {bid?.bidInfo?.totalBidsOnProject} bids</TableCell>
                  <TableCell sx={{ py: 2 }}>
                    <Chip
                      label={`${bid?.winningBid} XAF`}
                      size="small"
                      sx={{
                        backgroundColor: 'primary.main',
                        color: 'white',
                        fontWeight: 'bold'
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ py: 2 }}>{bid?.bidAmount} XAF</TableCell>
                  <TableCell sx={{ py: 2 }}>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton size="small" sx={{ color: 'green' }}
                        disabled={bid?.status === 'withdrawn'} onClick={(e) => {
                          e.stopPropagation();
                          handleEditOpen(bid);
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        sx={{ color: 'red' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenDialog(bid);
                        }}
                        disabled={bid?.status === 'withdrawn'}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ py: 2 }}>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<EyeIcon />}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewOpenDialog(bid?.projectId?.createdBy);
                      }}
                      disabled={bid?.status === 'withdrawn'}
                      sx={{
                        backgroundColor: bid.chat ? 'success.main' : 'grey.700',
                        color: bid.chat ? 'white' : 'grey.400',
                      }}
                    >
                      View
                    </Button>
                  </TableCell>
                  <TableCell sx={{ py: 2 }}>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<ChatIcon />}
                      disabled={bid?.status === 'withdrawn'}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate("/messaging-&-client-relationship");
                        sessionStorage.setItem('currentChatProvider', JSON.stringify(bid.projectId?.createdBy?._id));
                      }}
                      sx={{
                        backgroundColor: bid.chat ? 'success.main' : 'grey.700',
                        color: bid.chat ? 'white' : 'grey.400',
                      }}
                    >
                      Chat
                    </Button>
                  </TableCell>
                  <TableCell sx={{ py: 2 }}>
                    <IconButton size="small" sx={{ color: 'black' }}>
                      {expandedRow === bid._id ? <ArrowUpIcon sx={{ color: "black" }} /> : <ArrowDownIcon />}
                    </IconButton>
                  </TableCell>
                </TableRow>

                {/* Expanded Row Content */}
                <TableRow>
                  <TableCell style={{ padding: 0 }} colSpan={9}>
                    <Collapse in={expandedRow === bid._id} timeout="auto" unmountOnExit>
                      <Box sx={{ p: 3, backgroundColor: 'grey.100' }}>
                        <Typography variant="h6" gutterBottom>
                          Bid Details: {bid.projectId?.eventId?.eventName}
                        </Typography>

                        <Grid container spacing={3}>
                          <Grid item xs={12} md={6}>
                            <Typography variant="subtitle2" gutterBottom>Project Information</Typography>
                            <Typography><strong>Event:</strong> {bid.projectId?.eventId?.eventName}</Typography>
                            <Typography><strong>Location:</strong> {bid.projectId?.eventLocation}</Typography>
                            <Typography><strong>Budget Range:</strong> {bid.projectId?.orgBudget}</Typography>
                            <Typography><strong>Service Time:</strong> {new Date(bid.projectId?.serviceTime).toLocaleString()}</Typography>
                          </Grid>

                          <Grid item xs={12} md={6}>
                            <Typography variant="subtitle2" gutterBottom>Your Bid Information</Typography>
                            <Typography><strong>Bid Amount:</strong> {bid.bidAmount} XAF</Typography>
                            <Typography><strong>Delivery Time:</strong> {bid.deliveryTime} {bid.deliveryUnit}</Typography>
                            <Typography><strong>Time to bid:</strong> {formatEventDate(bid?.createdAt)}</Typography>

                            <Typography mt={2}><strong>Status:</strong>
                              <FormControl size="small" sx={{ ml: 1, minWidth: 120 }}>
                                <InputLabel>Status</InputLabel>
                                <Select
                                  value={statusUpdates[bid._id] || 'process'}
                                  label="Status"
                                  onChange={(e) => handleStatusChange(bid._id, e.target.value)}
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <MenuItem value="process">Process</MenuItem>
                                  <MenuItem value="ongoing">Ongoing</MenuItem>
                                </Select>
                              </FormControl>
                            </Typography>
                          </Grid>

                          <Grid item xs={12}>
                            <Typography variant="subtitle2" gutterBottom>Proposal</Typography>
                            <Paper sx={{ p: 2, backgroundColor: 'white' }}>
                              <Typography>{bid.proposal}</Typography>
                            </Paper>
                          </Grid>

                          {bid.milestones && bid.milestones.length > 0 && (
                            <Grid item xs={12}>
                              <Typography variant="subtitle2" gutterBottom>Milestones</Typography>
                              <Table size="small">
                                <TableHead>
                                  <TableRow>
                                    <TableCell>Milestone Name</TableCell>
                                    <TableCell align="right">Amount</TableCell>
                                    <TableCell>Currency</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {bid.milestones.map((milestone: any, idx: number) => (
                                    <TableRow key={idx}>
                                      <TableCell>{milestone.milestorneName}</TableCell>
                                      <TableCell align="right">{milestone.amount}</TableCell>
                                      <TableCell>{milestone.currency}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </Grid>
                          )}
                        </Grid>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

