import React, { useState } from 'react'
import welcomeImage from '../assets/kitchen.jpg'
import Header from '../components/Header';

const KitchenInterface = () => {
  // Initial table data
  const initialTables = [
    { id: 1, order: 'ORD-001', items: [{ name: 'Burger', quantity: 2 }, { name: 'Fries', quantity: 1 }] },
    { id: 2, order: 'ORD-002', items: [{ name: 'Pizza', quantity: 1 }] },
    { id: 3, order: 'ORD-003', items: [{ name: 'Salad', quantity: 1 }, { name: 'Soup', quantity: 2 }] },
    { id: 4, order: 'ORD-004', items: [{ name: 'Pasta', quantity: 1 }] },
  ];

  // State to manage active tables
  const [activeTables, setActiveTables] = useState(initialTables);

  // Handler for Ready button click
  const handleReadyClick = (tableId) => {
    setActiveTables(prevTables => prevTables.filter(table => table.id !== tableId));
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden m-0 p-0">
      <img 
        src={welcomeImage} 
        alt="Welcome to Lumora Table Bite"
        className="w-full h-full object-cover"
      />

      <div className="absolute top-0 left-0 right-0 p-2">
        <Header name={"Log out"}/>
      </div>
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {activeTables.map((table) => (
              <div key={table.id} className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden flex flex-col h-full">
                {/* Header with Table Number */}
                <div className="bg-yellow-500 text-black text-center py-3">
                  <h2 className="text-xl font-bold">Table {table.id}</h2>
                </div>

                {/* Content wrapper */}
                <div className="flex-grow flex flex-col">
                  {/* Order Number */}
                  <div className="px-4 py-3">
                    <h3 className="text-xl font-semibold text-black">{table.order}</h3>
                  </div>

                  {/* Order Items */}
                  <div className="px-4 py-2 space-y-2 flex-grow">
                    {table.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-lg text-black">
                        <span>{item.name}</span>
                        <span>x{item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  {/* Ready Button */}
                  <div className="p-4">
                    <button 
                      onClick={() => handleReadyClick(table.id)}
                      className="w-full bg-amber-600 text-white py-2 px-4 rounded-lg hover:bg-amber-700 transition-colors font-semibold"
                    >
                      Ready
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default KitchenInterface