import { Box, Select, MenuItem, Typography, FormControl,SelectChangeEvent } from "@mui/material";
import { useEffect } from "react";
import { EventData } from "./utils";

interface TrnsAndPaymentBreadCrumProps {
  events: EventData[];
  onEventSelect: (event: EventData | null) => void;
  selectedEvent: EventData | null;
}

export function TrnsAndPaymentBreadCrum({ events, onEventSelect, selectedEvent }: TrnsAndPaymentBreadCrumProps) {
  useEffect(() => {
    if (events && events.length > 0 && !selectedEvent) {
      const firstEvent = events[0];
      onEventSelect(firstEvent);
    }
  }, [events, selectedEvent, onEventSelect]);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedId = event.target.value;
    const eventData = events.find(ev => ev._id === selectedId) || null;
    onEventSelect(eventData);
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      flexWrap="wrap"
      gap={2}
    >
      <Box display="flex" alignItems="center" flexWrap="wrap" gap={1}>
        <Typography fontWeight={600} fontSize={13}>Event</Typography>
        <Typography color="text.secondary" fontSize={13}>/</Typography>
        <FormControl sx={{ minWidth: 150 }} size="small">
          <Select
            value={selectedEvent?._id || ''}
            onChange={handleChange}
            displayEmpty
            size="small"
            sx={{
              fontSize: '0.8rem',
              height: '25px',
              '& .MuiSelect-select': { padding: '6px 12px' },
              textTransform: "capitalize"
            }}
          >
            <MenuItem value="" disabled>
              Select an event
            </MenuItem>
            {events?.map((event) => (
              <MenuItem
                key={event._id}
                value={event._id}
                sx={{
                  fontSize: '0.8rem',
                  minHeight: '32px',
                  textTransform: "capitalize"
                }}
              >
                {event.eventName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}