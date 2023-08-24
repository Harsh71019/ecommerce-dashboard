'use client';

import React, { useState } from 'react';
import { EditIcon } from '@/icons/EditIcon';
import { DeleteIcon } from '@/icons/DeleteIcon';
import { EyeIcon } from '@/icons/EyeIcon';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Tooltip,
  Pagination,
} from '@nextui-org/react';
import { useGetUsersQuery } from '@/redux/services/userApi'; // Adjust the path as needed
import DownloadCSV from '@/components/generic/csv'; // Adjust the path as needed
import formatDateToDDMMYYYY from '@/utils/dateConvert';
import PageRows from '@/data/pagesize';

const statusColorMap = {
  active: 'success',
  paused: 'danger',
  vacation: 'warning',
};

const columns = [
  {
    key: 'username',
    label: 'USERNAME',
  },
  {
    key: 'name',
    label: 'NAME',
  },
  {
    key: 'role',
    label: 'ROLE',
  },
  {
    key: 'email',
    label: 'EMAIL',
  },

  {
    key: 'createdAt',
    label: 'DATE JOINED',
  },
  { label: 'Actions', key: 'actions' },
];

export default function UserTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [filters, setFilters] = useState({});
  const {
    data: users,
    isLoading,
    isError,
    refetch,
  } = useGetUsersQuery({ currentPage, pageSize, filters }); // Pass currentPage and filters to the query
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handlePageSizeChange = (event) => {
    setPageSize(parseInt(event.target.value));
  };

  return (
    <>
      <div className='p-3'>
        <div className='flex justify-between'>
          <h1 className='text-2xl'>Users</h1>
          {!isLoading && users && users.users && (
            <Button color='warning' className='mr-5'>
              <DownloadCSV filename='products' data={users.users} />
            </Button>
          )}
        </div>
        <div className='mt-5'>
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
                users &&
                users.users &&
                users.users.map((user) => (
                  <TableRow key={user._id}>
                    {(columnKey) => (
                      <TableCell>{renderCell(user, columnKey)}</TableCell>
                    )}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <div className='flex justify-between mt-5'>
            <Pagination
              showControls
              total={users && users && users.users.pages}
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
        </div>
      </div>
    </>
  );
}

function renderCell(user, columnKey) {
  const cellValue = user[columnKey];

  switch (columnKey) {
    case 'actions':
      return (
        <div className='relative flex items-center gap-2'>
          <Tooltip content='Details'>
            <span className='text-lg text-default-400 cursor-pointer active:opacity-50'>
              <EyeIcon />
            </span>
          </Tooltip>
          <Tooltip content='Edit user'>
            <span className='text-lg text-default-400 cursor-pointer active:opacity-50'>
              <EditIcon />
            </span>
          </Tooltip>
          <Tooltip color='danger' content='Delete user'>
            <span className='text-lg text-danger cursor-pointer active:opacity-50'>
              <DeleteIcon />
            </span>
          </Tooltip>
        </div>
      );
    default:
      return (
        <p>
          {columnKey === 'createdAt'
            ? formatDateToDDMMYYYY(cellValue)
            : cellValue}
        </p>
      );
  }
}
