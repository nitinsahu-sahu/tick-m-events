import { Box, Button, Paper, Tab, Tabs, Typography, TextField, MenuItem, Select } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { AppDispatch, RootState } from 'src/redux/store';
import { MatrixThreeCard } from "src/components/matrix-three-cards/matrix-three-cards";
import { TransactionAndPaymentManagementTable } from "src/components/tables/transaction-&-payment-management-table";
import { metrics, paymentSettings, transactionsPaymentHistoryTableData, transactionsPaymentHistoryTableHeaders, bankingHeaders, mobileMoneyHeaders, cardHeaders } from "./utills";
import { RequestTabSection } from "./request-tab-section";
import { savePaymentSettings, getPaymentSettings, getPaymentSettingById, updatePaymentSetting } from "../../redux/actions/paymentSettingActions";
import { PaymentMethodForm } from "./PaymentMethodForm";

interface FormValues {
    currency: string;
    paymentMethod: string;
    fields: {
        [key: string]: string;
    };
}

interface PaymentDetails {
    accountHolder?: string;
    momoNumber?: string;
    iban?: string;
    swift?: string;
    cardDetails?: string;
    [key: string]: any;
}

interface PaymentSetting {
    _id?: string;
    paymentMethod: string;
    method: string;
    details: PaymentDetails;
}

const methodFields: Record<string, string[]> = {
    "Mobile Money (MTN MoMo, Orange Money)": ["Phone Number", "Provider"],
    "Bank Transfer": ["Account Holder Name", "Account Number", "Bank Name", "CIF Number"],
    "Credit/Debit Card (Visa/MasterCard)": ["Cardholder Name", "Card Number", "Expiry Date", "CVV"]
};
const methodValueToLabelMap: { [key: string]: string } = {
    mobile_money: "Mobile Money (MTN MoMo, Orange Money)",
    bank_transfer: "Bank Transfer",
    credit_card: "Credit/Debit Card (Visa/MasterCard)",
};

export function TabWithTableView() {
    const formRef = useRef<HTMLDivElement | null>(null);
    const [tabValue, setTabValue] = useState(0);
    const [showForm, setShowForm] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);
    const isEditMode = Boolean(editingId);
    const dispatch = useDispatch<AppDispatch>();
    const tabLabels = ["Transactions", "Payment Settings"];
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const { loading, error, success, settings } = useSelector((state: RootState) => state.paymentSettings);
    const { paymentSettingDetail } = useSelector((s: RootState) => s.paymentSettings);

    const handleAddPayment = () => {
        setShowForm(true);
        setEditingId(null);
        setFormValues({ currency: "XAF", paymentMethod: "", fields: {} });
    };
    useEffect(() => {
        if (success) {
            toast.success("Payment settings saved successfully!");
            dispatch(getPaymentSettings()); // <-- Fetch updated list
            setFormValues({
                currency: "XAF",
                paymentMethod: "",
                fields: {}
            });
        }
        if (error) {
            console.log(`Error: ${error}`);
        }
    }, [success, error, dispatch]);

    useEffect(() => {
        dispatch(getPaymentSettings());
    }, [dispatch]);

    useEffect(() => {
        if (paymentSettingDetail && editingId) {
            const methodKey = methodValueToLabelMap[paymentSettingDetail.paymentMethod] || "";

            setFormValues({
                currency: "XAF",
                paymentMethod: methodKey,
                fields: paymentSettingDetail.details,
            });
        }
    }, [paymentSettingDetail, editingId]);

    const [formValues, setFormValues] = useState<FormValues>({
        currency: "XAF",
        paymentMethod: "",
        fields: {}
    });
    const [statusFilter, setStatusFilter] = useState("All");
    const [serviceFilter, setServiceFilter] = useState("All");

    // Get unique services for filter
    const uniqueServices = [...new Set(transactionsPaymentHistoryTableData.map(item => item.requestedService))];

    // Filter logic
    const filteredData = transactionsPaymentHistoryTableData.filter((item) => {
        const matchStatus = statusFilter === "All" || item.status === statusFilter;
        const matchService = serviceFilter === "All" || item.requestedService === serviceFilter;
        return matchStatus && matchService;
    });
    const handleFieldChange = (field: string, value: string) => {
        let formattedValue = value;

        // Format Expiry Date with auto-slash
        if (field === "Expiry Date") {
            // Remove non-digits and existing slashes
            const digits = value.replace(/\D/g, "");

            if (digits.length <= 2) {
                formattedValue = digits;
            } else if (digits.length <= 4) {
                formattedValue = `${digits.slice(0, 2)}/${digits.slice(2)}`;
            } else {
                formattedValue = `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
            }
        }

        // Allow only up to 3 digits for CVV
        if (field === "CVV") {
            formattedValue = value.replace(/\D/g, "").slice(0, 3);
        }

        setFormValues((prev) => ({
            ...prev,
            fields: {
                ...prev.fields,
                [field]: formattedValue,
            },
        }));
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formValues.paymentMethod) {
            toast.error("Please select a payment method.");
            return;
        }

        const requiredFields = methodFields[formValues.paymentMethod];

        const missingField = requiredFields.find(
            (field) => !formValues.fields[field] || formValues.fields[field].trim() === ""
        );

        if (missingField) {
            toast.error(`Please enter ${missingField}.`);
            return;
        }


        const methodKeyMap: { [key: string]: string } = {
            "Mobile Money (MTN MoMo, Orange Money)": "mobile_money",
            "Bank Transfer": "bank_transfer",
            "Credit/Debit Card (Visa/MasterCard)": "credit_card",
        };

        const methodValueMap: { [key: string]: string } = {
            "Mobile Money (MTN MoMo, Orange Money)": formValues.fields.Provider || "",
            "Bank Transfer": "bank_transfer",
            "Credit/Debit Card (Visa/MasterCard)": "visa_mastercard",
        };

        const methodKey = methodKeyMap[formValues.paymentMethod];
        const methodValue = methodValueMap[formValues.paymentMethod];

        const paymentData: PaymentSetting = {
            paymentMethod: methodKey,
            method: methodValue,
            details: formValues.fields,
        };

        if (isEditMode) {
            dispatch(updatePaymentSetting(editingId!, paymentData));
        } else {
            dispatch(savePaymentSettings(paymentData));
        }
    };


    const bankingData = settings
        .filter((item: PaymentSetting) => item.paymentMethod === "bank_transfer")
        .map((item: PaymentSetting) => ({
            id: item._id,
            accountHolder: item.details["Account Holder Name"] || "",
            accountNumber: item.details["Account Number"] || "",
            bankName: item.details["Bank Name"] || "",
            cifNumber: item.details["CIF Number"] || "",
            actions: ["Update", "Remove"],
        }));


    const mobileMoneyData = settings
        .filter((item: PaymentSetting) => item.paymentMethod === "mobile_money")
        .map((item: PaymentSetting) => ({
            id: item._id,
            momoNumber: item.details["Phone Number"],
            provider: item.details.Provider,
            actions: ["Update", "Remove"]
        }));


    const cardData = settings
        .filter((item: PaymentSetting) => item.paymentMethod === "credit_card")
        .map((item: PaymentSetting) => ({
            id: item._id,
            details: item.details,
            actions: ["Update", "Remove"],
        }));
    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 3,
                }}
            >
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    allowScrollButtonsMobile
                    TabIndicatorProps={{ style: { display: "none" } }}
                    sx={{
                        display: "flex",
                    }}
                >
                    {tabLabels.map((label, index) => (
                        <Tab
                            key={index}
                            label={label}
                            disableRipple
                            sx={{
                                px: 3,
                                mx: 1,
                                borderRadius: 3,
                                textTransform: "none",
                                fontWeight: 500,
                                fontSize: "0.875rem",
                                color: tabValue === index ? "white !important" : "#0B2E4C", // white for active tab
                                backgroundColor: tabValue === index ? "#0B2E4C" : "transparent",
                                border: tabValue === index ? "none" : "1px solid #ccc",
                                transition: "all 0.3s ease",
                                minWidth: "fit-content",
                                whiteSpace: "nowrap",
                                "&:hover": {
                                    backgroundColor: tabValue === index ? "#002244" : "#f5f5f5",
                                },
                            }}
                        />
                    ))}
                </Tabs>
            </Box>
            <MatrixThreeCard metrics={metrics} />
            <Paper elevation={6}
                sx={{
                    mt: 2,
                    p: 3,
                    borderRadius: 2,
                    boxShadow: 3,
                    overflow: "hidden",
                }}
            >
                {tabValue === 0 && (
                    <>
                        <Typography variant="h5" fontWeight={600} fontSize={{ xs: "18px", sm: "22px", md: "26px" }} gutterBottom>
                            Transactions & Payment History
                        </Typography>

                        {/* Dropdowns */}
                        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                            {/* Contained style */}
                            <Select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                displayEmpty
                                IconComponent={ExpandMoreRoundedIcon}
                                sx={{
                                    backgroundColor: "#0B2E4C",
                                    color: "white",
                                    fontWeight: 500,
                                    borderRadius: 3,
                                    height: "40px",
                                    width: "175px",
                                    fontSize: { xs: "11px", sm: "13px", md: "15px" },
                                    ".MuiOutlinedInput-notchedOutline": { border: "none" },
                                    "& .MuiSelect-icon": {
                                        color: "white",
                                        fontSize: "16px", // makes arrow bigger and bolder
                                        fontWeight: "500",
                                    },
                                }}
                            >
                                <MenuItem value="All" sx={{ fontSize: { xs: "11px", sm: "13px", md: "15px" } }}>Filter By Status</MenuItem>
                                <MenuItem value="Received" sx={{ fontSize: { xs: "11px", sm: "13px", md: "15px" } }}>Received</MenuItem>
                                <MenuItem value="Pending" sx={{ fontSize: { xs: "11px", sm: "13px", md: "15px" } }}>Pending</MenuItem>
                            </Select>

                            {/* Outlined style */}
                            <Select
                                value={serviceFilter}
                                onChange={(e) => setServiceFilter(e.target.value)}
                                displayEmpty
                                IconComponent={ExpandMoreRoundedIcon}
                                sx={{
                                    backgroundColor: "white",
                                    color: "#000",
                                    fontWeight: 500,
                                    borderRadius: 3,
                                    height: "40px",
                                    width: "175px",
                                    fontSize: { xs: "11px", sm: "13px", md: "15px" },
                                    ".MuiOutlinedInput-notchedOutline": { border: "1px solid #C0C0C0" },
                                    "& .MuiSelect-icon": {
                                        color: "#000",
                                        fontSize: "16px",
                                        fontWeight: "500",
                                    },
                                }}
                            >
                                <MenuItem value="All">Filter By Service</MenuItem>
                                {uniqueServices.map((service) => (
                                    <MenuItem key={service} value={service} sx={{ fontSize: { xs: "11px", sm: "13px", md: "15px" } }}>
                                        {service}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Box>

                        {/* Table Component */}
                        <RequestTabSection
                            title="Transactions & Payment History"
                            headers={transactionsPaymentHistoryTableHeaders}
                            data={filteredData}
                            type="1"
                        />
                    </>
                )}
                {tabValue === 1 && (
                    <>
                        <Typography variant="h6" fontWeight="bold"  mb={1}>
                            Payment Settings
                        </Typography>
                        <Typography variant="body1" fontWeight="bold" mb={1}>
                            Configurable Payment Methods
                        </Typography>
                        < PaymentMethodForm />
                    </>
                )}
            </Paper>
        </>
    )
}