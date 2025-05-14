export const processOneTableHeaders = ["#", "Ticket Type ", "Unit Price (XAF)", "Included Benefits", "Selection"];

export interface PaymentOption {
    src: string;
    name: string;
    value: string;
}
export const paymentOptions: PaymentOption[] = [
    {
        src: "./assets/images/payment-gateway-logo/mtn-mobile-money.png",
        name: "MTN Mobile Money",
        value: 'mmm'
    },
    {
        src: "./assets/images/payment-gateway-logo/orange-money.png",
        name: "Orange Money",
        value: 'om'

    },
    {
        src: "./assets/images/payment-gateway-logo/bank-card.jpg",
        name: "Bank Card",
        value: 'bc'

    },
    {
        src: "./assets/images/payment-gateway-logo/bank-transfer.png",
        name: "Bank Transfer",
        value: 'bt'

    },
    {
        src: "./assets/images/payment-gateway-logo/bank-transfer.png",
        name: "Cash on Delivery",
        value: 'cod'

    },
];