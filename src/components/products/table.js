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
  Button,
} from '@nextui-org/react';
import { EditIcon } from '@/icons/EditIcon';
import { DeleteIcon } from '@/icons/DeleteIcon';
import { EyeIcon } from '@/icons/EyeIcon';

import { useGetProductsQuery } from '@/redux/services/productApi'; // Adjust the path as needed
import { Pagination } from '@nextui-org/react';
import DeleteProduct from './deletemodal';
import EditProductModal from './editmodal';
import ViewProductModal from './viewproduct';
import DownloadCSV from '@/components/generic/csv'; // Adjust the path as needed
import { useRouter } from 'next/navigation';

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
  const router = useRouter();
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
      <div className='flex justify-between mb-7'>
        <div>
          <h1 className='text-2xl'>Products</h1>
        </div>
        <div>
          {!isLoading && productsObject && productsObject.products && (
            <Button color='warning' className='mr-5'>
              <DownloadCSV filename='products' data={productsObject.products} />
            </Button>
          )}

          <Button
            color='primary'
            onClick={() => {
              router.push('products/add');
            }}
          >
            Add Products
          </Button>
        </div>
      </div>
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
        <div className='relative flex items-center gap-2'>
          <Tooltip content='Details'>
            <span
              onClick={() => handleViewIconClick(product)}
              className='text-lg text-default-400 cursor-pointer active:opacity-50'
            >
              <EyeIcon />
            </span>
          </Tooltip>
          <Tooltip content='Edit user'>
            <span
              onClick={() => handleEditIconClick(product)}
              className='text-lg text-default-400 cursor-pointer active:opacity-50'
            >
              <EditIcon />
            </span>
          </Tooltip>
          <Tooltip color='danger' content='Delete user'>
            <span
              onClick={() => handleDeleteIconClick(product._id)}
              className='text-lg text-danger cursor-pointer active:opacity-50'
            >
              <DeleteIcon />
            </span>
          </Tooltip>
        </div>
      );
    default:
      return <p>{cellValue}</p>;
  }
}
