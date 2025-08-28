import {
  _id,
  _price,
  _times,
  _boolean,
  _taskNames,
  _postTitles,
  _description,
  _fullName
} from './_mock';


// ----------------------------------------------------------------------

export const _posts = [...Array(23)].map((_, index) => ({
  id: _id(index),
  title: _postTitles(index),
  description: _description(index),
  coverUrl: `/assets/images/cover/cover-${index + 1}.webp`,
  totalViews: 8829,
  totalComments: 7977,
  totalShares: 8556,
  totalFavorites: 8870,
  postedAt: _times(index),
  author: {
    name: _fullName(index),
    avatarUrl: `/assets/images/avatar/avatar-${index + 1}.webp`,
  },
}));

// ----------------------------------------------------------------------

export const _langs = [
  {
    value: 'en',
    label: 'English',
    icon: '/assets/icons/flags/ic-flag-en.svg',
  },
  {
    value: 'fr',
    label: 'French',
    icon: '/assets/icons/flags/ic-flag-fr.svg',
  },
];


// ----------------------------------------------------------------------

export const _messages = [
  {
    id: _id(1),
    title: 'Jhon',
    description: 'Please Explain this event',
    avatarUrl: '/assets/images/avatar/avatar-2.webp',
    type: 'friend-interactive',
    postedAt: _times(1),
    isUnRead: true,
  },
  {
    id: _id(2),
    title: 'Jannifer',
    description: 'Where is the loaction?',
    avatarUrl: '/assets/images/avatar/avatar-2.webp',
    type: 'friend-interactive',
    postedAt: _times(2),
    isUnRead: true,
  }
];


export const _notifications = [
  {
    id: _id(1),
    title: 'Ticket Selection Information',
    description: '',
    avatarUrl: null,
    type: 'order-placed',
    postedAt: _times(1),
    isUnRead: true,
  },
  {
    id: _id(2),
    title: "B2B Marketplace information",
    description: '',
    avatarUrl: '/assets/images/avatar/avatar-2.webp',
    type: 'friend-interactive',
    postedAt: _times(2),
    isUnRead: true,
  },
];

export const _giftboxdata = [
  {
    id: _id(1),
    title: 'Marketing informaitons',
    description: '',
    avatarUrl: null,
    type: 'order-placed',
    postedAt: _times(1),
    isUnRead: true,
  },
  {
    id: _id(2),
    title: "Pramotion notifications",
    description: '',
    avatarUrl: '/assets/images/avatar/avatar-2.webp',
    type: 'order-placed',
    postedAt: _times(2),
    isUnRead: true,
  },
  {
    id: _id(2),
    title: "Special Offers Organizer enable/Disable",
    description: 'The Marketing and Engagement Page sell their tickets',
    avatarUrl: '/assets/images/avatar/avatar-2.webp',
    type: 'order-placed',
    postedAt: _times(2),
    isUnRead: true,
  },
];
