import { Box, Paper } from "@mui/material";
import { TransactionAndPaymentTable } from "src/components/tables/transaction-&-payment-table";
import { HeadingCommon } from "src/components/multiple-responsive-heading/heading";
import axios from "src/redux/helper/axios";
import { InvoiceTableHeaders, EventData } from "./utils";

type InvoiceHistoryProps = {
    selectedEvent: EventData | null;
};



export function InvoiceHistory({ selectedEvent }: InvoiceHistoryProps) {


    const handleDownloadInvoice = async (transactionId: string) => {
        try {
            const response = await axios.get(`event-order/invoice/${transactionId}`, {
                responseType: 'blob',
            });

            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `Invoice-${transactionId}.pdf`;
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error downloading invoice:', error);
            alert('Failed to download invoice. Please try again.');
        }
    };

    const invoiceData =
        selectedEvent?.orders?.map((order, index) => ({
            invoiceId: order.transactionId,
            date: new Date().toLocaleDateString(),
            amount: `${order.totalAmount?.toLocaleString()} XAF`,
            method: order.paymentMethod?.toUpperCase(),
            status: order.paymentStatus
                ? order.paymentStatus.trim().charAt(0).toUpperCase() + order.paymentStatus.trim().slice(1).toLowerCase()
                : "N/A",

            action: [
                {
                    label: "Download PDF",
                    onClick: () => handleDownloadInvoice(order.transactionId.toString()),

                },
            ],

        })) || [];



    return (
        <Box
            mt={3}
            boxShadow={3}
            bgcolor="white"
            borderRadius={3}
            sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}
        >
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

