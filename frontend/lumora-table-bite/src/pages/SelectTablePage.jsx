import React, { useState, useEffect } from 'react'
import welcomeImage from '../assets/selecttable.jpg'
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import tableService from '../services/tableService';
import PlateCountModal from '../components/PlateCountModal';

const SelectTablePage = () => {
  const navigate = useNavigate();
  const [tables, setTables] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [plates, setPlates] = useState('');

  useEffect(() => {
    const fetchTables = async () => {
      try {
        setIsLoading(true);
        const tablesData = await tableService.getAllTables();
        setTables(tablesData);
        setError(null);
      } catch (err) {
        console.error('Error fetching tables:', err);
        setError('Failed to load tables. Please try again later.');
        setTables([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTables();
  }, []);

  const handleLogout = () => {
    // Clear any user session data if needed
    // Navigate back to welcome page
    navigate('/welcome');
  };

  const handleTableSelect = (table) => {
    setSelectedTable(table);
    setShowModal(true);
  };

  if (isLoading) {
    return (
      <div className="relative w-screen h-screen overflow-hidden m-0 p-0">
        <img 
          src={welcomeImage} 
          alt="Welcome to Lumora Table Bite"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 right-0 p-2">
          <Header name={"Log out"} onclick={handleLogout}/>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-2xl text-white bg-black/50 px-8 py-4 rounded-lg backdrop-blur-sm">
            Loading tables...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative w-screen h-screen overflow-hidden m-0 p-0">
        <img 
          src={welcomeImage} 
          alt="Welcome to Lumora Table Bite"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 right-0 p-2">
          <Header name={"Log out"} onclick={handleLogout}/>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-2xl text-white bg-black/50 px-8 py-4 rounded-lg backdrop-blur-sm">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden m-0 p-0">
      <img 
        src={welcomeImage} 
        alt="Welcome to Lumora Table Bite"
        className="w-full h-full object-cover"
      />
      <div className="absolute top-0 left-0 right-0 p-2">
        <Header name={"Log out"} onclick={handleLogout}/>
      </div>
      
      {/* Table Selection Container */}
      <div className="absolute inset-0 flex flex-col items-center pt-32">
        <div className="w-full max-w-screen">
          <h1 className="text-4xl font-bold text-black mb-12 bg-gray-50/50 py-7 px-12 backdrop-blur-xs">Select a Table</h1>
        </div>
      
        <div className="flex-1 w-full max-w-screen grid grid-cols-4 gap-x-8 gap-y-12 place-items-center">
          {tables.map((table) => (
            <button
              key={table.id}
              onClick={() => handleTableSelect(table)}
              className="w-[180px] h-[180px] rounded-full bg-[#D4AF37]/80 hover:bg-[#D4AF37] 
                       transition-all duration-200 flex items-center justify-center
                       text-white text-2xl font-semibold shadow-lg backdrop-blur-xs border-2 border-white/20"
            >
              {table.name || `Table ${table.number}`}
            </button>
          ))}
        </div>
        
      </div>
      <PlateCountModal
        open={showModal}
        onClose={() => setShowModal(false)}
        plates={plates}
        setPlates={setPlates}
        onSubmit={() => {
          setShowModal(false);
          // handle next step here (e.g., navigate to menu)
        }}
      />
    </div>
  )
}

export default SelectTablePage