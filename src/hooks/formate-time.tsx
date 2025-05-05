export const formatTimeTo12Hour = (timeString: any) => {
    if (!timeString) return '';

    // Split time into hours and minutes (e.g., "16:48" → ["16", "48"])
    const [hours, minutes] = timeString.split(':');

    // Convert to number
    const hourNum = parseInt(hours, 10);

    // Determine AM/PM
    const period = hourNum >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format (e.g., 16 → 4 PM)
    const hour12 = hourNum % 12 || 12; // Handle midnight (0 → 12 AM)

    // Return formatted string (e.g., "4:48 PM")
    return `${hour12}:${minutes} ${period}`;
};