import { ArrowRight } from 'lucide-react'
import React from 'react'

const AddCard = ({onClick,image,title,description}) => {
  return (
    <button
      onClick={onClick}
      className="group relative overflow-hidden rounded-3xl w-full max-w-2xl transition-transform hover:scale-[1.02] active:scale-[0.98] h-32"
    >
      <div className="aspect-[2/1] w-full">
        <img
          src={image}
          alt="Elegant restaurant table setting"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20" />
      </div>
      
      <div className="absolute inset-0 flex items-center justify-between p-8">
        <div className="text-left">
          <h2 className="text-4xl font-bold text-white mb-2">{title}</h2>
          <p className="text-gray-200 text-lg">{description}</p>
        </div>
        
        <div className="bg-white/10 p-3 rounded-full backdrop-blur-sm border border-white/20 group-hover:bg-white/20 transition-colors">
          <ArrowRight className="w-6 h-6 text-white" />
        </div>
      </div>
    </button>
  )
}

export default AddCard