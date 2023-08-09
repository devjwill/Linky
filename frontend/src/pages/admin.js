import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

const Admin = () => {
    const { user } = useAuthContext()
    const { logout } = useLogout()
    return (
        <div>
            <h1>This is the admin page</h1>
            {user && <h1>username: {user.username}</h1>}
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default Admin;