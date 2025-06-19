import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { DashboardContent } from "src/layouts/dashboard";
import { MatrixThreeCard } from "src/components/matrix-three-cards/matrix-three-cards";
import { AppDispatch, RootState } from "src/redux/store";
import { getRequestsByProvider } from "src/redux/actions/service-request";

import { TabWithTableView } from "../tab-with-table";
import { metrics } from "../utills";

export function ReservationsAndContractsView() {
    const { requests } = useSelector((state: RootState) => state?.serviceRequest);
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        dispatch(getRequestsByProvider());
    }, [dispatch]);

    return (
        <DashboardContent>

            <MatrixThreeCard metrics={metrics} />

            <TabWithTableView requests={requests}/>


        </DashboardContent>
    );
}

