import React from 'react';

const Error = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-red-600 font-semibold text-xl">Error</h2>
          <button className="text-gray-500 hover:text-gray-700 font-semibold" onClick={() => alert("Close clicked!")}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="text-gray-700 text-sm mb-4">Something went wrong. Please try again later.</p>
        <button className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700">
          Try Again
        </button>
      </div>
    </div>
  );
};

export default Error;
