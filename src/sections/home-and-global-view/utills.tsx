import { action } from "src/theme/core";
import { ServiceRequestAndNegotiationView } from "../service-request-&-negotiation/view";

// Data for metric cards
export const metrics = [
    { title: "Wallet Balance", value: "$100.00", topUp: "+ $50 (Top-up)", tickCommission: "- $10 (TICK-M Commission)" },
];

export const requestDetails = {
    organizer: "EventPro",
    service: "Catering",
    budget: "600,000 XAF",
    location: "Douala",
    dateTime: "15/05/2025 - 12 PM",
    requirements: "Buffet for 150 people with vegetarian options Discussion",
    discussionStatus: "We’d like to finalize the menu before signing",
};

export const availableProjectsTableHeaders = ["Service", "Organizer", "Date Posted", "Budget", "Actions"];
export const availableProjectsTableData = [
    { service: "DJ & Entertainment", organizer: "Jean M.", datePosted: "02/02/2025", budget: "200,000 - 300,000 XAF", actions: ["View Details", "Apply"] },
    { service: "DJ & Entertainment", organizer: "Jean M.", datePosted: "02/02/2025", budget: "200,000 - 300,000 XAF", actions: ["View Details", "Apply"] },
];

export const confirmedServicesTableHeader = ["Service", "Location", "Date & Time", "Final Budget", "Actions"];
export const confirmedServicesTableData = [
    { service: "DJ Entertainment", location: "Douala", dateTime: "10/02/2025 - 8 PM", finalBudget: "250,000 XAF", actions: ["View Contract", "Contact Client", "Mark as Completed"] },
    { service: "Wedding Catering", location: "Douala", dateTime: "10/02/2025 - 8 PM", finalBudget: "250,000 XAF", actions: ["View Contract", "Contact Client", "Mark as Completed"] },
];

export const MessagingNegotiationsTableHeader = ["Service", "Client", "Last Message", "Actions"];
export const MessagingNegotiationsTableData = [
    { service: "DJ Entertainment", client: "Jean M.", lastMessage: "Can you send a quote?", actions: ["View Conversation"] },
    { service: "DJ Entertainment", client: "EventPro", lastMessage: "We’d like to finalize the agreement.", actions: ["View Conversation"] },
];

export const PaymentTrackingTableHeader = ["Service", "Location", "Amount Due", "Payment Method", "Status", "Actions"];
export const PaymentTrackingTableData = [
    { service: "DJ Entertainment", location: "Douala", amountDue: "225,000 XAF", method: "Mobile Money", status: "Pending", actions: ["View Transaction"] },
    { service: "DJ Entertainment", location: "Douala", amountDue: "225,000 XAF", method: "Mobile Money", status: "Confirmed", actions: ["View Transaction"] },
];

export const tansation = [{
    id: "123456789",
    datetime: "2025-03-21 14:35:22",
    amountToReceive: "500.00",
    receivedAmount: "490.00",
    paymentMethod: "Credit Card",
    commission: "10.00",
    status: "Completed"
}];

export const avalableProjectcategory = [
    { label: "All Dates", value: "all" }, // Add "All" option
    { label: "12-12-25", value: "12-12-25" },
    { label: "1-12-25", value: "1-12-25" },
    { label: "2-12-25", value: "2-12-25" },
];