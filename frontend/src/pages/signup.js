import { useEffect, useState } from "react"
import { useSignup } from "../hooks/useSignup"
import PageOne from "../components/signup/signupP1"
import PageTwo from "../components/signup/signupP2"
import PageThree from "../components/signup/signupP3"
import PageFour from "../components/signup/signupP4"


const Signup = () => {
    const [page, setPage] = useState(1)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isPasswordVisible1, setIsPasswordVisible1] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isPasswordVisible2, setIsPasswordVisible2] = useState(false)
    const [username, setUsername] = useState("")
    const [profilePicture, setProfilePicture] = useState("")
    const [attemptCancel, setAttemptCancel] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false)
    const { signup, loading, error } = useSignup()

    useEffect(() => {
        if (isAnimating) {
            const animationTimeout = setTimeout(() => {
                setIsAnimating(false)
            }, 500)
            return () => clearTimeout(animationTimeout);
        }
    }, [isAnimating])

    const handleBack = () => {
        setAttemptCancel(false)
        setPage(page - 1)
    }

    const handleNext = () => {
        setPage(page + 1)
    }

    const togglePassword1 = () => {
        setIsPasswordVisible1(!isPasswordVisible1)
    }

    const togglePassword2 = () => {
        setIsPasswordVisible2(!isPasswordVisible2)
    }

    const handleCancel = () => {
        console.log("changing cancel state")
        if(attemptCancel) {
            setIsAnimating(true)
        } else {
            setAttemptCancel(true)
        }
    }

    const CancelSignup = () => {
        const handleClick = () => {
            setAttemptCancel(false)
        }
        return (
            <div className={isAnimating ?  "animate-[wiggle_0.5s_ease-in-out] ml-auto mr-auto mb-10 border-2 rounded border-solid border-stone-500 bg-stone-300 w-72 font-medium px-2 py-3"  : "ml-auto mr-auto mb-10 border-2 rounded border-solid border-stone-500 bg-stone-300 w-72 font-medium px-2 py-3"}>
                <h1 className="text-lg font-bold mb-2">Are you sure you want to cancel signing up?</h1>
                <div className="flex items-center justify-center gap-3">
                    <a href="/home" className="underline decoration-stone-500 underline-offset-2">Yes</a>
                    <button onClick={handleClick} className="bg-app-blue text-white py-0.5 px-1 rounded">No</button>
                </div>
            </div>
        )
    }
    return  (
        <div>
            {page === 1 && <PageOne page={page} setPage={setPage} attemptCancel={attemptCancel} setAttemptCancel={setAttemptCancel} handleCancel={handleCancel} cancelSignup={<CancelSignup/>} firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName}/>}
            {page === 2 && <PageTwo page={page} setPage={setPage} attemptCancel={attemptCancel} setAttemptCancel={setAttemptCancel} handleCancel={handleCancel} cancelSignup={<CancelSignup/>} isPasswordVisible1={isPasswordVisible1} togglePassword1={togglePassword1} isPasswordVisible2={isPasswordVisible2} togglePassword2={togglePassword2} handleBack={handleBack} email={email} setEmail={setEmail} password={password} setPassword={setPassword} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword}/>}
            {page === 3 && <PageThree page={page} setPage={setPage} attemptCancel={attemptCancel} setAttemptCancel={setAttemptCancel} handleCancel={handleCancel} cancelSignup={<CancelSignup/>} handleBack={handleBack} username={username} setUsername={setUsername} profilePicture={profilePicture} setProfilePicture={setProfilePicture}/>}
            {page === 4 && <PageFour page={page} setPage={setPage} attemptCancel={attemptCancel} setAttemptCancel={setAttemptCancel} handleCancel={handleCancel} cancelSignup={<CancelSignup/>} isPasswordVisible1={isPasswordVisible1} togglePassword1={togglePassword1} isPasswordVisible2={isPasswordVisible2} togglePassword2={togglePassword2} firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} email={email} setEmail={setEmail} password={password} setPassword={setPassword} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} username={username} setUsername={setUsername} profilePicture={profilePicture} setProfilePicture={setProfilePicture} signup={signup} error={error} loading={loading}/>}
        </div>
    )
}

export default Signup