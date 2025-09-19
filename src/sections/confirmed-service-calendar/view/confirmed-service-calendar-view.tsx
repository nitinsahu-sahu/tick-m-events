import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/redux/store";
import { DashboardContent } from "src/layouts/dashboard";
import { MatrixThreeCard } from "src/components/matrix-three-cards/matrix-three-cards";
import { getRequestsByProvider } from "src/redux/actions/service-request";
import { TabWithTableView } from "../tab-with-table";

export function ConfirmedServiceCalendarView() {
    const { completedRequests, signedReqests } = useSelector((state: RootState) => state?.serviceRequest);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getRequestsByProvider());
    }, [dispatch]);


    const stats = [
        { title: 'Confirmed Services', value: signedReqests },
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