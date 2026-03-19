import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser, reset } from '../redux/slices/authSlice';
import { FaEnvelope, FaLock, FaHeartbeat } from 'react-icons/fa';

function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { email, password } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isError) alert(message);
        
        if (isSuccess || user) {
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
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md p-8 space-y-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50">
                
                {/* Header */}
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 bg-gradient-to-br from-blue-500 to-teal-400 rounded-xl shadow-lg flex items-center justify-center mb-4">
                        <FaHeartbeat className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Welcome back
                    </h2>
                    <p className="mt-2 text-sm text-gray-500">
                        Sign in to access your Doctor Portal account
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={onSubmit} className="mt-8 space-y-6">
                    <div className="space-y-4">
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
                                    placeholder="••••••••" 
                                    required 
                                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl leading-5 bg-white/50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all sm:text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md shadow-blue-500/30 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-teal-500 hover:shadow-lg hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Authenticating...' : 'Sign in'}
                    </button>
                </form>

                {/* Footer Link */}
                <p className="text-center text-sm text-gray-600 mt-6">
                    Don't have an account?{' '}
                    <Link to="/register" className="font-bold text-blue-600 hover:text-teal-500 transition-colors">
                        Create an account
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;