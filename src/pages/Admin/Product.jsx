// ProductDashboard.js
import React from 'react';
import ProductTable from './ProductTable.jsx';
// import CardsDashboard from './CardsDashboard';
// import ChartsDashboard from './ChartsDashboard';

const ProductDashboard = () => {
  return (
    <div className="container-fluid">
      <h1 className="mb-4">Rooms Dashboard</h1>
      {/* <CardsDashboard /> */}
      <ProductTable />
      {/* <ChartsDashboard /> */}
    </div>
  );
};

export default ProductDashboard;

