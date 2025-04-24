import {
  Box,
  Button,
  Grid,
  Typography,
  TextField,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export function OfferAndService() {
    return (
        <Box boxShadow={3} borderRadius={3} bgcolor="#FFFFFF" mt={3} p={3}>
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
                        <TextField fullWidth defaultValue="Service Name" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            multiline
                            minRows={3}
                            defaultValue="Description"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth defaultValue="Indicative Price"  />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth defaultValue="Location"  />
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
    )
}