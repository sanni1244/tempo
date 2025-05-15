import React from 'react';

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="flex items-center space-x-2 bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <div className="animate-spin rounded-full border-t-4 border-b-4 border-blue-600 h-12 w-12"></div>
        <p className="text-gray-700 text-lg">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
