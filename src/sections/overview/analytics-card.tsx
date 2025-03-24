import { Box, Paper, Typography } from '@mui/material';
import { Chart } from "src/components/chart";

export function AnalyticsCard({ title, value, iconSrc, chartOptions, chartSeries, chartType, chartHeight, additionalContent }:any) {
  return (
    <Paper elevation={3} sx={{ p: 2, borderRadius: "12px", textAlign: "center", flex: 1, display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
        <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>{value}</Typography>
        <Box component="span">
          <Box
            alt="Arrow"
            component="img"
            src={iconSrc}
            width={16}
            height={16}
          />
        </Box>
        <Typography sx={{ color: "#2395D4", fontSize: "14px" }}>{title}</Typography>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Chart
          options={chartOptions}
          series={chartSeries}
          type={chartType}
          height={chartHeight}
        />
      </Box>
      {additionalContent && additionalContent}
    </Paper>
  );
}