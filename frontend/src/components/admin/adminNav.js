import { useEffect } from 'react'
import adminLogo from '../../assests/adminLogo.svg'
// import { FontAwesomeIcon } from '@fontawesome/react-fontawesome'
import { FaLink, FaShapes, FaChartSimple, FaShareNodes, FaCircleUser, FaChevronLeft, FaChevronRight } from 'react-icons/fa6'
const AdminNavbar = ({ user, admin, windowWidth, page, setPage }) => {
    console.log(admin)
    if (windowWidth > 767) {
        return (
            <nav className='py-5 px-7 flex justify-between bg-white shadow-xl' id='navbar'>
                <div className='flex gap-12 '>
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
                </div>
                <div className='flex items-center gap-8'>
                    <button className='border border-solid border-1 border-zinc-300 rounded-full shadow-md shadow-neutral-300 hover:shadow-neutral-400 flex items-center gap-1 py-2.5 px-5 font-medium text-lg'><FaShareNodes className='inline' color='303030' size="20"/>Share</button>
                    <div className=''>
                        {admin && admin.profilePicture ? <img src={admin.profilePicture} className='rounded-full w-14'/> : <FaCircleUser color='737373' size={56}/>}
                    </div>
                </div>
            </nav>
        )        
    } else {

        const handleBack = () => {
            setPage(page - 1)
        }

        const handleForward = () => {
            setPage(page + 1)
        }
        
        return (
            <nav className='py-5 px-7 flex justify-between bg-white' id="navbar">
                <div className='flex gap-6'>
                    <img src={adminLogo} alt='linky logo'/>
                    <div className='flex items-center'>
                        <button onClick={page > 0 ? handleBack : undefined}><FaChevronLeft color={page === 0 ? '#9ca3af' : 'black'} className={page === 0 && 'hover:cursor-default'}/></button>
                        <h1 className='text-admin-nav-links font-bold text-lg hover:cursor-default'>{page === 0 && 'Links'}{page === 1 && 'Appearance'}{page === 2 && 'Analytics'}</h1>
                        <button onClick={page < 2 ? handleForward : undefined}><FaChevronRight color={page === 2 ? '#d1d5db' : 'black'} className={page === 2 && 'hover:cursor-default'}/></button>
                    </div>
                </div>
                <div className='flex items-center gap-8'>
                    {windowWidth > 425 && <button className='border border-solid border-1 border-zinc-300 rounded-full shadow-md shadow-neutral-300 hover:shadow-neutral-400 flex items-center gap-1 py-2.5 px-5 font-medium text-lg'><FaShareNodes className='inline' color='303030' size="20"/>Share</button>}
                    <div className=''>
                        {admin && admin.profilePicture ? <img src={admin.profilePicture} className='rounded-full w-14'/> : <FaCircleUser color='737373' size={56}/>}
                    </div>
                </div>
            </nav>
        )
    }

}

export default AdminNavbar;