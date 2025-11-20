import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { AppDispatch, RootState } from "src/redux/store";
import { DashboardContent } from "src/layouts/dashboard";
import { MatrixThreeCard } from "src/components/matrix-three-cards/matrix-three-cards";
import { getRequestsByProvider } from "src/redux/actions/service-request";


import { TabWithTableView } from "../tab-with-table";

export function ConfirmedServiceCalendarView() {
    const { completedRequests, signedReqests,allActiveProjects } = useSelector((state: RootState) => state?.serviceRequest);
    const confirmedCount = (signedReqests?.length || 0) + (completedRequests?.length || 0);
    const stats = [
        { title: 'Confirmed Services', value: confirmedCount },
    ];
console.log('allActiveProjects',allActiveProjects);


    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(getRequestsByProvider());
    }, [dispatch]);

    return (
        <DashboardContent>
            <MatrixThreeCard metrics={stats} />
            <TabWithTableView />
        </DashboardContent>
    )
}