"use client"

import { useState } from 'react';
// import ManagersClient from '@/app/client/manager/fetchmanager';
import ManagerDisplay from '@/app/client/manager/viewmanager'; 
import CreateButton from '@/app/components/createbutton';
import CreateModal from '@/app/components/createmodal';
import ManagerForm from '@/app/client/manager/createform';
import { Managerdetails } from '@/app/types/api';

const ManagersPage = () => {
  const [selectedManager, setSelectedManager] = useState<Managerdetails | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleSelect = (manager: Managerdetails | null) => {
    setSelectedManager(manager);
  };

  const handleDelete = (id: string) => {
    console.log(`Manager with id ${id} will be deleted`);
    setSelectedManager(null);
  };

  return (
    <div className="max-w-4/6 mx-auto mt-10">
      <h1 className="text-3xl font-extrabold text-center mb-6 text-gray-800 bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
        Manager Selection
      </h1>
      {/* <ManagersClient onSelect={handleSelect} /> */}
      <ManagerDisplay selected={selectedManager} onDelete={handleDelete} />
      <CreateButton onClick={() => setShowModal(true)} />
      {showModal && (
        <CreateModal onClose={() => setShowModal(false)}>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Create Manager</h3>
          <ManagerForm />
        </CreateModal>
      )}
    </div>
  );
};

export default ManagersPage;
