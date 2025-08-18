import { Paper, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { AppDispatch, RootState } from "src/redux/store";
import { getContract } from "src/redux/actions/homeAndGlobal.action";
import { HeadingCommon } from "src/components/multiple-responsive-heading/heading";

import { ContractTable } from "../contractTable";
import { contractTableHeader } from "../utills";

export function ConfirmedTab() {
    const dispatch = useDispatch<AppDispatch>()
    const { contracts } = useSelector((state: RootState) => state?.homeAndGlobal);

    useEffect(() => {
        dispatch(getContract('completed'));
    }, [dispatch]);
    return (
        <Paper elevation={6}
                sx={{
                    mt: 2,
                    p: 3,
                    borderRadius: 2,
                    boxShadow: 3,
                    overflow: "hidden",
                }}>
            <HeadingCommon title="Completed Project (By You)" />

            <ContractTable
                data={contracts}
                headers={contractTableHeader}
                type="2"
            />
        </Paper>
    )
}