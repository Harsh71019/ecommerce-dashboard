import {
  IdentificationBadge,
  ClipboardText,
  Tag,
  Star,
  CurrencyInr,
  BracketsAngle,
  ChartLineUp,
  Percent,
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
        Product Name
      </div>
    ),
    key: 'name',
    uid: 'name',
  },
  {
    label: (
      <div className='flex items-center'>
        <Tag
          size={24}
          className='mr-1'
          color='white'
          weight='fill'
          name='Name'
        />
        Product Category
      </div>
    ),
    key: 'category',
    uid: 'category',
  },
  {
    label: (
      <div className='flex items-center'>
        <ClipboardText
          size={24}
          className='mr-1'
          color='white'
          weight='fill'
          name='Name'
        />
        Product Brand
      </div>
    ),
    key: 'brand',
    uid: 'brand',
  },
  {
    label: (
      <div className='flex items-center'>
        <CurrencyInr
          size={24}
          className='mr-1'
          color='white'
          weight='fill'
          name='Name'
        />
        Product Price
      </div>
    ),
    key: 'price',
    uid: 'price',
  },
  {
    label: (
      <div className='flex items-center'>
        <Percent
          size={24}
          className='mr-1'
          color='white'
          weight='fill'
          name='Name'
        />
        Product Discount
      </div>
    ),
    key: 'discountPercentage',
    uid: 'discountPercentage',
  },
  {
    label: (
      <div className='flex items-center'>
        <ChartLineUp
          size={24}
          className='mr-1'
          color='white'
          weight='fill'
          name='Name'
        />
        Product Stock
      </div>
    ),
    key: 'countInStock',
    uid: 'countInStock',
  },
  {
    label: (
      <div className='flex items-center'>
        <Star
          size={24}
          className='mr-1'
          color='white'
          weight='fill'
          name='Name'
        />
        Product Rating
      </div>
    ),
    key: 'rating',
    uid: 'rating',
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

const statusColorMap = {
  active: 'success',
  paused: 'danger',
  vacation: 'warning',
};

const INITIAL_VISIBLE_COLUMNS = [
  'name',
  'category',
  'brand',
  'price',
  'discountPercentage',
  'countInStock',
  'rating',
  'role',
  'status',
  'actions',
];

export { columns, statusColorMap, INITIAL_VISIBLE_COLUMNS };
