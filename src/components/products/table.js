import React from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Tooltip,
} from '@nextui-org/react';
import { EditIcon } from '@/icons/EditIcon';
import { DeleteIcon } from '@/icons/DeleteIcon';
import { EyeIcon } from '@/icons/EyeIcon';
import { useGetProductsQuery } from '@/redux/services/productApi'; // Adjust the path as needed
import { Pagination } from '@nextui-org/react';

const statusColorMap = {
  active: 'success',
  paused: 'danger',
  vacation: 'warning',
};

const columns = [
  { label: 'Name', key: 'name' },
  { label: 'Category', key: 'category' },
  { label: 'Brand', key: 'brand' },
  { label: 'Price', key: 'price' },
  { label: 'Discount', key: 'discountPercentage' },
  { label: 'Count', key: 'countInStock' },
  { label: 'Rating', key: 'rating' },
  { label: 'Actions', key: 'actions' },
];

export default function ProductTable() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [filters, setFilters] = React.useState({}); // Replace with your filter state

  function buildFiltersQueryString(filters) {
    const queryString = Object.keys(filters)
      .map((key) => `${key}=${encodeURIComponent(filters[key])}`)
      .join('&');
    return queryString ? `&${queryString}` : '';
  }

  const {
    data: productsObject,
    isLoading,
    isError,
  } = useGetProductsQuery(currentPage, filters); // Pass currentPage and filters to the query

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleFiltersChange = (newFilters) => {
    buildFiltersQueryString(newFilters);
    setFilters(newFilters);
    setCurrentPage(1); // Reset to the first page when filters change
  };

  return (
    <>
      <h1 className='mb-3'>Products</h1>
      <Table aria-label='Example table with dynamic content'>
        <TableHeader>
          {columns.map((column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {productsObject &&
            productsObject.products.map((product) => (
              <TableRow key={product._id}>
                {(columnKey) => (
                  <TableCell>{renderCell(product, columnKey)}</TableCell>
                )}
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <div className='flex justify-center mt-5'>
        <Pagination
          showControls
          total={productsObject && productsObject.pages}
          currentPage={currentPage}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
}

function renderCell(product, columnKey) {
  const cellValue = product[columnKey];

  switch (columnKey) {
    case 'status':
      return (
        <Chip
          className='capitalize'
          color={statusColorMap[cellValue]}
          size='sm'
          variant='flat'
        >
          {cellValue}
        </Chip>
      );
    case 'actions':
      return (
        <div className='relative flex items-center gap-2'>
          <Tooltip content='Details'>
            <span className='text-lg text-default-400 cursor-pointer active:opacity-50'>
              <EyeIcon />
            </span>
          </Tooltip>
          <Tooltip content='Edit products'>
            <span className='text-lg text-default-400 cursor-pointer active:opacity-50'>
              <EditIcon />
            </span>
          </Tooltip>
          <Tooltip color='danger' content='Delete products'>
            <span className='text-lg text-danger cursor-pointer active:opacity-50'>
              <DeleteIcon />
            </span>
          </Tooltip>
        </div>
      );
    default:
      return <p>{cellValue}</p>;
  }
}
