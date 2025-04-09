import { Box, Button, Card, MenuItem, Select, ButtonGroup, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { DashboardContent } from "src/layouts/dashboard";
import { HeadProcess } from "../head-process";
import { ProcessOne } from "../process-one";
import { ProcessTwo } from "../process-two";
import { ProcessThree } from "../process-three";
import { FinalProcess } from "../final-process";



export function TicketPurchaseProcessView() {


    return (
        <DashboardContent >

            <ProcessOne />

            <ProcessTwo />

            <ProcessThree />
            
            <FinalProcess />
        </DashboardContent>
    );
}