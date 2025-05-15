"use client";

import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { usePathname } from 'next/navigation'; 


const BackButton = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
  !isHomePage && (
    <div className="fixed top-4 left-4 z-50">
      <button
        onClick={() => {
          if (window.history.length > 0) {
            router.back();
          } else {
            router.push('/');
          }
        }}
        title="Go Back"
        className="group relative flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-gray-600 to-gray-800 p-4 text-white transition-all duration-500 ease-out hover:px-8 hover:scale-105 shadow-lg"
      >
        <span className="transition-all duration-700 ease-out group-hover:opacity-0 group-hover:scale-50">
          <FaArrowLeft size={18} />
        </span>
        <span className="absolute inset-0 flex items-center justify-center whitespace-nowrap transition-all duration-500 ease-out opacity-0 group-hover:opacity-100 group-hover:text-base">
          &nbsp;Back
        </span>
      </button>
    </div>
  )
);

};

export default BackButton;