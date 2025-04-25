import { Button, Grid, TextField } from "@mui/material";
import { useCallback, useState } from "react";
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/redux/store";

import { personalUserServiceReqCreate } from "src/redux/actions/user-personal-service-req.action";

interface ApiResult {
    status: number;
    type: string;
    message: any;
    // Add other properties if needed
}

const StyledTextField = ({ name, label, value, onChange, multiline = false, minRows, required = false }: any) => (
    <TextField
        required={required}
        name={name}
        value={value}
        onChange={onChange}
        fullWidth
        placeholder={label}
        multiline={multiline}
        minRows={minRows}
        sx={{
            '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'black' },
                '&:hover fieldset': { borderColor: 'black' },
                '&.Mui-focused fieldset': { borderColor: 'black' }
            }
        }}
    />
);

const FileInput = ({ onChange }: any) => (
    <TextField
        type="file"
        fullWidth
        name="serviceImage"
        onChange={onChange}
        sx={{
            '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'black' },
                '&:hover fieldset': { borderColor: 'black' },
                '&.Mui-focused fieldset': { borderColor: 'black' }
            }
        }}
        InputProps={{
            inputProps: {
                accept: "image/*"
            }
        }}
    />
);

export function AddServices() {
    const dispatch = useDispatch<AppDispatch>()

    const [serviceImage, setServiceImage] = useState(null); // Correct initialization
    const [addServiceForm, setAddServiceForm] = useState({
        serviceName: '',
        location: '',
        description: '',
        budget: ''
    });

    const handleServiceImage = (e: any) => {
        if (e.target.files?.[0]) { // Check if a file exists
            setServiceImage(e.target.files[0]); // Store the File object directly
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setAddServiceForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = useCallback(async (event: any) => {
        event.preventDefault();
        const formServiceData = new FormData();
        formServiceData.append("serviceName", addServiceForm.serviceName);
        formServiceData.append("budget", addServiceForm.budget);
        formServiceData.append("location", addServiceForm.location);
        formServiceData.append("description", addServiceForm.description);
        if (serviceImage) {
            formServiceData.append("serviceImage", serviceImage);
        }
        try {
            const result = await dispatch(personalUserServiceReqCreate(formServiceData));
            if ((result as ApiResult)?.status === 201) {
                toast.success(result?.message);
                setAddServiceForm({
                    serviceName: '',
                    location: '',
                    description: '',
                    budget: ''
                })
                setServiceImage(null)
            } else {
                toast.error(result?.message);
            }

        } catch (error) {
            toast.error("Service creation failed");
        }
    }, [addServiceForm, serviceImage, dispatch])

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        required
                        name="serviceName"
                        value={addServiceForm.serviceName}
                        onChange={handleChange}
                        fullWidth
                        placeholder="Service Name"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'black', // Default border color
                                },
                                '&:hover fieldset': {
                                    borderColor: 'black', // Border color on hover
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'black', // Border color when focused
                                },
                            },
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        name="description"
                        value={addServiceForm.description}
                        onChange={handleChange}
                        fullWidth
                        multiline
                        minRows={3}
                        placeholder="Description"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'black', // Default border color
                                },
                                '&:hover fieldset': {
                                    borderColor: 'black', // Border color on hover
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'black', // Border color when focused
                                },
                            },
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        name="budget"
                        value={addServiceForm.budget}
                        onChange={handleChange}
                        fullWidth
                        placeholder="Indicative Price"

                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'black', // Default border color
                                },
                                '&:hover fieldset': {
                                    borderColor: 'black', // Border color on hover
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'black', // Border color when focused
                                },
                            },
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        name="location"
                        value={addServiceForm.location}
                        onChange={handleChange}
                        fullWidth
                        placeholder="Location"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'black', // Default border color
                                },
                                '&:hover fieldset': {
                                    borderColor: 'black', // Border color on hover
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'black', // Border color when focused
                                },
                            },
                        }}
                    />

                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type="file"
                        fullWidth
                        name='serviceImage'
                        onChange={handleServiceImage}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'black', // Default border color
                                },
                                '&:hover fieldset': {
                                    borderColor: 'black', // Border color on hover
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'black', // Border color when focused
                                },
                            },
                        }}
                        InputProps={{

                            inputProps: {
                                accept: "image/*",  // Move accept here
                            },
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        sx={{
                            backgroundColor: "#0B2E4C",
                            textTransform: "none",
                            fontWeight: "bold",
                            borderRadius: "14px",
                            py: 1.5,
                            "&:hover": {
                                backgroundColor: "#0B2E4C",
                            },
                        }}
                    >
                        Add a Service
                    </Button>
                </Grid>
            </Grid>
        </form>

    )
}