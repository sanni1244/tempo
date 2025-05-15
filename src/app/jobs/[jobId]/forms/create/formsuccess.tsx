// components/FormSuccessModal.js
import Image from 'next/image';
import React from 'react';

interface FormSuccessModalProps {
    onClose: () => void;
}

const FormSuccessModal: React.FC<FormSuccessModalProps> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50">
  <div className="bg-white rounded-md shadow-xl w-sm max-w-3xl mx-auto overflow-hidden">
    <div className="relative w-full h-40">
      <Image
        src={'/formcreate_908.png'}
        alt='Job created'
        layout="fill"
        objectFit="cover"
        priority
      />
    </div>
    <div className='p-6'>
      <h2 className="text-sm font-semibold text-left mt-4">Form Created Successfully</h2>
      <p className="text-xs text-gray-500 text-left mt-2">
        Your form has been created successfully and you can include the
        form in any email you want to send to applicants.
      </p>
      <div className="flex justify-center mt-6">
        <button
          onClick={onClose}
          className="bg-gray-800 hover:bg-gray-500 w-full text-white text-sm font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Got it
        </button>
      </div>
    </div>
  </div>
</div>

    );
};

export default FormSuccessModal;