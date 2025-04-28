import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, PlusCircle, Edit2, Trash2 } from 'lucide-react';
import Header from '../components/Header';
import AddTableModal from './AddTableModal';
import { toast } from 'react-hot-toast';
import tableService from '../services/tableService';

const AddTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tables, setTables] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddTableModalOpen, setAddTableModalOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const navigate = useNavigate();

  const testConnection = async () => {
    try {
      setIsTestingConnection(true);
      console.log('Testing connection to:', 'http://localhost:8095/api/v1/tables/getall');
      
      const response = await fetch('http://localhost:8095/api/v1/tables/getall', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Connection test response status:', response.status);
      console.log('Connection test response headers:', response.headers);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('Connection test failed:', {
          status: response.status,
          statusText: response.statusText,
          data: errorData
        });
        throw new Error(`Server returned ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Connection test successful, data:', data);
      return true;
    } catch (error) {
      console.error('Connection test error:', error);
      return false;
    } finally {
      setIsTestingConnection(false);
    }
  };

  const fetchTables = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // First test the connection
      console.log('Testing connection before fetching tables...');
      const isConnected = await testConnection();
      if (!isConnected) {
        throw new Error('Could not connect to the server. Please check if the server is running.');
      }

      console.log('Connection successful, fetching tables...');
      const tables = await tableService.getAllTables();
      console.log('Fetched tables:', tables);
      
      if (!tables || !Array.isArray(tables)) {
        console.error('Invalid tables data:', tables);
        throw new Error('Invalid response format from server');
      }

      // Log the structure of the first table
      if (tables.length > 0) {
        console.log('First table data:', tables[0]);
        console.log('Available fields:', Object.keys(tables[0]));
      }
      
      // Map the table data to ensure we have the required fields
      const mappedTables = tables.map(table => ({
        id: table.id || table.tableId || 'N/A',
        number: table.number || table.name || 'N/A',
        status: table.status === true ? 'Reserved' : 'Available',
        // Add any other fields you need
      }));
      
      console.log('Mapped tables:', mappedTables);
      setTables(mappedTables);
    } catch (err) {
      console.error('Error in fetchTables:', err);
      let errorMessage = err.message || 'Failed to load tables. Please try again later.';
      setError(errorMessage);
      setTables([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);

  const filteredTables = tables.filter(table => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase().trim();
    return (
      table.number.toLowerCase().includes(searchLower) ||
      table.status.toLowerCase().includes(searchLower)
    );
  });

  const handleAddTable = () => {
    setSelectedTable(null);
    setAddTableModalOpen(true);
  };

  const handleEditTable = (table) => {
    setSelectedTable(table);
    setAddTableModalOpen(true);
  };

  const handleCloseAddTableModal = () => {
    setAddTableModalOpen(false);
    setSelectedTable(null);
  };

  const handleSubmitTable = async (tableData) => {
    try {
      console.log('Submitting table data:', tableData);
      
      if (selectedTable) {
        // TODO: Implement update table functionality when backend supports it
        toast.error('Update functionality is not yet available');
      } else {
        console.log('Creating new table with data:', {
          name: tableData.name // Make sure we're sending 'name' not 'number'
        });
        await tableService.addTable({
          name: tableData.name // Changed to use 'name'
        });
        toast.success('Table added successfully');
        // Fetch the latest tables data after adding
        await fetchTables();
      }
      setAddTableModalOpen(false);
    } catch (error) {
      console.error('Error submitting table:', error);
      toast.error(error.response?.data?.message || 'Failed to save table');
    }
  };

  const handleDeleteTable = async (id) => {
    if (window.confirm('Are you sure you want to delete this table?')) {
      try {
        await tableService.deleteTable(id);
        setTables(tables.filter(table => table.id !== id));
        toast.success('Table deleted successfully');
      } catch (error) {
        toast.error('Failed to delete table');
        console.error('Error deleting table:', error);
      }
    }
  };

  if (isLoading || isTestingConnection) {
    return (
      <div className="min-h-screen bg-[#FFFBF0] p-2">
        <Header name={"Home"} onclick={() => navigate('/')} />
        <div className="flex items-center justify-center h-screen">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4B2E1E] mb-4"></div>
            <div className="text-xl">
              {isTestingConnection ? 'Testing connection...' : 'Loading tables...'}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FFFBF0] p-2">
        <Header name={"Home"} onclick={() => navigate('/')} />
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="text-xl text-red-600 mb-4">{error}</div>
          <div className="flex space-x-4">
            <button
              onClick={fetchTables}
              className="px-4 py-2 bg-[#4B2E1E] text-white rounded-lg hover:bg-yellow-700 transition-colors duration-200"
            >
              Retry
            </button>
            <button
              onClick={testConnection}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
            >
              Test Connection
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFBF0] p-2">
      <Header name={"Home"} onclick={() => navigate('/')} />
      
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">Table Management</h1>
          <div className="flex space-x-3 w-full sm:w-auto">
            <button
              onClick={handleAddTable}
              className="flex-1 sm:flex-none bg-[#4B2E1E] text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-yellow-700 transition-all duration-200 shadow-md"
            >
              <PlusCircle size={20} />
              <span>Add Table</span>
            </button>
          </div>
        </div>

        {/* Search Section */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search by table name or status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-12 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>

        {/* Table Section */}
        {filteredTables.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500 text-lg">No tables found matching your search.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Table ID</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Table Name</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredTables.map((table) => (
                    <tr key={table.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{table.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{table.number}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 text-xs font-medium rounded-full ${
                            table.status === 'Available'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {table.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-4">
                          <button
                            onClick={() => handleEditTable(table)}
                            className="text-green-600 hover:text-green-800 transition-colors duration-200"
                            aria-label="Edit table"
                          >
                            <Edit2 size={20} />
                          </button>
                          <button
                            onClick={() => handleDeleteTable(table.id)}
                            className="text-red-600 hover:text-red-800 transition-colors duration-200"
                            aria-label="Delete table"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {isAddTableModalOpen && (
        <AddTableModal
          onClose={handleCloseAddTableModal}
          onSubmit={handleSubmitTable}
          initialData={selectedTable}
          isEdit={!!selectedTable}
          title={selectedTable ? 'Edit Table' : 'Add New Table'}
        />
      )}
    </div>
  );
};

export default AddTable;