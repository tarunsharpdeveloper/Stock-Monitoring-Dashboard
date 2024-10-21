export const getStockData = async () => {
    const apiKey = 'demo';
    const url = `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${apiKey}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const stockData = data.most_actively_traded || [];

      return stockData.map((stock, index) => ({
        id: index + 1,
        symbol: stock.ticker,
        currentPrice: parseFloat(stock.price),
        percentageChange: parseFloat(stock.change_percentage.replace('%', '')),
      }));
    } catch (error) {
      console.error('Error fetching stock data:', error);
      return [];
    }
  };
