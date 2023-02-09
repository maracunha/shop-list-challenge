import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../common/hooks/reduxHooks';

const RequireAuth = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const { value: userState } = useAppSelector((state) => state.user);

  if (!userState.token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default RequireAuth;
