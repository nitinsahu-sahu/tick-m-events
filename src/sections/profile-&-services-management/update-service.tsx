import { Button, Grid, TextField, Box } from "@mui/material";
import { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { userServiceUpdate } from "src/redux/actions";
import { AppDispatch, RootState } from "src/redux/store";

interface ApiResult {
    status: number;
    type: string;
    message: any;
    // Add other properties if needed
}

export function UpdateServices({ updateData, setServiceOfferRowData }: any) {
    const fullDesRef = useRef<ReactQuill>(null);
    const addOptionRef = useRef<ReactQuill>(null);

    const { _id } = useSelector((state: RootState) => state?.auth?.user);

    const dispatch = useDispatch<AppDispatch>();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setServiceOfferRowData((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleServiceUpdate = useCallback(async (event: any) => {
        event.preventDefault();
        const serviceUpdateData = new FormData();
        serviceUpdateData.append("serviceType", updateData.serviceName);
        serviceUpdateData.append("budget", updateData.budget);
        serviceUpdateData.append("description", updateData.description);
        serviceUpdateData.append("location", updateData.location)
        serviceUpdateData.append("description", fullDesRef.current?.value as string);
        serviceUpdateData.append("additionalOptions", addOptionRef.current?.value as string);
        try {
            const result = await dispatch(userServiceUpdate({ serviceUpdateData, userId: _id, serviceId: updateData?._id }));
            if ((result as ApiResult)?.status === 200) {
                toast.success(result?.message);
                setServiceOfferRowData({
                    _id: "",
                    serviceName: "",
                    location: "",
                    description: "",
                    budget: ""
                })
            } else {
                toast.error(result?.message);
            }

        } catch (error) {
            toast.error("Profile update failed");
        }
    }, [dispatch, updateData, _id, setServiceOfferRowData])

    return (
        <form onSubmit={handleServiceUpdate}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        name="serviceName"
                        value={updateData.serviceType}
                        onChange={handleChange}
                        fullWidth
                        defaultValue="Service Name"
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
                        fullWidth
                        multiline
                        name="description"
                        value={updateData.description}
                        onChange={handleChange}
                        minRows={3}
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
                <Grid item xs={12} >
                    <ReactQuill
                        placeholder="Description..."
                        theme="snow"
                        className="custom-quill"
                        ref={fullDesRef}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="budget"
                        value={updateData.budget}
                        onChange={handleChange}
                        fullWidth
                        defaultValue="Indicative Price"
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
                    <TextField fullWidth
                        name="location"
                        value={updateData.eventLocation}
                        onChange={handleChange}
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
                        fullWidth
                        multiline
                        name="additionalOptions"
                        value={updateData.additionalOptions}
                        onChange={handleChange}
                        minRows={3}
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
                <Grid item xs={12} >
                    <ReactQuill
                        placeholder="Additional Options..."
                        theme="snow"
                        className="custom-quill"
                        ref={addOptionRef}
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
                        Edit a Service
                    </Button>
                </Grid>
            </Grid>
        </form>

    )
}