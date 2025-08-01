import { useState } from "react";
import { DashboardContent } from "src/layouts/dashboard";
import { PageTitleSection } from "src/components/page-title-section";
import { TabWithTableView } from "../tab-with-table";

export function MarketplaceAndServiceProviderSupervisionView() {
    
    return (
        <DashboardContent>
            <PageTitleSection
                title="Marketplace And Service Provider Supervision"
            />
            <TabWithTableView />
        </DashboardContent>
    )
}