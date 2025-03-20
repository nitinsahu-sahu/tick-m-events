import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
);

export const navData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: icon('ic-analytics'),
  },
  {
    title: 'Analytics',
    path: '/analytics',
    icon: icon('ic-analytics'),
  },
  {
    title: 'Event Details',
    path: '/event-details',
    icon: icon('ic-analytics'),
  },
  {
    title: 'Ticket & Reservation Management',
    path: '/ticket-and-reservation-management',
    icon: icon('ic-analytics'),
  },
  {
    title: 'Entry Validation',
    path: '/entry-validation',
    icon: icon('ic-analytics'),
  },
  {
    title: 'Marketing Engagenment',
    path: '/marketing-engagenment',
    icon: icon('ic-analytics'),
  },
  {
    title: 'Transection & Payment',
    path: '/transection-and-payment',
    icon: icon('ic-analytics'),
  },
  {
    title: 'Statistics & Reports',
    path: '/statistics-and-reports',
    icon: icon('ic-analytics'),
  },
  {
    title: 'Visibility & Access Settings',
    path: '/visibility-and-access-settings',
    icon: icon('ic-analytics'),
  },
  {
    title: 'Service Provider & Manage Contracts',
    path: '/service-provider-and-manage-contracts',
    icon: icon('ic-analytics'),
  },
];
