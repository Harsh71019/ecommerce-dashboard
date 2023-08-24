import {
  IdentificationBadge,
  ClipboardText,
  Tag,
  BracketsAngle,
  ChartLineUp,
  Percent,
  User,
  Envelope,
  Crosshair,
  Calendar,
} from 'phosphor-react';

const columns = [
  {
    label: (
      <div className='flex items-center'>
        <IdentificationBadge
          size={24}
          className='mr-1'
          color='white'
          weight='fill'
          name='Name'
        />
        Username
      </div>
    ),
    key: 'username',
    uid: 'username',
  },
  {
    label: (
      <div className='flex items-center'>
        <User
          size={24}
          className='mr-1'
          color='white'
          weight='fill'
          name='Name'
        />
        Name
      </div>
    ),
    key: 'name',
    uid: 'name',
  },
  {
    label: (
      <div className='flex items-center'>
        <Crosshair
          size={24}
          className='mr-1'
          color='white'
          weight='fill'
          name='Name'
        />
        Role
      </div>
    ),
    key: 'role',
    uid: 'role',
  },

  {
    label: (
      <div className='flex items-center'>
        <Envelope
          size={24}
          className='mr-1'
          color='white'
          weight='fill'
          name='Name'
        />
        Email
      </div>
    ),
    key: 'email',
    uid: 'email',
  },
  {
    label: (
      <div className='flex items-center'>
        <Calendar
          size={24}
          className='mr-1'
          color='white'
          weight='fill'
          name='Name'
        />
        Date Joined
      </div>
    ),
    key: 'createdAt',
    uid: 'createdAt',
  },
  {
    label: (
      <div className='flex items-center'>
        <BracketsAngle
          size={24}
          className='mr-1'
          color='white'
          weight='fill'
          name='Name'
        />
        Actions
      </div>
    ),
    key: 'actions',
    uid: 'actions',
  },
];

const INITIAL_VISIBLE_COLUMNS = [
  'username',
  'name',
  'role',
  'email',
  'createdAt',
  'actions',
];

export { columns, INITIAL_VISIBLE_COLUMNS };
