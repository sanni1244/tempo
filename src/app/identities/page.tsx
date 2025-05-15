'use client';

import { useState, useEffect, useCallback } from 'react';
import { FetchManager, FetchIdentities } from '@/app/components/routes';
import { Managerdetails, Identity } from '@/app/types/api';
import { api } from '@/lib/api';
import Create from '@/app/components/createbutton';
import Modal from '@/app/components/modal';

const IdentitiesPage = () => {
  const [selectedManager, setSelectedManager] = useState<Managerdetails | null>(null);
  const [identities, setIdentities] = useState<Identity[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingIdentity, setEditingIdentity] = useState<Identity | null>(null);
  const [modal, setModal] = useState<{ title: string; message: string } | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const manager = await FetchManager();
      setSelectedManager(manager);

      const identityList = await FetchIdentities();
      setIdentities(identityList);
      setError(null);
    } catch (err) {
      setError('Failed to load data.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleUpdateIdentity = (updatedIdentity: Identity) => {
    setIdentities((prev) =>
      prev.map((identity) =>
        identity.id === updatedIdentity.id ? updatedIdentity : identity
      )
    );
    setEditingIdentity(null);
    setModal({ title: 'Success', message: 'Identity updated successfully!' });
  };

  const handleDeleteIdentity = (identityId: string) => {
    if (!selectedManager) return;
    setIdentities((prev) => prev.filter((i) => i.id !== identityId));

    api.delete(`/identities/${identityId}`)
      .then(() => {
        setModal({ title: 'Deleted', message: 'Identity deleted successfully.' });
      })
      .catch((err) => {
        setModal({ title: 'Error', message: 'Failed to delete identity.' });
        console.error('Delete error:', err);
      });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h1 className="text-4xl font-extrabold text-center mb-6 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text">
        Identity Management
      </h1>

      {loading ? (
        <div className="flex justify-center py-10">
          <svg className="animate-spin h-8 w-8 text-indigo-600" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25" />
            <path fill="currentColor" d="M4 12a8 8 0 018-8v8z" opacity="0.75" />
          </svg>
        </div>
      ) : error ? (
        <div className="text-red-600 text-center font-medium">{error}</div>
      ) : selectedManager && (
        <div className="mt-10 p-8 bg-white rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-6">
            {selectedManager.fullName}
          </h2>

          {identities.length === 0 ? (
            <div className="text-center text-gray-600">
              No identities found for manager <span className="font-semibold">{selectedManager.id}</span>
            </div>
          ) : (
            <ul className="space-y-6 mt-6">
              {identities.map((identity) => (
                <li key={identity.id} className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-sm">
                  <div>
                    <p className="font-semibold text-gray-800 text-lg">{identity.identity}</p>
                    <p className="text-gray-500">{identity.identityType}</p>
                    <p className={`font-semibold text-sm ${identity.verificationStatus === 'verified' ? 'text-green-600' : 'text-red-600'}`}>
                      {identity.verificationStatus}
                    </p>
                    <p className="text-xs text-gray-400">
                      Created: {new Date(identity.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex space-x-4 mt-4 sm:mt-0">
                    <button onClick={() => setEditingIdentity(identity)} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Edit</button>
                    <button onClick={() => handleDeleteIdentity(identity.id)} className="px-4 py-2 border border-red-600 text-red-600 rounded-md hover:bg-red-600 hover:text-white">Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {editingIdentity && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h3 className="text-lg font-semibold mb-4">Edit Identity</h3>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  api.patch(`/identities/${editingIdentity.id}?managerId=${selectedManager.id}`, editingIdentity)
                    .then((res) => handleUpdateIdentity(res.data))
                    .catch((err) => {
                      const isVerified = err.response?.status === 400;
                      setModal({
                        title: 'Update Failed',
                        message: isVerified
                          ? 'You cannot edit a verified identity.'
                          : 'Something went wrong.',
                      });
                    });
                }}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Identity</label>
                    <input
                      type="text"
                      value={editingIdentity.identity}
                      onChange={(e) => setEditingIdentity(prev => prev ? { ...prev, identity: e.target.value } : null)}
                      className="mt-1 block w-full border rounded-md shadow-sm px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Identity Type</label>
                    <input
                      type="text"
                      value={editingIdentity.identityType}
                      onChange={(e) => setEditingIdentity(prev => prev ? { ...prev, identityType: e.target.value } : null)}
                      className="mt-1 block w-full border rounded-md shadow-sm px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div className="flex justify-end space-x-4">
                    <button type="button" onClick={() => setEditingIdentity(null)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Save</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      <Create onClick={() => setModal({ title: 'Create', message: 'Create button clicked!' })} />
      {modal && <Modal title={modal.title} message={modal.message} onClose={() => setModal(null)} />}
    </div>
  );
};

export default IdentitiesPage;
