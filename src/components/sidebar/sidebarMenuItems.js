import {
  House,
  Users,
  Gear,
  Briefcase,
  Notebook,
  Ticket,
} from 'phosphor-react';

export const sidebarArray = [
  {
    title: 'Home',
    route: '/dashboard',
    icon: <House size={24} className='mr-3' color='gray' weight='fill' />,
  },
  {
    title: 'Products',
    route: '/dashboard/products',
    icon: <Briefcase size={24} className='mr-3' color='gray' weight='fill' />,
  },
  {
    title: 'UI settings',
    route: '/dashboard/ui',
    icon: <Gear size={24} className='mr-3' color='gray' weight='fill' />,
  },
  {
    title: 'Users',
    route: '/dashboard/users',
    icon: <Users size={24} className='mr-3' color='gray' weight='fill' />,
  },
  {
    title: 'Orders',
    route: '/dashboard/orders',
    icon: <Notebook size={24} className='mr-3' color='gray' weight='fill' />,
  },
  {
    title: 'Support Tickets',
    route: '/dashboard/support',
    icon: <Ticket size={24} className='mr-3' color='gray' weight='fill' />,
  },
];
