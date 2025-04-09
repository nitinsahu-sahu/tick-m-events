import { Paper, Typography, Box, Button } from "@mui/material";

import { ReservationsAndContractsTable } from "src/components/tables/reservations-&-contracts-table";


function Detail({ label, value }: { label: string; value: string }) {
    return (
        <Box display="flex" mb={1}>
            <Typography fontWeight="bold" minWidth={145}>
                {label}:
            </Typography>
            <Typography sx={{ fontSize: "15px", fontWeight: "600", marginLeft: 2, }}>{value}</Typography>
        </Box>
    );
}

interface RequestSectionProps {
    title: string;
    description: string;
    headers: any[];
    data: any[];
    type: string;
    detailsTitle?: string;
    details?: { label: string; value: string }[];
    buttons?: {
        label: string;
        variant: "contained" | "outlined";
        onClick?: () => void;
    }[];
}

export function RequestTabSection({
    title,
    description,
    headers,
    data,
    type,
    detailsTitle,
    details,
    buttons
}: RequestSectionProps) {
    return (
        <>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
                {title}
            </Typography>
            <Typography variant="body2" mb={2}>
                {description}
            </Typography>

            <ReservationsAndContractsTable headers={headers} data={data} type={type} />

            {details && (
                <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
                    <Box
                        sx={{
                            borderRadius: 4,
                            p: 4,
                            backgroundColor: "#fff",
                            boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.15)",
                            maxWidth: 600,
                            width: "100%"
                        }}
                    >
                        <Typography variant="h6" fontWeight="bold" mb={3}>
                            {detailsTitle}
                        </Typography>

                        <Box>
                            {details.map((item, i) => (
                                <Detail key={i} label={item.label} value={item.value} />
                            ))}
                        </Box>

                        {buttons && (
                            <Box display="flex" gap={2} mt={4} justifyContent="flex-end">
                                {buttons.map((btn, idx) => (
                                    <Button
                                        key={idx}
                                        variant={btn.variant}
                                        onClick={btn.onClick}
                                        sx={{
                                            backgroundColor: btn.variant === "contained" ? "#0B2647" : undefined,
                                            color: btn.variant === "outlined" ? "#0B2647" : undefined,
                                            borderColor: btn.variant === "outlined" ? "#0B2647" : undefined,
                                            textTransform: "none",
                                            borderRadius: 2,
                                            px: 3,
                                            "&:hover": {
                                                backgroundColor: btn.variant === "contained" ? "#081c34" : undefined,
                                                borderColor: btn.variant === "outlined" ? "#081c34" : undefined,
                                                color: btn.variant === "outlined" ? "#081c34" : undefined
                                            }
                                        }}
                                    >
                                        {btn.label}
                                    </Button>
                                ))}
                            </Box>
                        )}
                    </Box>
                </Box>
            )}
        </>
    );
};

