import React from "react";
import { Container, Grid, Card, CardContent, Typography, Button, Divider, Box, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
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