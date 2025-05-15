// components/CreateButton.tsx
import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

interface CreateButtonProps {
  onClick: () => void;
}

const CreateButton: React.FC<CreateButtonProps> = ({ onClick }) => {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={onClick}
        className="group relative flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-4 text-white transition-all duration-500 ease-out hover:px-8 hover:scale-105 shadow-lg"
      >
        <span className="transition-all duration-700 ease-out group-hover:opacity-0 group-hover:scale-50">
          <AiOutlinePlus size={24} />
        </span>
        <span className="absolute inset-0 flex items-center justify-center whitespace-nowrap transition-all duration-500 ease-out opacity-0 group-hover:opacity-100 group-hover:text-base">
          &nbsp;Create
        </span>
      </button>
    </div>
  );
};

export default CreateButton;
