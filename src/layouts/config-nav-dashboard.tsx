import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------
export type UserRole = 'organizer' | 'admin' | 'provider' | 'participant';
export interface NavItem {
  title: string;
  path: string;
  icon?: React.ReactNode;
  info?: React.ReactNode;
  roles?: UserRole[]; // Add roles property
  children?: NavItem[];
}
const icon = (name: string) => (
  <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
);

const EventsInfo = () => <Label color="success" variant="inverted">3</Label>


export const navData: NavItem[] = [
  // All Users Dashboard
  {
    title: 'Statistics & Performance',
    path: '/',
    icon: icon('ic-analytics'),
    roles: ['provider'],
  },
  {
    title: 'Dashboard',
    path: '/',
    icon: icon('ic-dashboard'),
    roles: ['admin'],
  },
  {
    title: 'Home',
    path: '/',
    icon: icon('ic-dashboard'),
    roles: ['organizer'],
  },

  // Organizer Sidebar
   {
    title: 'Statistics And Reports',
    path: '/statistics-&-reports',
    icon: icon('ic-dashboard'),
    roles: ['organizer'],
  },
  {
    title: 'Events',
    path: '#',
    icon: icon('ic_events'),
    info: <EventsInfo />,
    roles: ['organizer'],
    children: [ // Submenu items
      {
        title: 'Add New',
        path: '/events/add-new',
        icon: icon('ic_event_create'),
      },
      {
        title: 'Edit an Event',
        path: '/events/check-schedule',
        icon: icon('ic_event_edit'),
      },
    ],
  },
  {
    title: 'Ticket & Reservation Management',
    path: '/ticket-and-reservation-management',
    icon: icon('ic-analytics'),
    roles: ['organizer'],
  },
  {
    title: 'Marketing Engagenment',
    path: '/marketing-engagenment',
    icon: icon('ic-marketing-ngagenment'),
    roles: ['organizer'],
  },
  {
    title: 'Entry Validation',
    path: '/entry-validation',
    icon: icon('ic-marketing-ngagenment'),
    roles: ['organizer'],
  },
  {
    title: 'Transection & Payment',
    path: '/transection-and-payment',
    icon: icon('ic-transaction-&-payment'),
    roles: ['organizer'],
  },
  {
    title: 'Find a Service Provider',
    path: '/search-&-select-service-providers',
    icon: icon('ic-analytics'),
    roles: ['organizer', 'provider'],
  },

  // Provider Sidebar
  {
    title: 'Event Settings',
    path: '/visibility-and-access-settings',
    icon: icon('ic-analytics'),
    roles: ['organizer'],
  },
  {
    title: 'Home & Recommendations',
    path: '/home-and-recommendations',
    icon: icon('ic-analytics'),
    roles: ['participant'],
  },
  {
    title: 'Event Search & Details',
    path: '/event-search-and-details',
    icon: icon('ic-analytics'),
    roles: ['participant'],
  },
  {
    title: 'Ticket Purchase Process',
    path: '/ticket-purchase-process',
    icon: icon('ic-analytics'),
    roles: ['participant'],
  },
  {
    title: 'Ticket Management',
    path: '/ticket-management',
    icon: icon('ic-analytics'),
    roles: ['participant'],
  },
  {
    title: 'Ticket Validation at Entry',
    path: '/ticket-validation-at-entry',
    icon: icon('ic-analytics'),
    roles: ['participant'],
  },
  {
    title: 'Loyalty Program',
    path: '/loyalty-program',
    icon: icon('ic-analytics'),
    roles: ['participant'],
  },
  {
    title: 'Custom Photo/Video Filters for Events',
    path: '/custom-photo-or-video-filters-for-events',
    icon: icon('ic-analytics'),
    roles: ['participant'],
  },
  {
    title: 'Home & Global View',
    path: '/home-and-global-view',
    icon: icon('ic-analytics'),
    roles: ['provider'],
  },
  {
    title: 'Reservations & Contracts',
    path: '/reservations-and-contracts',
    icon: icon('ic-analytics'),
    roles: ['provider'],
  },
  {
    title: 'Confirmed Service Calendar',
    path: '/confirmed-service-calendar',
    icon: icon('ic-analytics'),
    roles: ['provider'],
  },
  {
    title: 'Transaction & Payment Management',
    path: '/transaction-&-payment-management',
    icon: icon('ic-analytics'),
    roles: ['provider'],
  },
  {
    title: 'Messaging & Client Relationship',
    path: '/messaging-&-client-relationship',
    icon: icon('ic-analytics'),
    roles: ['provider'],
  },
  {
    title: 'Service Request & Negotiation',
    path: '/service-request-&-negotiation',
    icon: icon('ic-analytics'),
    roles: ['provider'],
  },
  {
    title: 'Tracking of Booked Services & Providers',
    path: '/tracking-of-booked-services-&-providers',
    icon: icon('ic-analytics'),
    roles: ['provider'],
  },
  {
    title: 'Global Overview & General Statistics',
    path: '/global-overview-&-general-statistics',
    icon: icon('ic-analytics'),
    roles: ['admin'],
  },
  {
    title: 'User Management',
    path: '/user-management',
    icon: icon('ic-analytics'),
    roles: ['admin'],

  },
  {
    title: 'Ticketing & Transactions Supervision',
    path: '/ticketing-&-transactions-supervision',
    icon: icon('ic-analytics'),
    roles: ['admin'],

  },
  {
    title: 'Marketplace & Service Provider Supervision',
    path: '/marketplace-&-service-provider-supervision',
    icon: icon('ic-analytics'),
    roles: ['admin'],
  },
  {
    title: 'Profile & Services Management',
    path: '/profile-&-services-management',
    icon: icon('ic-analytics'),
    roles: ['provider', 'admin','organizer','organizer','participant'],
  },

];
