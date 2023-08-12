import { useState, useRef } from "react"
import Avatar from 'react-avatar-edit'
import logo from "../assests/logo.png"
const PageThree = ({ page, setPage, attemptCancel, setAttemptCancel, handleCancel, cancelSignup, handleBack, username, setUsername, profilePicture, setProfilePicture }) => {
    const [error, setError] = useState("")
    const fileInputRef = useRef(null)
    const handleNext = () => {
        setAttemptCancel(false)
        if (!username) {
            setError("Please enter a username")
            return error
        }
        if (username.length > 20) {
            setError("Maximum character length for username is 20")
            return error
        }
        setError("")
        setPage(page + 1)
    }

    const handleChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setProfilePicture(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleDivClick = (e) => {
        console.log(e)
        // if (e.target.lastChild.attributes.id.nodeValue === "setProfilePic") {
        //     document.getElementById("setProfilePic").click()
        // }
        document.getElementById("setProfilePic").click()
    }


    return (
        <div className="flex flex-col justify-center items-center h-screen p-10">
            <div className="border-solid border-2 border-black rounded-md text-center">
                <div onClick={handleCancel} className="hover:cursor-pointer"><img src={logo} alt="Linky logo"/></div>
                {attemptCancel && cancelSignup}
                <div className="flex flex-col gap-5 mb-5">
                    <input type="text" className="w-72 bg-gray-300 mx-auto p-3 border border-solid border-gray-300 rounded focus:border focus:border-app-blue focus:outline-none" placeholder="Username" onChange={(e) => setUsername(e.target.value)} value={username || ""}></input>
                    {!profilePicture && 
                        <div className="w-72 p-3 rounded bg-gray-300 mx-auto hover:cursor-pointer" onClick={handleDivClick}>
                            <p className="font-medium">Set Profile Pic</p>
                            <label htmlFor="setProfilePic" className=" font-medium hover:cursor-pointer"></label>
                            <input type="file" id="setProfilePic" ref={fileInputRef} className="hidden" onChange={handleChange} accept=".jpg, .jpeg, .png"/>
                        </div>}
                    {profilePicture && 
                    <div className="mb-5">
                        <div className="rounded-full overflow-hidden h-28 w-28 mx-auto mb-3">
                            <img src={profilePicture} className="rounded-full object-cover w-full h-full"/>
                        </div>
                        <div className="flex justify-center gap-5">
                        <span className="bg-gray-300 py-0.5 px-1 rounded font-medium hover:cursor-pointer" onClick={() => setProfilePicture(null)}>Delete photo</span>
                            <label htmlFor="changePic" className="bg-gray-300 py-0.5 px-1 rounded font-medium hover:cursor-pointer">Change photo</label>
                            <input type="file" id="changePic" className="hidden" onChange={handleChange} accept=".jpg, .jpeg, .png"/>
                        </div>
                    </div>}
                </div>
                {error && <div className="ml-auto mr-auto mb-10 border-2 rounded border-solid border-red-600 bg-red-300 w-72 font-medium px-2 py-3">{error}</div>}
                <div className="mb-10 item-center">
                    <div className="flex gap-5 justify-center">
                        <button className="bg-stone-400 text-stone-800 py-2 px-3 rounded font-bold" onClick={handleBack}>Back</button>
                        <button className="bg-app-blue text-white py-2 px-3 rounded font-bold" onClick={handleNext}>Next</button>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default PageThree