import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
import { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export function StepperStepThree() {
      const [selectedLogo, setSelectedLogo] = useState<string | null>(null);
      const [selectedFrame, setSelectedFrame] = useState<string | null>(null);
      const [selectedColor, setSelectedColor] = useState("#FF66A1");

    return (
        <Card
            sx={{
                borderRadius: 4,
                padding: 3,
                boxShadow: 3,
                margin: "auto",
                border: "2px solid #E0E0E0",
                marginTop: 4,
            }}
        >
            <CardContent>
                <Grid container spacing={4}>
                    {/* Left Section: Theme Selection */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="h5" fontWeight="bold">
                            Event Customization
                        </Typography>

                        <Typography variant="h6" fontWeight="bold" sx={{ mt: 2, color: "#1E1E1E" }}>
                            Choose Event Theme
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#666" }}>
                            Choose main colors
                        </Typography>

                        <Box sx={{ display: "flex", gap: 2, mt: 1, flexWrap: "wrap" }}>
                            {["#FF66A1", "#E63946", "#FFD700", "#4A90E2", "#E91E63"].map((color) => (
                                <Box
                                    key={color}
                                    sx={{
                                        width: 32,
                                        height: 32,
                                        backgroundColor: color,
                                        borderRadius: "50%",
                                        cursor: "pointer",
                                        border: selectedColor === color ? "2px solid black" : "none",
                                    }}
                                    onClick={() => setSelectedColor(color)}
                                />
                            ))}
                        </Box>

                        <Typography variant="body2" sx={{ color: "#666", mt: 2 }}>
                            Choose Custom Colors
                        </Typography>
                        <Box
                            sx={{
                                width: "100%",
                                maxWidth: "200px",
                                height: "32px",
                                background: "linear-gradient(to right, yellow, orange)",
                                borderRadius: "8px",
                                mt: 1,
                                border: "1px solid #ccc",
                            }}
                        />
                    </Grid>

                    {/* Right Section: Logo Upload & Frame Selection */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" fontWeight="bold">
                            Add logo
                        </Typography>

                        <Box
                            sx={{
                                width: "90px",
                                height: "90px",
                                borderRadius: "12px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "#FFF",
                                boxShadow: 2,
                                border: "1px solid #D3D3D3",
                                overflow: "hidden",
                                marginBottom: 4,
                            }}
                        >
                            {selectedLogo ? (
                                <img src={selectedLogo} alt="Uploaded" width="60px" />
                            ) : (
                                <Typography variant="body2" color="textSecondary">
                                    No Logo
                                </Typography>
                            )}
                        </Box>

                        <Grid container spacing={3}>
                            {/* Logo Upload Section */}
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body2" sx={{ fontWeight: "bold", mb: 1 }}>
                                    Choose logo
                                </Typography>
                                <label
                                    htmlFor="logo-upload"
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 8,
                                        backgroundColor: "#F1F1F1",
                                        padding: "10px 16px",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                        border: "1px solid #ccc",
                                        fontSize: "14px",
                                        fontWeight: "500",
                                    }}
                                >
                                    Upload Image <CloudUploadIcon fontSize="small" />
                                    <input
                                        type="file"
                                        id="logo-upload"
                                        hidden
                                        onChange={(e) => {
                                            const files = e.target.files;
                                            if (!files || files.length === 0) return;
                                            const file = files[0];
                                            setSelectedLogo(URL.createObjectURL(file));
                                        }}
                                    />
                                </label>
                            </Grid>

                            {/* Frame Selection Section */}
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body2" sx={{ fontWeight: "bold", mb: 1 }}>
                                    Choose Frames
                                </Typography>
                                <Box sx={{ display: "flex", gap: 2 }}>
                                    {["circle", "triangle", "square"].map((frame) => (
                                        <Box
                                            key={frame}
                                            sx={{
                                                width: 40,
                                                height: 40,
                                                borderRadius: frame === "circle" ? "50%" : "4px",
                                                border: "2px solid",
                                                borderColor: selectedFrame === frame ? "#007BFF" : "#D3D3D3",
                                                backgroundColor: "#E0E0E0",
                                                cursor: "pointer",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                            onClick={() => setSelectedFrame(frame)}
                                        />
                                    ))}
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}