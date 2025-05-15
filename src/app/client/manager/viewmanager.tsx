import React from 'react';
import { Managerdetails } from '@/types';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { api } from '@/app/lib/api';

interface ManagerDisplayProps {
  selected: Managerdetails | null;
  onDelete: (id: string) => void;
}

const ManagerDisplay: React.FC<ManagerDisplayProps> = ({ selected, onDelete }) => {
  if (!selected) return null;

  const [showEditModal, setShowEditModal] = React.useState(false);
  const [editableManager, setEditableManager] = React.useState<Managerdetails | null>(null);

  const handleEditClick = () => {
    setEditableManager(selected); 
    setShowEditModal(true);
  };

  const handleSaveChanges = async () => {
    if (!editableManager) return;

    try {
      const response = await api.patch(`/managers/${editableManager.id}`, editableManager);

      if (response.status !== 200) {
        throw new Error('Failed to update manager details');
      }

      setShowEditModal(false);
      alert('Manager details updated successfully');
    } catch (error) {
      console.error(error);
      alert('An error occurred while updating manager details');
    }
  };

  return (
    <motion.div
  className="mt-5 p-6 border border-gray-100 rounded-xl bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-lg hover:shadow-2xl transition-all ease-in-out duration-300"
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.95 }}
  transition={{ duration: 0.3 }}
>
  <div className="text-gray-900 space-y-1">
    <p className="text-3xl font-extrabold text-purple-700 lora-font">{selected.id}</p>
    <p className="text-sm text-blue-600">🏢 Company: {selected.companyName || 'N/A'}</p>
    <p className="text-sm italic text-gray-600">📝 {selected.companyDescription || 'No description provided.'}</p>
    <p className="text-sm text-gray-500">📅 Joined: {new Date(selected.createdAt).toDateString()}</p>
  </div>

  <div className="mt-6 flex items-center gap-4">
    <motion.button
      className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-md shadow-md hover:shadow-lg hover:from-blue-600 hover:to-blue-700 transition-transform transform hover:scale-105 flex items-center gap-2"
      onClick={handleEditClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <FaEdit />
      <span>Edit</span>
    </motion.button>

    {showEditModal && editableManager && (
      <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-xl shadow-2xl w-[90%] max-w-lg space-y-5">
          <h2 className="text-2xl font-bold text-gray-800">Edit Manager</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                value={editableManager.fullName}
                onChange={(e) =>
                  setEditableManager({ ...editableManager, fullName: e.target.value })
                }
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Company Name</label>
              <input
                type="text"
                value={editableManager.companyName}
                onChange={(e) =>
                  setEditableManager({ ...editableManager, companyName: e.target.value })
                }
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={editableManager.companyDescription}
                onChange={(e) =>
                  setEditableManager({ ...editableManager, companyDescription: e.target.value })
                }
                rows={3}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </form>
          <div className="flex justify-end gap-4 pt-2">
            <button
              className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition-all"
              onClick={() => setShowEditModal(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all"
              onClick={handleSaveChanges}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    )}

    <motion.button
      className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-md shadow-md hover:shadow-lg hover:from-red-600 hover:to-red-700 transition-transform transform hover:scale-105 flex items-center gap-2"
      onClick={async () => {
        try {
          const response = await api.delete(`/managers/${selected.id}`);
          if (response.status === 200) {
            alert('Manager deleted successfully');
            onDelete(selected.id);
          } else {
            throw new Error('Failed to delete manager');
          }
        } catch (error) {
          console.error(error);
          alert('An error occurred while deleting the manager');
        }
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <FaTrash />
      <span>Delete</span>
    </motion.button>
  </div>
</motion.div>

  );
};

export default ManagerDisplay;
