import { useEffect, useState } from "react";
import { Box, Paper } from "@mui/material";
import { TransactionAndPaymentTable } from "src/components/tables/transaction-&-payment-table";
import { HeadingCommon } from "src/components/multiple-responsive-heading/heading";
import axios from "src/redux/helper/axios";
import { InvoiceTableHeaders, EventData } from "./utils";


type InvoiceHistoryProps = {
    selectedEvent: EventData | null;
};

type WithdrawalData = {
    _id: string;
    transId: string;
    eventId: string;
    amount: number;
    payment: {
        paymentMethod: string;
        method: string;
    };
    status: string;
    createdAt: string;
};

export function InvoiceHistory({ selectedEvent }: InvoiceHistoryProps) {
    const [withdrawals, setWithdrawals] = useState<WithdrawalData[]>([]);

    // Fetch withdrawals when selectedEvent changes
    useEffect(() => {
        const fetchWithdrawals = async () => {
            try {
                if (!selectedEvent) return;

                const { data } = await axios.get("transaction-payment/get-refund-and-withdrawals");
                if (data.success) {
                    // Optionally filter by event
                    const eventWithdrawals = data.data.filter(
                        (w: WithdrawalData) => w.eventId === selectedEvent._id
                    );
                    setWithdrawals(eventWithdrawals);
                }
            } catch (error) {
                console.error("Error fetching withdrawals:", error);
            }
        };

        fetchWithdrawals();
    }, [selectedEvent]);

    const handleDownloadInvoice = async (transId: string, status: string) => {
        if (status.toLowerCase() !== "approved") {
            alert("Invoice can only be downloaded for approved withdrawals");
            return;
        }

        try {
            const response = await axios.get(`/transaction-payment/withdrawals/invoice/${transId}`, {
                responseType: "blob",
            });

            const blob = new Blob([response.data], { type: "application/pdf" });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `Invoice-${transId}.pdf`;
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error("Error downloading invoice:", error);
            alert("Failed to download invoice. Please try again.");
        }
    };

    const invoiceData = withdrawals.map((w) => ({
        invoiceId: w.transId,
        date: new Date(w.createdAt).toLocaleDateString(),
        amount: `${w.amount.toLocaleString()} XAF`,
        method: w.payment.paymentMethod.toUpperCase(),
        status: w.status.charAt(0).toUpperCase() + w.status.slice(1).toLowerCase(),
        action: [
            {
                label: "Download PDF",
                onClick: () => handleDownloadInvoice(w.transId, w.status),
            },
        ],
    }));

    return (
        <Box mt={3} boxShadow={3} bgcolor="white" borderRadius={3} sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
            <HeadingCommon title="Invoices" variant="h5" weight={600} />
            <Paper sx={{ borderRadius: 3 }}>
                <TransactionAndPaymentTable
                    headers={InvoiceTableHeaders}
                    data={invoiceData}
                    type="3"
                    onDownloadInvoice={handleDownloadInvoice}
                />
            </Paper>
        </Box>
    );
}
