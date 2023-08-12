import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)
    const { dispatch } = useAuthContext()
    const signup = async (firstName, lastName, email, password, username, profilePicture) => {
        setLoading(true)
        setError(null)

        const response = await fetch('/api/user/signup', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({firstName, lastName, email, password, username, profilePicture})
        })
        const json = await response.json()

        if (!response.ok) {
            setLoading(false)
            setError(json.error)
        }

        if (response.ok) {
            //save user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            //update authentication state
            dispatch({type: "LOGIN", payload: json})
            setLoading(false)
            console.log(json)
        }
    }
    return { signup, loading, error}
}