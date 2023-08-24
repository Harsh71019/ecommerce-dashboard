import React, { useEffect, useState } from 'react';
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
  Pagination,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Input,
} from '@nextui-org/react';
import { EditIcon } from '@/icons/EditIcon';
import { DeleteIcon } from '@/icons/DeleteIcon';
import { EyeIcon } from '@/icons/EyeIcon';

import { useGetProductsQuery } from '@/redux/services/productApi'; // Adjust the path as needed
import DeleteProduct from './deletemodal';
import EditProductModal from './editmodal';
import ViewProductModal from './viewproduct';
import DownloadCSV from '@/components/generic/csv'; // Adjust the path as needed
import { useRouter, useSearchParams } from 'next/navigation';
import { PlusCircle, CaretCircleDown, MagnifyingGlass } from 'phosphor-react';
import PageRows from '@/data/pagesize';
import {
  columns,
  INITIAL_VISIBLE_COLUMNS,
  statusColorMap,
} from './data/columns';
import { debounce } from 'lodash';

export default function ProductTable() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
  });

  const [finalFilters, setFinalFilters] = useState({});

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === 'all') return columns;
    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const {
    data: productsObject,
    isLoading,
    isError,
    refetch,
  } = useGetProductsQuery({ currentPage, pageSize, filters: finalFilters });
  useEffect(() => {
    if (searchParams.get('update')) {
      refetch();
    }
  }, []);

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

  const handlePageSizeChange = (event) => {
    setPageSize(parseInt(event.target.value));
  };
  const onSearchChange = (value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      search: value, // Update the search filter
    }));
    setCurrentPage(1); // Reset to the first page when search changes
  };

  const debouncedSearch = debounce(onSearchChange, 300); // Adjust the delay as needed

  const handleSearchChange = (value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      search: value,
    }));
    setCurrentPage(1);
    debouncedSearch(value); // Call the debounced function
  };

  return (
    <>
      <div className='flex justify-between mb-7'>
        <div>
          <Input
            isClearable
            classNames={{
              base: 'w-full',
              inputWrapper: 'border-1',
            }}
            placeholder='Search by name...'
            size='md'
            startContent={
              <MagnifyingGlass size={24} className='mr-1' color='white' />
            }
            value={filters.search}
            variant='bordered'
            onClear={() => onSearchChange('')}
            onValueChange={handleSearchChange}
          />
        </div>
        <div className='flex'>
          <Dropdown>
            <DropdownTrigger className='hidden sm:flex mr-3'>
              <Button
                endContent={
                  <CaretCircleDown
                    size={24}
                    className='mr-1'
                    color='white'
                    weight='fill'
                  />
                }
                size='md'
                variant='flat'
              >
                Columns
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label='Table Columns'
              closeOnSelect={false}
              selectedKeys={visibleColumns}
              selectionMode='multiple'
              onSelectionChange={setVisibleColumns}
            >
              {columns.map((column) => (
                <DropdownItem key={column.uid} className='capitalize'>
                  {column.key}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>

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
            <PlusCircle
              size={24}
              className='mr-1'
              color='white'
              weight='fill'
            />{' '}
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
      <div className='flex justify-between mt-5'>
        <Pagination
          showControls
          total={productsObject && productsObject.pages}
          onChange={handlePageChange}
          page={currentPage}
        />
        <div>
          <label htmlFor='select'>Rows per page:{pageSize} </label>
          <select
            className='rounded-md'
            id='select'
            value={pageSize}
            onChange={handlePageSizeChange}
          >
            {PageRows.map((item) => (
              <option key={item.key} value={item.value}>
                {item.key}
              </option>
            ))}
          </select>
        </div>
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
