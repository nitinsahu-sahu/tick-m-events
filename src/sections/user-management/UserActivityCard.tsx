import {
  Box, Paper, Typography, Button, Grid, CircularProgress, InputAdornment, IconButton, TextField, Stack
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from "src/redux/store";
import { useEffect, useMemo, useState } from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { fetchAdminActivities } from 'src/redux/actions/activityActions';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearIcon from '@mui/icons-material/Clear';

export default function UserActivityCard() {
  const [localLoading, setLocalLoading] = useState(true);

  const dispatch = useDispatch<AppDispatch>();
  const { loading, activities = [], error } = useSelector((state: any) => state.activities);
  const [page] = useState(1);
  const [limit] = useState(50);
  const [searchText, setSearchText] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedActions, setSelectedActions] = useState<string[]>([]);

  const getActivityKey = (label: string) => {
    const map: Record<string, string> = {
      'Login Success': 'login_success',
      'Logout Success': 'logout_success',
      'Event Created': 'event_created',
      'Ticket Purchased': 'ticket_purchased',
      'Profile Updated': 'profile_updated',
      'Password Changed': 'password_changed',
    };

    // Normalize case
    const entry = Object.entries(map).find(
      ([labelText]) => labelText.toLowerCase() === label.toLowerCase()
    );

    return entry ? entry[1] : label.toLowerCase().replace(/\s+/g, '_');
  };

  const activityOptions = Object.entries({
    login_success: 'Login Success',
    logout_success: 'Logout Success',
    event_created: 'Event Created',
    ticket_purchased: 'Ticket Purchased',
    profile_updated: 'Profile Updated',
    password_changed: 'Password Changed',
  }).map(([key, value]) => ({
    key,
    label: value,
  }));


useEffect(() => {
  const loadWithDelay = async () => {
    await dispatch(fetchAdminActivities({ page, limit }));
    setTimeout(() => {
      setLocalLoading(false); 
    }, 1000); 
  };

  loadWithDelay();
}, [dispatch, page, limit]);


  const tableData = useMemo(() => activities.docs || activities, [activities]);

  const rows = tableData.map((item: any, index: number) => {
    const raw = getActivityKey(item.activityType || '');
    return {
      id: index + 1,
      date: new Date(item.timestamp).toLocaleDateString(),
      user: item.userId?.name || item.userId?.email || 'N/A',
      action: activityOptions.find(opt => opt.key === raw)?.label || raw,
      rawAction: raw,                // use for filtering
      location: item.location || '-',
    };
  }).filter((row: any) => {
    const matchesSearch =
      row.user.toLowerCase().includes(searchText.toLowerCase()) ||
      row.action.toLowerCase().includes(searchText.toLowerCase()) ||
      row.location.toLowerCase().includes(searchText.toLowerCase());

    const matchesActionFilter =
      selectedActions.length === 0 ||
      selectedActions.includes(row.rawAction);

    // Debug log
    console.log('Row.rawAction:', row.rawAction, '| Selected:', selectedActions, '| Match:', matchesActionFilter);

    return matchesSearch && matchesActionFilter;
  });



  const columns: GridColDef[] = [
    {
      field: 'date',
      headerName: 'Date',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <Typography fontWeight="500">
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'user',
      headerName: 'User',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <Typography fontWeight="bold" textTransform="capitalize">
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 2,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <Typography textTransform="capitalize">
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'location',
      headerName: 'Location',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <Typography>
          {params.value}
        </Typography>
      ),
    },
  ];


  const trendData = [
    { day: 'M', value: 3 },
    { day: 'T', value: 5 },
    { day: 'W', value: 2 },
    { day: 'T', value: 6 },
    { day: 'F', value: 5 },
    { day: 'S', value: 2 },
    { day: 'Today', value: 4 },
  ];

if (loading || localLoading)
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="400px"
      width="100%"
    >
      <CircularProgress />
    </Box>
  );

if (!activities || activities.length === 0)
  return (
    <Box
      className="text-center text-gray-600"
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="300px"
    >
      <Typography variant="h6" className="text-gray-500">
        No Activity History Found.
      </Typography>
    </Box>
  );


  if (error) return <Typography color="error">Error: {error.message || error}</Typography>;

  return (
    <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 0 10px rgba(0,0,0,0.4)' }}>
      <Typography variant="h6" fontWeight="bold" mb={2}>User Activity History</Typography>

      {/* Data Grid Table */}
      <Box sx={{ height: 600, width: '100%' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <TextField
            placeholder="Search..."
            variant="outlined"
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
                <InputAdornment position="end">
                  <IconButton onClick={() => setSearchText('')}>
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ width: 300 }}
          />
          <Button
            startIcon={<FilterListIcon />}
            onClick={() => setFilterOpen(!filterOpen)}
            variant={filterOpen ? "contained" : "outlined"}
          >
            Filters
          </Button>
        </Stack>
        {filterOpen && (
          <Box
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            gap={3}
            mb={3}
            p={2}
            bgcolor="#f5f5f5"
            borderRadius={2}
          >
            <Box flex={1}>
              <Typography variant="subtitle2" mb={1}>Actions</Typography>
              <Stack direction="row" flexWrap="wrap" gap={1}>
                {activityOptions.map((option) => (
                  <Button
                    key={option.key}
                    variant={selectedActions.includes(option.key) ? 'contained' : 'outlined'}
                    size="small"
                    sx={{
                      textTransform: "capitalize",
                      color: selectedActions.includes(option.key) ? 'white' : '#2395d4', 
                      borderColor: '#2395d4', // blue border
                      backgroundColor: selectedActions.includes(option.key) ? '#2395d4' : 'transparent',
                      '&:hover': {
                        backgroundColor: selectedActions.includes(option.key) ? '#1565c0' : 'rgba(25, 118, 210, 0.1)',
                        borderColor: '#2395d4',
                      },
                    }}
                    onClick={() => {
                      setSelectedActions(prev =>
                        prev.includes(option.key)
                          ? prev.filter(action => action !== option.key)
                          : [...prev, option.key]
                      );
                    }}
                  >
                    {option.label}
                  </Button>
                ))}

                {/* Optional: Clear Filters Button */}
                {selectedActions.length > 0 && (
                  <Button
                    onClick={() => setSelectedActions([])}
                    color="secondary"
                    size="small"
                    variant="outlined"
                    sx={{ ml: 1, textTransform: 'none', borderRadius: 20 }}
                  >
                    Clear Filters
                  </Button>
                )}
              </Stack>
            </Box>
          </Box>
        )}


        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="200px">
            <Typography>Loading users...</Typography>
          </Box>
        ) : error ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="200px">
            <Typography color="error">Error: {error}</Typography>
          </Box>
        ) : (
          <Box sx={{ height: 600, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSizeOptions={[5, 10, 25]}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              slots={{
                toolbar: GridToolbar,
              }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                  quickFilterProps: { debounceMs: 500 },
                },
              }}
              sx={{
                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: '#1976d2',
                  color: '#2395D4', // Changed to white for better contrast
                  fontSize: '1rem',
                },
                '& .MuiDataGrid-cell': {
                  borderBottom: '1px solid #E0E0E0',
                  display: 'flex',
                  alignItems: 'center', // Vertical center
                  justifyContent: 'center', // Horizontal center
                },
                '& .MuiDataGrid-row': {

                  '&:hover': {
                    backgroundColor: 'rgba(35, 149, 212, 0.08)', // Updated to match new color
                  },
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(35, 149, 212, 0.12)',
                    '&:hover': {
                      backgroundColor: 'rgba(35, 149, 212, 0.16)',
                    },
                  },
                },
              }}
            />
          </Box>
        )}
      </Box>
      {/* Chart + Actions */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, border: '1px solid #ddd', borderRadius: 3, height: '100%' }}>
            <Typography variant="subtitle1" fontWeight="bold" mb={2}>User Trends</Typography>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={trendData}>
                <XAxis dataKey="day" />
                <Tooltip />
                <Bar dataKey="value" fill="#1F8FCD" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} sx={{
          display: 'flex', flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'flex-end', alignItems: 'center', gap: 2,
        }}>
          <StyledActionButton>Download Activity Report</StyledActionButton>
          <StyledActionButton>Analyze Suspicious Behavior</StyledActionButton>
        </Grid>
      </Grid>
    </Paper>
  );
}

function StyledActionButton({ children }: { children: React.ReactNode }) {
  return (
    <Button sx={{
      borderRadius: '20px',
      backgroundColor: '#0B2E4C',
      color: 'white',
      height: 45,
      textTransform: 'none',
      '&:hover': {
        backgroundColor: '#071E33',
      },
    }}>
      {children}
    </Button>
  );
}
