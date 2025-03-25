import { Box, Typography, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export function EventDetailsView() {
  return (
    <Box sx={{ padding: "20px" }}>
      {/* Title & Search Bar */}
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Box>
          <Typography variant="h5" fontWeight="bold">
            Create and Manage My Events
          </Typography>
          <Typography variant="body2" color="#C8C8C8;
">
            Lorem ipsum dolor sit amet
          </Typography>
        </Box>
        <TextField
          placeholder="Search here"
          variant="outlined"
          size="small"
          sx={{
            width: "300px",
            backgroundColor: "white",
            borderRadius: "25px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "25px",
              paddingLeft: "10px",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#A0A0A0" }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Event Banner */}
      <Box
        sx={{
          width: "900px",
          height: "320px",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <img
          src="https://s3-alpha-sig.figma.com/img/0fe2/8d2c/b9040ce5285238d2d74fc2a36809e101?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=KJrd9bjK7T0ybl8iU71L7gTZlcZuaX9fvR7sp49tLHaWyqvurWUsmu~0sUnx0Z2kkHYZFjAksdIz4yQoahPadTLpBtvC2JMOqZHcWCBhnB-xaPakvuilhVrZZut0~M98zjhlTlqZOrhMNKk1amsJOn-~FRqUqKcfd5Blg26GHf9EERFqzDO2GHZVDP6ldEWXZPqskWGbXqHBqrXhnRgfQPq2DvsoJgS6CisnIqyjmSa8y6VK9oSTKPPzwkIrahd5Fi~t4JGL4QKR3RxyGIoulUn7OfzflWuxjgSWQBakvXrraZC8ceycmTP-kezfbcV1nLMWK-1YUDBcJniEuzl79g__" // Replace with your actual image URL
          alt="Event Banner"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "crop",
            borderRadius: "20px",
          }}
        />
      </Box>
    </Box>
  );
}
