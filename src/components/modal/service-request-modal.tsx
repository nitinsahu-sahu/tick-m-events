import React, { useState } from 'react';
import { Modal, Box, Typography, Button, Avatar, Divider, Chip } from "@mui/material";
import { styled } from "@mui/material/styles";
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from 'src/redux/store';
import { HeadingCommon } from "../multiple-responsive-heading/heading";
import { updateOrganizerDecision } from '../../redux/actions/service-request';


const ModalContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: '900px',
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[24],
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
  maxHeight: '90vh',
  overflowY: 'auto',
  [theme.breakpoints.up('sm')]: {
    width: '80%',
  },
  [theme.breakpoints.up('md')]: {
    width: '70%',
  },
}));

const SectionHeader = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  borderBottom: `2px solid ${theme.palette.divider}`,
}));

const DetailItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  marginBottom: theme.spacing(1.5),
}));

const DetailLabel = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  minWidth: '140px',
  color: theme.palette.text.secondary,
}));

const DetailValue = styled(Typography)(({ theme }) => ({
  flex: 1,
}));

const HtmlContent = styled(Box)(({ theme }) => ({
  '& p': {
    marginBottom: theme.spacing(1),
  },
  '& h3, & h4': {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  '& ul, & ol': {
    paddingLeft: theme.spacing(3),
    marginBottom: theme.spacing(1),
  },
}));

interface DetailsModalProps {
  open: boolean;
  onClose: () => void;
  data: any;
}

export const ServiceRequestModal = ({ open, onClose, data }: DetailsModalProps) => {
  if (!data) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="event-details-modal"
      aria-describedby="event-details-description"
    >
      <ModalContainer>
        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              color: 'text.secondary',
              borderColor: 'divider',
              '&:hover': {
                borderColor: 'text.secondary'
              }
            }}
          >
            Close
          </Button>
        </Box>
        <Box display="flex" alignItems="center" mb={3}>
          {data.organizerId?.avatar?.url && (
            <Avatar
              src={data.organizerId.avatar.url}
              sx={{ width: 60, height: 60, mr: 2 }}
            />
          )}
          <Box>
            <HeadingCommon variant="h4" title={data.eventId?.eventName || 'Event Details'} />
            <Typography variant="subtitle2" color="text.secondary">
              Organized by {data.organizerId?.name}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={4}>
          {/* Left Column */}
          <Box flex={1}>
            <SectionHeader variant="h6">Event Information</SectionHeader>
            <DetailItem>
              <DetailLabel variant="body2">Date & Time:</DetailLabel>
              <DetailValue variant="body2">
                {new Date(data.eventId?.date).toLocaleDateString()} at {data.eventId?.time}
              </DetailValue>
            </DetailItem>

            <DetailItem>
              <DetailLabel variant="body2">Location:</DetailLabel>
              <DetailValue variant="body2">
                {data.eventId?.location}
              </DetailValue>
            </DetailItem>

            <SectionHeader variant="h6" sx={{ mt: 3 }}>Service Request</SectionHeader>
            <DetailItem>
              <DetailLabel variant="body2">Service Type:</DetailLabel>
              <DetailValue variant="body2">
                <Chip
                  label={data.serviceRequestId?.serviceType}
                  color="primary"
                  size="small"
                  sx={{ fontWeight: 500, textTransform: "capitalize" }}
                />
              </DetailValue>
            </DetailItem>

            <DetailItem>
              <DetailLabel variant="body2">Budget:</DetailLabel>
              <DetailValue variant="body2">
                {data.serviceRequestId?.budget}
              </DetailValue>
            </DetailItem>

            <DetailItem>
              <DetailLabel variant="body2">Req. by Organizer:</DetailLabel>
              <DetailValue variant="body2" textTransform="capitalize">
                {data.orgRequirement}
              </DetailValue>
            </DetailItem>

            <DetailItem>
              <DetailLabel variant="body2">Negotiable:</DetailLabel>
              <DetailValue variant="body2">
                <Chip
                  label={`${data.orgBudget} XAF` || 'NA'}
                  color={data.orgBudget ? "success" : "default"}
                  size="small"
                  variant="outlined"
                />
              </DetailValue>
            </DetailItem>

            <DetailItem>
              <DetailLabel variant="body2">Organizer Status:</DetailLabel>
              <DetailValue variant="body2">
                <Chip
                  sx={{textTransform:'capitalize'}}

                  label={data.orgStatus}
                  color={
                    data.orgStatus === 'accepted' ? 'success' :
                      data.orgStatus === 'rejected' ? 'error' : data.orgStatus === 'request' ? 'info' : 'info'
                  }
                />
              </DetailValue>
            </DetailItem>
            {data.providerHasProposed && (
              <>
                <Divider sx={{ my: 4 }} />
                <SectionHeader variant="h6">Proposal from Provider</SectionHeader>

                <DetailItem>
                  <DetailLabel variant="body2">Proposed Amount:</DetailLabel>
                  <DetailValue variant="body2">
                    <Chip
                      label={`${data.providerProposal?.amount} XAF` || 'NA'}
                      color={data.providerProposal?.amount ? "success" : "default"}
                      size="small"
                      variant="outlined"
                    />
                  </DetailValue>
                </DetailItem>

                <DetailItem>
                  <DetailLabel variant="body2">Estimated Duration:</DetailLabel>
                  <DetailValue variant="body2">
                    {data.providerProposal?.days} days
                  </DetailValue>
                </DetailItem>
                
                <DetailItem>
                  <DetailLabel variant="body2">Status:</DetailLabel>
                  <DetailValue variant="body2">
                  <Chip
                  sx={{textTransform:'capitalize'}}
                    label={data.providerStatus}
                    color={
                      data.providerStatus === 'accepted' ? 'success' :
                        data.providerStatus === 'rejected' ? 'error' : data.providerStatus === 'request' ? 'info' : 'info'
                    }
                  />
                </DetailValue>
                </DetailItem>
              </>
            )}

          </Box>

          {/* Right Column */}
          <Box flex={1}>
            <SectionHeader variant="h6">Organizer Details</SectionHeader>
            <DetailItem>
              <DetailLabel variant="body2">Name:</DetailLabel>
              <DetailValue variant="body2">
                {data.organizerId?.name}
              </DetailValue>
            </DetailItem>

            <DetailItem>
              <DetailLabel variant="body2">Email:</DetailLabel>
              <DetailValue variant="body2">
                <a href={`mailto:${data.organizerId?.email}`}>
                  {data.organizerId?.email}
                </a>
              </DetailValue>
            </DetailItem>

            <SectionHeader variant="h6" sx={{ mt: 3 }}>Event Description</SectionHeader>
            <HtmlContent dangerouslySetInnerHTML={{ __html: data.eventId?.description || '' }} />

            <SectionHeader variant="h6" sx={{ mt: 3 }}>Service Details</SectionHeader>
            <HtmlContent dangerouslySetInnerHTML={{ __html: data.serviceRequestId?.description || '' }} />
            {data.providerHasProposed && (
              <>
                <Divider sx={{ my: 4 }} />
                <SectionHeader variant="h6" sx={{ mt: 3 }}>Provider Message</SectionHeader>
                <HtmlContent dangerouslySetInnerHTML={{ __html: data.providerProposal?.message || '' }} />
              </>
            )}

          </Box>
        </Box>
      </ModalContainer>
    </Modal>
  );
};