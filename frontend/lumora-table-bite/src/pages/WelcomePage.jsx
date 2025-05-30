import React, { useState, useEffect } from 'react';
import welcomeImage from '../assets/welcome.jpg';
import welcomeImagePlaceholder from '../assets/welcome.jpg'; // Add a low-res version
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { customerService } from '../services/customerService';
import { toast } from 'react-hot-toast';

const WelcomePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: ''
  });
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();

  // Preload the high-quality image
  useEffect(() => {
    const img = new Image();
    img.src = welcomeImage;
    img.onload = () => setImageLoaded(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const customer = await customerService.addCustomer(formData);
      toast.success('Customer details saved successfully!');
      navigate('/select-table');
    } catch (error) {
      console.error('Error saving customer:', error);
      toast.error(error.response?.data?.message || 'Failed to save customer details');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden m-0 p-0">
      {/* Background image with progressive loading */}
      <div className="w-full h-full">
        {/* Low-res placeholder that loads first */}
        <img 
          src={welcomeImagePlaceholder} 
          alt="Welcome background"
          className={`w-full h-full object-cover ${imageLoaded ? 'hidden' : 'block'}`}
          loading="eager"
        />
        {/* High-res image that loads after */}
        <img 
          src={welcomeImage} 
          alt="Welcome background"
          className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          loading="lazy"
          style={{ display: imageLoaded ? 'block' : 'none' }}
        />
      </div>
      
      <div className="absolute top-0 left-0 right-0 p-2">
        <Header name={"Log out"} handleLogout={() => navigate('/')}/>
      </div>
      
      {/* Welcome Form */}
      <div className="absolute inset-0 flex items-center justify-center opacity-95">
        <div className="bg-[#D4AF37]/90 rounded-3xl p-8 max-w-sm w-full mx-4 backdrop-blur-sm">
          <h1 className="text-5xl mb-4 text-center font-extrabold inspiration-regular">Welcome</h1>
          <p className="text-center mb-6 text-[#4B2E1E]">
            Enter your details to get started with your order
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[#4B2E1E] mb-2">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-[#4B2E1E]/20 focus:outline-none focus:border-[#4B2E1E] bg-white"
                required
              />
            </div>
            
            <div>
              <label className="block text-[#4B2E1E] mb-2">Phone Number:</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-[#4B2E1E]/20 focus:outline-none focus:border-[#4B2E1E] bg-white"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-[#4B2E1E] text-white py-3 rounded-lg mt-6 hover:bg-[#4B2E1E]/90 transition-colors"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;