import { useEffect, useRef, useState } from 'react'
import adminLogo from '../../assests/adminLogo.svg'
import { useLogout } from '../../hooks/useLogout'
import { FaLink, FaShapes, FaChartSimple, FaShareNodes, FaCircleUser, FaGear, FaArrowRightToBracket, FaChevronLeft, FaChevronRight } from 'react-icons/fa6'
const AdminNavbar = ({ user, admin, windowWidth, page, setPage, isVisible, setIsVisible }) => {
    const { logout } = useLogout()
    const [profilePicClick, setProfilePicClick] = useState(false)
    const profilePicRef = useRef(null)

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (profilePicClick) {
                if (profilePicRef.current && !profilePicRef.current.contains(e.target)) {
                    setProfilePicClick(false)
                }
            }
        }
        document.addEventListener('click', handleOutsideClick)
        return () => {
            document.removeEventListener('click', handleOutsideClick)
        }
    }, [profilePicClick])

    const handleSetttingsClick = () => {
        setProfilePicClick(false)
        setPage(3)
    }

    console.log(admin)
    if (windowWidth > 767) {
        return (
            <nav className='py-5 px-7 flex justify-between bg-white shadow-xl' id='navbar'>
                <div className='flex sm:gap-12 idk:gap-8'>
                    <img src={adminLogo} alt='linky logo'/>
                    <div className={`flex items-center gap-0.5 rounded px-2 ${page === 0 ? 'hover:cursor-default' : 'hover:cursor-pointer hover:bg-gray-300'}`}  onClick={() => setPage(0)}>
                        <FaLink color={page === 0 ? "black" : "#303030"} size={20}/>
                        <h1 className={`${page === 0 ? 'text-black' : 'text-admin-nav-links'} font-medium text-lg ${page === 0 && 'underline underline-offset-2 decoration-2'}`}>Links</h1>
                    </div>
                    <div className={`flex items-center gap-0.5 rounded px-2 ${page === 1 ? 'hover:cursor-default' : 'hover:cursor-pointer hover:bg-gray-300'}`} onClick={() => setPage(1)}>
                        <FaShapes color={page === 1 ? "black" : "#303030"} size={20}/>
                        <h1 className={`${page === 1 ? 'text-black' : 'text-admin-nav-links'} font-medium text-lg ${page === 1 && 'underline underline-offset-2 decoration-2'}`}>Appearance</h1>
                    </div>
                    <div className={`flex items-center gap-0.5 rounded px-2 ${page === 2 ? 'hover:cursor-default' : 'hover:cursor-pointer hover:bg-gray-300'}`} onClick={() => setPage(2)}>
                        <FaChartSimple color={page === 2 ? "black" : "#303030"} size={20}/>
                        <h1 className={`${page === 2 ? 'text-black' : 'text-admin-nav-links'} font-medium text-lg ${page === 2 && 'underline underline-offset-2 decoration-2'}`}>Analytics</h1>
                    </div>
                    <div  className={`flex items-center gap-0.5 rounded px-2 ${page === 3 ? 'hover:cursor-default' : 'hover:cursor-pointer hover:bg-gray-300'}`} onClick={() => setPage(3)}>
                        <FaGear color={page === 3 ? "black" : "#303030"} size={20}/>
                        <h1 className={`${page === 3 ? 'text-black' : 'text-admin-nav-links'} font-medium text-lg ${page === 3 && 'underline underline-offset-2 decoration-2'}`}>Settings</h1>
                    </div>
                </div>
                <div className='flex items-center sm:gap-8 idk:gap-6'>
                    {windowWidth >= 960 && <button className='border border-solid border-1 border-zinc-300 rounded-full shadow-md shadow-neutral-300 hover:shadow-neutral-400 flex items-center gap-1 py-2.5 px-5 font-medium text-lg'><FaShareNodes className='inline' color='303030' size="20"/>Share</button>}
                    <div className='' ref={profilePicRef}>
                        {admin && admin.profilePicture ? <img src={admin.profilePicture} className='rounded-full w-14 hover:cursor-pointer' onClick={() => setProfilePicClick(!profilePicClick)}/> : <FaCircleUser color='737373' className='hover:cursor-pointer' size={56} onClick={() => setProfilePicClick(!profilePicClick)}/>}
                        {profilePicClick && 
                        <div className='flex flex-col items-end right-10 mt-2 absolute z-10'>    
                            <div className='flex flex-col gap-2 bg-white p-5 rounded-md border border-solid border-2 border-stone-500'>
                                <div className='flex items-center gap-1.5 hover:cursor-pointer hover:bg-red-100 p-2 rounded-md' onClick={logout}>
                                    <FaArrowRightToBracket color='#dc2626'/>
                                    <p className='font-medium text-red-600'>Log Out</p>
                                </div>
                            </div>
                        </div>}
                    </div>
                </div>
            </nav>
        )        
    } else {

        const handleBack = () => {
            if (isVisible === 'preview') {
                setIsVisible('links')
            }
            setPage(page - 1)
        }

        const handleForward = () => {
            if (isVisible === 'preview') {
                setIsVisible('links')
            }
            setPage(page + 1)
        }
        
        return (
            <nav className='py-5 px-7 flex justify-between bg-white shadow-xl' id="navbar">
                <div className='flex xxxs:gap-6 xxxxs:gap-2.5'>
                    <img src={adminLogo} alt='linky logo'/>
                    <div className='flex items-center'>
                        <button onClick={page > 0 ? handleBack : undefined}><FaChevronLeft color={page === 0 ? '#9ca3af' : 'black'} className={page === 0 && 'hover:cursor-default'}/></button>
                        <h1 className='text-admin-nav-links font-bold text-lg hover:cursor-default'>{page === 0 && 'Links'}{page === 1 && 'Appearance'}{page === 2 && 'Analytics'} {page === 3 && 'Settings'}</h1>
                        <button onClick={page < 3 ? handleForward : undefined}><FaChevronRight color={page === 3 ? '#d1d5db' : 'black'} className={page === 3 && 'hover:cursor-default'}/></button>
                    </div>
                </div>
                <div className='flex items-center gap-8'>
                    {windowWidth >= 480 && <button className='border border-solid border-1 border-zinc-300 rounded-full shadow-md shadow-neutral-300 hover:shadow-neutral-400 flex items-center gap-1 py-2.5 px-5 font-medium text-lg'><FaShareNodes className='inline' color='303030' size="20"/>Share</button>}
                    <div className='' ref={profilePicRef}>
                        {admin && admin.profilePicture ? <img src={admin.profilePicture} className='rounded-full w-14 hover:cursor-pointer'/> : <FaCircleUser color='737373' size={56} onClick={() => setProfilePicClick(!profilePicClick)}/>}
                        {profilePicClick && 
                        <div className='flex flex-col items-end right-10 mt-2 absolute z-10'>    
                            <div className='flex flex-col gap-2 bg-white p-2.5 rounded-md border border-solid border-2 border-stone-500'>
                                <div className='flex items-center gap-1.5 hover:cursor-pointer hover:bg-red-100 p-1 rounded-md' onClick={logout}>
                                    <FaArrowRightToBracket color='#dc2626'/>
                                    <p className='font-medium text-red-600'>Log Out</p>
                                </div>
                            </div>
                        </div>}
                    </div>
                </div>
            </nav>
        )
    }

}

export default AdminNavbar;