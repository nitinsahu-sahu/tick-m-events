import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import { DashboardContent } from "src/layouts/dashboard";
import { PageTitleSection } from "src/components/page-title-section";
import { MatrixThreeCard } from "src/components/matrix-three-cards/matrix-three-cards";
import { TabWithTableView } from "../tab-with-table";

export function ConfirmedServiceCalendarView() {
    const { completedRequests, signedReqests } = useSelector((state: RootState) => state?.serviceRequest);
    // Filter confirmed services
     const confirmedCount =(signedReqests?.length || 0) + (completedRequests?.length || 0);
    const stats = [
        { title: 'Confirmed Services', value: confirmedCount },
    ];

    return (
        <DashboardContent>
            <MatrixThreeCard metrics={stats} />
            <TabWithTableView />
        </DashboardContent>
    )
}