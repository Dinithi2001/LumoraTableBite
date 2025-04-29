import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import logo from '../assets/logo.png';
import Home1 from '../assets/home1.jpg';
import Plate1 from '../assets/plate1.jpg';

const specials = [
  {
    name: 'Chicken Curry',
    desc: 'Spicy and flavorful chicken curry with aromatic spices.',
    price: '$12.99',
    img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Veggie Delight',
    desc: 'A healthy mix of fresh vegetables and herbs.',
    price: '$9.99',
    img: 'https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Pasta Alfredo',
    desc: 'Creamy Alfredo sauce over perfectly cooked pasta.',
    price: '$11.49',
    img: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80',
  },
];

const testimonials = [
  {
    name: 'Jane Doe',
    text: 'The food was amazing and the service was top-notch! Highly recommend this place.',
    img: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'John Smith',
    text: 'A wonderful dining experience. The ambiance and dishes were perfect.',
    img: 'https://randomuser.me/api/portraits/men/46.jpg',
  },
];

const Home = () => {
  return (
    <>
      <div className="bg-[#D4AF37] min-h-screen font-sans px-12">
        {/* Header/Navbar */}
        <div className='bg-[#D4AF37] h-20 rounded-lg flex items-center'>
          {/* Left: Logo and Name */}
          <div className="flex items-center gap-4">
            <img
              src={logo}
              className='w-15 h-15'
              alt="Logo"  
            />
            <span className='font-bold text-3xl inspiration-regular'>
              Lumora TableBite
            </span>
          </div>
          {/* Center: Navigation */}
          <div className="flex-1 flex justify-center items-center gap-10">
            <span className='text-[#4B2E1E] font-medium cursor-pointer'>Menu</span>
            <span className='text-[#4B2E1E] font-medium cursor-pointer'>About</span>
            <span className='text-[#4B2E1E] font-medium cursor-pointer'>Contact</span>
          </div>
          {/* Right: Login */}
          <Link to="/login" className='flex items-center gap-5 bg-[#4B2E1E] rounded-lg px-4 py-2 text-white font-medium shadow'>
            Log in
          </Link>
        </div>

        {/* Hero Section */}
        <section className="relative flex flex-col md:flex-row items-center justify-between px-8 py-12 bg-[#D4AF37]">
          <div className="max-w-xl mb-8 md:mb-0">
            <h1 className="text-4xl md:text-8xl font-bold text-[#4B2E1E] mb-4">Seamless Dining,Effortless Management</h1>
            <p className="text-lg text-[#4B2E1E] mb-6">Experience the best of culinary delights and restaurant management with DineCraft.</p>
            <div className="flex space-x-4">
              <Link to="/menu" className="bg-[#4B2E1E] text-white px-6 py-2 rounded-lg shadow hover:bg-yellow-700 transition">Explore Menu</Link>
              <Link to="/reserve" className="bg-white text-[#4B2E1E] border border-[#4B2E1E] px-6 py-2 rounded-lg shadow hover:bg-yellow-700 hover:text-white transition">Reserve Table</Link>
            </div>
          </div>
          <div className="absolute flex-shrink-0 ml-190 mt-32">
            <img src={Plate1} alt="Restaurant" className="rounded-full shadow-lg w-[300px] h-[300px] object-cover" />
          </div>
          <div className="flex-shrink-0">
            <img src={Home1} alt="Restaurant" className="rounded-tr-4xl rounded-bl-4xl rounded-br-[80px] rounded-tl-[80px] shadow-lg w-[400px] h-[500px] object-cover" />
          </div>
          
        </section>

        {/* Special Dishes */}
        <section className="py-16 px-8 bg-[#D4AF37]">
          <h2 className="text-3xl font-bold text-center text-[#4B2E1E] mb-12">Our Special Dishes</h2>
          <div className="flex flex-col md:flex-row justify-center gap-8">
            {specials.map((dish, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg p-6 w-full md:w-80 flex flex-col items-center">
                <img src={dish.img} alt={dish.name} className="w-32 h-32 object-cover rounded-full mb-4" />
                <h3 className="text-xl font-semibold text-[#4B2E1E] mb-2">{dish.name}</h3>
                <p className="text-gray-600 text-center mb-2">{dish.desc}</p>
                <span className="text-[#E2B857] font-bold text-lg">{dish.price}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Welcome Section */}
        <section className="flex flex-col md:flex-row items-center justify-between px-8 py-16 bg-[#D4AF37]">
          <div className="flex-shrink-0 mb-8 md:mb-0">
            <img src={Home1} alt="Special Dish" className="rounded-3xl shadow-lg w-96 h-72 object-cover" />
          </div>
          <div className="max-w-xl md:ml-12">
            <h2 className="text-3xl font-bold text-[#4B2E1E] mb-4">Welcome to Our Restaurant</h2>
            <p className="text-lg text-[#4B2E1E] mb-6">Enjoy a unique dining experience with our exquisite dishes and top-notch service. We are dedicated to making your visit memorable.</p>
            <Link to="/about" className="bg-[#4B2E1E] text-white px-6 py-2 rounded-lg shadow hover:bg-yellow-700 transition">Learn More</Link>
          </div>
        </section>

        {/* Chef Section */}
        <section className="flex flex-col md:flex-row items-center justify-between px-8 py-16 bg-[#D4AF37]">
          <div className="max-w-xl mb-8 md:mb-0">
            <h2 className="text-3xl font-bold text-[#4B2E1E] mb-4">Our Expert Chef</h2>
            <p className="text-lg text-[#4B2E1E] mb-6">Meet Chef Antonio, the creative mind behind our delicious menu. With years of experience and a passion for culinary excellence, Chef Antonio brings flavors to life.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-[#4B2E1E] hover:text-yellow-700"><FaFacebook size={24} /></a>
              <a href="#" className="text-[#4B2E1E] hover:text-yellow-700"><FaInstagram size={24} /></a>
            </div>
          </div>
          <div className="flex-shrink-0">
            <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80" alt="Chef" className="rounded-full shadow-lg w-64 h-64 object-cover border-8 border-white" />
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 px-8 bg-[#D4AF37]">
          <h2 className="text-3xl font-bold text-center text-[#4B2E1E] mb-12">Our Happy Customers</h2>
          <div className="flex flex-col md:flex-row justify-center gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg p-8 w-full md:w-96 flex flex-col items-center">
                <img src={t.img} alt={t.name} className="w-20 h-20 object-cover rounded-full mb-4 border-4 border-[#E2B857]" />
                <p className="text-gray-700 text-center mb-4">"{t.text}"</p>
                <span className="font-semibold text-[#4B2E1E]">- {t.name}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
      {/* Footer */}
      <footer className="bg-[#4B2E1E] text-white py-10 px-8 mt-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center space-x-2 mb-2">
              <img src="/logo192.png" alt="Logo" className="h-8 w-8 rounded-full" />
              <span className="font-bold text-xl">DineCraft</span>
            </div>
            <p className="text-gray-300">123 Food Street, Flavor Town, USA</p>
            <p className="text-gray-300">Email: info@dinecraft.com | Phone: (123) 456-7890</p>
          </div>
          <div className="flex space-x-8 mb-6 md:mb-0">
            <a href="#" className="hover:text-yellow-400">Privacy Policy</a>
            <a href="#" className="hover:text-yellow-400">Terms of Service</a>
            <a href="#" className="hover:text-yellow-400">Support</a>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-yellow-400"><FaFacebook size={24} /></a>
            <a href="#" className="hover:text-yellow-400"><FaInstagram size={24} /></a>
            <a href="#" className="hover:text-yellow-400"><FaTwitter size={24} /></a>
          </div>
        </div>
        <div className="text-center text-gray-400 mt-8">&copy; {new Date().getFullYear()} DineCraft. All rights reserved.</div>
      </footer>
    </>
  );
};

export default Home; 