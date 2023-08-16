import logo from '../../assests/logo.png'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
const PageFour = ({ page, setPage, signup, error, loading, attemptCancel, setAttemptCancel, handleCancel, cancelSignup, isPasswordVisible1, togglePassword1, isPasswordVisible2, togglePassword2, firstName, setFirstName, lastName, setLastName, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, username, setUsername, profilePicture, setProfilePicture }) => {
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        setAttemptCancel(false)
        console.log(firstName)
        console.log(lastName)
        console.log(email)
        console.log(password)
        console.log(username)
        // if (profilePicture) {
        //     await signup(firstName, lastName, email, password, username, profilePicture)
        // } else {
        //     await signup(firstName, lastName, email, password, username)
        // }
        await signup(firstName, lastName, email, password, username, profilePicture)
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen p-10">
            <div className="border-solid border-2 border-black rounded-md text-center">
                <form onSubmit={handleSubmit}>
                <div onClick={handleCancel} className="hover:cursor-pointer"><img src={logo} alt="Linky Logo"></img></div>
                    {attemptCancel ? cancelSignup : 
                    <div className='mb-10'>
                        <h1 className='text-lg font-medium'>Confirm Account Details</h1>
                    </div>
                    }
                    <div className='flex flex-col items-center gap-5 mb-10'>
                        <input type="text" name='firstName' className='w-72 bg-gray-300  p-3 border border-solid border-gray-300 rounded focus:border focus:border-app-blue focus:outline-none' onChange={(e) => setFirstName(e.target.value)} value={firstName} placeholder='First Name'></input>
                        <input type="text" name="lastName" className='w-72 bg-gray-300  p-3 border border-solid border-gray-300 rounded focus:border focus:border-app-blue focus:outline-none' onChange={(e) => setLastName(e.target.value)} value={lastName} placeholder="Last Name (optional)"></input>
                        <input type="email" name="email" className='w-72 bg-gray-300  p-3 border border-solid border-gray-300 rounded focus:border focus:border-app-blue focus:outline-none' onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Email'></input>
                        <div className="w-72 bg-gray-300 rounded border border-solid border-gray-300 inline-flex mx-auto flex gap-2.5 focus-within:border focus-within:border-app-blue focus-within:outline-none">
                            <input type={isPasswordVisible1 ? 'text' : 'password'} name="password" className="bg-gray-300 p-3 rounded focus:outline-none" onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Password'></input>
                            <div onClick={togglePassword1} className="self-center">{isPasswordVisible1 ? <AiFillEyeInvisible/> : <AiFillEye/>}</div>
                        </div>
                        <div className="w-72 bg-gray-300 rounded border border-solid border-gray-300 inline-flex mx-auto flex gap-2.5 focus-within:border focus-within:border-app-blue focus-within:outline-none">
                            <input type={isPasswordVisible2 ? 'text' : 'password'} className="bg-gray-300 p-3 rounded focus:outline-none" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} placeholder='Confirm Password'></input>
                            <div onClick={togglePassword2} className="self-center">{isPasswordVisible2 ? <AiFillEyeInvisible/> : <AiFillEye/>}</div>
                        </div>
                        <input type="text" name='username' className='w-72 bg-gray-300 p-3 border border-solid border-gray-300 rounded focus:border focus:border-app-blue focus:outline-none' onChange={(e) => setUsername(e.target.value)} value={username} placeholder='Username'></input>
                    </div>
                    {error && <div className='ml-auto mr-auto mb-10 border-2 rounded border-solid border-red-600 bg-red-300 w-72 font-medium px-2 py-3'>{error}</div>}
                    <button className='font-bold bg-gradient-to-b from-gradient-su-blue to-gradient-su-teal text-white rounded px-4 py-2 mb-10'>{loading ? <span className='flex align-center animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-white rounded-full'></span> : "Signup"}</button>
                </form>
            </div>
        </div>
    )
}

export default PageFour