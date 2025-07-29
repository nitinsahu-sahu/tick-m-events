import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useState } from "react";

interface StatusConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (status: string) => void;
  currentStatus: string;
}

export const StatusConfirmationModal = ({
  open,
  onClose,
  onConfirm,
  currentStatus,
}: StatusConfirmationModalProps) => {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);

  const handleSubmit = () => {
    onConfirm(selectedStatus);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Change Contract Status</DialogTitle>
      <DialogContent>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>New Status</InputLabel>
          <Select
            value={selectedStatus}
            label="New Status"
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <MenuItem value="ongoing">Ongoing</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};