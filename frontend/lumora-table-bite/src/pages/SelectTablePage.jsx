import React from 'react'
import welcomeImage from '../assets/selecttable.jpg'
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

const SelectTablePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any user session data if needed
    // Navigate back to welcome page
    navigate('/welcome');
  };

  const handleTableSelect = (tableNumber) => {
    // Handle table selection - can be extended to navigate to menu or store selection
    console.log(`Selected table ${tableNumber}`);
  };

  const tables = Array.from({ length: 8 }, (_, i) => i + 1);

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
          {tables.map((tableNum) => (
            <button
              key={tableNum}
              onClick={() => handleTableSelect(tableNum)}
              className="w-[180px] h-[180px] rounded-full bg-[#D4AF37]/80 hover:bg-[#D4AF37] 
                       transition-all duration-200 flex items-center justify-center
                       text-white text-2xl font-semibold shadow-lg
                       backdrop-blur-xs border-2 border-white/20"
            >
              Table {tableNum}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SelectTablePage