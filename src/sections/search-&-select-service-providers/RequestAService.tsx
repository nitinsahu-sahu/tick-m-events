import { Typography,Box } from "@mui/material";

export function RequestAService(){
    return(
        <Box
              sx={{
                p: 3,
                my: 3,
                borderRadius: 3,
                backgroundColor: "#fff",
                border: "1px solid #E0E0E0",
                boxShadow: 3,
              }}
            >
                <Typography>ReqASErvice</Typography>
            </Box>
        
    )
}