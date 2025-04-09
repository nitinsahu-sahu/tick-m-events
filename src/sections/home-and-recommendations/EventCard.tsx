import { Box, Button, Card, CardContent, Grid, Typography, Avatar } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

export const TicketCard = ({ ticket }: any) => (
  <Card
    sx={{
      borderRadius: 3,
      boxShadow: 3,
      backgroundImage: `url('./assets/images/event/image.png')`,
      backgroundSize: 'auto',
      backgroundPosition: 'center',
      overflow: 'visible',
      position: 'relative',
      mt:4

    }}
  >
    {ticket?.viewPromo && (
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 90,
          height: 90,
          overflow: 'hidden',
          borderTopLeftRadius: 24, // match card's radius (borderRadius: 3 = 24px)
          zIndex: 1,
          backgroundColor: 'transparent',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 26,
            left: -25,
            backgroundColor: '#0B2E4C',
            color: '#fff',
            px: 2,
            py: '2px',
            fontSize: '10px',
            fontWeight: 600,
            transform: 'rotate(-45deg)',
            width: '120px',
            textAlign: 'center',
            boxShadow: 2,
          }}
        >
          View Promo
        </Box>
      </Box>
    )}

    <CardContent sx={{ textAlign: 'center', position: 'relative' }}>
      <Avatar
        src={`/assets/images/home-and-recommendations/${ticket.image}`}
        alt={ticket.title}
        sx={{
          width: { xs: '80px', sm: '90px', md: '97px' },
          height: { xs: '80px', sm: '90px', md: '97px' },
          position: 'absolute',
          top: -40,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      />
      <Typography
        variant="h6"
        fontWeight={600}
        fontSize={{ xs: '15px', sm: '20px', md: '25px' }}
        mt={5}
        color="#0B2E4C"
      >
        {ticket.title}
      </Typography>
      <Typography
        variant="body2"
        color="black"
        fontWeight={400}
        fontSize={{ xs: '8px', sm: '12px', md: '16px' }}
      >
        {ticket.location} | {ticket.date} | {ticket.time}
      </Typography>
      <Typography
        variant="body2"
        fontSize={{ xs: '8px', sm: '12px', md: '16px' }}
        sx={{ color: ticket.statusColor, fontWeight: 700, mt: 1 }}
      >
        {ticket.status}
      </Typography>
      {/* Star Rating */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mt: 1,
        }}
      >
        {[...Array(5)].map((_, i) => (
          <StarIcon
            key={i}
            fontSize="small"
            sx={{
              color: i < Math.floor(ticket.rating) ? '#fbc02d' : '#ddd',
            }}
          />
        ))}
        <Typography fontWeight="bold" ml={0.5} fontSize={{ xs: '12px', sm: '14px' }}>
          {ticket.rating}
        </Typography>
      </Box>

      <Grid container spacing={2} mt={2} justifyContent="center">
        <Grid item xs={12} sm={10} md={11}>
          <Grid container spacing={2}>
            {['Book Now', 'Wishlist', 'Share'].map((text) => (
              <Grid item xs={4} key={text}>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    fontSize: { xs: '10px', sm: '14px', md: '14px' },
                    fontWeight: 500,
                  }}
                >
                  {text}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);
