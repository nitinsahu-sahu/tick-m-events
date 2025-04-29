import { Box } from "@mui/material";
import { useCallback, useState } from "react";

import { useSelector } from "react-redux";

import { HeadingCommon } from "src/components/multiple-responsive-heading/heading";
import ProfileAndServiceTable from "src/components/tables/profile-and-service-table";
import { RootState } from "src/redux/store";

import { offterTableHeaders, offterTableData } from "./utills";
import { AddServices } from "./add-service";
import { UpdateServices } from "./update-service";

export function OfferAndService() {
    const { services } = useSelector((state: RootState) => state?.profile);

    const [activeSection, setActiveSection] = useState<'add' | 'update'>('add');
    const [serviceOfferRowData, setServiceOfferRowData] = useState({
        _id: "",
        serviceName: "",
        location: "",
        description: "",
        budget: ""
    });
    const handleModify = useCallback((rowData: any) => {
        setServiceOfferRowData(prev => {
            // Only update if values actually changed
            if (prev._id === rowData._id &&
                prev.serviceName === rowData.serviceName &&
                prev.location === rowData.location &&
                prev.description === rowData.description &&
                prev.budget === rowData.budget) {
                return prev;
            }
            return {
                _id: rowData._id,
                serviceName: rowData.serviceName,
                description: rowData.description,
                location: rowData.location,
                budget: rowData.budget
            };
        });
    }, []);


    return (
        <Box boxShadow={3} borderRadius={3} bgcolor="#FFFFFF" mt={3} p={3}>
            {/* Title */}
            <HeadingCommon variant="h6" title="Offered Services" weight={600} />

            {/* Table */}
            <ProfileAndServiceTable
                setActiveSection={setActiveSection}
                activeSection={activeSection}
                headers={offterTableHeaders}
                data={services}
                onModify={handleModify}
            />

            {/* Add New Service Section */}
            <Box
                mt={4}
                sx={{
                    borderRadius: "20px",
                    border: "1px solid #00000066",
                    background: "#FFFFFF",
                    p: 3,
                }}
            >
                <HeadingCommon variant="h6" title={activeSection === 'add' ? 'Add a New Service' : 'Update a Service'} weight={600} />
                {activeSection === 'add' ? 
                <AddServices /> 
                : 
                <UpdateServices setServiceOfferRowData={setServiceOfferRowData} updateData={serviceOfferRowData}/>}
            </Box>
        </Box>
    )
}