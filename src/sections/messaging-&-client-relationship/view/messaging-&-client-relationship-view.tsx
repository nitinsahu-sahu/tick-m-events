import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { DashboardContent } from "src/layouts/dashboard";
import { ChatPanel } from "src/components/chat/conv";
import { fetchConversation } from "src/redux/actions/message.action";
import { AppDispatch, RootState } from "src/redux/store";

import { TabWithTableView } from "../tab-with-table";

export function MessagingAndClientRelationshipView() {
    return (
        <DashboardContent>
            {/* <TabWithTableView /> */}
            <ChatPanel />
        </DashboardContent>
    )
}