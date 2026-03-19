import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser, reset } from '../redux/slices/authSlice';
import { FaUser, FaEnvelope, FaLock, FaUserTag, FaHeartbeat } from 'react-icons/fa';

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
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 px-4 sm:px-6 lg:px-8 py-8">
            <div className="w-full max-w-md p-8 space-y-6 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50">
                
                {/* Header */}
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 bg-gradient-to-br from-blue-500 to-teal-400 rounded-xl shadow-lg flex items-center justify-center mb-4">
                        <FaHeartbeat className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Create an account
                    </h2>
                    <p className="mt-2 text-sm text-gray-500">
                        Join the Doctor Portal today
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={onSubmit} className="mt-6 space-y-5">
                    
                    {/* Full Name Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaUser className="h-5 w-5 text-gray-400" />
                            </div>
                            <input 
                                type="text" 
                                name="name" 
                                value={name} 
                                onChange={onChange} 
                                placeholder="John Doe" 
                                required 
                                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl leading-5 bg-white/50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all sm:text-sm"
                            />
                        </div>
                    </div>

                    {/* Email Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaEnvelope className="h-5 w-5 text-gray-400" />
                            </div>
                            <input 
                                type="email" 
                                name="email" 
                                value={email} 
                                onChange={onChange} 
                                placeholder="you@example.com" 
                                required 
                                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl leading-5 bg-white/50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all sm:text-sm"
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaLock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input 
                                type="password" 
                                name="password" 
                                value={password} 
                                onChange={onChange} 
                                placeholder="Create a strong password" 
                                required 
                                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl leading-5 bg-white/50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all sm:text-sm"
                            />
                        </div>
                    </div>

                    {/* Role Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaUserTag className="h-5 w-5 text-gray-400" />
                            </div>
                            <select 
                                name="role" 
                                value={role} 
                                onChange={onChange}
                                className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-xl leading-5 bg-white/50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all sm:text-sm appearance-none"
                            >
                                <option value="patient">Patient</option>
                                <option value="doctor">Doctor</option>
                            </select>
                            {/* Custom dropdown arrow */}
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full flex justify-center py-3 px-4 mt-2 border border-transparent rounded-xl shadow-md shadow-blue-500/30 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-teal-500 hover:shadow-lg hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Creating Account...' : 'Register'}
                    </button>
                </form>

                {/* Footer Link */}
                <p className="text-center text-sm text-gray-600 mt-4">
                    Already have an account?{' '}
                    <Link to="/login" className="font-bold text-blue-600 hover:text-teal-500 transition-colors">
                        Sign in instead
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Register;