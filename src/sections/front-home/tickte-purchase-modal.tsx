import { Modal, Box, Typography, Divider, Button } from '@mui/material';

interface PurchaseModalProps {
    open: boolean;
    onClose: () => void;
    eventName: string;
    eventId: string;
    selectedTickets: Array<{
        ticketName: string;
        quantity: number;
        price: number;
    }>;
    totalAmount: number;
}

export function PurchaseModal({
    open,
    onClose,
    eventName,
    eventId,
    selectedTickets,
    totalAmount
}: PurchaseModalProps) {
    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: { xs: '90%', sm: '80%', md: '600px' },
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                borderRadius: 2
            }}>
                <Typography variant="h6" fontWeight="bold" mb={2}>
                    Confirm Your Purchase
                </Typography>

                <Typography variant="body1" mb={1}>
                    <strong>Event:</strong> {eventName}
                </Typography>
                <Typography variant="body1" mb={3}>
                    <strong>Event ID:</strong> {eventId}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle1" fontWeight="bold" mb={2}>
                    Selected Tickets:
                </Typography>

                {selectedTickets.map((ticket, index) => (
                    <Box key={index} mb={2}>
                        <Typography>
                            <strong>{ticket.ticketName}</strong> × {ticket.quantity}
                        </Typography>
                        <Typography color="text.secondary">
                            {ticket.price.toLocaleString()} XAF each
                        </Typography>
                    </Box>
                ))}

                <Divider sx={{ my: 2 }} />

                <Typography variant="h6" fontWeight="bold" mb={3}>
                    Total: {totalAmount.toLocaleString()} XAF
                </Typography>

                <Box display="flex" justifyContent="flex-end" gap={2}>
                    <Button variant="outlined" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="primary">
                        Proceed to Payment
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};