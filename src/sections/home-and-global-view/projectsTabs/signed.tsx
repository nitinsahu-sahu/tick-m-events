import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { AppDispatch, RootState } from "src/redux/store";
import { getContract } from "src/redux/actions/homeAndGlobal.action";
import { HeadingCommon } from "src/components/multiple-responsive-heading/heading";

import { ContractTable } from "../contractTable";
import { contractTableHeader } from "../utills";

export function SignedTab() {
    const dispatch = useDispatch<AppDispatch>()
    const { contracts } = useSelector((state: RootState) => state?.homeAndGlobal);

    useEffect(() => {
        dispatch(getContract('signed'));
    }, [dispatch]);
    return (
        <>
            <HeadingCommon title="Signed Project (By Organizer)" />
            <ContractTable
                data={contracts}
                headers={contractTableHeader}
                type="1"
            />
        </>
    )
}