import { useState } from "react"
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import logo from "../../assests/logo.png"
const validator = require('validator')
const PageTwo = ({ page, setPage, attemptCancel, setAttemptCancel, handleCancel, cancelSignup, isPasswordVisible1, togglePassword1, isPasswordVisible2, togglePassword2, handleBack, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword }) => {
    const [error, setError] = useState("")

    const handleNext = () => {
        setAttemptCancel(false)
        if (!email) {
            setError("Please input a email")
            return error
        }
        if (!validator.isEmail(email)) {
            setError("Please input a valid email")
            return error
        }
        if (!password) {
            setError("Please input a password")
            return error
        }
        if (!validator.isStrongPassword(password)) {
            setError("Please input a stronger password")
            return error
        }
        if (password !== confirmPassword) {
            setError("Passwords don't match")
            return error
        }

        setError("")
        setPage(page + 1)
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen p-10">
            <div className="border-solid border-2 border-black rounded-md text-center ">
                <div onClick={handleCancel} className="hover:cursor-pointer"><img src={logo} alt="Linky logo"/></div>
                {attemptCancel && cancelSignup}
                <div className="flex flex-col item-center gap-5 mb-5">
                    <input type="email" className="w-72 bg-gray-300 mx-auto p-3 border border-solid border-gray-300 rounded focus:border focus:border-app-blue focus:outline-none" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email || ""}></input>
                    <div className="w-72 bg-gray-300 rounded border border-solid border-gray-300 inline-flex mx-auto flex gap-2.5 focus-within:border focus-within:border-app-blue focus-within:outline-none">
                        <input type={isPasswordVisible1 ? 'text' : 'password'} className="bg-gray-300 p-3 rounded focus:outline-none" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password || ""}></input>
                        <div onClick={togglePassword1} className="self-center">{isPasswordVisible1 ? <AiFillEyeInvisible/> : <AiFillEye/>}</div>
                    </div>
                    <div className="w-72 bg-gray-300 rounded border border-solid border-gray-300 inline-flex mx-auto flex gap-2.5 focus-within:border focus-within:border-app-blue focus-within:outline-none">
                        <input type={isPasswordVisible2 ? 'text' : 'password'} className="bg-gray-300 p-3 rounded focus:outline-none" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword || ""}></input>
                        <div onClick={togglePassword2} className="self-center">{isPasswordVisible2 ? <AiFillEyeInvisible/> : <AiFillEye/>}</div>
                    </div>
                </div>
                {error && <div className="ml-auto mr-auto mb-10 border-2 rounded border-solid border-red-600 bg-red-300 w-72 font-medium px-2 py-3">{error}</div>}
                <div className="mb-10 item-center">
                    <div className="flex gap-5 justify-center">
                        <button className="bg-stone-400 text-stone-800 font-bold py-2 px-3 rounded" onClick={handleBack}>Back</button>
                        <button className="bg-app-blue text-white font-bold py-2 px-3 rounded" onClick={handleNext}>Next</button>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default PageTwo