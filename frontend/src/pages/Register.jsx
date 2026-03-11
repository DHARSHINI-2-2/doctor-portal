import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser, reset } from '../redux/slices/authSlice';

function Register() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'patient' });
    const { name, email, password, role } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isError) alert(message);
        if (isSuccess) {
            alert("Registration successful! Please login.");
            navigate('/login');
        }
        dispatch(reset());
    }, [isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser(formData));
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
            <h2>Register an Account</h2>
            <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input type="text" name="name" value={name} onChange={onChange} placeholder="Full Name" required />
                <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" required />
                <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" required />
                <select name="role" value={role} onChange={onChange}>
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                </select>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Registering...' : 'Register'}
                </button>
            </form>
            <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
    );
}

export default Register;