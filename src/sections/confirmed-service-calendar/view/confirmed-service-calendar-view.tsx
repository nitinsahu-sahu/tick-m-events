import { useState } from "react";
import { DashboardContent } from "src/layouts/dashboard";
import { PageTitleSection } from "src/components/page-title-section";
import { MatrixThreeCard } from "src/components/matrix-three-cards/matrix-three-cards";
import { TabWithTableView } from "../tab-with-table";

export function ConfirmedServiceCalendarView() {
    const stats = [
        { title: 'Confirmed Services', value: 15 },
        { title: 'Upcoming Dates', value: 5 },
        { title: 'Available Slots', value: 8 },
    ];


    return (
        <DashboardContent>
            <PageTitleSection
                title="Reservations & Contracts"
            />

            <MatrixThreeCard metrics={stats} />
            
            <TabWithTableView />
        </DashboardContent>
    )
}