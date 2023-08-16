import { useState } from "react"
import logo from "../../assests/logo.png"
const validator = require('validator')
const PageOne = ({ page, setPage, attemptCancel, setAttemptCancel, handleCancel, cancelSignup, firstName, setFirstName, lastName, setLastName }) => {
    const [error, setError] = useState("")
    const handleNext = () => {
        setError("")
        setAttemptCancel(false)
        const regex = /^[\p{L}']+$/u

        if(!firstName) {
            setError("Please input a first name")
            return error
        }
        if(firstName.includes(`'`)) {
            setError("Please input a valid first name")
            return error
        }
        if(!validator.isAlpha(firstName)) {
            if(!validator.matches(firstName, regex)) {
                setError("Please input a valid first name")
                return error
            }
        }
        if(firstName.length > 15) {
            setError("Maximum character length for a name is 15")
            return error
        }

        if(lastName) {
            if(lastName.includes(`'`)) {
                setError("Please input a valid last name")
                return error    
            }
            if(!validator.isAlpha(lastName)) {
                if(!validator.matches(lastName, regex)) {
                    setError("Please input a valid last name")
                    return error
                }
            }
            if(lastName.length > 15) {
                setError("Maximum character length for a name is 15")
                return error
            }
        }
        setError("")
        setPage(page + 1)
        console.log(`My  first name is ${firstName} and my last name is ${lastName}.`)
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen p-10">
            <div className="border-solid border-2 border-black rounded-md text-center">
                <div onClick={handleCancel} className="hover:cursor-pointer">
                    <img src={logo} alt="Linky logo"/>
                </div>
                {attemptCancel ? cancelSignup : 
                <div className="mb-10">
                    <h1 className="text-2xl font-bold">Signup</h1>
                    <h2 className="font-medium">Lets create your Linky Account</h2>
                </div>
                }

                <div className="mb-10 flex flex-col items-center gap-5 mb-5">
                    <input type="text" className="w-72 bg-gray-300  p-3 border border-solid border-gray-300 rounded focus:border focus:border-app-blue focus:outline-none" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} value={firstName || ""}></input>
                    <input type="text" className="w-72 bg-gray-300  p-3 border border-solid border-gray-300 rounded focus:border focus:border-app-blue focus:outline-none" placeholder="Last Name (Optional)" onChange={(e) => setLastName(e.target.value)} value={lastName || ""}></input>
                </div>
                {error && <div className="ml-auto mr-auto mb-10 border-2 rounded border-solid border-red-600 bg-red-300 w-72 font-medium px-2 py-3">{error}</div>}
                <button className="bg-app-blue text-white font-bold py-2 px-3 rounded mb-10" onClick={handleNext}>Next</button>
            </div>
        </div>
    )

}

export default PageOne;