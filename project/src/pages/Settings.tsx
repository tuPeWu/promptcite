import React, { useState } from 'react';
import { Settings as SettingsIcon, LogOut, Trash2 } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';

const Settings = () => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { user, logout } = useAuth0();

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  const handleDeleteAccount = () => {
    alert('Account deletion is not implemented yet.');
    // Future: Add account deletion logic here
  };

  const handleChangePassword = () => {
    alert('Password change is handled via Auth0.');
    // Optional: You can trigger a password reset email via Auth0 Management API
  };

  const userData = {
    email: user?.email || 'Unknown',
    joinDate: '—', // Optional: Replace with actual value if stored
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b">
          <div className="flex items-center gap-3">
            <SettingsIcon className="w-8 h-8 text-gray-600" />
            <h1 className="text-2xl font-bold">Account Settings</h1>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-4">Profile Information</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-600">Email</label>
                <p className="text-lg">{userData.email}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-600">Member Since</label>
                <p className="text-lg">{userData.joinDate}</p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t">
            <h2 className="text-lg font-semibold mb-4">Security</h2>
            <div className="space-y-4">
              <button
                onClick={handleChangePassword}
                className="w-full sm:w-auto px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                Change Password
              </button>
            </div>
          </div>

          <div className="pt-6 border-t">
            <h2 className="text-lg font-semibold mb-4">Account Actions</h2>
            <div className="space-y-4">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                <LogOut size={16} />
                Log Out
              </button>

              <div>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="flex items-center gap-2 px-4 py-2 text-sm bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors"
                >
                  <Trash2 size={16} />
                  Delete Account
                </button>

                {showDeleteConfirm && (
                  <div className="mt-4 p-4 bg-red-50 rounded-md">
                    <p className="text-sm text-red-600 mb-3">
                      Are you sure you want to delete your account? This action cannot be undone.
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={handleDeleteAccount}
                        className="px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                      >
                        Yes, Delete Account
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(false)}
                        className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
