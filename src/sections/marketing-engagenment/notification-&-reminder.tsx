import {
  Box,
  Button,
  FormControlLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { AppDispatch, RootState } from 'src/redux/store';
import { toast } from 'react-toastify';
import { sendUserNotification, saveUserFcmToken } from '../../redux/actions/notification.actions';

interface Order {
  userId: {
    email: string;
    name?: string;
    phone?: string;
  };
  orderAddress?: {
    number?: string;
  };
  paymentStatus?: string;
}


interface EventType {
  _id: string;
  eventName: string;
  orders?: Order[];
}

export function NotificationAndReminder({ selEvent }: any) {
  console.log("ss", selEvent);
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [scheduleOption, setScheduleOption] = useState("send-now");
  const [notificationType, setNotificationType] = useState('email');
  const [message, setMessage] = useState('');
  const [cta, setCta] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const toastMessages: Record<string, string> = {
    ticketHolders: "all users",
    interested: "interested users",
    pending: "pending payment users",
  };

  const handleCheckboxChange = (label: string) => {
    setSelectedGroups((prev) =>
      prev.includes(label)
        ? prev.filter((l) => l !== label)
        : [...prev, label]
    );
  };
  const handleSubmit = async () => {
    if (selectedGroups.length === 0) {
      toast.error("Please select at least one recipient group.");
      return;
    }

    let atLeastOneDispatched = false;
    const emptyGroups: string[] = [];
    const groupTemplates: Record<string, string> = {
      "All registered participants (Ticket holders)": "default",
      "Interested participants (Waitlist but no purchase yet)": "interested-participants",
      "Pending payment participants (Unfinished reservations)": "default",
    };
    const groupHandlers: Record<
      string,
      () => Promise<{ emails: any[]; error?: string }>
    > = {
      "All registered participants (Ticket holders)": async () => {
        const orders = selEvent?.orders || [];
        if (!orders.length) return { emails: [], error: "No Ticket Holder Orders" };

        const validOrders = orders.filter((order: Order) =>
          typeof order?.userId?.email === "string" && order.userId.email.trim() !== ""
        );

        const emails = validOrders.map((order: Order) => {
          const { email, name } = order.userId;
          return {
            email,
            name: name || "Guest",
            phone: order?.orderAddress?.number || "",
          };
        });


        return { emails };
      },

      "Interested participants (Waitlist but no purchase yet)": async () => {
        const wishlistEntries = selEvent?.wishlistUsers || selEvent?.wishlistData || [];
        const wishlistArray = Array.isArray(wishlistEntries) ? wishlistEntries : [wishlistEntries];

        const validWishlist = wishlistArray.filter(
          (entry: any) =>
            typeof entry?.userId?.email === "string" && entry.userId.email.trim() !== ""
        );

        if (!validWishlist.length) return { emails: [], error: "No Interested Wishlist Users" };

        const emails = validWishlist.map((entry) => {
          const { email, name, phone } = entry.userId;
          return {
            email,
            name: name || "Guest",
            phone: phone || "",
          };
        });

        return { emails };
      },

      "Pending payment participants (Unfinished reservations)": async () => {
        const pendingOrders = (selEvent?.orders || []).filter(
          (order: any) => order.paymentStatus === "pending"
        );

        if (!pendingOrders.length) return { emails: [], error: "No Pending Payment Users" };

        const validOrders = pendingOrders.filter(
          (order: Order) =>
            typeof order?.userId?.email === "string" && order.userId.email.trim() !== ""
        );

        if (!validOrders.length) return { emails: [], error: "No valid emails in Pending Orders" };

        const emails = validOrders.map((order: Order) => {
          const { email, name } = order.userId;
          return {
            email,
            name: name || "Guest",
            phone: order?.orderAddress?.number || "",
          };
        });

        return { emails };
      },
    };

    const notificationPromises = selectedGroups.map(async (group) => {
      const handler = groupHandlers[group];
      if (!handler) return null;

      const { emails, error } = await handler();
      if (error || !emails.length) {
        console.log(`Skipping ${group}: ${error}`);
        emptyGroups.push(error || `No valid emails in ${group}`);
        return null;
      }

      const payload = {
        eventId: selEvent._id,
        emails,
        message,
        cta,
        subject: `Notification for ${selEvent.eventName}`,
        notificationType,
        isScheduled: scheduleOption === "schedule",
        scheduledAt:
          scheduleOption === "schedule"
            ? new Date(`${scheduledDate}T${scheduledTime}`).toISOString()
            : null,
        eventDetails: {
          name: selEvent.eventName,
          date: selEvent.date,
          location: selEvent.location,
        },
        template: groupTemplates[group] || "default",
        group,
      };

      try {
        await dispatch(sendUserNotification(payload));
        toast.success(`Notification sent to group: ${group}`);
        return true;
      } catch (err) {
        console.error(err);
        toast.error(`Failed to send notification to group: ${group}`);
        return false;
      }
    });

    const results = await Promise.all(notificationPromises);
    atLeastOneDispatched = results.filter(Boolean).length > 0;


    if (!atLeastOneDispatched) {
      toast.warn("No notifications were sent. All selected groups had no valid recipients.");
    }

  };

  useEffect(() => {
    const saveToken = async () => {
      if (user?.id && user?.email) {
        await dispatch(saveUserFcmToken(user.id, user.email));
      }
    };

    saveToken(); // invoke the async function
  }, [user, dispatch]);


  return (
    <Box p={3} boxShadow={3} mt={3} borderRadius={3} sx={{ border: "1px solid black" }}>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Notifications & Automatic Reminders
      </Typography>

      <Button
        fullWidth
        sx={{
          bgcolor: "#0B2E4C",
          color: "white",
          padding: "10px",
          borderRadius: "10px",
          "&:hover": { bgcolor: "#083048" },
        }}
        onClick={() => setShowCreateForm(true)}
      >
        Create a New Notification
      </Button>

      {showCreateForm && (
        <Paper sx={{ p: 3, borderRadius: '10px', background: '#f5f5f5', mt: 3 }}>
          <Typography variant="body2" fontWeight="bold" mb={1}>
            Select Notification Type
          </Typography>
          <Select
            fullWidth
            value={notificationType}
            onChange={(e) => setNotificationType(e.target.value)}
            sx={{ mb: 3 }}
          >
            <MenuItem value="web-push">Web Push</MenuItem>
            <MenuItem value="sms">SMS</MenuItem>
            <MenuItem value="email">Email</MenuItem>
          </Select>

          <Typography variant="body1" fontWeight="bold" mb={1}>
            Recipient Selection
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "8px", padding: "12px", mb: 3 }}>
            {[
              "All registered participants (Ticket holders)",
              "Interested participants (Waitlist but no purchase yet)",
              "Pending payment participants (Unfinished reservations)",
            ].map((label, index) => {
              const inputId = `group-checkbox-${index}`;
              return (
                <label key={label} htmlFor={inputId} className="flex items-center gap-2">
                  <input
                    id={inputId}
                    type="checkbox"
                    checked={selectedGroups.includes(label)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedGroups([...selectedGroups, label]);
                      } else {
                        setSelectedGroups(selectedGroups.filter((g) => g !== label));
                      }
                    }}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-700 text-sm">{label}</span>
                </label>
              );
            })}


          </Box>

          <Typography fontWeight="bold" mb={1}>
            Enter Message
          </Typography>
          <TextField
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Example: 'Don’t miss the festival! Only 100 tickets left!'"
            sx={{ mb: 3 }}
          />

          <Typography fontWeight="bold" mb={1}>
            Add CTA Button
          </Typography>
          <TextField
            fullWidth
            value={cta}
            onChange={(e) => setCta(e.target.value)}
            placeholder="CTA Button (e.g., 'Buy Now', 'Reserve', 'Share')"
            sx={{ mb: 3 }}
          />

          <Typography fontWeight="bold" mb={1}>
            Schedule Options
          </Typography>
          <RadioGroup
            value={scheduleOption}
            onChange={(e) => setScheduleOption(e.target.value)}
          >
            <FormControlLabel value="send-now" control={<Radio />} label="Send now" />
            <FormControlLabel
              value="schedule"
              control={<Radio />}
              label="Schedule for a specific date/time"
            />
          </RadioGroup>
          {scheduleOption === "schedule" && (
            <Box sx={{ display: "flex", gap: "16px", mt: 2, mb: 3 }}>
              <Box sx={{ position: "relative", flex: 1 }}>
                <Typography variant="caption">Select Date</Typography>
                <TextField
                  fullWidth
                  type="date"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="caption">Select Time</Typography>
                <TextField
                  fullWidth
                  type="time"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                />
              </Box>
            </Box>
          )}


          <Button
            fullWidth
            sx={{
              bgcolor: "#0B2E4C",
              color: "white",
              padding: "10px",
              borderRadius: "10px",
              "&:hover": { bgcolor: "#083048" },
            }}
            onClick={handleSubmit}
          >
            Send Notifications
          </Button>
        </Paper>
      )}
    </Box>
  );
}
