import {
  Box,
  Typography,
  Select,
  MenuItem,
  Button,
  Stack,
} from '@mui/material';

export default function BookedServicesTable() {
  const services = [
    {
      service: 'DJ Animation',
      location: 'Douala',
      date: '10/02/2025',
      price: '250,000 XAF',
      status: 'Confirmed',
      actions: ['View Details', 'Contact'],
    },
    {
      service: 'DJ Animation',
      location: 'Douala',
      date: '10/02/2025',
      price: '250,000 XAF',
      status: 'Confirmed',
      actions: ['View Details', 'Contact'],
    },
    {
      service: 'DJ Animation',
      location: 'Douala',
      date: '10/02/2025',
      price: '250,000 XAF',
      status: 'Confirmed',
      actions: ['View Details', 'Contact'],
    },
    {
      service: 'DJ Animation',
      location: 'Douala',
      date: '10/02/2025',
      price: '250,000 XAF',
      status: 'Confirmed',
      actions: ['View Details', 'Contact'],
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        borderRadius: 2.5,
        border: '1px solid #E0E0E0',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.4)',
        p: 3,
        mt: 3,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
        List of Booked Services
      </Typography>

      <Select
        fullWidth
        defaultValue="All"
        variant="outlined"
        size="small"
        sx={{
          mb: 3,
          borderRadius: 1,
          backgroundColor: '#fff',
          '& .MuiSelect-icon': {
            color: 'black',
          },
        }}
      >
        <MenuItem value="All">All</MenuItem>
        {/* Add more filter items here */}
      </Select>

      <Box sx={{ overflowX: 'auto', verticalAlign:'middle',textAlign:'center', borderRadius: 2 }}>
        <Box sx={{ minWidth: 800 }}>
          {/* Table Header */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1.5fr 1.5fr 1.2fr 1.2fr 1fr 2fr',
              backgroundColor: '#0284C7',
              color: 'white',
              py: 1.5,
              px: 2,
              fontWeight: 600,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
          >
            <div>Service</div>
            <div>Location</div>
            <div>Date</div>
            <div>Price</div>
            <div>Status</div>
            <div>Actions</div>
          </Box>

          {/* Table Body */}
          <Box
            sx={{
              maxHeight: 300,
              overflowY: 'auto',
              '&::-webkit-scrollbar': {
                width: '2px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#0B2E4C',
                borderRadius: '10px',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: '#e0e0e0',
                borderRadius: '10px',
              },
            }}
          >
            {services.map((item, idx) => (
              <Box
                key={idx}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '1.5fr 1.5fr 1.2fr 1.2fr 1fr 2fr',
                  alignItems: 'center',
                  py: 1.5,
                  px: 2,
                  borderBottom:
                    idx !== services.length - 1 ? '1px solid rgba(195, 195, 195, 1)' : 'none',
                  backgroundColor: '#f5f5f5',
                }}
              >
                <div>{item.service}</div>
                <div>{item.location}</div>
                <div>{item.date}</div>
                <div>{item.price}</div>
                <div>
                  <Typography sx={{ color: 'green', fontWeight: 'bold' }}>{item.status}</Typography>
                </div>

                <Box>
                  {item.actions.map((label, i) => (
                    <Button key={i} size="small" sx={{border:1, m:1}}>
                      {label}
                    </Button>
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
