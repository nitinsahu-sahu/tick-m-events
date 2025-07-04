import {
    Collapse, Box, Select, MenuItem, InputLabel, FormControl, Typography,
    Button, Avatar, Grid, Paper, Divider, SelectChangeEvent, IconButton,
    Menu, ListItemIcon, Dialog, DialogTitle,
    DialogContent, DialogActions, TextField
} from '@mui/material';
import { useState } from "react";

export function Conv({ setOpenChat, openChat, convUser }: any) {

    return (
        <Dialog
            open={openChat}
            onClose={() => setOpenChat(false)}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle sx={{
                backgroundColor: '#032D4F',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                gap: 2
            }}>
                <Typography variant="h6">Raj</Typography>
            </DialogTitle>
        </Dialog>
    )
}