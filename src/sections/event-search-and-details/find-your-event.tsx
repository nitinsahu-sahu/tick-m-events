import {
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
  Grid,
  FormControl,
  InputLabel,
  IconButton,
  Box,
  TextField,
  Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useCallback, useEffect, useState } from 'react';
 
import FilterListIcon from '@mui/icons-material/FilterList';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { HeadingCommon } from 'src/components/multiple-responsive-heading/heading';
import { PopularEvent } from './PopularEvent';
 
export function FindYourEvent({ handleEventDetails }: any) {
  const { fullData } = useSelector((state: RootState) => state?.event);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    date: '',
    location: '',
    price: '',
    popularity: '',
    availableTickets: false,
  });
  const [filteredEvents, setFilteredEvents] = useState(fullData);
  const [visibleEvents, setVisibleEvents] = useState(2); // Track how many events are visible
 
  // Combined filter function
  const applyFilters = useCallback(() => {
    let results = [...fullData];
    const today = new Date();
    // Apply search filter
    if (searchTerm) {
      results = results.filter(
        (event) =>
          event.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (event.description &&
            event.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (event.location && event.location.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
 
    // Apply category filter
    if (filters.category) {
      results = results.filter(
        (event) => event.category.toLowerCase() === filters.category.toLowerCase()
      );
    }
 
    // Apply location filter
    if (filters.location) {
      results = results.filter((event) =>
        event.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
 
    // Apply price filter
    if (filters.price === 'paid') {
      results = results.filter((event) =>
        event.tickets?.some((ticketGroup: any) =>
          ticketGroup.tickets?.some(
            (ticket: any) => ticket.price && ticket.price !== '0' && ticket.price !== 'Free'
          )
        )
      );
    } else if (filters.price === 'free') {
      results = results.filter((event) =>
        event.tickets?.some((ticketGroup: any) =>
          ticketGroup.tickets?.some(
            (ticket: any) => !ticket.price || ticket.price === '0' || ticket.price === 'Free'
          )
        )
      );
    }
 
    // Apply date filter (simplified example)
    if (filters.date) {
      results = results.filter((event) => {
        const eventDate = new Date(event.date);
 
        switch (filters.date) {
          case 'today': {
            return eventDate.toDateString() === today.toDateString();
          }
          case 'this_week': {
            const nextWeek = new Date(today);
            nextWeek.setDate(today.getDate() + 7);
            return eventDate >= today && eventDate <= nextWeek;
          }
          case 'this_month': {
            return (
              eventDate.getMonth() === today.getMonth() &&
              eventDate.getFullYear() === today.getFullYear()
            );
          }
          default: {
            return true;
          }
        }
      });
    }
 
    // Apply available tickets filter
    if (filters.availableTickets) {
      results = results.filter((event) =>
        event.tickets?.some((ticketGroup: any) =>
          ticketGroup.tickets?.some(
            (ticket: any) => ticket.isLimitedSeat && parseInt(ticket.totalTickets, 10) > 0
          )
        )
      );
    }
 
    setFilteredEvents(results);
    setVisibleEvents(2); // Reset visible events when filters change
  }, [fullData, searchTerm, filters]);
 
  // Update filters when they change
  const handleFilterChange = (filterName: string, value: string | boolean) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };
 
  // Apply filters when either search term or filters change
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);
 
  // Load more events
  const loadMoreEvents = () => {
    setVisibleEvents((prev) => prev + 2); // Show 2 more events
  };
 
  return (
    <Box boxShadow={3} borderRadius={3} mt={3}>
      {/* Top Bar with Search */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        bgcolor="#002244"
        p={1}
        sx={{ px: 3, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
      >
        <Box display="flex" alignItems="center" bgcolor="#fff" borderRadius={1} px={2} flex={1}>
          <SearchIcon color="action" />
          <TextField
            variant="standard"
            placeholder="Search Event"
            InputProps={{ disableUnderline: true }}
            fullWidth
            sx={{ ml: 1 }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>
        <IconButton sx={{ ml: 1, color: '#fff' }}>
          <FilterListIcon />
        </IconButton>
      </Box>
 
      {/* Filter Fields */}
      <Box sx={{ mx: 3, my: 3 }}>
        <HeadingCommon title="Find Your Event" weight={600} baseSize="34px" />
 
        <Grid container spacing={2}>
          {/* Category Filter */}
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel
                id="category-label"
                sx={{ color: 'black', '&.Mui-focused': { color: 'black' }, fontWeight: 500 }}
              >
                Category
              </InputLabel>
              <Select
                labelId="category-label"
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                sx={{
                  mt: 2,
                  borderRadius: 1,
                  bgcolor: '#fff',
                  color: 'black',
                  '.MuiOutlinedInput-notchedOutline': { borderColor: '#ccc' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#aaa' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#000' },
                  '.MuiSvgIcon-root': { color: 'black' },
                  fontSize: 16,
                }}
              >
                <MenuItem value="">All Categories</MenuItem>
                <MenuItem value="concert">Concerts</MenuItem>
                <MenuItem value="sports">Sports</MenuItem>
                <MenuItem value="comedy">Comedy</MenuItem>
                <MenuItem value="festival">Festival</MenuItem>
                <MenuItem value="conference">Conference</MenuItem>
              </Select>
            </FormControl>
          </Grid>
 
          {/* Date Filter */}
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel
                id="date-label"
                sx={{ color: 'black', '&.Mui-focused': { color: 'black' }, fontWeight: 500 }}
              >
                Date
              </InputLabel>
              <Select
                labelId="date-label"
                value={filters.date}
                onChange={(e) => handleFilterChange('date', e.target.value)}
                sx={{
                  mt: 2,
                  borderRadius: 1,
                  bgcolor: '#fff',
                  color: 'black',
                  '.MuiOutlinedInput-notchedOutline': { borderColor: '#ccc' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#aaa' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#000' },
                  '.MuiSvgIcon-root': { color: 'black' },
                  fontSize: 16,
                }}
              >
                <MenuItem value="">All Dates</MenuItem>
                <MenuItem value="today">Today</MenuItem>
                <MenuItem value="this_week">This Week</MenuItem>
                <MenuItem value="this_month">This Month</MenuItem>
              </Select>
            </FormControl>
          </Grid>
 
          {/* Location Filter */}
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel
                shrink
                sx={{ color: 'black', '&.Mui-focused': { color: 'black' }, fontWeight: 500 }}
              >
                Location
              </InputLabel>
              <TextField
                placeholder="Enter City"
                variant="outlined"
                fullWidth
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                sx={{
                  mt: 2,
                  bgcolor: '#fff',
                  borderRadius: 1,
                  fontSize: 16,
                  '& .MuiOutlinedInput-root': {
                    color: 'black',
                    borderRadius: 1,
                    '& fieldset': { borderColor: 'black' },
                    '&:hover fieldset': { borderColor: 'black' },
                    '&.Mui-focused fieldset': { borderColor: 'black' },
                  },
                }}
              />
            </FormControl>
          </Grid>
 
          {/* Price Filter */}
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel
                id="price-label"
                sx={{ color: 'black', '&.Mui-focused': { color: 'black' }, fontWeight: 500 }}
              >
                Price
              </InputLabel>
              <Select
                labelId="price-label"
                value={filters.price}
                onChange={(e) => handleFilterChange('price', e.target.value)}
                sx={{
                  mt: 2,
                  borderRadius: 1,
                  bgcolor: '#fff',
                  color: 'black',
                  '.MuiOutlinedInput-notchedOutline': { borderColor: '#ccc' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#aaa' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#000' },
                  '.MuiSvgIcon-root': { color: 'black' },
                  fontSize: 16,
                }}
              >
                <MenuItem value="">All Prices</MenuItem>
                <MenuItem value="free">Free</MenuItem>
                <MenuItem value="paid">Paid</MenuItem>
              </Select>
            </FormControl>
          </Grid>
 
          {/* Popularity Filter */}
          <Grid item xs={12} sm={6} md={8}>
            <FormControl fullWidth>
              <InputLabel
                id="popularity-label"
                sx={{ color: 'black', '&.Mui-focused': { color: 'black' }, fontWeight: 500 }}
              >
                Sort By
              </InputLabel>
              <Select
                labelId="popularity-label"
                value={filters.popularity}
                onChange={(e) => handleFilterChange('popularity', e.target.value)}
                sx={{
                  mt: 2,
                  borderRadius: 1,
                  bgcolor: '#fff',
                  color: 'black',
                  '.MuiOutlinedInput-notchedOutline': { borderColor: '#ccc' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#aaa' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#000' },
                  '.MuiSvgIcon-root': { color: 'black' },
                  fontSize: 16,
                }}
              >
                <MenuItem value="">Default</MenuItem>
                <MenuItem value="tickets_sold">Tickets Sold</MenuItem>
                <MenuItem value="ratings">Ratings</MenuItem>
                <MenuItem value="date_asc">Date (Oldest First)</MenuItem>
                <MenuItem value="date_desc">Date (Newest First)</MenuItem>
              </Select>
            </FormControl>
          </Grid>
 
          {/* Available Tickets Checkbox */}
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                border: '1px solid #ccc',
                borderRadius: 1,
                bgcolor: '#fff',
                padding: '1px 16px',
                mt: 2,
              }}
            >
              <HeadingCommon
                variant="subtitle2"
                title="Available Tickets"
                weight={400}
                baseSize="16px"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.availableTickets}
                    onChange={(e) => handleFilterChange('availableTickets', e.target.checked)}
                  />
                }
                label="Only show available tickets"
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
 
      {/* Events Grid */}
      <Box mt={2} p={{ xs: 1, md: 1, lg: 2 }}>
        <Grid container spacing={3}>
          {filteredEvents.slice(0, visibleEvents).map((item: any) => (
            <Grid item xs={12} sm={6} md={6} key={item._id}>
              <PopularEvent event={item} handleEventDetails={handleEventDetails} />
            </Grid>
          ))}
        </Grid>
        {filteredEvents.length > visibleEvents && (
          <Box display="flex" justifyContent="center" mt={3}>
            <Button
              variant="contained"
              onClick={loadMoreEvents}
              sx={{
                backgroundColor: '#002244',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#003366',
                },
              }}
            >
              Load More
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}