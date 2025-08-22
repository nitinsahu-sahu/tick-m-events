import { Box, Button, Card, Grid, TextField, IconButton, Typography, Tooltip, Table, TableHead, TableCell, TableBody, TableRow } from "@mui/material";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';

import { confirmTicketEntry, verifyTicketCode } from "src/redux/actions/eventOrder";
import { AppDispatch } from 'src/redux/store';
import { Iconify } from "src/components/iconify";
import { HeadingCommon } from "src/components/multiple-responsive-heading/heading";
import { formatTimeToAMPM } from "src/hooks/formate-time";


interface Ticket {
    _id: string;
    eventId: string;
    ticketCode: string;
    tickets: Array<{
        ticketType: string;

    }>;
    verifyEntry: boolean;
    entryTime?: string;
    userId?: {
        name: string;
        email: string;
        _id: string;
    };
    paymentStatus?: "pending" | "confirmed" | "failed";
    participantDetails?: Array<{
        _id: string;
        name: string;
        age: string;
        gender: string;
        validation?: boolean;
    }>;

}
type Participant = {
    _id: string;
    name: string;
    age: string;
    gender: string;
    validation?: boolean;
};


interface FlagState {
    counter: string;
    message: string;
    ticket: Partial<Ticket>; // Partial makes all properties optional
}

interface ApiResult {
    status: number;
    type: string;
    message: any;
    flag: any;
    ticket: Ticket;
}

export function EnterTicketCode({ _selectEve }: any) {
    console.log('====================================');
    console.log(_selectEve.listViewMethods);
    console.log('====================================');
    const dispatch = useDispatch<AppDispatch>();
    const [verifyData, setVerifyData] = useState({
        ticketCode: "",
        participantId: "",
        name: ""
    });

    const [flag, setFlag] = useState<FlagState>({
        counter: "",
        message: "",
        ticket: {},
    });
    // Fixed the event handler to properly update state
    const handleEventChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setVerifyData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Improved the verify callback with proper dependencies
    // const handleVerifyTicketCode = useCallback(async (event: React.FormEvent) => {
    //     event.preventDefault();

    //     try {
    //         const result = await dispatch(verifyTicketCode(verifyData)) as ApiResult;

    //         if (result?.status === 200) {
    //             // 🚨 Check payment status before granting entry
    //             if (result.ticket?.paymentStatus !== "confirmed") {
    //                 setFlag({
    //                     counter: "paymentPending",
    //                     message: "Payment not done",
    //                     ticket: result.ticket,
    //                 });
    //                 return; // stop here
    //             }

    //             setFlag({
    //                 counter: result.flag,
    //                 message: result.message,
    //                 ticket: result.ticket,
    //             });

    //         } else {
    //             setFlag({
    //                 counter: result?.flag,
    //                 message: result?.message,
    //                 ticket: result?.ticket,
    //             });
    //         }
    //     } catch (error: any) {
    //         toast.error(error.message || "Verification failed");
    //     }
    // }, [verifyData, dispatch]);

    const handleVerifyTicketCode = useCallback(async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const result = await dispatch(verifyTicketCode(verifyData)) as ApiResult;

            if (result?.status === 200) {
                // 🚨 Always check paymentStatus (works for ticketCode, userId, or both)
                if (result.ticket?.paymentStatus !== "confirmed") {
                    setFlag({
                        counter: "paymentPending",
                        message: "Payment not done",
                        ticket: result.ticket,
                    });
                    return;
                }

                setFlag({
                    counter: result.flag,
                    message: result.message,
                    ticket: result.ticket,
                });

            } else {
                setFlag({
                    counter: result?.flag,
                    message: result?.message,
                    ticket: result?.ticket,
                });
            }
        } catch (error: any) {
            toast.error(error.message || "Verification failed");
        }
    }, [verifyData, dispatch]);

    const handleCancelState = () => {
        setFlag({
            counter: "",
            message: "",
            ticket: {}
        })
        setVerifyData({
            ticketCode: "",
            participantId: "",
            name: ""
        })
    };


    // const handleConfirmEntry = useCallback(async (event: React.FormEvent | null, customVerifyData?: typeof verifyData) => {
    //     if (event) event.preventDefault();
    //     const now = new Date();
    //     const entryTime = now.toISOString(); // Or format as needed
    //     const data = {
    //         // verifyData,
    //         verifyData: customVerifyData || verifyData,
    //         verifyEntry: true,
    //         entryTime // Send current time to backend
    //     }
    //     try {
    //         const result = await dispatch(confirmTicketEntry(data));
    //         if ((result as ApiResult)?.status === 200) {
    //             toast.success('Entry Successfully');

    //             setTimeout(() => {
    //                 setFlag({
    //                     counter: "",
    //                     message: "",
    //                     ticket: {}
    //                 })
    //                 setVerifyData({
    //                     ticketCode: "",
    //                     participantId: "",
    //                     name: ""
    //                 })
    //             }, 4000);

    //         }
    //     } catch (error) {
    //         toast.error('Ticket verification failed');
    //         console.error('Verification error:', error);
    //     }
    // }, [verifyData, dispatch]);
    const handleConfirmEntry = useCallback(
        async (
            event: React.FormEvent | null,
            customVerifyData?: typeof verifyData
        ) => {
            if (event) event.preventDefault();

            const now = new Date();
            const entryTime = now.toISOString();
            const data = {
                verifyData: customVerifyData || verifyData,
                verifyEntry: true,
                entryTime,
            };

            try {
                const result = (await dispatch(confirmTicketEntry(data))) as ApiResult;

                if (result?.status === 200) {
                    // ✅ If it's for the whole ticket (no custom participantId passed)
                    if (!customVerifyData) {
                        toast.success("Entry Successfully");

                        setTimeout(() => {
                            setFlag({
                                counter: "",
                                message: "",
                                ticket: {},
                            });
                            setVerifyData({
                                ticketCode: "",
                                participantId: "",
                                name: "",
                            });
                        }, 4000);
                    } else {
                        // ✅ Update participant as entered (no toast)
                        setFlag((prev) => ({
                            ...prev,
                            ticket: {
                                ...prev.ticket,
                                participantDetails: prev.ticket?.participantDetails?.map((p) =>
                                    p._id === customVerifyData.participantId
                                        ? { ...p, validation: true }
                                        : p
                                ),
                            },
                        }));
                    }
                }
            } catch (error) {
                if (!customVerifyData) {
                    toast.error("Ticket verification failed");
                }
                console.error("Verification error:", error);
            }
        },
        [verifyData, dispatch]
    );

    const listViewMethods = _selectEve?.listViewMethods || [];

    return (
        <Box mt={3} boxShadow={3} borderRadius={3} p={3} bgcolor="white">
            <HeadingCommon title="Enter Ticket Code" color="#0B2E4C" weight={600} baseSize="33px" />
            <Typography mt={3} mb={0} color='red'>{flag.counter === 'field' ? flag.message : null}</Typography>

            {/* Form with proper submission handling */}
            <form onSubmit={handleVerifyTicketCode}>
                <Grid container spacing={2} alignItems="center" mt={0.1}>
                    {/* Calculate the grid size based on number of fields */}
                    {(() => {
                        const fieldCount = listViewMethods.length;
                        const gridSize = fieldCount > 0 ? Math.floor(12 / fieldCount) : 12;

                        return (
                            <>
                                {/* Manual Code Field */}
                                {listViewMethods.includes('manualCode') && (
                                    <Grid item xs={12} sm={gridSize} md={gridSize}>
                                        <TextField
                                            fullWidth
                                            type="text"
                                            name="ticketCode"
                                            label="Enter Ticket Code"
                                            variant="outlined"
                                            placeholder="583-356"
                                            size="small"
                                            value={verifyData.ticketCode}
                                            onChange={handleEventChange}
                                        />
                                    </Grid>
                                )}

                                {/* Account ID Field */}
                                {listViewMethods.includes('accountId') && (
                                    <Grid item xs={12} sm={gridSize} md={gridSize}>
                                        <TextField
                                            fullWidth
                                            type="text"
                                            name="participantId"
                                            label="Search by Participant ID"
                                            variant="outlined"
                                            placeholder="Enter Participant ID"
                                            size="small"
                                            value={verifyData.participantId}
                                            onChange={handleEventChange}
                                        />
                                    </Grid>
                                )}

                                {/* Name List Field */}
                                {listViewMethods.includes('nameList') && (
                                    <Grid item xs={12} sm={gridSize} md={gridSize}>
                                        <TextField
                                            fullWidth
                                            name="name"
                                            type="text"
                                            label="Search by Participant Name"
                                            variant="outlined"
                                            placeholder="Enter Participant Name"
                                            size="small"
                                            value={verifyData.name}
                                            onChange={handleEventChange}
                                        />
                                    </Grid>
                                )}
                            </>
                        );
                    })()}

                    {/* Verify Button - Only show if at least one field is visible */}
                    {flag.counter !== 'granted' && listViewMethods.length > 0 && (
                        <Grid item xs={12} sm={6} md={4} mt={2}>
                            <Button
                                variant="contained"
                                fullWidth
                                type="submit"
                                sx={{
                                    backgroundColor: "#0B2A4A",
                                    color: "white",
                                    textTransform: "none",
                                    fontWeight: "bold",
                                    borderRadius: "8px",
                                    height: "40px",
                                    '&:hover': {
                                        backgroundColor: '#0A2351'
                                    }
                                }}
                            >
                                Verify
                            </Button>
                        </Grid>
                    )}
                </Grid>
            </form>

            {flag.counter === 'invalid' || flag.counter === 'expired' ? <Grid container spacing={2} mt={2}>
                <Grid item xs={12} >
                    <Card
                        sx={{
                            backgroundColor: '#FFCCCC',
                            borderRadius: "12px",
                            padding: "12px",
                            display: 'flex',
                            justifyContent: 'space-between',
                            border: "2px solid #ddd",
                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
                        }}
                    >
                        <HeadingCommon title={flag.message} baseSize="23px" width={{ md: "34%" }} />
                        <Tooltip title={
                            <HeadingCommon color="white" title="No data found in this ticket Code" baseSize="12px" />

                        } arrow>
                            <IconButton sx={{ ml: 1 }}>
                                <Iconify icon="mdi:information-outline" />
                            </IconButton>
                        </Tooltip>
                    </Card>
                </Grid>
            </Grid> : null}
            {flag.counter === 'paymentPending' && (
                <Grid container spacing={2} mt={2}>
                    <Grid item xs={12}>
                        <Card
                            sx={{
                                backgroundColor: '#FFF3CD',
                                borderRadius: "12px",
                                padding: "12px",
                                border: "2px solid #ddd",
                                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
                            }}
                        >
                            <HeadingCommon
                                title={flag.message}
                                baseSize="23px"
                                color="orange"
                            />
                            <Tooltip title={
                                <HeadingCommon
                                    color="white"
                                    title="Payment must be completed before entry"
                                    baseSize="12px"
                                />
                            } arrow>
                                <IconButton sx={{ ml: 1 }}>
                                    <Iconify icon="mdi:information-outline" />
                                </IconButton>
                            </Tooltip>
                        </Card>
                    </Grid>
                </Grid>
            )}

            {flag.counter === 'already' ? <Grid container spacing={2} mt={2}>
                <Grid item xs={12} >
                    <Card
                        sx={{
                            backgroundColor: '#FFD9A3',
                            display: 'flex',
                            justifyContent: 'space-between',
                            borderRadius: "12px",
                            padding: "12px",
                            border: "2px solid #ddd",
                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
                        }}
                    >
                        <HeadingCommon title={flag.message} baseSize="23px" width={{ md: "34%" }} />
                        <Tooltip title={
                            <HeadingCommon color="white" title='Book another tickets' baseSize="12px" />

                        } arrow>
                            <IconButton sx={{ ml: 1 }}>
                                <Iconify icon="mdi:information-outline" />
                            </IconButton>
                        </Tooltip>
                    </Card>
                </Grid>
            </Grid> : null}
            {flag.counter === 'granted' && (
                <Grid container spacing={2} mt={2}>
                    <Grid item xs={12}>
                        <Card
                            sx={{
                                backgroundColor: '#DFFFE0',
                                borderRadius: "12px",
                                padding: "12px",
                                border: "2px solid #ddd",
                                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
                            }}
                        >
                            <HeadingCommon title={flag.message} baseSize="23px" width={{ md: "34%" }} />
                            <HeadingCommon
                                title={`Entry Time: ${formatTimeToAMPM(new Date().toISOString())}`}
                                baseSize="23px"
                                width={{ md: "34%" }}
                            />
                            {Array.isArray(flag.ticket.participantDetails) && (
                                <Box mt={3}>
                                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                                        Participant Details
                                    </Typography>

                                    {flag.ticket.participantDetails.length > 0 ? (
                                        <Table size="small">
                                            <TableHead>
                                                <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
                                                    <TableCell><b>Name</b></TableCell>
                                                    <TableCell><b>Age</b></TableCell>
                                                    <TableCell><b>Gender</b></TableCell>
                                                    <TableCell><b>Action</b></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {flag.ticket.participantDetails.map((p: any, i: number) => (
                                                    <TableRow key={i}>
                                                        <TableCell>{p.name}</TableCell>
                                                        <TableCell>{p.age}</TableCell>
                                                        <TableCell>{p.gender}</TableCell>
                                                        <TableCell>
                                                            <Button
                                                                variant="contained"
                                                                size="small"
                                                                sx={{
                                                                    backgroundColor: p.validation ? "gray" : "green",
                                                                    color: "white",
                                                                    borderRadius: "6px",
                                                                    "&:hover": {
                                                                        backgroundColor: p.validation ? "gray" : "darkgreen"
                                                                    },
                                                                }}
                                                                disabled={p.validation}
                                                                onClick={() => handleConfirmEntry(null, {
                                                                    ticketCode: flag.ticket.ticketCode || "",
                                                                    participantId: p._id,
                                                                    name: ""
                                                                })}
                                                            >
                                                                {p.validation ? "✔ Entered" : "Confirm"}
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    ) : (
                                        <Typography color="textSecondary" mt={2}>
                                            No participant details available for this ticket.
                                        </Typography>
                                    )}
                                </Box>
                            )}
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                my={1}
                                flexDirection={{ xs: 'column', sm: 'row', md: 'row' }}
                                gap={{ xs: 2, sm: 0, md: 0 }}
                            >
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: "green",
                                        color: "white",
                                        borderRadius: "8px",
                                        "&:hover": { backgroundColor: "darkgreen" },
                                        width: { xs: '100%', sm: 'auto', md: 'auto' }
                                    }}
                                    disabled={
                                        flag.ticket.verifyEntry ||
                                        (flag.ticket.participantDetails?.some((p) => !p.validation) ?? false)
                                    }
                                    onClick={handleConfirmEntry}
                                >
                                    Confirm Entry
                                </Button>

                                <Box
                                    display="flex"
                                    alignItems="center"
                                    width={{ xs: '100%', sm: 'auto', md: 'auto' }}
                                    gap={1}
                                >
                                    <Button
                                        variant="contained"
                                        sx={{
                                            backgroundColor: "red",
                                            color: "white",
                                            borderRadius: "8px",
                                            "&:hover": { backgroundColor: "darkred" },
                                            width: { xs: '100%', sm: 'auto', md: 'auto' }
                                        }}
                                        onClick={handleCancelState}
                                    >
                                        Cancel
                                    </Button>
                                    <Tooltip
                                        title={
                                            <>
                                                <HeadingCommon color="white" title={`Name: ${flag?.ticket?.userId?.name}`} baseSize="12px" />
                                                <HeadingCommon color="white" title={`Email: ${flag?.ticket?.userId?.email}`} baseSize="12px" />
                                                <HeadingCommon
                                                    color="white"
                                                    title={`Ticket Type: ${flag?.ticket?.tickets?.[0]?.ticketType || 'N/A'}`}
                                                    baseSize="12px"
                                                />
                                                <HeadingCommon
                                                    title={flag?.ticket?.verifyEntry ? "Ticket Status: Verified" : "Ticket Status: Unverified"}
                                                    baseSize="12px"
                                                    color="white"
                                                />
                                            </>
                                        }
                                        arrow
                                    >
                                        <IconButton sx={{ ml: 1 }}>
                                            <Iconify icon="mdi:information-outline" />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </Box>
                        </Card>
                    </Grid>
                </Grid>
            )}


        </Box>
    );
}
