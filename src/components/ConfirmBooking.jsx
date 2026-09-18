import React from 'react';

function ConfirmBooking ({message,onClose}) {
	return (   
    <div className="fixed inset-0 z-3 flex items-center justify-center bg-black/60">
      <div className="bg-white rounded-2xl p-8 max-w-md w-[90%] text-center shadow-xl">
        <p className="text-lg font-semibold text-slate-800 mb-6">{message}</p>
        <button
          onClick={onClose}
          className="bg-amber-500 text-white font-bold px-8 py-2 rounded-lg hover:bg-amber-600"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default ConfirmBooking;
