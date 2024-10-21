import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const StockList = ({ stocks }) => {
  const columns = [
    { field: 'symbol', headerName: 'Stock Symbol', flex: 1 },
    { field: 'currentPrice', headerName: 'Current Price', flex: 1 },
    {
        field: 'percentageChange',
        headerName: 'Percentage Change',
        flex: 1,
        renderCell: (params) => (
          <span style={{ color: params.value > 0 ? 'green' : 'red' }}>
            {params.value}%
          </span>
        ),
      },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={stocks}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
      />
    </div>
  );
};

export default StockList;
