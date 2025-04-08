import { DashboardContent } from "src/layouts/dashboard";
import { MatrixThreeCard } from "src/components/matrix-three-cards/matrix-three-cards";

import { TabWithTableView } from "../tab-with-table";
import { ExpectedPayments } from "../expected-payments";
import { metrics } from "../utills";

export function ReservationsAndContractsView() {
    return (
        <DashboardContent>

            <MatrixThreeCard metrics={metrics} />

            <TabWithTableView />

            <ExpectedPayments />

        </DashboardContent>
    );
}

