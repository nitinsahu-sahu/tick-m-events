import { useState, useCallback } from "react";
import { Box, Stepper, Step, StepLabel } from "@mui/material";
import { DashboardContent } from "src/layouts/dashboard";
import { ProcessOne } from "../process-one";
import { ProcessTwo } from "../process-two";
import { ProcessThree } from "../process-three";
import { FinalProcess } from "../final-process";

const steps = ['Select Tickets', 'Participant Details', 'Payment', 'Confirmation'];

interface Ticket {
    ticketName: string;
    quantity: number;
    price: number;
}

interface OrderDetails {
    // Define your order details interface here
    [key: string]: any;
}

export function TicketPurchaseProcessView() {
    const [activeStep, setActiveStep] = useState(0);
    const [selectedTickets, setSelectedTickets] = useState<Ticket[]>([]);
    const [orderDetails, setOrderDetails] = useState<OrderDetails>({});
    const handleNext = useCallback(() => {
        
        setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
    }, []);

    const handleBack = useCallback(() => {
        setActiveStep((prev) => Math.max(prev - 1, 0));
    }, []);

    const handleTicketsUpdate = useCallback((tickets: Ticket[]) => {
        setSelectedTickets((prev) => {
            if (JSON.stringify(prev) !== JSON.stringify(tickets)) {
                return tickets;
            }
            return prev;
        });
    }, []);

    const handleOrderDetailsUpdate = useCallback((details: OrderDetails) => {
        setOrderDetails((prev) => {
            if (JSON.stringify(prev) !== JSON.stringify(details)) {
                return details;
            }
            return prev;
        });
    }, []);

    const renderCurrentStep = () => {
        switch (activeStep) {
            case 0:
                return (
                    <ProcessOne 
                        onTicketsSelected={handleTicketsUpdate}
                        onNext={handleNext}
                        initialTickets={selectedTickets} // Pass existing tickets
                    />
                );
            case 1:
                return (
                    <ProcessTwo 
                        onOrderDetailsUpdate={handleOrderDetailsUpdate}
                        onBack={handleBack}
                        onNext={handleNext}
                    />
                );
            case 2:
                return (
                    <ProcessThree 
                        tickets={selectedTickets}
                        orderDetails={orderDetails}
                        onBack={handleBack}
                        onNext={handleNext}
                    />
                );
            case 3:
                return <FinalProcess onNext={handleNext}/>;
            default:
                return null;
        }
    };

    return (
        <DashboardContent>
            <Box sx={{ width: '100%', mb: 4 }}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>

            {renderCurrentStep()}
        </DashboardContent>
    );
}