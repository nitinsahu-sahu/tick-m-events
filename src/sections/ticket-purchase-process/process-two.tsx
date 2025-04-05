import { useRef } from 'react';
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { HeadProcess } from "./head-process";

const formFields = [
    { id: 'fullName', label: 'Full Name' },
    { id: 'email', label: 'Email Address' },
    { id: 'phone', label: 'Phone Number' },
    { id: 'city', label: 'City of Residence' },
    { id: 'gender', label: 'Gender' },
    { id: 'age', label: 'Age' },
    { id: 'hearAbout', label: 'How did you hear about the event?' },
    { id: 'eventInfo', label: 'Event-specific information (e.g., meal preference)' }
];

export function ProcessTwo() {
    const formRefs = useRef<Record<string, HTMLInputElement | null>>({});

    const handleSubmit = () => {
        const formData: Record<string, string> = {};
        formFields.forEach(field => {
            formData[field.id] = formRefs.current[field.id]?.value || '';
        });
        console.log('Form data:', formData);
        // Use formData for submission
    };

    const setRef = (id: string) => (el: HTMLInputElement | null) => {
        formRefs.current[id] = el;
    };

    return (
        <Box mt={6}>
            <Paper sx={{ width: "100%", p: 4, boxShadow: 3, borderRadius: 2, position: "relative" }}>
                <HeadProcess title="Participant Details" step="2" />
                
                <Grid container spacing={3} mt={2}>
                    {formFields.map((field) => (
                        <Grid item xs={12} key={field.id}>
                            <TextField
                                inputRef={setRef(field.id)}
                                fullWidth
                                variant="outlined"
                                placeholder={field.label}
                                sx={{
                                    backgroundColor: "#fff",
                                    borderRadius: "15px",
                                    '& .MuiOutlinedInput-root': { borderRadius: '15px' },
                                }}
                            />
                        </Grid>
                    ))}
                </Grid>
                
                <Box mt={4} display="flex" justifyContent="center">
                    <Button 
                        fullWidth 
                        variant="contained" 
                        sx={{ bgcolor: "#0B3558", mt: 2 }}
                        onClick={handleSubmit}
                    >
                        Proceed to Participant Details
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}