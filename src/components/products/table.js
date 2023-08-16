import React, { useState } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Tooltip,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@nextui-org/react';
import { EditIcon } from '@/icons/EditIcon';
import { DeleteIcon } from '@/icons/DeleteIcon';
import { EyeIcon } from '@/icons/EyeIcon';
import { VerticalDotsIcon } from '@/icons/VerticalDotsIcon';

import { useGetProductsQuery } from '@/redux/services/productApi'; // Adjust the path as needed
import { Pagination } from '@nextui-org/react';
import DeleteProduct from './deletemodal';
import EditProductModal from './editmodal';
import ViewProductModal from './viewproduct';

const statusColorMap = {
  active: 'success',
  paused: 'danger',
  vacation: 'warning',
};

const columns = [
  { label: 'Name', key: 'name' },
  { label: 'Category', key: 'category' },
  { label: 'Brand', key: 'brand' },
  { label: '₹ Price', key: 'price' },
  { label: '% Discount', key: 'discountPercentage' },
  { label: 'Count', key: 'countInStock' },
  { label: 'Rating', key: 'rating' },
  { label: 'Actions', key: 'actions' },
];

export default function ProductTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({}); // Replace with your filter state

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // Add this line

  const {
    data: productsObject,
    isLoading,
    isError,
    refetch,
  } = useGetProductsQuery(currentPage, filters); // Pass currentPage and filters to the query

  const handleDeleteIconClick = (productId) => {
    setSelectedProductId(productId);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setSelectedProductId(null);
  };

  const handleDeletionSuccess = () => {
    refetch();
  };

  const handleEditIconClick = (product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleViewIconClick = (product) => {
    setSelectedProduct(product);
    setIsViewModalOpen(true);
  };

  const handleViewModalClose = () => {
    setSelectedProduct(null);
    setIsViewModalOpen(false);
  };

  const handleEditModalClose = () => {
    setSelectedProduct(null);
    setIsEditModalOpen(false);
  };

  function buildFiltersQueryString(filters) {
    const queryString = Object.keys(filters)
      .map((key) => `${key}=${encodeURIComponent(filters[key])}`)
      .join('&');

    return queryString ? `&${queryString}` : '';
  }

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
      <Table
        isLoading={isLoading}
        aria-label='Example table with dynamic content'
      >
        <TableHeader>
          {columns.map((column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {!isLoading &&
            productsObject.products.map((product) => (
              <TableRow key={product._id}>
                {(columnKey) => (
                  <TableCell>
                    {renderCell(
                      product,
                      columnKey,
                      handleDeleteIconClick,
                      handleEditIconClick,
                      handleViewIconClick
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <DeleteProduct
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteModalClose}
        selectedProductId={selectedProductId}
        onDeleteSuccess={handleDeletionSuccess}
      />
      <div className='flex justify-center mt-5'>
        <Pagination
          showControls
          total={productsObject && productsObject.pages}
          onChange={handlePageChange}
          page={currentPage}
        />
      </div>
      <DeleteProduct />
      <EditProductModal
        isOpen={isEditModalOpen}
        onClose={handleEditModalClose}
        product={selectedProduct}
        onUpdateSuccess={() => refetch()}
        setProduct={setSelectedProduct}
      />
      <ViewProductModal
        isOpen={isViewModalOpen}
        onClose={() => handleViewModalClose()}
        product={selectedProduct}
      />
    </>
  );
}

function renderCell(
  product,
  columnKey,
  handleDeleteIconClick,
  handleEditIconClick,
  handleViewIconClick
) {
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
        <div className='relative flex justify-end items-center gap-2'>
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly size='sm' variant='light'>
                <VerticalDotsIcon className='text-default-300' />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem onClick={() => handleViewIconClick(product)}>
                View
              </DropdownItem>{' '}
              <DropdownItem onClick={() => handleEditIconClick(product)}>
                Edit
              </DropdownItem>
              <DropdownItem onClick={() => handleDeleteIconClick(product._id)}>
                Delete
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      );
    default:
      return <p>{cellValue}</p>;
  }
}
