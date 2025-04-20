import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
  TextField,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
  Switch,
  Checkbox
} from "@mui/material";
import { DashboardContent } from "src/layouts/dashboard";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import StarIcon from "@mui/icons-material/Star";

import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const verifications = [
  { label: "Email Verified", status: true },
  { label: "Phone Verified", status: false },
  { label: "Payment Verified", status: true },
  { label: "Identity Verified", status: false },
  { label: "Facebook Verified", status: true },
];


const reviews = [
  {
    name: "Jean M.",
    rating: 5,
    comment: "Great atmosphere, very professional DJ!",
    date: "12/02/2024",
  },
  {
    name: "Jean M.",
    rating: 5,
    comment: "Great atmosphere, very professional DJ!",
    date: "12/02/2024",
  },
];

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export function ProfileAndServicesManagementView() {
  const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isMobile = useMediaQuery("(max-width:600px)");
  const textfieldStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "20px",
      border: "1px solid #00000066",
      backgroundColor: "#fff",
      "& fieldset": {
        border: "none",
      },
    },
  };

  return (
    <DashboardContent>
      <Box
        sx={{
          borderRadius: "20px",
          backgroundColor: "#FFFFFF",
          boxShadow: "0px 0px 14px 0px #00000040",
          overflow: "hidden",
          mb: 4,
        }}
      >
        {/* Banner Image */}
        <Box
          sx={{
            width: "100%",
            height: { xs: "150px", sm: "220px" },
            backgroundImage:
              "url('https://s3-alpha-sig.figma.com/img/a33f/fade/6c44792172af87c950e914099ba87c45?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=jAXYFBbFCfmOZeHZpRvgYTiA5~UT4TsA~wxVhKukTZAHFQN5MMePVCo2k13efzqGIEXngMbK~y8oB~tJ-tstpvygshbWs-IySyEmnKdVSHGaT0f0T5DAptUxMV0uzYgrSJAdZ-DugZfcYCwSoZ-PItkLZT3Nh-eBpTQ2tzMNuSYck4b-ccUC250DxvN7hNBGh5TxVxn9~HvZEUF2Xm7dr8YQBM09edLkntlQEJJcBgJUY8q-IpbBq3~mBvTC~XWm6o4K22NE--08UH~GDwsLtYW-AvGMDSqU2hI5eOg99njoMFQn-YkRm1ZUrKXnP8pt5ZhKDUZyzn1NooXrS428RA__')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Profile Info */}
        <Box
          display="flex"
          alignItems="center"
          gap={2}
          px={3}
          py={2}
          sx={{ backgroundColor: "#fff" }}
        >
          <Box sx={{ position: "relative", mt: -5 }}>
            <Avatar
              src="https://s3-alpha-sig.figma.com/img/20b8/8955/d6e91b0f9cbf6e8b1d6959045013c348?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=VQL0IjC6GNptZD7JE4iSHAR1J~SLyh16mpg-9WlQ9z9llvi2lxgeWrfThKcg1oiamx-23Bqh8FLVKnBh0W9JFVJ1RWysLSksl3Mg7k6ZPUEvVjEGosNyoOtWDMqk0Qmm~cNWfBLZNuGn4G2tzkEBcc4hYZ~6m~8O1ie-Hn4rRax9UALXpyeQAmLug6IR8HEmJJa2An-W5zcK0UdJg6rE4rEQuHcyppBvgpCJb3lSK2aYIAopAqOhyt5hxrnNkWQxMvOxMkB5~eAlHZyoro9Ifq~Sdp8uASZ08nMwC3uqWzIYbSgpmOaOp-cdFuTEGv8i7PPh0pppvgCCCy5kYFus2w__"
              alt="Profile"
              sx={{
                width: 72,
                height: 72,
              }}
            />
            {/* Inset Active Dot */}
            <Box
              sx={{
                position: "absolute",
                bottom: 4,
                right: 4,
                width: 12,
                height: 12,
                backgroundColor: "#04C832",
                border: "2px solid white",
                borderRadius: "50%",
                zIndex: 1,
              }}
            />
          </Box>

          <Box>
            <Typography fontWeight="bold" fontSize="18px">
              DJ Max – Sound & Lighting
            </Typography>
            <Typography fontSize="14px" color="#000000">
              @djmaxofficial
            </Typography>
          </Box>
        </Box>



        {/* Stats Section */}
        <Box sx={{ width: "100%", p: 2 }}>
          {/* Stats Box */}
          <Box
            sx={{
              borderRadius: "20px",
              border: "1px solid #00000066",
              backgroundColor: "#FFFFFF",
              px: { xs: 2, sm: 3 },
              py: { xs: 2, sm: 3 },
              mb: 3,
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3} textAlign="center">
                <Typography fontSize="13px" color="#1E1E1E">
                  Overall Rating
                </Typography>
                <Typography fontWeight="bold" fontSize="16px" mt={0.5}>
                  4.8/5{" "}
                  <Typography component="span" fontSize="13px" color="#1E1E1E">
                    (20 reviews)
                  </Typography>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3} textAlign="center">
                <Typography fontSize="13px" color="#1E1E1E">
                  Completed Gigs
                </Typography>
                <Typography fontWeight="bold" fontSize="16px" mt={0.5}>
                  120
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3} textAlign="center">
                <Typography fontSize="13px" color="#1E1E1E">
                  Profile Views
                </Typography>
                <Typography fontWeight="bold" fontSize="16px" mt={0.5}>
                  250{" "}
                  <Typography component="span" fontSize="13px" color="#1E1E1E">
                    this week
                  </Typography>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3} textAlign="center">
                <Typography fontSize="13px" color="#1E1E1E">
                  Response Time
                </Typography>
                <Typography fontWeight="bold" fontSize="16px" mt={0.5}>
                  within 1h
                </Typography>
              </Grid>
            </Grid>
          </Box>


          {/* Action Buttons */}
          <Grid container spacing={2}>
            {["Modify Profile", "Add a Service", "Update Availability", "Share Profile"].map((label, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    backgroundColor: "#032D4F",
                    textTransform: "none",
                    borderRadius: "8px",
                    fontWeight: 500,
                    fontSize: "14px",
                    py: 1.5,
                    "&:hover": {
                      backgroundColor: "#021f37",
                    },
                  }}
                >
                  {label}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* DJ light setion */}
      <Box
        sx={{
          borderRadius: "20px",
          backgroundColor: "#FFFFFF",
          boxShadow: "0px 0px 14px 0px #00000040",
          overflow: "hidden",
          mb: 4,
          px: { xs: 3, sm: 4 },
          py: { xs: 3, sm: 4 },

        }}
      >
        {/* Profile Header */}
        <Box display="flex" alignItems="center" gap={2} mb={3}>
          <Box sx={{ position: "relative" }}>
            <Avatar
              src="https://s3-alpha-sig.figma.com/img/20b8/8955/d6e91b0f9cbf6e8b1d6959045013c348?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=VQL0IjC6GNptZD7JE4iSHAR1J~SLyh16mpg-9WlQ9z9llvi2lxgeWrfThKcg1oiamx-23Bqh8FLVKnBh0W9JFVJ1RWysLSksl3Mg7k6ZPUEvVjEGosNyoOtWDMqk0Qmm~cNWfBLZNuGn4G2tzkEBcc4hYZ~6m~8O1ie-Hn4rRax9UALXpyeQAmLug6IR8HEmJJa2An-W5zcK0UdJg6rE4rEQuHcyppBvgpCJb3lSK2aYIAopAqOhyt5hxrnNkWQxMvOxMkB5~eAlHZyoro9Ifq~Sdp8uASZ08nMwC3uqWzIYbSgpmOaOp-cdFuTEGv8i7PPh0pppvgCCCy5kYFus2w__"
              alt="Profile"
              sx={{ width: 72, height: 72 }}
            />
            {/* Online Dot */}
            <Box
              sx={{
                position: "absolute",
                bottom: 4,
                right: 4,
                width: 12,
                height: 12,
                backgroundColor: "#04C832",
                border: "2px solid white",
                borderRadius: "50%",
              }}
            />
          </Box>
          <Box>
            <Typography variant="h6" fontWeight="bold">
              DJ Max – Sound & Lighting
            </Typography>
            <Typography variant="body2">
              @djmaxofficial
            </Typography>
          </Box>
        </Box>

        {/* Profile Form Fields */}
        <Box component="form" display="flex" flexDirection="column" gap={2}>
          <TextField
            fullWidth
            defaultValue="DJ Max – Sound & Lighting"
            sx={textfieldStyle}
          />
          <TextField fullWidth defaultValue="@djmaxofficial" sx={textfieldStyle} />
          <TextField
            fullWidth
            multiline
            minRows={3}
            defaultValue="Professional DJ with 10+ years of experience in events and parties."
            sx={textfieldStyle}
          />
          <TextField fullWidth defaultValue="New York, Los Angeles, Miami" sx={textfieldStyle} />
          <TextField fullWidth defaultValue="123-456-7890" sx={textfieldStyle} />
          <TextField fullWidth defaultValue="djmax@example.com" sx={textfieldStyle} />
          <TextField fullWidth defaultValue="https://djmax.com" sx={textfieldStyle} />
          <TextField fullWidth defaultValue="https://instagram.com/djmaxofficial" sx={textfieldStyle} />
        </Box>


        {/* Edit Button */}
        <Box mt={3}>
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#0B2E4C",
              textTransform: "none",
              fontWeight: "bold",
              borderRadius: 2,
              py: 1.5,
              "&:hover": {
                backgroundColor: "#0B2E4C",
              },
            }}
          >
            Edit Profile
          </Button>
        </Box>
      </Box>

      {/* offerd services section */}

      <Box
        sx={{
          background: "#FFFFFF",
          borderRadius: "20px",
          boxShadow: "0px 0px 14px 0px #00000040",
          p: { xs: 2, md: 4 },
          mb: 4
        }}
      >
        {/* Title */}
        <Typography variant="h6" mb={2}>
          Offered Services
        </Typography>

        {/* Table */}
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: "20px",
            overflowX: "auto",
            width: "100%",
            maxWidth: "100%",
            boxShadow: 2,
          }}
        >
          <Table
            sx={{
              minWidth: 650, // ensures horizontal scroll on small screens
            }}
          >
            <TableHead>
              <TableRow sx={{ backgroundColor: "#1F8FCD" }}>
                {["Service", "Indicative Price", "Location", "Actions"].map((text, i) => (
                  <TableCell
                    key={i}
                    align="center"
                    sx={{
                      color: "#fff",
                      fontWeight: "bold",
                      backgroundColor: "#1F8FCD",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {text}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {[1, 2].map((item) => (
                <TableRow key={item} sx={{ background: "#EEEEEE", height: "65px" }}>
                  <TableCell align="center">DJ Entertainment</TableCell>
                  <TableCell align="center">200,000 XAF</TableCell>
                  <TableCell align="center">Douala, Yaoundé</TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: "flex", justifyContent: "center", gap: 1, flexWrap: "wrap" }}>
                      <Button
                        variant="contained"
                        sx={{
                          background: "#0B2E4C",
                          borderRadius: "14px",
                          fontSize: "12px",
                          px: 2,
                          "&:hover": { background: "#0B2E4C" },
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        sx={{
                          background: "#0B2E4C",
                          borderRadius: "14px",
                          fontSize: "12px",
                          px: 2,
                          "&:hover": { background: "#0B2E4C" },
                        }}
                      >
                        Delete
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>


        {/* Add New Service Section */}
        <Box
          mt={4}
          sx={{
            borderRadius: "20px",
            border: "1px solid #00000066",
            background: "#FFFFFF",
            p: 3,
          }}
        >
          <Typography variant="h6" mb={2} ml={3}>
            Add a New Service
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField fullWidth defaultValue="Service Name" sx={textfieldStyle} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                minRows={3}
                defaultValue="Description"
                sx={textfieldStyle}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth defaultValue="Indicative Price" sx={textfieldStyle} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth defaultValue="Location" sx={textfieldStyle} />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                startIcon={<CloudUploadIcon />}
                sx={{
                  borderRadius: "10px",
                  borderColor: "#ccc",
                  textTransform: "none",
                  px: 2,
                  py: 1,
                  color: "#000",
                  background: "#EEEEEE",
                }}
              >
                Upload Media
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: "#0B2E4C",
                  textTransform: "none",
                  fontWeight: "bold",
                  borderRadius: "14px",
                  py: 1.5,
                  "&:hover": {
                    backgroundColor: "#0B2E4C",
                  },
                }}
              >
                Add a Service
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Client review section */}

      <Box
        sx={{
          borderRadius: "20px",
          background: "#FFFFFF",
          boxShadow: "0px 0px 14px 0px #00000040",
          p: 3,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            borderRadius: "20px",
            border: "1px solid #00000066",
            backgroundColor: "#FFFFFF",
            p: 2,
            mb: 3,
          }}
        >
          <Typography variant="subtitle1" fontWeight="bold">
            Client Reviews & Reputation
          </Typography>
          <Typography variant="body1" sx={{ mt: 0.5 }}>
            <strong>4.8/5</strong> based on 20 reviews
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, fontSize: "14px" }}>
            ★★★★★ - 18 | ★★★★☆ - 2 | ★★★☆☆ - 0 | ★★☆☆☆ - 0 | ★☆☆☆☆ - 0
          </Typography>

          <Stack direction="row" spacing={1} mt={2}>
            {["Recent", "Best", "Lowest Rated"].map((label) => (
              <Button
                key={label}
                variant="outlined"
                sx={{
                  borderRadius: "10px",
                  borderColor: "#00000066",
                  textTransform: "none",
                  px: 2,
                  py: 0.5,
                  fontSize: "14px",
                  backgroundColor: "#fff",
                  color: "#000",
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                  },
                }}
              >
                {label}
              </Button>
            ))}
          </Stack>
        </Box>

        {/* Reviews */}
        <Box
          sx={{
            background: "#FFFFFF",
            border: "1px solid #00000066",
            borderRadius: "20px",
            p: 2,
          }}
        >
          {reviews.map((review, index) => (
            <Paper
              key={index}
              elevation={0}
              sx={{
                border: "none",
                borderBottom: "1px solid #D3D3D3",
                background: "transparent",
                borderRadius: 0,
                px: 2,
                py: 3,
                "&:last-child": {
                  borderBottom: "none",
                },
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={9}>
                  <Typography
                    sx={{ fontWeight: 600, fontSize: "14px", color: "#000" }}
                  >
                    {review.name}
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
                    {[...Array(review.rating)].map((_, i) => (
                      <StarIcon
                        key={i}
                        fontSize="small"
                        sx={{ color: "#FFB800", mr: 0.3 }}
                      />
                    ))}
                  </Box>

                  <Typography
                    sx={{ fontSize: "12px", color: "#000", mt: 1, mb: 2 }}
                  >
                    {review.comment}
                  </Typography>

                  <Grid item xs={12}>
                    <Box

                      sx={{
                        width: "calc(100%)", // match padding (px: 2 -> 16px on each side)
                        ml: "auto",
                        mr: "auto",
                      }}
                    >
                      <TextField
                        multiline
                        minRows={3}
                        placeholder="Write a reply..."
                        fullWidth
                        sx={textfieldStyle}
                      />
                    </Box>
                  </Grid>





                  <Button
                    startIcon={<ChatBubbleOutlineIcon />}
                    sx={{

                      mt: 2,
                      backgroundColor: "#0B2E4C",
                      color: "#fff",
                      textTransform: "none",
                      px: 3,
                      py: 0.7,
                      fontSize: "12px",
                      borderRadius: "10px",
                      "&:hover": {
                        backgroundColor: "#0B2E4C",
                      },
                    }}
                  >
                    Reply to a Review
                  </Button>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={3}
                  textAlign={{ xs: "left", sm: "right" }}
                  display="flex"
                  justifyContent={{ xs: "flex-start", sm: "flex-end" }}
                  alignItems="flex-start"
                >
                  <Typography sx={{ fontSize: "12px", color: "#888" }}>
                    {review.date}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          ))}
        </Box>
      </Box>

      {/* Avability section */}
      <Box
        mt={4}
        sx={{
          borderRadius: "20px",
          border: "1px solid #00000066",
          background: "#FFFFFF",
          p: 3,
        }}
      >
        {/* Availability Settings Header */}
        <Box
          sx={{
            borderRadius: "20px",
            border: "1px solid #00000066",
            backgroundColor: "#FFFFFF",
            p: 2,
            mb: 3,
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                gutterBottom
                sx={{ mb: 0 }}
              >
                Availability Settings
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    backgroundColor: "green",
                  }}
                />
                <Typography variant="body2">
                  Available
                </Typography>
              </Stack>
            </Box>

            <Switch
              defaultChecked
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: '#0B2E4C',
                },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: '#0B2E4C',
                },
              }}
            />

          </Stack>
        </Box>

        {/* Manage Availability */}
        <Box
          sx={{
            borderRadius: "20px",
            border: "1px solid #00000066",
            backgroundColor: "#FFFFFF",
            p: { xs: 2, sm: 3 },
            mb: 3,
          }}
        >
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
            Manage Your Availability
          </Typography>

          <Typography
            variant="body2"
            color="#D9D9D9"
            sx={{ mb: 3 }}
          >
            Click on dates to mark as unavailable.
          </Typography>

          <Grid container spacing={0}>
            {days.map((day, index) => (
              <Grid item xs={12} key={index}>
                <Box
                  sx={{
                    backgroundColor: "#EEEEEE",
                    borderRadius: 1.5,
                    px: 2,
                    py: 1,
                    mb: 2,
                    width: "100%",
                    maxWidth: { xs: "100%", md: "50%" },
                    ml: { xs: 0, md: 0 }, // left-aligned on all devices
                  }}
                >
                  <Grid
                    container
                    alignItems="center"
                    spacing={1}
                    sx={{
                      flexWrap: { xs: "wrap", md: "nowrap" },
                    }}
                  >
                    <Grid item xs={12} sm={3} md={2}>
                      <Typography sx={{ fontSize: 14 }}>{day}</Typography>
                    </Grid>

                    <Grid item>
                      <Checkbox
                        sx={{
                          mx: 1,
                          color: "black",
                          "&.Mui-checked": {
                            color: "black",
                          },
                        }}
                      />
                    </Grid>

                    <Grid item>
                      <Typography sx={{ fontSize: 14, minWidth: 30 }}>24H</Typography>
                    </Grid>

                    <Grid item xs={12} sm={5} md={3}>
                      <TextField
                        type="time"
                        size="small"
                        fullWidth
                        sx={{
                          '& input[type="time"]::-webkit-calendar-picker-indicator': {
                            display: "none",
                            WebkitAppearance: "none",
                          },
                          '& input[type="time"]': {
                            appearance: "textfield",
                            MozAppearance: "textfield",
                          },
                          "& .MuiInputBase-root": {
                            height: 30,
                            backgroundColor: "#fff",
                            borderRadius: "6px",
                            border: "1px solid #C4C4C4",
                            px: 1,
                          },
                          "& .MuiOutlinedInput-notchedOutline": {
                            border: "none",
                          },
                        }}
                        InputLabelProps={{ shrink: true }}
                        inputProps={{
                          style: { padding: "8px 0" },
                        }}
                      />
                    </Grid>

                    <Grid item>
                      <Typography sx={{ mx: 1, fontSize: 14 }}>to</Typography>
                    </Grid>

                    <Grid item xs={12} sm={5} md={3}>
                      <TextField
                        type="time"
                        size="small"
                        fullWidth
                        sx={{
                          '& input[type="time"]::-webkit-calendar-picker-indicator': {
                            display: "none",
                            WebkitAppearance: "none",
                          },
                          '& input[type="time"]': {
                            appearance: "textfield",
                            MozAppearance: "textfield",
                          },
                          "& .MuiInputBase-root": {
                            height: 30,
                            backgroundColor: "#fff",
                            borderRadius: "6px",
                            border: "1px solid #C4C4C4",
                            px: 1,
                          },
                          "& .MuiOutlinedInput-notchedOutline": {
                            border: "none",
                          },
                        }}
                        InputLabelProps={{ shrink: true }}
                        inputProps={{
                          style: { padding: "8px 0" },
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            ))}
          </Grid>

          <Box textAlign="center" mt={3}>
            <Button
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: "#0B2E4C",
                textTransform: "none",
                fontWeight: "bold",
                borderRadius: "14px",
                py: 1.5,
                "&:hover": {
                  backgroundColor: "#0B2E4C",
                },
              }}
            >
              Add a Service
            </Button>
          </Box>
        </Box>
      </Box>


      {/* Profile verification section */}

      <Box
        sx={{
          borderRadius: "20px",
          background: "#FFFFFF",
          boxShadow: "0px 0px 14px 0px #00000040",
          p: { xs: 2, md: 4 },
          // maxWidth: 700,
          // mx: "auto",
          mt: 4,
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, mb: 1, fontSize: isMobile ? 16 : 20 }}
        >
          Profile Trust & Verification
        </Typography>

        <Typography sx={{ mb: 3, color: "#555", fontSize: isMobile ? 13 : 15 }}>
          Boost your credibility by completing all verification steps.
        </Typography>

        <Stack spacing={1.5} mb={4}>
          {verifications.map((item, index) => (
            <Grid
              container
              alignItems="center"
              spacing={1}
              key={index}
              sx={{ fontSize: isMobile ? 14 : 16 }}
            >
              <Grid item>
                {item.status ? (
                  <CheckCircleIcon sx={{ color: "green", fontSize: 20 }} />
                ) : (
                  <CancelIcon sx={{ color: "red", fontSize: 20 }} />
                )}
              </Grid>
              <Grid item>
                <Typography sx={{ fontSize: isMobile ? 14 : 16 }}>
                  {item.label}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </Stack>

        <Button
          variant="contained"
          fullWidth
          sx={{
            borderRadius: "20px",
            backgroundColor: "#0B2E4C",
            textTransform: "none",
            fontSize: isMobile ? 14 : 16,
            py: 1.2,
            "&:hover": {
              backgroundColor: "#0B2E4C",
            },
          }}
        >
          Complete My Verification
        </Button>
      </Box>
    </DashboardContent>
  );
}
