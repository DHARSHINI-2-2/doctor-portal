import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = () => {
    // Check if the user is currently logged in via Redux state
    const { user } = useSelector((state) => state.auth);

    // If there is no user, instantly redirect them to the login page
    // The "replace" attribute prevents them from using the back button to bypass this
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // If the user IS logged in, render the child routes (the protected pages)
    return <Outlet />;
};

export default ProtectedRoute;