import { useEffect, useState } from 'react';
import {
  Paper, Box, Typography, TextField,
  InputAdornment, IconButton, Button, Stack
} from '@mui/material';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'src/redux/store';
import { fetchTicketingActivity } from 'src/redux/actions/global-overview-general-statistice.action';

interface TicketItem {
  id: string;
  eventName: string;
  organizerName: string;
  ticketsSold: number;
  revenue: number;
  status: 'Active' | 'Pending' | 'In Progress' | 'Cancelled';
}

function mapStatus(status: string): TicketItem['status'] {
  const normalized = (status || '').trim().toLowerCase();

  switch (normalized) {
    case 'approved':
    case 'active':
      return 'Active';
    case 'pending':
      return 'Pending';
    case 'cancelled':
      return 'Cancelled';
    default:
      return 'In Progress';
  }
}


function formatCurrency(amount: number | undefined | null): string {
  console.log('amount', amount);

  if (typeof amount !== 'number' || Number.isNaN(amount)) return '0 XAF';
  return `${amount.toLocaleString('en-CM')} XAF`;
}

export function TicketingActivityTable() {
  const dispatch = useDispatch<AppDispatch>();
  const { activities, loading, error } = useSelector((state: any) => state.gogs);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string[]>([]);

  useEffect(() => {
    dispatch(fetchTicketingActivity());
  }, [dispatch]);

  const transformedData: TicketItem[] = (activities || []).map((item: any, index: number) => ({
    id: index.toString(),
    eventName: item.eventName,
    organizerName: item.organizerName,
    ticketsSold: Number(item.ticketsSold) || 0,
    revenue: Number(item.revenue) || 0,
    status: mapStatus(item.status),
  }));

  console.log('Transformed data:', transformedData);

  const uniqueStatuses = Array.from(new Set(transformedData.map(d => d.status)));

  const filteredData = transformedData.filter(item => {
    const matchesSearch =
      item.eventName.toLowerCase().includes(searchText.toLowerCase()) ||
      item.organizerName.toLowerCase().includes(searchText.toLowerCase());

    const matchesStatus =
      statusFilter.length === 0 || statusFilter.includes(item.status);

    return matchesSearch && matchesStatus;
  });

  const columns: GridColDef[] = [
    { field: 'eventName', headerName: 'Event', flex: 1, align: 'center', headerAlign: 'center', },
    { field: 'organizerName', headerName: 'Organizer', flex: 1, align: 'center', headerAlign: 'center' },
    { field: 'ticketsSold', headerName: 'Tickets Sold', flex: 1, type: 'number', align: 'center', headerAlign: 'center' },
    {
  field: 'revenue',
  headerName: 'Revenue',
  flex: 1,
  align: 'center', 
  headerAlign: 'center',
  renderCell: (params) => {
    console.log('Revenue cell params:', params);
    return formatCurrency(params.value);
  }
},
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      align: 'center', headerAlign: 'center',
      renderCell: (params) => {
        let color = 'gray';
        if (params.value === 'Active') color = 'green';
        else if (params.value === 'Cancelled') color = 'red';
        else color = 'orange';
        return <Typography fontWeight="bold" color={color}>{params.value}</Typography>;
      }
    },
  ];
  console.log('Filtered data to render:', filteredData);
  return (
    <Paper
      sx={{
        mt: 3,
        p: { xs: 2, sm: 3 },
        borderRadius: 3,
        border: '1px solid #E0E0E0',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.4)',
        backgroundColor: '#fff',
      }}
    >
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Ticketing Activity (Events & Tickets)
      </Typography>

      {/* Search and Filters */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <TextField
          placeholder="Search event or organizer"
          size="small"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: searchText && (
              <IconButton size="small" onClick={() => setSearchText('')}>
                <ClearIcon fontSize="small" />
              </IconButton>
            ),
          }}
          sx={{ width: { xs: '100%', sm: 300 } }}
        />

        {/* Status Filter Buttons */}
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {uniqueStatuses.map((status) => (
            <Button
              key={status}
              variant={statusFilter.includes(status) ? 'contained' : 'outlined'}
              onClick={() => {
                setStatusFilter(prev =>
                  prev.includes(status)
                    ? prev.filter(s => s !== status)
                    : [...prev, status]
                );
              }}
              sx={{
                textTransform: 'capitalize',
                color:
                  status === 'Active' ? 'green' :
                    status === 'Cancelled' ? 'red' :
                      'orange',
                borderColor:
                  status === 'Active' ? 'green' :
                    status === 'Cancelled' ? 'red' :
                      'orange',
              }}
            >
              {status}
            </Button>
          ))}
          {statusFilter.length > 0 && (
            <Button color="error" onClick={() => setStatusFilter([])}>
              Clear Filters
            </Button>
          )}
        </Stack>
      </Stack>

      {/* Data Grid */}
      <Box sx={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={filteredData}
          columns={columns}
          pageSizeOptions={[5, 10, 20]}
          loading={loading}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: false,
            },
          }}
          sx={{
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#1976d2',
              color: '#2395D4',
              fontWeight: 'bold',
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: 'rgba(25, 118, 210, 0.08)',
            },
          }}
        />
      </Box>
    </Paper>
  );
}
