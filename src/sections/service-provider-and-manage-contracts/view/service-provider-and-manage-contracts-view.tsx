import { Box, Button, Typography } from "@mui/material";
import { Iconify } from "src/components/iconify";
import { DashboardContent } from "src/layouts/dashboard";

export function ServiceProviderAndManageContractView() {
  return(
    <DashboardContent>
    <Box display="flex" alignItems="center" mb={5}>
      <Typography variant="h4" flexGrow={1}>
        Service Provider And Manage Contract
      </Typography>
      <Button
        variant="contained"
        color="inherit"
        startIcon={<Iconify icon="mingcute:add-line" />}
      >
        New post
      </Button>
    </Box>
  </DashboardContent>
  )
}