import { Box, CardMedia } from "@mui/material";
import Marquee from "react-fast-marquee";

const companies = [
    { name: "trivago", color: "#E60012", src: "../assets/images/company/amadeus.png" },
    { name: "amadeus", color: "#0056b3", src: "../assets/images/company/expedia.png" },
    { name: "Skyscanner", color: "#009ddc", src: "../assets/images/company/hopper.png" },
    { name: "Expedia", color: "#ffb700", src: "../assets/images/company/hotels.png" },
    { name: "Tripadvisor", color: "#34e0a1", src: "../assets/images/company/princline.png" },
    { name: "Hotels.com", color: "#d6001c", src: "../assets/images/company/skyscanner.png" },
    { name: "priceline", color: "#0066cc", src: "../assets/images/company/tripadvisor.png" },
    { name: "hopper", color: "#f74e61", src: "../assets/images/company/trivago.png" },
];

export function CompanyMarquee() {
    return (
        <Box sx={{ maxWidth: "100%", p: 3 }}>
            {/* Marquee Section */}
            <Marquee speed={50} gradient={false}>
                {companies.map((company, index) => (
                    <CardMedia
                    component="img"
                    image={company.src}
                    alt={company.name}
                    
                    sx={{
                        mx:"30px",
                        width: 100,
                        height: 50,
                        objectFit: "contain", // Ensures the image fits inside without cropping
                    }}
                />
                    
                ))}
            </Marquee>
        </Box>

    )
}