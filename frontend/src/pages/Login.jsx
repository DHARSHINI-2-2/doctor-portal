import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser, reset } from '../redux/slices/authSlice';

function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { email, password } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isError) alert(message);
        
        if (isSuccess || user) {
            // Check the role and navigate to the correct dashboard
            if (user?.role === 'doctor') {
                navigate('/doctor-dashboard');
            } else {
                navigate('/patient-dashboard');
            }
        }
        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);
    
    const onChange = (e) => {
        setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }));
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
            <h2>Login to Doctor Portal</h2>
            <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" required />
                <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" required />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </div>
    );
}

export default Login;