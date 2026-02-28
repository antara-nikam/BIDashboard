import { useState } from 'react';
import { dataAPI } from '../services/api';

const Export = () => {
  const [exportType, setExportType] = useState('full');
  const [format, setFormat] = useState('json');
  const [loading, setLoading] = useState(false);
  const [exportedData, setExportedData] = useState(null);

  const exportTypes = [
    { value: 'full', label: 'Full Dashboard', description: 'Export all data including KPIs, sales, products, and transactions' },
    { value: 'kpis', label: 'KPIs Only', description: 'Export only key performance indicators' },
    { value: 'sales', label: 'Sales Data', description: 'Export sales trends and metrics' },
    { value: 'revenue', label: 'Revenue Data', description: 'Export revenue distribution and breakdown' },
    { value: 'products', label: 'Products', description: 'Export product performance data' },
    { value: 'transactions', label: 'Transactions', description: 'Export transaction history' }
  ];

  const handleExport = async () => {
    setLoading(true);
    try {
      const response = await dataAPI.exportData(format, exportType);
      setExportedData(response.data.data);
    } catch (err) {
      console.error('Export failed', err);
    } finally {
      setLoading(false);
    }
  };

  const downloadJSON = () => {
    if (!exportedData) return;
    
    const blob = new Blob([JSON.stringify(exportedData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bidashboard-${exportType}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Export Reports</h1>
        <p className="text-gray-500 mt-1">Export your data in various formats</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Export Options */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Export Options</h2>
          
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Data to Export
              </label>
              <div className="space-y-2">
                {exportTypes.map((type) => (
                  <label
                    key={type.value}
                    className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                      exportType === type.value
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="exportType"
                      value={type.value}
                      checked={exportType === type.value}
                      onChange={(e) => setExportType(e.target.value)}
                      className="mt-1 text-primary-600 focus:ring-primary-500"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{type.label}</p>
                      <p className="text-sm text-gray-500">{type.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Export Format
              </label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="input-field"
              >
                <option value="json">JSON</option>
                <option value="csv">CSV (Coming Soon)</option>
                <option value="excel">Excel (Coming Soon)</option>
              </select>
            </div>

            <button
              onClick={handleExport}
              disabled={loading || format !== 'json'}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Generating Export...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Generate Export
                </>
              )}
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Export Preview</h2>
            {exportedData && (
              <button
                onClick={downloadJSON}
                className="btn-primary flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download
              </button>
            )}
          </div>

          {exportedData ? (
            <div className="bg-gray-800 rounded-lg p-4 overflow-auto max-h-96">
              <pre className="text-green-400 text-sm font-mono">
                {JSON.stringify(exportedData, null, 2)}
              </pre>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-400">
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p>Select export options and click Generate Export</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Export;
