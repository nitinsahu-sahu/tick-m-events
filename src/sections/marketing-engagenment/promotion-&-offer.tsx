import { LoadingButton } from '@mui/lab';
import {
  Button, SelectChangeEvent, Typography, Paper, TextField, FormControlLabel, FormControl,
  InputLabel, Select, MenuItem, Box, Grid, Radio, RadioGroup
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { promotionCreate, promotionEvents } from 'src/redux/actions/promotionAndOffer';
import { AppDispatch, RootState } from 'src/redux/store';

interface ApiResult {
  status: number;
  type: string;
  message: any;
  // Add other properties if needed
}

export function PromotionsAndOffers({event}:any) {
  const dispatch = useDispatch<AppDispatch>();
  const { eventsWithOrdersAndParticiapnt } = useSelector((state: RootState) => state?.promotionList);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const [selectedDiscounts, setSelectedDiscounts] = useState('');
  const handleDiscountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDiscounts(event.target.value);
  };
  useEffect(() => {
    dispatch(promotionEvents())
  }, [dispatch])
  const [promotionFormData, setPromotionFormData] = useState({
    discountValue: '',
    ticketSelection: '',
    validityPeriodStart: '',
    validityPeriodEnd: '',
  });
  const [promoCode, setPromoCode] = useState('')
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handlePromotionChange = (event: any) => {
    event.preventDefault(); // Prevent default form submission behavior
    const { name, value } = event.target;
    setPromotionFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePromoCodeChange = (e: any) => {
    const value = e.target.value.toUpperCase(); // Convert to uppercase
    setPromoCode(value); // Store in state
  };

  const handlePomotionsCreate = useCallback(
    async (event: any) => {
      event.preventDefault();

      if (!selectedEvent?._id) {
        toast.error('Please select an event.');
        return;
      }

      const validityStart = new Date(promotionFormData.validityPeriodStart);
      const validityEnd = new Date(promotionFormData.validityPeriodEnd);
      const eventCreatedAt = new Date(selectedEvent.createdAt);
      const eventEndDate = new Date(selectedEvent.date);

      if (validityStart < eventCreatedAt || validityEnd > eventEndDate) {
        toast.error(
          `Validity period must be between event creation date (${eventCreatedAt.toISOString().split('T')[0]}) and event end date (${eventEndDate.toISOString().split('T')[0]}).`
        );
        return;
      }

      const formEventData = new FormData();
      formEventData.append('eventId', selectedEvent._id);
      formEventData.append('discountValue', promotionFormData.discountValue);
      formEventData.append('ticketSelection', promotionFormData.ticketSelection);
      formEventData.append('validityPeriodEnd', promotionFormData.validityPeriodEnd);
      formEventData.append('validityPeriodStart', promotionFormData.validityPeriodStart);
      formEventData.append('promoCode', promoCode);
      formEventData.append('promotionType', selectedDiscounts);

      try {
        const result = await dispatch(promotionCreate(formEventData));
        if ((result as ApiResult)?.status === 201) {
          toast.success(result?.message);
          setPromotionFormData({
            discountValue: '',
            ticketSelection: '',
            validityPeriodStart: '',
            validityPeriodEnd: '',
          });
          setPromoCode('');
          setSelectedDiscounts('');
          setShowCreateForm(false);
        } else {
          toast.error(result?.message);
        }
      } catch (error) {
        toast.error('Promotion creation failed');
      }
    },
    [promotionFormData, selectedDiscounts, promoCode, selectedEvent, dispatch]
  );

  const handleEventChange = (event: SelectChangeEvent<string>) => {
    const eventId = event.target.value;
    const foundEvent = eventsWithOrdersAndParticiapnt.find((e: any) => e._id === eventId);
    setSelectedEvent(foundEvent || null);
  };

  const today = new Date().toISOString().split('T')[0];
  let purchaseDeadline = today; // safe default fallback

  if (selectedEvent) {
    // Try to get deadline date string in ISO format
    const rawDeadline = selectedEvent.ticketConfiguration?.purchaseDeadlineDate || selectedEvent.date;
    if (rawDeadline) {
      // Parse and format as yyyy-mm-dd
      purchaseDeadline = new Date(rawDeadline).toISOString().split('T')[0];
    }
  }

  const isFormValid = Boolean(
    selectedDiscounts &&
    promotionFormData.discountValue &&
    promotionFormData.ticketSelection &&
    promotionFormData.validityPeriodStart &&
    promotionFormData.validityPeriodEnd &&
    promoCode
  );

  return (
    <Box p={3} boxShadow={3} mt={3} borderRadius={3} sx={{ border: '1px solid black' }}>

      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h6" fontSize={{ xs: 15, sm: 20, md: 26 }} fontWeight={500}>
          Promotions & Special Offers
        </Typography>

        <FormControl fullWidth size="small" sx={{ maxWidth: 300 }}>
          <InputLabel>Select Event</InputLabel>
          <Select
            value={selectedEvent?._id || ''}
            onChange={handleEventChange}
            label="Select Event"
          >
            {eventsWithOrdersAndParticiapnt.map((event: any) => (
              <MenuItem key={event._id} value={event._id}>
                {event.eventName} ({event.date})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Button
        fullWidth
        disabled={!selectedEvent}
        sx={{
          bgcolor: selectedEvent ? '#0B2E4C' : 'gray',
          color: 'white',
          py: 1.5,
          borderRadius: '10px',
          '&:hover': {
            bgcolor: selectedEvent ? '#083048' : 'gray',
          },
        }}
        onClick={() => {
          if (selectedEvent) setShowCreateForm(true);
        }}
      >
        Create a new Promotion
      </Button>


      {showCreateForm && (
        <Paper sx={{ p: 3, borderRadius: '10px', background: '#f5f5f5', mt: 3 }}>
          <Typography variant="subtitle1" fontWeight="bold" mb={2}>
            Create a Promotion
          </Typography>
          <form onSubmit={handlePomotionsCreate}>
            <Typography variant="body2" fontWeight="bold" mb={1}>
              Select Discount Type
            </Typography>
            <RadioGroup
              name="promotionType"
              value={selectedDiscounts}
              onChange={handleDiscountChange}
              row

            >
              {[
                { label: 'Percentage Discount', value: 'percentageDiscount' },
                { label: 'Fixed Value Discount', value: 'fixedValueDiscount' },
                { label: 'Group Offer', value: 'groupOffer' },
                { label: 'Early Buyer Discount', value: 'earlyBuyerDiscount' },
              ].map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio required />}
                  label={option.label}
                />
              ))}
            </RadioGroup>

            <Typography variant="body2" fontWeight="bold" mb={1}>
              {(() => {
                switch (selectedDiscounts) {
                  case 'percentageDiscount':
                    return 'Discount Percentage (%)';
                  case 'fixedValueDiscount':
                    return 'Discount Amount (XAF)';
                  case 'groupOffer':
                    return 'Group Size Required';
                  case 'earlyBuyerDiscount':
                    return 'Days Before Event for Discount';
                  default:
                    return 'Discount Value';
                }
              })()}
            </Typography>

            <TextField
              fullWidth
              required
              name="discountValue"
              type="number"
              placeholder={
                selectedDiscounts === 'percentageDiscount'
                  ? 'Enter % (e.g., 10)'
                  : selectedDiscounts === 'fixedValueDiscount'
                    ? 'Enter amount (e.g., 2000)'
                    : selectedDiscounts === 'groupOffer'
                      ? 'Enter group size (e.g., 5)'
                      : selectedDiscounts === 'earlyBuyerDiscount'
                        ? 'Enter days before event (e.g., 7)'
                        : 'Enter discount value'
              }
              InputProps={{
                endAdornment:
                  selectedDiscounts === 'percentageDiscount'
                    ? <span style={{ marginLeft: 8 }}>%</span>
                    : selectedDiscounts === 'fixedValueDiscount'
                      ? <span style={{ marginLeft: 8 }}>XAF</span>
                      : null,
              }}
              value={promotionFormData.discountValue}
              onChange={(e) => {
                const val = e.target.value;
                if (selectedDiscounts === 'percentageDiscount' && Number(val) > 100) {
                  toast.error('Percentage cannot exceed 100%');
                  return;
                }
                setPromotionFormData((prevData) => ({ ...prevData, discountValue: val }));
              }}
              sx={{ mb: 2 }}
            />
            {/* Ticket Selection */}
            <Typography variant="body2" fontWeight="bold" mb={1}>
              Ticket Selection
            </Typography>
            <Select
              fullWidth
              name="ticketSelection"
              value={promotionFormData.ticketSelection}
              onChange={handlePromotionChange}
              required
              displayEmpty
              sx={{ mb: 2 }}
            >
              <MenuItem value="" disabled>
                Select Ticket Type
              </MenuItem>

              {selectedEvent?.ticketConfiguration?.tickets?.map((ticket: any) => (
                <MenuItem key={ticket.id} value={ticket.id}>
                  {ticket.ticketType}
                </MenuItem>
              ))}
            </Select>
            {/* Validity Period */}
            <Typography variant="body2" fontWeight="bold" mb={1}>
              Validity Period
            </Typography>
            <Grid container spacing={2} mb={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  placeholder="Start Date"
                  required
                  name="validityPeriodStart"
                  type="date"
                  value={promotionFormData.validityPeriodStart}
                  onChange={handlePromotionChange}
                  inputProps={{
                    min: today,
                    max: purchaseDeadline,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  placeholder="End Date"
                  required
                  name="validityPeriodEnd"
                  type="date"
                  value={promotionFormData.validityPeriodEnd}
                  onChange={handlePromotionChange}
                  inputProps={{
                    min: promotionFormData.validityPeriodStart || today,
                    max: purchaseDeadline,
                  }}
                />
              </Grid>
            </Grid>

            {/* Promo Code */}
            <Typography variant="body2" fontWeight="bold" mb={1}>
              Promo Code
            </Typography>
            <TextField
              fullWidth
              placeholder="Promo Code"
              name="promoCode"
              type="text"
              inputProps={{
                style: { textTransform: 'uppercase' },
              }}
              sx={{
                '& input': {
                  textTransform: 'uppercase',
                },
              }}
              value={promoCode}
              onChange={handlePromoCodeChange}
            />

            {/* Submit Button */}
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              color="inherit"
              variant="contained"
              disabled={!isFormValid} // 👈 Disable if form is incomplete
              sx={{
                mt: 2,
                backgroundColor: isFormValid ? '#0B2E4C' : 'gray',
                '&:hover': {
                  backgroundColor: isFormValid ? '#083048' : 'gray',
                },
              }}
            >
              Save Promotion
            </LoadingButton>

          </form>
        </Paper>
      )}
    </Box>
  );
}