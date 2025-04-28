import React from 'react';

const PlateCountModal = ({ open, onClose, plates, setPlates, onSubmit }) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/10 backdrop-blur-md flex justify-center items-center z-40"
      id="wrapper"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-md mx-4 bg-white rounded-2xl max-h-[90vh] flex flex-col items-center p-8">
        <div className="mb-4 text-lg font-medium">How many plates do you need?</div>
        <input
          type="number"
          className="mb-6 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] w-full"
          value={plates}
          onChange={e => setPlates(e.target.value)}
          min={1}
          placeholder="Enter number of plates"
        />
        <button
          className="bg-[#4B2E19] text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-[#3a2414] transition"
          onClick={onSubmit}
        >
          Go to Menu
        </button>
      </div>
    </div>
  );
};

export default PlateCountModal; 