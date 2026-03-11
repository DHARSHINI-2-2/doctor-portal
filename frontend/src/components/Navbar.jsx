import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../redux/slices/authSlice';

function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/login');
    };

    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', backgroundColor: '#f4f4f4' }}>
            <div>
                <Link to="/" style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold', fontSize: '20px' }}>
                    Doctor Portal
                </Link>
            </div>
            <ul style={{ display: 'flex', listStyle: 'none', gap: '20px', margin: 0 }}>
                {user ? (
                    <>
                        <li>Welcome {user.name}</li>
                        <li>
                            <button onClick={onLogout} style={{ cursor: 'pointer' }}>Logout</button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;