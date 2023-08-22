import React from 'react';
import { CSVLink } from 'react-csv';
import { MicrosoftExcelLogo } from 'phosphor-react';

const DownloadCSV = ({ data, filename }) => {
  return (
    <>
      <MicrosoftExcelLogo
        size={24}
        className='mr-1'
        color='white'
        weight='fill'
      />
      <CSVLink data={data} filename={filename}>
        <span className='text-white'> Download CSV</span>
      </CSVLink>
    </>
  );
};

export default DownloadCSV;
