import { DashboardContent } from "src/layouts/dashboard";
import { ProcessOne } from "../process-one";
import { ProcessTwo } from "../process-two";
import { ProcessThree } from "../process-three";
import { FinalProcess } from "../final-process";

export function TicketPurchaseProcessView() {
    return (
        <DashboardContent >
            {/* Step one */}
            <ProcessOne />

            {/* Step Two */}
            <ProcessTwo />

            {/* Step Three */}
            <ProcessThree />

            {/* Step Final */}
            <FinalProcess />
        </DashboardContent>
    );
}