import React, { useState } from 'react';
import Header from '../components/Header';
import table from "../assets/table.jpg"
import staff from "../assets/staff.jpg"	
import { ArrowRight, Delete, Edit, Edit2, Trash2, View } from 'lucide-react';
import AddCard from '../components/AddCard';
import { useNavigate } from 'react-router-dom';

const initialMenuItems = [
  {
    id: '67869052',
    name: 'Nimal',
    date: '2025/03/24',
    amount: 'LKR.2500',
    status: 'completed',
  },
  {
    id: '68970163',
    name: 'Kamal',
    date: '2025/03/24',
    amount: 'LKR.2500',
    status: 'pending',
  },
  {
    id: '66758941',
    name: 'Grill Sandwich',
    date: '2025/03/24',
    amount: 'LKR.2500',
    status: 'pending',
  }
];

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [menuItems] = useState(initialMenuItems);
  const navigate = useNavigate();

  const filteredItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.date.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditItem = (id) => {
    // Edit functionality here
    console.log('Edit item:', id);
  };

  const handleDeleteItem = (id) => {
    // Delete functionality here
    console.log('Delete item:', id);
  };

  return (
    <div className='min-h-screen bg-[#FFFBF0] p-2'>
      <Header name={"Log Out"} handleLogout={() => navigate('/')}/>
      <div className='grid grid-cols-3 gap-5 p-10 text-4xl'>
        <AddCard 
          image="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhY2h8ZW58MHx8MHx8&w=1000&q=80"
          title={"Menu"}
          description={"Add Food Items"}
          onClick={()=>{
            navigate("/menu");
          }}
        />
        <AddCard
          image={table}
          title={"Table"}
          description={"Add Tables"}
          onClick={() => {
            navigate("/table");
          }}/>
        <AddCard
          image={staff}
          title={"Staff"}
          description={"Add Members"}/>
      </div>
      <div className='flex items-center justify-center'>
        <span className='font-bold text-7xl'>Total Revenue LKR.25 000</span>
      </div>
      <div>
        <span className='font-medium text-4xl'>Orders</span>
      </div>
     
      {filteredItems.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500 text-lg">No items found matching your search.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Order Id</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${
                          item.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-4">
                        <button
                          onClick={() => handleEditItem(item.id)}
                          className="text-green-600 hover:text-green-800 transition-colors duration-200"
                          aria-label="Edit item"
                        >
                          <Edit2 size={20} />
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="text-red-600 hover:text-red-800 transition-colors duration-200"
                          aria-label="Delete item"
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
  );
};

export default AdminDashboard;