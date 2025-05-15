import React from 'react';
import Image from 'next/image';
import logo from '@/app/components/images/logo.png'

export default function NavBar() {
  return (
    <div className="w-full h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4">
      <div className="flex items-center space-x-2">
        <Image src={logo} alt="Logo" width={32} height={32} />
        <span className="text-sm font-medium text-gray-800">Freddie</span>
      </div>

      <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 text-sm">
        <span>Need Help?</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 14h.01M16 10h.01M12 18h.01M12 6h.01"
          />
        </svg>
      </button>
    </div>
  );
}
