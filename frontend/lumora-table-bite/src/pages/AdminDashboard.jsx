import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import table from "../assets/table.jpg"
import staff from "../assets/staff.jpg"	
import { ArrowRight } from 'lucide-react';
import AddCard from '../components/AddCard';

const AdminDashboard = () => {

    return (
        <div className=' min-h-screen bg-[#F5E6C4] p-3'>
            <Header/>
            <div className='grid grid-cols-3 gap-5 p-10 text-4xl'>
            <AddCard 
                image="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhY2h8ZW58MHx8MHx8&w=1000&q=80"
                title={"Menu"}
                description={"Add Food Items"}/>
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
                <tr>
                  <td>1</td>
                  <td>John Doe</td>
                  <td>2025/03/24</td>
                  <td>4500</td>
                  <td>completed</td>
                  <td>
                    <button className='bg-[#4B2E1E] text-white p-2 rounded-lg'>Edit</button>
                  </td>
                  <td>
                    <button className='bg-[#4B2E1E] text-white p-2 rounded-lg'>Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
             
      
      
        </div>
    );  
    };

export default AdminDashboard;