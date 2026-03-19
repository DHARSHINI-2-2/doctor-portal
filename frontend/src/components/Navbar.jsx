import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../redux/slices/authSlice';
import { FaHeartbeat, FaSignOutAlt, FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';

function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/login');
    };

    const toggleMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="sticky top-0 z-50 w-full bg-white/60 backdrop-blur-lg border-b border-white/40 shadow-[0_4px_30px_rgba(0,0,0,0.05)] transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    
                    {/* Brand / Logo Area */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className="p-2 bg-gradient-to-br from-blue-500 to-teal-400 rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300">
                                <FaHeartbeat className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-teal-500">
                                Doctor Portal
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        {user ? (
                            <>
                                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 border border-gray-100 shadow-sm">
                                    <FaUserCircle className="w-6 h-6 text-gray-400" />
                                    <span className="text-sm font-medium text-gray-700">
                                        Hi, <span className="font-bold text-gray-900">{user.name}</span>
                                    </span>
                                </div>
                                <button 
                                    onClick={onLogout} 
                                    className="group relative inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-red-500 to-rose-600 rounded-full overflow-hidden shadow-md shadow-red-500/20 hover:shadow-lg hover:shadow-red-500/40 transition-all duration-300 hover:-translate-y-0.5"
                                >
                                    <FaSignOutAlt className="w-4 h-4" />
                                    <span>Logout</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <Link 
                                    to="/login" 
                                    className="text-sm font-bold text-gray-600 hover:text-blue-600 transition-colors"
                                >
                                    Sign in
                                </Link>
                                <Link 
                                    to="/register" 
                                    className="px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-teal-500 rounded-full shadow-md shadow-blue-500/30 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:-translate-y-0.5"
                                >
                                    Create account
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button 
                            onClick={toggleMenu}
                            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                        >
                            {isMobileMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown Menu (Glassmorphic) */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-20 left-0 w-full bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-xl shadow-blue-900/10">
                    <div className="px-4 pt-2 pb-6 space-y-4">
                        {user ? (
                            <>
                                <div className="flex items-center gap-3 p-4 bg-white/50 rounded-xl border border-gray-100">
                                    <FaUserCircle className="w-8 h-8 text-gray-400" />
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium">Logged in as</p>
                                        <p className="text-base font-bold text-gray-900">{user.name}</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => { onLogout(); toggleMenu(); }} 
                                    className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-white bg-red-500 rounded-xl shadow-md hover:bg-red-600 transition-colors"
                                >
                                    <FaSignOutAlt className="w-5 h-5" />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <div className="flex flex-col gap-3">
                                <Link 
                                    to="/login" 
                                    onClick={toggleMenu}
                                    className="w-full text-center px-4 py-3 text-sm font-bold text-gray-700 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors"
                                >
                                    Sign in
                                </Link>
                                <Link 
                                    to="/register" 
                                    onClick={toggleMenu}
                                    className="w-full text-center px-4 py-3 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-teal-500 rounded-xl shadow-md hover:opacity-90 transition-opacity"
                                >
                                    Create account
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;