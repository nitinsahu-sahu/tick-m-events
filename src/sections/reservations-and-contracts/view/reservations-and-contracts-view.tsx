import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { DashboardContent } from "src/layouts/dashboard";
import { MatrixThreeCard } from "src/components/matrix-three-cards/matrix-three-cards";
import { AppDispatch, RootState } from "src/redux/store";
import { getRequestsByProvider } from "src/redux/actions/service-request";

import { RequestTabSection } from "../request-tab-section";
import { pendingRequestTableHeaders, onServiceTableHeader } from "../utills";

export function ReservationsAndContractsView() {
    const { completedRequests, signedReqests } = useSelector((state: RootState) => state?.serviceRequest);
    const dispatch = useDispatch<AppDispatch>();

    const [viewType, setViewType] = useState<null | "active" | "completed">('active');

    useEffect(() => {
        dispatch(getRequestsByProvider());
    }, [dispatch]);

    const handleCardButtonClick = (type: "active" | "completed") => {
        setViewType(type);
    };

    const filteredRequests = (() => {
        if (viewType === "active") {
            return signedReqests
        }

        if (viewType === "completed") {
            return completedRequests
        }

        return [];
    })();


    return (
        <DashboardContent>
            <MatrixThreeCard
                metrics={[
                    {
                        title: "Active Contracts",
                        value: signedReqests?.length.toString(),
                        buttonType: "active"
                    },
                    {
                        title: "Completed Projects",
                        value: completedRequests?.length.toString(),
                        buttonType: "completed"
                    },
                    {
                        title: "Total Expected Payments",
                        value: `${signedReqests
                            ?.reduce((sum: number, r: { orgBudget: number }) => sum + (r.orgBudget || 0), 0)
                            .toLocaleString()} XAF`

                    }

                ]}
                onCardButtonClick={handleCardButtonClick}
            />

            {viewType === "active" && (
                <Box mt={4} px={2}>
                    <RequestTabSection
                        title="Active Contracts"
                        description="Tracks ongoing services or negotiations with event organizers."
                        headers={pendingRequestTableHeaders}
                        data={filteredRequests}
                        type="1"
                    />
                </Box>
            )}

            {viewType === "completed" && (
                <Box mt={4} px={2}>
                    <RequestTabSection
                        title="Completed Projects"
                        description="Tracks all confirmed and finalized services."
                        headers={onServiceTableHeader}
                        data={filteredRequests}
                        type="2"
                    />
                </Box>
            )}
        </DashboardContent>
    );
}
