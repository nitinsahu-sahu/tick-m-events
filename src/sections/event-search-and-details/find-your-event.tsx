import { Checkbox, FormControlLabel, MenuItem, Select, Grid, FormControl, InputLabel,  IconButton, Box, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

import { HeadingCommon } from "src/components/multiple-responsive-heading/heading";
import { eventsTickets } from "./utills";
import { PopularEvent } from "./PopularEvent";

export function FindYourEvent() {
    return (
        <Box boxShadow={3} borderRadius={3} mt={3}>
            {/* Top Bar with Search */}
            <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                bgcolor="#002244"
                p={1}
                sx={{ px: 3, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
            >
                <Box display="flex" alignItems="center" bgcolor="#fff" borderRadius={1} px={2} flex={1}>
                    <SearchIcon color="action" />
                    <TextField
                        variant="standard"
                        placeholder="Search Event"
                        InputProps={{ disableUnderline: true }}
                        fullWidth
                        sx={{ ml: 1 }}
                    />
                </Box>
                <IconButton sx={{ ml: 1, color: '#fff' }}>
                    <FilterListIcon />
                </IconButton>
            </Box>

            {/* Filter Fields */}
            <Box sx={{ mx: 3, my: 3 }}>
                <HeadingCommon title="Find Your Event" weight={600} baseSize="34px" />

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={3}>
                        <FormControl fullWidth>
                            <InputLabel
                                id="category-label"
                                sx={{
                                    color: 'black',
                                    '&.Mui-focused': { color: 'black' },
                                    fontWeight: 500,
                                    // margin between label and select
                                }}
                            >
                                Category
                            </InputLabel>
                            <Select
                                labelId="category-label"
                                defaultValue="concerts"
                                displayEmpty
                                sx={{
                                    mt: 2,
                                    borderRadius: 1, // rounded corners
                                    bgcolor: '#fff',
                                    color: 'black',
                                    '.MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#ccc', // light gray border
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#aaa',
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#000',
                                    },
                                    '.MuiSvgIcon-root': {
                                        color: 'black', // dropdown arrow
                                    },
                                    fontSize: 16,
                                }}
                            >
                                <MenuItem value="concerts">Concerts</MenuItem>
                                <MenuItem value="sports">Sports</MenuItem>
                                <MenuItem value="comedy">Comedy</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Date */}
                    <Grid item xs={12} sm={6} md={3}>
                        <FormControl fullWidth>
                            <InputLabel
                                id="Date"
                                sx={{
                                    color: 'black',
                                    '&.Mui-focused': { color: 'black' },
                                    fontWeight: 500,
                                    // margin between label and select
                                }}
                            >
                                Date
                            </InputLabel>
                            <Select
                                labelId="Date"
                                defaultValue="today"
                                sx={{
                                    mt: 2,
                                    borderRadius: 1, // rounded corners
                                    bgcolor: '#fff',
                                    color: 'black',
                                    '.MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#ccc', // light gray border
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#aaa',
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#000',
                                    },
                                    '.MuiSvgIcon-root': {
                                        color: 'black', // dropdown arrow
                                    },
                                    fontSize: 16,
                                }}
                            >
                                <MenuItem value="today">Today</MenuItem>
                                <MenuItem value="this_week">This Week</MenuItem>
                                <MenuItem value="this_month">This Month</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <FormControl fullWidth>
                            <InputLabel
                                shrink
                                sx={{
                                    color: 'black',
                                    '&.Mui-focused': { color: 'black' },
                                    fontWeight: 500,
                                }}
                            >
                                Location
                            </InputLabel>
                            <TextField
                                placeholder="Enter City or use geolocation"
                                variant="outlined"
                                fullWidth
                                sx={{
                                    mt: 2,
                                    bgcolor: '#fff',
                                    borderRadius: 1,
                                    fontSize: 16,
                                    '& .MuiOutlinedInput-root': {
                                        color: 'black',
                                        borderRadius: 1,

                                        '& fieldset': {
                                            borderColor: 'black',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'black',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'black',
                                        },
                                    },
                                }}
                            />
                        </FormControl>
                    </Grid>

                    {/* Price */}
                    <Grid item xs={12} sm={6} md={3}>
                        <FormControl fullWidth>
                            <InputLabel
                                id="Price"
                                sx={{
                                    color: 'black',
                                    '&.Mui-focused': { color: 'black' },
                                    fontWeight: 500,
                                }}
                            >
                                Price
                            </InputLabel>
                            <Select
                                labelId="Price"
                                defaultValue="free"
                                sx={{
                                    mt: 2,
                                    borderRadius: 1, // rounded corners
                                    bgcolor: '#fff',
                                    color: 'black',
                                    '.MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#ccc', // light gray border
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#aaa',
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#000',
                                    },
                                    '.MuiSvgIcon-root': {
                                        color: 'black', // dropdown arrow
                                    },
                                    fontSize: 16,
                                }}
                            >
                                <MenuItem value="free">Free</MenuItem>
                                <MenuItem value="paid">Paid</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Popularity */}
                    <Grid item xs={12} sm={6} md={8}>
                        <FormControl fullWidth>
                            <InputLabel
                                id="Popularity"
                                sx={{
                                    color: 'black',
                                    '&.Mui-focused': { color: 'black' },
                                    fontWeight: 500,
                                }}
                            >
                                Popularity
                            </InputLabel>
                            <Select
                                labelId="Popularity"
                                defaultValue="Popularity"
                                sx={{
                                    mt: 2,
                                    borderRadius: 1, // rounded corners
                                    bgcolor: '#fff',
                                    color: 'black',
                                    '.MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#ccc', // light gray border
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#aaa',
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#000',
                                    },
                                    '.MuiSvgIcon-root': {
                                        color: 'black', // dropdown arrow
                                    },
                                    fontSize: 16,
                                }}
                            >
                                <MenuItem value="tickets_sold">Tickets Sold</MenuItem>
                                <MenuItem value="ratings">Ratings</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Checkbox */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Box
                            sx={{
                                border: '1px solid #ccc',
                                borderRadius: 1,
                                bgcolor: '#fff',
                                padding: '1px 16px',
                                mt: 2,
                            }}
                        >
                            <HeadingCommon variant="subtitle2" title="Available Tickets" weight={400} baseSize="16px"/>
                           
                            <FormControlLabel control={<Checkbox />} label="Only show available tickets" />
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            <Box mt={2} p={{ xs: 1, md: 1, lg: 2 }}>
                {/* Main Grid Layout */}
                <Grid container spacing={3} >
                    {eventsTickets.map((ticketc, index) => (
                        <Grid item xs={12} sm={6} md={6} key={ticketc.id || index}>
                            <PopularEvent ticket={ticketc} key={index} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    )
}