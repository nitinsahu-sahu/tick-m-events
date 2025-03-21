import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
);

const EventsInfo = () => <Label color="success" variant="inverted">3</Label>


export const navData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: icon('ic-dashboard'),
  },
  {
    title: 'Events',
    path: '#',
    icon: icon('ic_events'),
    info: <EventsInfo />,
    children: [ // Submenu items
      {
        title: 'Order List',
        path: '/events/order-list',
        icon: icon('ic_order_list'),
      },
      {
        title: 'Check Schedule',
        path: '/events/check-schedule',
        icon: icon('ic_check_schedule'),
      },
      {
        title: 'Add New',
        path: '/events/add-new',
        icon: icon('ic_add_new'),
      },
    ],
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
    icon: icon('ic-marketing-ngagenment'),
  },
  {
    title: 'Marketing Engagenment',
    path: '/marketing-engagenment',
    icon: icon('ic-marketing-ngagenment'),
  },
  {
    title: 'Transection & Payment',
    path: '/transection-and-payment',
    icon: icon('ic-transaction-&-payment'),
  },
  {
    title: 'Statistics & Reports',
    path: '/statistics-and-reports',
    icon: icon('ic-statistics'),
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
