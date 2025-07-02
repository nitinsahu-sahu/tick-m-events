import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Stack,
  Grid,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import * as XLSX from 'xlsx';

type RevenueItem = {
  Period: string;
  Revenue: string;
  Services: string;
  Average: string;
};

const RevenueData: RevenueItem[] = [
  {
    Period: 'Jul / 2025',
    Revenue: "1,200,000",
    Services: "5",
    Average: "240,000",
  },
  {
    Period: 'Jun / 2025',
    Revenue: "800,000",
    Services: "5",
    Average: "266,000",
  },
  {
    Period: 'Mar / 2025',
    Revenue: "400,000",
    Services: "2",
    Average: "200,000",
  },
  {
    Period: 'Jan / 2025',
    Revenue: "600,000",
    Services: "3",
    Average: "200,000",
  },
];

const FILTER_OPTIONS = [
  { label: 'Last 24 Hours', value: '24h' },
  { label: 'Last 1 Week', value: '1w' },
  { label: 'Last 1 Month', value: '1m' },
  { label: 'Last 3 Months', value: '3m' },
  { label: 'Last 6 Months', value: '6m' },
  { label: 'Last 12 Months', value: '12m' },
];

export function FinancialAnalysisRevenue() {
  const [selectedFilter, setSelectedFilter] = useState('1w'); // Default to last 1 week

  const handleFilterChange = (event: SelectChangeEvent) => {
    setSelectedFilter(event.target.value);
  };

  const filteredData = filterRevenueData(RevenueData, selectedFilter);

  return (
    <Paper
      sx={{
        mt: 3,
        p: { xs: 2, sm: 3 },
        borderRadius: 2.5,
        border: '1px solid #E0E0E0',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.4)',
        backgroundColor: '#fff',
      }}
    >
      <Typography variant="h6" fontWeight="bold" mb={3}>
        Financial Analysis & Revenue
      </Typography>

      <Box sx={{ overflowX: 'auto', borderRadius: 2 }}>
        <Box sx={{ minWidth: 700 }}>
          {/* Table Header */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr 1fr',
              backgroundColor: '#1976d2',
              color: 'white',
              alignItems: 'center',
              justifyItems: 'center',
              py: 1.5,
              px: 2,
              fontWeight: 600,
            }}
          >
            <Select
              value={selectedFilter}
              onChange={handleFilterChange}
              variant="standard"
              disableUnderline
              sx={{
                backgroundColor: 'transparent',
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              <MenuItem value="24h">Last 24 Hours</MenuItem>
              <MenuItem value="1w">Last 1 Week</MenuItem>
              <MenuItem value="1m">Last 1 Month</MenuItem>
              <MenuItem value="3m">Last 3 Months</MenuItem>
              <MenuItem value="6m">Last 6 Months</MenuItem>
              <MenuItem value="12m">Last 12 Months</MenuItem>
            </Select>
            <div>Revenue Earned (XAF)</div>
            <div>Services Completed</div>
            <div>Average Payment (XAF)</div>
          </Box>

          {/* Table Body */}
          <Box
            sx={{
              maxHeight: 200,
              overflowY: 'auto',
              borderTop: '1px solid #ddd',
              '&::-webkit-scrollbar': {
                width: '2px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#0B2E4C',
                borderRadius: '10px',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: '#e0e0e0',
                borderRadius: '10px',
              },
            }}
          >
            {filteredData.length === 0 ? (
              <Box
                sx={{
                  py: 2,
                  textAlign: 'center',
                  fontStyle: 'italic',
                  color: 'gray',
                }}
              >
                No data available for selected period.
              </Box>
            ) : (
              filteredData.map((item: RevenueItem, idx: number) => (
                <Box
                  key={idx}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr 1fr',
                    alignItems: 'center',
                    justifyItems: 'center',
                    py: 1.5,
                    px: 2,
                    borderBottom:
                      idx !== filteredData.length - 1
                        ? '1px solid rgba(195, 195, 195, 1)'
                        : 'none',
                    backgroundColor: '#f5f5f5',
                  }}
                >
                  <div>{item.Period}</div>
                  <div>{item.Revenue}</div>
                  <div>{item.Services}</div>
                  <div>{item.Average}</div>
                </Box>
              ))
            )}
          </Box>
        </Box>
      </Box>

      {/* Action Buttons */}
      <Grid
        item
        xs={12}
        md={6}
        lg={4}
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { md: 'flex-start' },
          justifyContent: { md: 'flex-start' },
          gap: 2,
          mt: { xs: 3, md: 3 },
        }}
      >
        <StyledActionButton onClick={() => handleDownload(filteredData, selectedFilter)}>Download My Financial Report (CSV)</StyledActionButton>
        <StyledActionButton onClick={() => handleExcelDownload(filteredData, selectedFilter)}>
          Download My Financial Report (Excel)
        </StyledActionButton>

      </Grid>
    </Paper>
  );
}

function StyledActionButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Button
      onClick={onClick}
      sx={{
        backgroundColor: '#0B2E4C',
        color: 'white',
        borderRadius: '20px',
        px: 3,
        height: 45,
        textTransform: 'none',
        fontSize: '14px',
        '&:hover': {
          backgroundColor: '#071E33',
        },
      }}
    >
      {children}
    </Button>
  );
}


// Filter logic
function filterRevenueData(data: RevenueItem[], filter: string): RevenueItem[] {
  const now = new Date();
  let cutoff = new Date();

  switch (filter) {
    case '24h':
      cutoff = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      break;
    case '1w':
      cutoff = new Date(now.setDate(now.getDate() - 7));
      break;
    case '1m':
      cutoff = new Date(now.setMonth(now.getMonth() - 1));
      break;
    case '3m':
      cutoff = new Date(now.setMonth(now.getMonth() - 3));
      break;
    case '6m':
      cutoff = new Date(now.setMonth(now.getMonth() - 6));
      break;
    case '12m':
      cutoff = new Date(now.setMonth(now.getMonth() - 12));
      break;
    default:
      return data;
  }

  return data.filter((item: RevenueItem) => {
    const [monthStr, yearStr] = item.Period.split('/');
    const parsedDate = new Date(`${monthStr.trim()} 1, ${yearStr.trim()}`);
    return parsedDate >= cutoff;
  });
}

function handleDownload(data: RevenueItem[], filter: string) {
  const csvHeader = ['Period,Revenue,Services,Average'];
  const csvRows = data.map(item =>
    `"${item.Period}","${item.Revenue}","${item.Services}","${item.Average}"`
  );

  const csvContent = [csvHeader, ...csvRows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

  const downloadLink = document.createElement('a');
  const fileName = `financial-report-${filter}-${new Date().toISOString().split('T')[0]}.csv`;

  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.setAttribute('download', fileName);
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}
function handleExcelDownload(data: RevenueItem[], filter: string) {
  const worksheetData = data.map(item => ({
    Period: item.Period,
    Revenue: item.Revenue,
    Services: item.Services,
    Average: item.Average,
  }));

  const worksheet = XLSX.utils.json_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Financial Report');

  const fileName = `financial-report-${filter}-${new Date().toISOString().split('T')[0]}.xlsx`;
  XLSX.writeFile(workbook, fileName);
}