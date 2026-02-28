import { useState } from 'react';
import { dataAPI } from '../services/api';

const Import = () => {
  const [source, setSource] = useState('');
  const [dataType, setDataType] = useState('products');
  const [jsonData, setJsonData] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleImport = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      let parsedData;
      try {
        parsedData = JSON.parse(jsonData);
      } catch {
        setMessage({ type: 'error', text: 'Invalid JSON format' });
        setLoading(false);
        return;
      }

      const dataArray = Array.isArray(parsedData) ? parsedData : [parsedData];
      
      const response = await dataAPI.importData(source, dataArray, dataType);
      setMessage({ type: 'success', text: response.data.message });
      setJsonData('');
      setSource('');
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Import failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Data Import</h1>
        <p className="text-gray-500 mt-1">Import data from external sources</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Import Form */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Import Data</h2>
          
          {message.text && (
            <div className={`mb-4 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleImport} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data Source
              </label>
              <input
                type="text"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="input-field"
                placeholder="e.g., Excel, CSV, API, Database"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data Type
              </label>
              <select
                value={dataType}
                onChange={(e) => setDataType(e.target.value)}
                className="input-field"
              >
                <option value="products">Products</option>
                <option value="transactions">Transactions</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                JSON Data
              </label>
              <textarea
                value={jsonData}
                onChange={(e) => setJsonData(e.target.value)}
                className="input-field h-48 font-mono text-sm"
                placeholder='[{"product": "Item 1", "category": "Electronics", "sales": 100}]'
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Importing...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  Import Data
                </>
              )}
            </button>
          </form>
        </div>

        {/* Sample Data Format */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Data Format Guide</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Products Format</h3>
              <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`[
  {
    "product": "Product Name",
    "category": "Category",
    "sales": 100,
    "revenue": 5000,
    "growth": 10.5
  }
]`}
              </pre>
            </div>

            <div>
              <h3 className="font-medium text-gray-800 mb-2">Transactions Format</h3>
              <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`[
  {
    "customer": "Customer Name",
    "amount": 1500,
    "status": "completed",
    "date": "2024-01-15"
  }
]`}
              </pre>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-800 mb-1">💡 Tips</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Ensure your JSON is properly formatted</li>
                <li>• All required fields must be present</li>
                <li>• Numeric values should not be in quotes</li>
                <li>• Dates should be in YYYY-MM-DD format</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Import;
