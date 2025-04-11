import {
  Box,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
  Button,
  Paper,
  useMediaQuery,
} from "@mui/material";
import { AttachFile, Send, Call, AddBox, Close, VideoCall } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
export const ChatBox = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Paper
      elevation={6}
      sx={{
        mt: 4,
        borderRadius: 3,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: { xs: 500, sm: 550, md: 600 },
      }}
    >
      {/* Top bar */}
      <Box
        sx={{
          backgroundColor: "#0B2E4C",
          color: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
        }}
      >
        <Typography fontWeight="bold">Thomas Williams</Typography>
        <Box
          sx={{
            display: "flex",
            gap: 1.5,
            backgroundColor: "#0B2E4C",
            p: 1,
            borderRadius: "16px",
            alignItems: "center",
          }}
        >
          {[<VideoCall />, <Call />, <Close />].map((icon, idx) => (
            <IconButton
              key={idx}
              sx={{
                backgroundColor: "white",
                color: "#0B2E4C",
                borderRadius: "12px",
                width: 40,
                height: 40,
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                },
              }}
            >
              {icon}
            </IconButton>
          ))}
        </Box>
      </Box>

      {/* Action buttons */}
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Button
          fullWidth
          variant="outlined"
          sx={{
            borderRadius: 1,
            fontFamily: 'Poppins',
            fontWeight: 600,
            fontSize: '22',
            border:"3px solid #1F8FCD"
          }}
        >
          Generate Contract
        </Button>

        <Button
          fullWidth
          variant="contained"
          sx={{
            borderRadius: 1,
             backgroundColor: "#0B2E4C",
              fontFamily: 'Poppins',
            fontWeight: 600,
            fontSize: '22',
             border:"3px solid #1F8FCD"
          }}
        >
          Accept Service
        </Button>
      </Box>

      <Box
        sx={{
          height: "90vh",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#f3f3f3",
        }}
      >
        {/* Chat messages */}
        <Box
          sx={{
            flex: 1,
            p: 2,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {/* Organizer Message */}
          <Box>
            <Box
              sx={{
                backgroundColor: "#E0E0E0",
                p: 1.5,
                px: 2,
                borderRadius: "20px",
                display: "inline-block",
                maxWidth: "80%",
              }}
            >
              <Typography fontWeight={500}>
                Hello, can you confirm availability?
              </Typography>
            </Box>
            <Typography fontSize={12} color="gray" mt={0.5}>
              Seen
            </Typography>
          </Box>

          {/* You (User) Message */}
          <Box textAlign="right">
            <Box
              sx={{
                backgroundColor: "#0B2E4C",
                p: 1.5,
                px: 2,
                borderRadius: "20px",
                display: "inline-block",
                maxWidth: "80%",
                color: "#fff",
              }}
            >
              <Typography fontWeight={500}>
                Hello, can you confirm availability?
              </Typography>
            </Box>
            <Typography fontSize={12} color="gray" mt={0.5}>
              Pending
            </Typography>
          </Box>

          {/* Organizer Typing */}
          <Box>
            <Box
              sx={{
                backgroundColor: "#E0E0E0",
                p: 1.5,
                px: 2,
                borderRadius: "20px",
                display: "inline-block",
                maxWidth: "80%",
              }}
            >
              <Typography fontWeight={500}>
                Great! What is your final price?
              </Typography>
            </Box>
            <Typography fontSize={12} color="gray" mt={0.5}>
              Typing
            </Typography>
          </Box>
        </Box>

        {/* Input field */}
        <Box
          sx={{
            p: 2,
            display: "flex",
            alignItems: "center",
            borderTop: "1px solid #ccc",
            backgroundColor: "#f3f3f3",
          }}
        >
          <TextField
            fullWidth
            placeholder="Type a message..."
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <AttachFile />
                  </IconButton>
                </InputAdornment>
              ),
              sx: {
                backgroundColor: "#fff",
                borderRadius: "20px",
                px: 1.5,
              },
            }}
          />
          <Button
            variant="contained"
            sx={{
              ml: 2,
              backgroundColor: "#0B2E4C",
              textTransform: "none",
              borderRadius: "12px",
              px: 4,
              height: 40,
            }}
          >
            Send
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};
