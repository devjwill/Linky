import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import logo from '../assests/logo.png'

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const { login, error } = useLogin() //loading
    const [isRevealed, setIsRevealed] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(username, password)
    }

    const togglePasswordVisible = () => {
        setIsRevealed(!isRevealed)
        console.log("Password Visible State: " + isRevealed)
    }

    return  (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col justify-center items-center h-screen p-10">
                <div className="border-solid border-2 border-black rounded-md text-center p-5">
                    <a href="/home"><img src={logo} className="mt-2.5"/></a>
                    <div className="mb-10">
                        <h1 className="text-2xl font-bold">Login</h1>
                        <h2 className="font-medium">Use your Linky Account</h2>
                    </div>
                    <div className="mb-10">
                        <div className="">
                            <input type="text" className="w-72 bg-gray-300 mb-5 p-3 border border-solid border-gray-300 rounded focus:border focus:border-app-blue focus:outline-none" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username"></input>
                        </div>
                        <div className="w-72 bg-gray-300 rounded border border-solid border-gray-300 inline-flex mx-auto flex gap-2.5 focus-within:border focus-within:border-app-blue focus-within:outline-none">
                            <input type={isRevealed ? 'text' : 'password'} onChange={(e) => setPassword(e.target.value)} className="bg-gray-300 p-3 rounded focus:outline-none" placeholder="Password"></input>
                            <div onClick={togglePasswordVisible} className="self-center">{isRevealed ? <AiFillEyeInvisible/> : <AiFillEye/>}</div>
                        </div>
                    </div>
                    {error && <div className="ml-auto mr-auto mb-10 border-2 rounded border-solid border-red-600 bg-red-300 w-72 font-medium px-2 py-3 ">{error}</div>}
                    <button className="bg-gradient-to-b from-gradient-su-blue to-gradient-su-teal text-white mb-10 py-2 px-3 rounded">Login</button>
                </div>
            </div>
        </form>
    )
}

export default Login