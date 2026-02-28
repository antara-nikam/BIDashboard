import { useState, useEffect } from 'react';
import { dashboardAPI } from '../services/api';
import KPICard from '../components/KPICard';
import { LineChart, BarChart, DoughnutChart, PieChart } from '../components/Charts';
import DataTable from '../components/DataTable';

const widgetTypes = [
  { type: 'kpi', label: 'KPI Card', icon: '📊' },
  { type: 'line', label: 'Line Chart', icon: '📈' },
  { type: 'bar', label: 'Bar Chart', icon: '📉' },
  { type: 'doughnut', label: 'Doughnut Chart', icon: '🍩' },
  { type: 'pie', label: 'Pie Chart', icon: '🥧' },
  { type: 'table', label: 'Data Table', icon: '📋' }
];

const CustomDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [widgets, setWidgets] = useState([]);
  const [showWidgetPicker, setShowWidgetPicker] = useState(false);
  const [editingWidget, setEditingWidget] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await dashboardAPI.getData();
      setData(response.data.data);
      
      // Initialize with default widgets from config
      if (response.data.data.config?.widgets) {
        setWidgets(response.data.data.config.widgets.map(w => ({ ...w, id: w.id || Math.random() })));
      }
    } catch (err) {
      console.error('Failed to load dashboard data', err);
    } finally {
      setLoading(false);
    }
  };

  const addWidget = (type) => {
    const newWidget = {
      id: `widget-${Date.now()}`,
      type,
      title: type === 'kpi' ? 'New KPI' : type === 'line' ? 'Line Chart' : type === 'bar' ? 'Bar Chart' : type === 'doughnut' ? 'Doughnut Chart' : type === 'pie' ? 'Pie Chart' : 'Data Table',
      colSpan: type === 'table' ? 2 : 1
    };
    setWidgets([...widgets, newWidget]);
    setShowWidgetPicker(false);
  };

  const removeWidget = (id) => {
    setWidgets(widgets.filter(w => w.id !== id));
  };

  const updateWidgetTitle = (id, title) => {
    setWidgets(widgets.map(w => w.id === id ? { ...w, title } : w));
  };

  const renderWidget = (widget) => {
    switch (widget.type) {
      case 'kpi':
        return (
          <div className="grid grid-cols-2 gap-4">
            {data?.kpis?.slice(0, 4).map((kpi) => (
              <KPICard key={kpi.id} {...kpi} />
            ))}
          </div>
        );
      case 'line':
        return data?.sales ? <LineChart data={data.sales} /> : <div>No data</div>;
      case 'bar':
        return data?.categories ? <BarChart data={data.categories} /> : <div>No data</div>;
      case 'doughnut':
        return data?.revenue ? <DoughnutChart data={data.revenue} /> : <div>No data</div>;
      case 'pie':
        return data?.revenue ? <PieChart data={data.revenue} /> : <div>No data</div>;
      case 'table':
        return (
          <DataTable
            data={data?.products || []}
            columns={[
              { key: 'product', label: 'Product' },
              { key: 'category', label: 'Category' },
              { key: 'sales', label: 'Sales', type: 'number' },
              { key: 'revenue', label: 'Revenue', type: 'currency' }
            ]}
          />
        );
      default:
        return <div>Unknown widget type</div>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Custom Dashboard</h1>
          <p className="text-gray-500 mt-1">Build your own dashboard with drag-and-drop widgets</p>
        </div>
        <button
          onClick={() => setShowWidgetPicker(true)}
          className="btn-primary flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Widget
        </button>
      </div>

      {widgets.length === 0 ? (
        <div className="card text-center py-12">
          <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No widgets yet</h3>
          <p className="text-gray-500 mb-4">Start building your custom dashboard by adding widgets</p>
          <button
            onClick={() => setShowWidgetPicker(true)}
            className="btn-primary mx-auto"
          >
            Add Your First Widget
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {widgets.map((widget) => (
            <div
              key={widget.id}
              className={`card ${widget.colSpan === 2 ? 'lg:col-span-2' : ''}`}
            >
              <div className="flex items-center justify-between mb-4">
                <input
                  type="text"
                  value={widget.title}
                  onChange={(e) => updateWidgetTitle(widget.id, e.target.value)}
                  className="text-lg font-semibold text-gray-900 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-primary-500 rounded px-2 py-1"
                />
                <button
                  onClick={() => removeWidget(widget.id)}
                  className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
              {renderWidget(widget)}
            </div>
          ))}
        </div>
      )}

      {/* Widget Picker Modal */}
      {showWidgetPicker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Add Widget</h2>
              <button
                onClick={() => setShowWidgetPicker(false)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {widgetTypes.map((widget) => (
                <button
                  key={widget.type}
                  onClick={() => addWidget(widget.type)}
                  className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all duration-200"
                >
                  <span className="text-2xl">{widget.icon}</span>
                  <span className="font-medium text-gray-700">{widget.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDashboard;
