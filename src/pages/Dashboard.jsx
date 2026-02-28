import { useState, useEffect } from 'react';
import { dashboardAPI } from '../services/api';
import KPICard from '../components/KPICard';
import { LineChart, BarChart, DoughnutChart } from '../components/Charts';
import DataTable from '../components/DataTable';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await dashboardAPI.getData();
      setData(response.data.data);
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
        {error}
      </div>
    );
  }

  const { kpis, sales, revenue, categories, regional, trends, products, transactions } = data || {};

  const productColumns = [
    { key: 'product', label: 'Product' },
    { key: 'category', label: 'Category' },
    { key: 'sales', label: 'Sales', type: 'number' },
    { key: 'revenue', label: 'Revenue', type: 'currency' },
    { key: 'growth', label: 'Growth', type: 'percentage' }
  ];

  const transactionColumns = [
    { key: 'customer', label: 'Customer' },
    { key: 'amount', label: 'Amount', type: 'currency' },
    { key: 'status', label: 'Status', type: 'status' },
    { key: 'date', label: 'Date' }
  ];

  return (
    <div className="space-y-6 fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-500 mt-1">Monitor your business metrics and performance</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Last updated: {new Date().toLocaleString()}</span>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis?.map((kpi) => (
          <KPICard key={kpi.id} {...kpi} />
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 chart-container">
          <LineChart data={sales} title="Sales Trend" />
        </div>
        <div className="chart-container">
          <DoughnutChart data={revenue} title="Revenue Distribution" />
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="chart-container">
          <BarChart data={categories} title="Revenue by Category" />
        </div>
        <div className="chart-container">
          <BarChart data={regional} title="Sales by Region" />
        </div>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Top Products</h2>
          </div>
          <DataTable data={products} columns={productColumns} />
        </div>
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
          </div>
          <DataTable data={transactions} columns={transactionColumns} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
