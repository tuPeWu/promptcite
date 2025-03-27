import { useAuth0 } from '@auth0/auth0-react';

export default function AuthButtons() {
  const { loginWithRedirect, logout, isAuthenticated, user, isLoading } = useAuth0();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      {!isAuthenticated ? (
        <>
          <button onClick={() => loginWithRedirect()}>Log In</button>
          <button onClick={() => loginWithRedirect({ screen_hint: 'signup' })}>
            Sign Up
          </button>
        </>
      ) : (
        <>
          <p>👋 Hello, {user?.name}</p>
          <button onClick={() => logout({ returnTo: window.location.origin })}>
            Log Out
          </button>
        </>
      )}
    </div>
  );
}
