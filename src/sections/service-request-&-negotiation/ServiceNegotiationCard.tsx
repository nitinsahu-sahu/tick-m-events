import { Box, Typography, LinearProgress, TextField } from "@mui/material";

const ServiceNegotiationCard = () =>(
    <Box
      sx={{
        backgroundColor: "#fff",
        borderRadius: "16px",
        p: 3,
        mt:3,
        border: '1px solid #E0E0E0',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.4)',
      }}
    >
      <Typography fontWeight={600} fontSize={18} mb={2}>
        Service Request & Negotiation
      </Typography>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Messaging & Negotiation Content"
        sx={{
          mb: 2,
          borderRadius: "12px",
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
            height: 42,
          },
        }}
      />

      {/* Progress bar */}
      <Box sx={{ position: "relative", mt: 1, mb: 1 }}>
        <LinearProgress
          variant="determinate"
          value={35} // adjust this to reflect step progress
          sx={{
            height: 8,
            borderRadius: 5,
            backgroundColor: "#e0e0e0",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#002C4B", // navy blue progress
              borderRadius: 5,
            },
          }}
        />
        {/* Step labels */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 1,
            px: 0.5,
          }}
        >
          <Typography fontSize={13}>Submission</Typography>
          <Typography fontSize={13}>Negotiation</Typography>
          <Typography fontSize={13}>Validation</Typography>
        </Box>
      </Box>
    </Box>
  );


export default ServiceNegotiationCard;
