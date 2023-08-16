//React
import { useEffect, useRef, useState } from "react";

//Context
import { useAuthContext } from "../hooks/useAuthContext";
import { useAdminContext } from "../hooks/useAdminContext";

//Hooks
import { useLogout } from "../hooks/useLogout";

//Components
import AdminNavbar from "../components/admin/adminNav";
import Links from "../components/admin/links";
import Appearance from "../components/admin/appearance";
import Analytics from "../components/admin/analytics";

const Admin = () => {
    const { user } = useAuthContext()
    const { admin, dispatch } = useAdminContext()
    const { logout } = useLogout()
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [page, setPage] = useState(0) //0 = links 1 = apperance 2 = analytics

    //get user data from the payload
    useEffect(() => {
        const fetchAdmin = async () => {
            const response = await fetch('/api/admin/' + user.username, {
                // method: 'GET',
                headers: {"authorization": `Bearer ${user.token}`}
            })

            const json = await response.json()

            if(response.ok) {
                dispatch({type: 'SET_ADMIN', payload: json})
            }
            
        }

        if(user) {
            fetchAdmin()
            console.log("getting admin data")
        }
        
    }, [dispatch, user])

    //get the screen width
    const handleResize = () => {
        setWindowWidth(window.innerWidth)
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }               
    }, [handleResize])

    return (
        <div className="bg-admin-background min-h-screen">
            <AdminNavbar  user={user} admin={admin} windowWidth={windowWidth} page={page} setPage={setPage}/>
            {page === 0 && <Links windowWidth={windowWidth}/>}
            {page === 1 && <Appearance/>}
            {page === 2 && <Analytics/>}
            <button className="bg-red-600 rounded-full p-3 text-white font-bold" onClick={logout}>Logout</button>
        </div>
    )
}

export default Admin;