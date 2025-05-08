import { Button, Checkbox, FormControlLabel, Box, Paper, TextField, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { useCallback, useRef, useState } from "react";
import { toast, ToastContent } from 'react-toastify';
import { useDispatch } from "react-redux";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { createTicketType } from "src/redux/actions/ticket-&-reservation-management.action";
import { AppDispatch } from "src/redux/store";
import { HeadingCommon } from "src/components/multiple-responsive-heading/heading";

interface FormRefs {
    eventName: HTMLInputElement | null;
    price: HTMLInputElement | null;
    availableQuantity: HTMLInputElement | null;
    ticketDescription: string;
    validity: HTMLInputElement | null;
    transferableTicket: HTMLInputElement | null;
    activationCode: HTMLInputElement | null;
}

export interface TicketFormData {
    eventName: string;
    availableQuantity: number;
    ticketDescription: string;
    price: number;
    validity: string;
    options: {
        transferableTicket: boolean;
        personalizedTicket: boolean;
        activationCode: boolean;
    };
}

interface ApiResponse {
    status: number;
    message: string;
    data?: any;
}

export function TicketCreationAndConfiguration() {
    const dispatch = useDispatch<AppDispatch>();

    const theme = useTheme();
    const [personalized, setPersonalized] = useState(true);
    const formRef = useRef<FormRefs>({
        eventName: null,
        price: null,
        availableQuantity: null,
        ticketDescription: '',
        validity: null,
        transferableTicket: null,  // Changed from false to null
        activationCode: null       // Changed from false to null
    });

    const quillRef = useRef<ReactQuill>(null);



    const handleSubmit = useCallback(async (event: any) => {
        event.preventDefault(); // Prevent default form submission behavior
        if (!formRef.current.eventName?.value ||
            !formRef.current.price?.value ||
            !formRef.current.availableQuantity?.value ||
            !formRef.current.validity?.value) {
            return;
        }

        const formData: TicketFormData = {
            eventName: formRef.current.eventName.value,
            availableQuantity: parseInt(formRef.current.availableQuantity.value, 10),
            ticketDescription: quillRef.current?.getEditor().root.innerHTML ?? '',
            price: parseFloat(formRef.current.price.value),
            validity: formRef.current.validity.value,
            options: {
                transferableTicket: formRef.current.transferableTicket?.checked || false,
                personalizedTicket: personalized,
                activationCode: formRef.current.activationCode?.checked || false
            }
        };
        try {
            const result = await dispatch(createTicketType(formData) as unknown as ApiResponse)

            if (result.status === 201) {
                toast.success(result.message as ToastContent);
            } else {
                toast.error(result.message as ToastContent);
            }
        } catch (error) {
            toast.error('An unexpected error occurred' as ToastContent);
        }
    }, [personalized, dispatch]);

    return (
        <Box boxShadow={3} borderRadius={3} mt={3}>
            <Paper sx={{ width: "100%", p: 3, maxWidth: { xs: "800px", sm: "800px", md: "100%" } }}>
                {/* Section Title */}
                <HeadingCommon baseSize="33px" weight={600} variant="h5" color='#0B2E4C' title="Ticket Creation & Configuration"/>
               

                {/* Table Header */}
                <Box
                    sx={{
                        border: "1px solid #969696",
                        borderRadius: 1,
                        mt: 2,
                        p: 2,
                        bgcolor: "white",
                        alignItems: "center",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "start",
                            width: { xs: "100%", sm: "100%", md: "42%" }, // Make it responsive
                            pb: 1,
                            borderBottom: "1px solid #969696",
                            flexWrap: "wrap", // Allow wrapping on smaller screens
                        }}
                    >
                        {["Name", "Price", "Quantity", "Validity", "Options"].map((header) => (
                            <Typography key={header} variant="body2" fontWeight="medium" sx={{ paddingRight: { xs: "10px", sm: "10px", md: "20px" }, fontSize: { xs: "12px", sm: "14px", md: "16px" } }}>
                                {header}
                            </Typography>
                        ))}
                    </Box>
                </Box>

                {/* Form Section */}
                <HeadingCommon baseSize="33px" weight={600} variant="h5" color='#0B2E4C' title="Create a Ticket Type" mt={3}/>

                {/* Inputs - Responsive Grid */}
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
                        gap: 2,
                        mt: 2,
                    }}
                >
                    <TextField
                        label="Event Name"
                        placeholder="e.g., Tech Conference 2025"
                        fullWidth
                        inputRef={(el: HTMLInputElement) => {
                            formRef.current.eventName = el;
                            return el; // or return undefined;
                        }}
                    />
                    <TextField
                        label="Price"
                        placeholder="10000"
                        fullWidth
                        type="number"
                        inputRef={(el: HTMLInputElement) => {
                            formRef.current.price = el;
                            return el; // or return undefined;
                        }}
                    />
                    <TextField
                        label="Available Quantity"
                        placeholder="Enter quantity"
                        fullWidth
                        type="number"
                        inputRef={(el: HTMLInputElement) => {
                            formRef.current.availableQuantity = el;
                            return el; // or return undefined;
                        }}

                    />
                </Box>

                {/* Description */}
                <ReactQuill
                    theme="snow"
                    style={{ height: '90px', margin: "20px 0px 40px 0px" }}
                    ref={quillRef}
                />

                {/* Validity */}
                <TextField
                    label="Validity e.g., 2025-06-15"
                    type="date"
                    fullWidth
                    sx={{ mt: { xs: 6, sm: 5, md: 3 } }}
                    inputRef={(el: HTMLInputElement) => {
                        formRef.current.validity = el;
                        return el; // or return undefined;
                    }}
                />

                {/* Checkboxes */}
                <Box sx={{ mt: 2 }}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                inputRef={(el: HTMLInputElement) => {
                                    formRef.current.transferableTicket = el;
                                    return el; // or return undefined;
                                }}
                                sx={{ color: "blue", "&.Mui-checked": { color: "#0B2E4C" } }}
                            />
                        }
                        label="Transferable Ticket (Can be resold or given to another person)"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                sx={{ color: "blue", "&.Mui-checked": { color: "#0B2E4C" } }}
                                checked={personalized}
                                onChange={(e) => setPersonalized(e.target.checked)}
                            />
                        }
                        label="Personalized Ticket (Participant's name and account ID required for validation)"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                inputRef={(el: HTMLInputElement) => {
                                    formRef.current.activationCode = el;
                                    return el; // or return undefined;
                                }}
                                sx={{ color: "blue", "&.Mui-checked": { color: "#0B2E4C" } }}
                            />
                        }
                        label="Activation Code (Unique QR Code or manual code for entrance validation)"
                    />
                </Box>

                {/* Buttons - Centered on Mobile */}
                <Box
                    sx={{
                        mt: 3,
                        display: "flex",
                        gap: 2,
                        flexWrap: "wrap",
                        justifyContent: { xs: "center", md: "flex-start" },
                    }}
                >
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ backgroundColor: '#0B2E4C' }}
                        onClick={handleSubmit}
                    >
                        Save & Publish Tickets
                    </Button>
                </Box>
            </Paper>
        </Box>
    )
}