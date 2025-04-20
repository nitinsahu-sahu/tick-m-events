import { Box, Button, Card, CardContent, Grid, Typography, Avatar } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

export const PopularEvent = ({ ticket }: any) => (
  <Card
    sx={{
      borderRadius: 3,
      boxShadow: 3,
      backgroundImage: `url('./assets/images/event/image.png')`,
      backgroundSize: 'auto',
      backgroundPosition: 'center',
      overflow: 'visible',
      position: 'relative',
      mt: 4,
    }}
  >
    {ticket.viewPromo && (
      <Box
        sx={{
          position: 'absolute',
          top: 46,
          left: -12,
          overflow: 'hidden',
          backgroundColor: '#0B2E4C',
          color: '#fff',
          px: 2,
          py: '2px',
          fontSize: '10px',
          fontWeight: 600,
          transform: 'rotate(-45deg)',
          width: '120px',
          textAlign: 'center',
          zIndex: 1,
          boxShadow: 2,
        }}
      >
        View Promo
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
          border: '3px solid #fff',
          boxShadow: '0 0 0 4px #0B2E4C',
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
        {ticket.rating} ★ &nbsp; | &nbsp; {ticket.price} &nbsp; | {ticket.location}
      </Typography>

      <Grid container spacing={2} mt={2} justifyContent="center">
        {['View Details', 'Chat Now'].map((text) => (
          <Grid item key={text}>
            <Button
              variant="contained"
              sx={{
                fontSize: { xs: '10px', sm: '14px', md: '14px' },
                fontWeight: 500,
                backgroundColor: '#0B2E4C',
                borderRadius: 1.4,
                py: 1,
                px: 2.5,
                minWidth: '100px',
              }}
            >
              {text}
            </Button>
          </Grid>
        ))}
      </Grid>
    </CardContent>
  </Card>
);
