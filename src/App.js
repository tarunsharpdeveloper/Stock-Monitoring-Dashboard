import React, { useState, useEffect } from 'react';
import StockList from './components/StockList';
import { getStockData } from './api/stockData';
import './styles/stockDashboard.scss';
import InfoIcon from '@mui/icons-material/Info';
import Tooltip from '@mui/material/Tooltip';

const App = () => {
  const [stocks, setStocks] = useState([]);
  const [filter, setFilter] = useState(-Infinity);

  useEffect(() => {
    getStockData().then(data => {
      setStocks(data);
    });
  }, []);

  const filteredStocks = stocks.filter(stock => filter === -Infinity || stock.percentageChange > filter);

  const handleFilterChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "all") {
      setFilter(-Infinity);
    } else {
      setFilter(parseFloat(selectedValue));
    }
  };

  return (
    <div className="stock-dashboard">
      <h1>Stock Monitoring Dashboard</h1>
      <div className="filter">
        <label>Filter</label>
        <Tooltip title="Filter the stocks by percentage change">
          <InfoIcon />
        </Tooltip>
      </div>
      <select className='select' onChange={handleFilterChange} defaultValue="">
        <option value="" disabled>Select a percentage change</option>
        <option value="all">All</option>
        {Array.from({ length: 10 }, (_, i) => (
          <option key={i + 1} value={i + 1}>{i + 1}%</option>
        ))}
      </select>
      <StockList stocks={filteredStocks} />
    </div>
  );
};

export default App;
