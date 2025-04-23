import React from 'react'
import welcomeImage from '../assets/kitchen.jpg'
import Header from '../components/Header';


const KitchenInterface = () => {
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
        </div>
  )
}

export default KitchenInterface