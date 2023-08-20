import React from 'react';
import { CSVLink } from 'react-csv';

const DownloadCSV = ({ data, filename }) => {
  return (
    <CSVLink data={data} filename={filename}>
      Download CSV
    </CSVLink>
  );
};

export default DownloadCSV;
