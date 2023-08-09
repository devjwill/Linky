import logo from '../assests/logo.png'
// import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';


const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()
    const handleClick = () => {
        logout()
    }

    //min-w-24 min-h-12
    // w-24 h-12

    return (
        <div className="flex justify-between items-center bg-app-blue min-w-screen py-5 px-5 gap-10">
            <div className='bg-white rounded shrink-0'>
                <img src={logo} alt="Linky"  className='w-24 h-12'/> 
            </div>
            <div className='flex gap-x-20 shrink-0'>
                <h1 className='text-white'><a href='/templates'>Templates</a></h1>
                <h1 className='text-white'><a href='/faq'>FAQ</a></h1>
                <h1 className='text-white text-center'><a href='/contact-us'>Contact Us</a></h1>
            </div>
            {!user && (
            <div className='flex gap-x-10 shrink-0'>
                <a href='/login' className='bg-white rounded px-3 py-1'>Login</a>
                <a href='/signup' className='bg-gradient-to-b from-gradient-su-blue to-gradient-su-teal text-white rounded px-3 py-1'>Signup</a>
            </div>
            )}
            {user && (
                <div className='shrink-0'>
                    <a href='/home' onClick={handleClick} className='bg-white rounded px-3 py-1'>Logout</a>
                    <p>{user.username}</p>
                </div>
            )}
        </div>
    )
}

export default Navbar;