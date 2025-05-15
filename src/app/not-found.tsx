import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        <h1 className="text-6xl sm:text-8xl font-extrabold text-white tracking-tight drop-shadow-2xl">
          404
        </h1>
        <p className="text-2xl text-gray-300">
          Page Not Found
        </p>
        <p className="text-gray-400 text-lg sm:text-xl">
          We couldn't find the page you were looking for.
        </p>
        <a
          href="/"
          className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-full border border-white/10 shadow-lg transition-all duration-300 backdrop-blur-md font-semibold text-lg"
        >
          Go Back to Home
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;
