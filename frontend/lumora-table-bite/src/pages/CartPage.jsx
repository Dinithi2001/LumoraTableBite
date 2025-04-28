import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import menuBg from '../assets/viewmenu.jpg'
import { FaShoppingCart } from 'react-icons/fa'

const handleLogout = () => {
    navigate('/');
  };

const CUISINE_MAP = {
  SRI_LANKAN: 'Sri Lankan',
  CHINESE: 'Chinese',
  INDIAN: 'Indian',
};

const CartPage = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [selectedCuisine, setSelectedCuisine] = useState('SRI_LANKAN');

  useEffect(() => {
    fetch('http://localhost:8095/api/v1/foods/all')
      .then(res => res.json())
      .then(data => setFoodItems(data.data))
      .catch(err => console.error('Failed to fetch foods:', err));
  }, []);

  // Get unique subcategories for the selected cuisine
  const subcategories = [
    ...new Set(
      foodItems
        .filter(item => item.cuisine === selectedCuisine)
        .map(item => item.category.name)
    )
  ];

  return (
    <div className="relative w-screen min-h-screen m-0 p-0">
            <img 
            src={menuBg} 
            alt="Welcome to Lumora Table Bite"
            className="w-full h-full object-cover"
            />
            <div className="absolute top-0 left-0 right-0 p-2">
            <Header name={"Log out"} onclick={handleLogout}/>
            </div>
            <div className="absolute inset-0 flex flex-col items-center pt-32">
                <div className="w-full max-w-screen">
                    <div className="bg-gray-50/50 py-7 px-12 backdrop-blur-xs">
                        <div className="flex flex-row justify-between items-center w-full">
                            <h1 className="text-4xl font-bold text-black">Menu</h1>
                            {Object.entries(CUISINE_MAP).map(([key, label]) => (
                              <button
                                key={key}
                                onClick={() => setSelectedCuisine(key)}
                                className={`text-2xl font-semibold hover:text-yellow-700 transition-colors ${selectedCuisine === key ? 'underline' : ''}`}
                              >
                                {label}
                              </button>
                            ))}
                            <FaShoppingCart className="text-3xl text-black ml-6 cursor-pointer" />
                        </div>
                        {/* Foods grouped by subcategory */}
                        <div className="mt-10">
                          <h2 className="text-3xl font-bold mb-4">{CUISINE_MAP[selectedCuisine]}</h2>
                          {subcategories.map(subcat => {
                            const foods = foodItems.filter(
                              f => f.cuisine === selectedCuisine && f.category.name === subcat
                            );
                            if (foods.length === 0) return null;
                            return (
                              <div key={subcat} className="mb-8">
                                <h3 className="text-2xl font-semibold mb-2">{subcat}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                  {foods.map(food => (
                                    <div key={food.id} className="bg-[#D4AF37] rounded-xl shadow-lg flex flex-col md:flex-row items-center max-w-md w-full mx-auto mb-6 p-4 min-w-0">
                                      {/* Image on the left */}
                                      {food.images && food.images.length > 0 ? (
                                        <img
                                          src={`http://localhost:8095${food.images[0].downloadUrl}`}
                                          alt={food.name}
                                          className="w-28 h-28 object-cover rounded-xl md:rounded-l-xl md:rounded-r-none mb-4 md:mb-0 md:mr-4"
                                        />
                                      ) : (
                                        <img
                                          src="https://via.placeholder.com/150"
                                          alt="No image"
                                          className="w-28 h-28 object-cover rounded-xl md:rounded-l-xl md:rounded-r-none mb-4 md:mb-0 md:mr-4"
                                        />
                                      )}
                                      {/* Details on the right */}
                                      <div className="flex flex-col justify-between h-full flex-1 w-full">
                                        <div>
                                          <h4 className="font-bold text-xl mb-1 break-words">{food.name}</h4>
                                          <p className="text-base mb-1 break-all whitespace-pre-line max-w-xs">{food.description}</p>
                                          <p className="font-semibold mb-3">Rs. {food.price}</p>
                                        </div>
                                        <button className="bg-black text-white px-6 py-2 rounded w-full">Add to order</button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default CartPage