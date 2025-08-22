import React, { useCallback, useEffect, useState } from 'react';
import {
  Box, Typography, TableContainer, Table, TableHead, TableRow, TableCell,
  TableBody, Paper, Chip, IconButton, Button, Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import {
  Visibility as EyeIcon,
  Check as CheckIcon,
  Remove as MinusIcon,
  Chat as ChatIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/redux/store';
import { getMyBids, withdrawnMyBids } from 'src/redux/actions/provider/projects/place-a-bd.action';
import { Link, useNavigate } from 'react-router-dom';
import { formatEventDate } from 'src/hooks/formate-time';
import { ProviderOrganizerInfoModal } from 'src/components/modal/provider-orgnizer-info-modal';

export function ProviderBidsList() {
  const dispatch = useDispatch<AppDispatch>();
  const { _mybids } = useSelector((state: RootState) => state?.provider);
  console.log(_mybids);
  
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBid, setSelectedBid] = useState<any>(null);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<any>({});
 

  useEffect(() => {
    dispatch(getMyBids());
  }, [dispatch]);

  const handleViewOpenDialog = (bid: any) => {
    setSelectedOrg(bid);
    setOpenViewDialog(true);
  };

  const handleViewCloseDialog = () => {
    setOpenViewDialog(false);
    setSelectedOrg(null);
  };

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


  return (
    <Box sx={{ p: 3 }}>
      {/* Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Withdraw Bid Confirmation
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to withdraw your bid on &quot;{selectedBid?.projectId?.eventId?.eventName}&quot;?
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleWithdrawBid} color="error" autoFocus>
            Yes, Withdraw Bid
          </Button>
        </DialogActions>
      </Dialog>

      {/* Client Info */}
      <ProviderOrganizerInfoModal
        isModalOpen={openViewDialog}
        handleCloseModal={handleViewCloseDialog}
        select={selectedOrg}
      />

      <TableContainer
        component={Paper}
        sx={{

          boxShadow: 3
        }}
      >
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
            </TableRow>
          </TableHead>
          <TableBody>
            {_mybids?.map((bid: any, index: any) => (
              <TableRow
                key={index}
                sx={{
                  boxShadow: bid?.status === 'withdrawn' ? 'inset 0 0 8px rgba(244, 67, 54, 0.6)' : 'none',
                  borderTop: '1px solid',
                  borderColor: 'grey.700',
                  '&:hover': { backgroundColor: 'grey.600' }
                }}
              >

                <TableCell sx={{ py: 2 }}><Typography
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
                </Typography></TableCell>
                <TableCell sx={{ py: 2 }}>{formatEventDate(bid?.createdAt)}</TableCell>
                <TableCell sx={{ py: 2 }}>#{bid?.bidInfo?.yourBidRank} of {bid?.bidInfo?.totalBidsOnProject} bids</TableCell>
                <TableCell sx={{ py: 2 }}>
                  <Chip
                    label="SEALED"
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
                      disabled={bid?.status === 'withdrawn'}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      sx={{ color: 'red' }}
                      onClick={() => handleOpenDialog(bid)}
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
                    onClick={() => handleViewOpenDialog(bid?.projectId?.createdBy)}
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
                    onClick={() => {
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

// Admin Bid Section
//  <Box sx={{ p: 3 }}>
//       <TableContainer
//         component={Paper}
//         sx={{

//           boxShadow: 3
//         }}
//       >
//         <Table sx={{ minWidth: 650 }} aria-label="bids table">
//           <TableHead>
//             <TableRow sx={{ backgroundColor: 'grey.800' }} >
//               <TableCell sx={{ color: 'black', fontWeight: 'bold', py: 2 }}>Project</TableCell>
//               <TableCell sx={{ color: 'black', fontWeight: 'bold', py: 2 }}>Time to bid</TableCell>
//               <TableCell sx={{ color: 'black', fontWeight: 'bold', py: 2 }}>Bid Rank</TableCell>
//               <TableCell sx={{ color: 'black', fontWeight: 'bold', py: 2 }}>Winning Bid</TableCell>
//               <TableCell sx={{ color: 'black', fontWeight: 'bold', py: 2 }}>Your Bid</TableCell>
//               <TableCell sx={{ color: 'black', fontWeight: 'bold', py: 2 }}>Actions Taken</TableCell>
//               <TableCell sx={{ color: 'black', fontWeight: 'bold', py: 2 }}>Client Information</TableCell>
//               <TableCell sx={{ color: 'black', fontWeight: 'bold', py: 2 }}>Chat Initiated</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {_mybids?.map((bid: any, index: any) => (
//               <TableRow
//                 key={index}
//                 sx={{
//                   borderTop: '1px solid',
//                   borderColor: 'grey.700',
//                   '&:hover': { backgroundColor: 'grey.600' }
//                 }}
//               >

//                 <TableCell sx={{ py: 2 }}><Typography
//                   component={Link}
//                   to={`/project/${bid.projectId?._id}`}
//                   sx={{
//                     color: 'black',
//                     textDecoration: 'none',
//                     cursor: 'pointer',
//                     '&:hover': {
//                       textDecoration: 'underline',
//                     }
//                   }}
//                 >
//                   {bid.projectId?.eventId?.eventName}
//                 </Typography></TableCell>
//                 <TableCell sx={{ py: 2 }}>{formatEventDate(bid?.createdAt)}</TableCell>
//                 <TableCell sx={{ py: 2 }}>#{bid?.bidInfo?.yourBidRank} of {bid?.bidInfo?.totalBidsOnProject} bids</TableCell>
//                 <TableCell sx={{ py: 2 }}>
//                   <Chip
//                     label="SEALED"
//                     size="small"
//                     sx={{
//                       backgroundColor: 'primary.main',
//                       color: 'white',
//                       fontWeight: 'bold'
//                     }}
//                   />
//                 </TableCell>
//                 <TableCell sx={{ py: 2 }}>{bid?.bidAmount} XAF</TableCell>
//                 <TableCell sx={{ py: 2 }}>
//                   <Box sx={{ display: 'flex', gap: 1 }}>
//                     <IconButton size="small" sx={{ color: 'grey.400' }}>
//                       <EyeIcon fontSize="small" />
//                     </IconButton>
//                     <IconButton size="small" sx={{ color: 'grey.400' }}>
//                       <CheckIcon fontSize="small" />
//                     </IconButton>
//                     <IconButton size="small" sx={{ color: 'grey.400' }}>
//                       <MinusIcon fontSize="small" />
//                     </IconButton>
//                   </Box>
//                 </TableCell>
//                 <TableCell sx={{ py: 2 }}>
//                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
//                     {/* {bid.client.country && (
//                       <Typography component="span" variant="body2">
//                         Client Country Flag
//                         IN
//                       </Typography>
//                     )} */}
//                     <Typography component="span" variant="body2">
//                       IN
//                     </Typography>
//                     <Typography component="span" variant="body2">
//                       {/* Client Rating */}
//                       2
//                     </Typography>
//                     <Typography component="span" variant="body2" color="grey.400">
//                       💬 2
//                     </Typography>
//                     {/* {bid.client.reviews !== undefined && (
//                       <Typography component="span" variant="body2" color="grey.400">
//                         Client Review
//                         💬 2
//                       </Typography>
//                     )} */}
//                   </Box>
//                 </TableCell>
//                 <TableCell sx={{ py: 2 }}>
//                   <Button
//                     variant="contained"
//                     size="small"
//                     startIcon={<ChatIcon />}
//                     onClick={() => {
//                       navigate("/messaging-&-client-relationship");
//                       sessionStorage.setItem('currentChatProvider', JSON.stringify(bid.projectId?.createdBy?._id));
//                     }}
//                     sx={{
//                       backgroundColor: bid.chat ? 'success.main' : 'grey.700',
//                       color: bid.chat ? 'white' : 'grey.400',
//                       '&:hover': {
//                         backgroundColor: bid.chat ? 'success.dark' : 'grey.600'
//                       }
//                     }}
//                   >
//                     Chat
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>