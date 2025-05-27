
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
    name: 'number',
    type: 'number',
    placeholder: '123-456-7890'
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
  { label: "Phone Verified", status: false },
  { label: "Payment Verified", status: true },
  { label: "Identity Verified", status: false },
  { label: "Facebook Verified", status: true },
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