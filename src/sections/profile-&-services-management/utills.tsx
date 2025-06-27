export const FORM_INITIAL_STATE = {
  serviceType: '',
  location: '',
  budget: '',
  status: ''
};

export const inputStyles = {
  '& .MuiOutlinedInput-root': {
    '& fieldset': { borderColor: 'black' },
    '&:hover fieldset': { borderColor: 'black' },
    '&.Mui-focused fieldset': { borderColor: 'black' }
  }
};

export const profileFields = [
  {
    name: 'name',
    type: 'text',
    placeholder: 'DJ Max – Sound & Lighting',
    transform: 'capitalize'
  },
  {
    name: 'username',
    type: 'text',
    placeholder: '@djmaxofficial',
    transform: 'lowercase'
  },
  {
    name: 'experience',
    type: 'text',
    placeholder: 'Professional DJ with 10+ years of experience in events and parties.',
    multiline: true,
    minRows: 3,
    
  },
  {
    name: 'serviceCategory',
    type: 'text',
    placeholder: 'Which type of provide service',
    multiline: true,
  },
  {
    name: 'address',
    type: 'text',
    placeholder: 'New York, Los Angeles, Miami'
  },
  {
    name: 'email',
    type: 'email',
    placeholder: 'djmax@example.com'
  },
  {
    name: 'website',
    type: 'text',
    placeholder: 'https://djmax.com'
  }
];

export const socialMediaFields = [
  {
    name: 'linkedin',
    placeholder: 'https://linkedin.com/djmaxofficial'
  },
  {
    name: 'facebook',
    placeholder: 'https://facebook.com/djmaxofficial'
  },
  {
    name: 'tiktok',
    placeholder: 'https://tiktok.com/djmaxofficial'
  },
  {
    name: 'instagram',
    placeholder: 'https://instagram.com/djmaxofficial'
  }
];

export const verifications = [
  { label: "Email Verified", status: true },
  { label: "WhatsApp Verified", status: false },
  { label: "Identity Verified", status: false },
  { label: "Payment Verified", status: true },
];

export const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const SERVICE_TYPES = [
  { value: 'Catering', label: 'Catering' },
  { value: 'Photography', label: 'Photography' },
  { value: 'themed birthday setups', label: 'Themed Birthday Setups (Kids/Adults)' },
  { value: 'balloon garlands & arches', label: 'Balloon Garlands & Arches' },
  { value: 'candy buffet & dessert table styling', label: 'Candy Buffet & Dessert Table Styling' },
  { value: 'Branded Stage & Backdrop Design', label: 'Branded Stage & Backdrop Design' },
  { value: 'Lounge & Networking Area Setup', label: 'Lounge & Networking Area Setup' },
  { value: 'Festival Stage Backdrops (Diwali, Christmas, Eid)', label: 'Festival Stage Backdrops (Diwali, Christmas, Eid)' },
  { value: 'Hanging Lights & Lanterns', label: 'Hanging Lights & Lanterns' },
]
export const offterTableHeaders = ["Service", "Indicative Price", "Location", "Actions"];
export const offterTableData = [
  { service: "DJ & Entertainment", indicativePrice: "20000 XAF", location: "America" },
  { service: "DJ & Entertainment", indicativePrice: "20000 XAF", location: "America" },
];

type AddServiceForm = {
  serviceName: string;
  location: string;
  description: string;
  budget: string;
  // Add other fields if needed
};
type FormField = {
  name: keyof AddServiceForm; // Ensures name matches form keys
  label: string;
  required?: boolean;
  multiline?: boolean;
  minRows?: number;
};
export const formFields: FormField[] = [
  {
    name: 'serviceName',
    label: 'Service Name',
    required: true,
    multiline: false
  },
  {
    name: 'description',
    label: 'Description',
    required: true,
    multiline: true,
    minRows: 3
  },
  {
    name: 'budget',
    label: 'Indicative Price',
    required: true,
    multiline: false
  },
  {
    name: 'location',
    label: 'Location',
    required: true,
    multiline: false
  }
];