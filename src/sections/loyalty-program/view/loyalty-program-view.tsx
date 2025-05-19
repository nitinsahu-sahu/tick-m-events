import { DashboardContent } from "src/layouts/dashboard";
import { HeroSection } from "../hero-section";
import { AccountPoints } from "../account-points";
import { AvailableRewards } from "../avalable-rewards";
import { RewardsHistory } from "../reward-history";


export function LoyaltyProgramView  ()  {
    return (
        <DashboardContent>
            <HeroSection />

            <AccountPoints />

            <AvailableRewards />

            <RewardsHistory />

        </DashboardContent>
    );
};