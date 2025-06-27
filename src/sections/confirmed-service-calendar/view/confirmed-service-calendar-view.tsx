import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import { DashboardContent } from "src/layouts/dashboard";
import { PageTitleSection } from "src/components/page-title-section";
import { MatrixThreeCard } from "src/components/matrix-three-cards/matrix-three-cards";
import { TabWithTableView } from "../tab-with-table";

export function ConfirmedServiceCalendarView() {
    const { requests } = useSelector((state: RootState) => state.serviceRequest);
  
    // Filter confirmed services
    const confirmedCount = requests.filter(
        (r: any) => r.contractStatus === "ongoing" || r.contractStatus === "signed"
    ).length;

    const stats = [
        { title: 'Confirmed Services', value: confirmedCount },
        // { title: 'Upcoming Dates', value: 5 },
        // { title: 'Available Slots', value: 8 },
    ];

    return (
        <DashboardContent>
            <MatrixThreeCard metrics={stats} />
            <TabWithTableView />
        </DashboardContent>
    )
}