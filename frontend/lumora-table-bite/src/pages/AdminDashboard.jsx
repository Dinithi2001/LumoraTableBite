import React, { useState } from 'react';
import Header from '../components/Header';
import table from "../assets/table.jpg"
import staff from "../assets/staff.jpg"	
import { ArrowRight, Delete, Edit, View } from 'lucide-react';
import AddCard from '../components/AddCard';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {

  const navigate = useNavigate();

    return (
        <div className=' min-h-screen bg-gray-100'>
            <Header name={"Log Out"}/>
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
                description={"Add Tables"}/>
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
                <hr/>
            </div>
            <section>
            <table className='shadow  w-full mt-5'>
              <thead className='bg-[#EBEBEB] h-12'>
                <tr className='text-center'>
                  <th>Order_id</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th colSpan={3}>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className='text-center'>
                  <td>1</td>
                  <td>John Doe</td>
                  <td>2025/03/24</td>
                  <td>4500</td>
                  <td>completed</td>
                  <td>
                    <button className=' text-green-500 p-2 rounded-lg w-16 flex justify-center items-center'><Edit/></button>
                  </td>
                  <td>
                    <button className=' text-blue-500 p-2 rounded-lg w-16 flex justify-center items-center'><View/></button>
                  </td>
                  <td>
                    <button className='text-red-500 p-2 rounded-lg w-16 flex justify-center items-center'><Delete/></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
             
      
      
        </div>
    );  
    };

export default AdminDashboard;