import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';

type Props = {
  children: JSX.Element;
};

export default function PrivateRoute({ children }: Props) {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  return children;
}
