import {
  Box, Paper, Typography, Button, Stack,
  TextField, InputAdornment, IconButton
} from '@mui/material';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearIcon from '@mui/icons-material/Clear';

import { AppDispatch, RootState } from "src/redux/store";
import { getAllUsers } from '../../redux/actions/userActions';

interface User {
  id: string;
  name: string;
  role: string;
  createdAt: string;
  status: 'Pending' | 'Suspended' | 'Active' | string;
  email?: string;
}

export function OverviewTableCard() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, users, error } = useSelector((state: RootState) => state.user);
  const [searchText, setSearchText] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [roleFilter, setRoleFilter] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  // Transform users data for DataGrid
  const transformedUsers = users?.map((user: any) => ({
    id: user._id || Math.random().toString(36).substr(2, 9),
    name: user.name,
    role: user.role,
    email: user.email,
    createdAt: new Date(user.createdAt).toLocaleDateString(),
    status: user.status,
  })) || [];

  // Filter users based on search and filters
  const filteredUsers = transformedUsers.filter((user: User) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchText.toLowerCase()) ||
      user.role.toLowerCase().includes(searchText.toLowerCase());

    const matchesRole = roleFilter.length === 0 || roleFilter.includes(user.role);
    const matchesStatus = statusFilter.length === 0 || statusFilter.includes(user.status);

    return matchesSearch && matchesRole && matchesStatus;
  });

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <Typography fontWeight="bold" textTransform="capitalize">
          {params.value}
        </Typography>
      )
    },
    {
      field: 'role',
      headerName: 'Role',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <Typography textTransform="capitalize">
          {params.value}
        </Typography>
      )
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1.5,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'createdAt',
      headerName: 'Registration Date',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        let color;
        switch (params.value) {
          case 'Pending': color = 'orange'; break;
          case 'Suspended': color = 'red'; break;
          case 'Active': color = 'green'; break;
          default: color = 'inherit';
        }
        return (
          <Typography fontWeight="bold" color={color} textTransform="capitalize">
            {params.value}
          </Typography>
        );
      }
    },
    {
      field: 'Actions',
      headerName: 'Actions',
      flex: 1.5,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        const status = params.row.status;
        return (
          <Box sx={{
            width: '100%',
            overflowX: 'auto',
            '&::-webkit-scrollbar': {
              height: '2px',
            },
            '&::-webkit-scrollbar-track': {
              background: '#f1f1f1',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#888',
              borderRadius: '3px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: '#555',
            }
          }}>
            <Stack
              direction="row"
              spacing={1}
              justifyContent="center"
              alignItems="center"
              sx={{
                width: 'max-content', // This ensures the Stack takes only the space it needs
                minWidth: '100%',    // This ensures it takes at least the full width
                py: 1,               // Add some vertical padding
                px: 0.5,             // Add some horizontal padding
              }}
            >
              <Button
                variant="outlined"
                size="small"
                sx={{ textTransform: 'none', flexShrink: 0 }}
              >
                View Profile
              </Button>
              {status === 'pending' && (
                <>
                  <Button variant="contained" color="success" size="small" sx={{ flexShrink: 0 }}>
                    Validate
                  </Button>
                  <Button variant="contained" color="error" size="small" sx={{ flexShrink: 0 }}>
                    Block
                  </Button>
                </>
              )}
              {status === 'suspended' && (
                <>
                  <Button variant="contained" color="success" size="small" sx={{ flexShrink: 0 }}>
                    Reactivate
                  </Button>
                  <Button variant="contained" color="error" size="small" sx={{ flexShrink: 0 }}>
                    Block
                  </Button>
                </>
              )}
              {status === 'active' && (
                <Button variant="contained" color="error" size="small" sx={{ flexShrink: 0 }}>
                  Block
                </Button>
              )}
            </Stack>
          </Box>
        );
      }
    }
  ];

  // Extract unique roles and statuses for filter options
  const uniqueRoles = Array.from(new Set(transformedUsers.map((user: User) => user.role)));
  const uniqueStatuses = Array.from(new Set(transformedUsers.map((user: User) => user.status)));

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
      <Box>
        <Typography variant="h6" fontWeight="bold" mb={1}>
          User Management
        </Typography>
        <Typography variant="subtitle1">
          Overview of Accounts
        </Typography>
      </Box>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <TextField
          variant="outlined"
          placeholder="Search users..."
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
            )
          }}
          sx={{ width: { xs: '100%', sm: '300px' } }}
        />
        <Button
          startIcon={<FilterListIcon />}
          onClick={() => setFilterOpen(!filterOpen)}
          variant={filterOpen ? "contained" : "outlined"}
        >
          Filters
        </Button>
      </Box>

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
            <Typography variant="subtitle2" mb={1}>Role</Typography>
            <Stack direction="row" flexWrap="wrap" gap={1}>
              {uniqueRoles.map((role: any) => (
                <Button
                  key={role}
                  variant={roleFilter.includes(role) ? "contained" : "outlined"}
                  size="small"
                  sx={{ textTransform: "capitalize" }}
                  onClick={() => {
                    if (roleFilter.includes(role)) {
                      setRoleFilter(roleFilter.filter(r => r !== role));
                    } else {
                      setRoleFilter([...roleFilter, role]);
                    }
                  }}
                >
                  {role}
                </Button>
              ))}
            </Stack>
          </Box>
          <Box flex={1}>
            <Typography variant="subtitle2" mb={1}>Status</Typography>
            <Stack direction="row" flexWrap="wrap" gap={1}>
              {uniqueStatuses.map((status: any) => (
                <Button
                  key={status}
                  variant={statusFilter.includes(status) ? "contained" : "outlined"}
                  size="small"
                  onClick={() => {
                    if (statusFilter.includes(status)) {
                      setStatusFilter(statusFilter.filter(s => s !== status));
                    } else {
                      setStatusFilter([...statusFilter, status]);
                    }
                  }}
                  sx={{
                    textTransform: "capitalize",
                    color: status === 'pending' ? 'orange' :
                      status === 'suspended' ? 'red' :
                        status === 'active' ? 'green' : 'inherit',
                    borderColor: status === 'pending' ? 'orange' :
                      status === 'suspended' ? 'red' :
                        status === 'active' ? 'green' : 'inherit',
                  }}
                >
                  {status}
                </Button>
              ))}
            </Stack>
          </Box>
          <Box alignSelf="flex-end">
            <Button
              variant="text"
              color="error"
              onClick={() => {
                setRoleFilter([]);
                setStatusFilter([]);
              }}
            >
              Clear All
            </Button>
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
            rows={filteredUsers}
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
                backgroundColor: '#2395D4 !important', // Changed to the requested color
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
    </Paper>
  );
}