import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AccountDropdown() {
  const { isAuthenticated, loginWithRedirect, logout, user, isLoading } = useAuth0();
  const [isOpen, setIsOpen] = useState(false);

  if (isLoading) return null;

  if (!isAuthenticated) {
    return (
      <button
        className="text-sm px-4 py-2 rounded hover:underline"
        onClick={() => loginWithRedirect()}
      >
        Sign in
      </button>
    );
  }

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-100"
      >
        <span className="text-sm">{user?.name || user?.email}</span>
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border shadow-md rounded z-50">
          <Link
            to="/settings"
            className="block px-4 py-2 text-sm hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            Settings
          </Link>
          <Link
            to="/my-prompts"
            className="block px-4 py-2 text-sm hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            My Prompts
          </Link>
          <button
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
