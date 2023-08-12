import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async (username, password) => {
        setLoading(true)
        setError(null)
        const response = await fetch('/api/user/login', {
            method: 'POST',
            headers: {"Content-Type": 'application/json'},
            body: JSON.stringify({username, password})
        })

        const json = await response.json()

        if (!response.ok) {
            setLoading(false)
            setError(json.error)
            console.log("Failed login attempt")
            console.log(password)
        }

        if (response.ok) {
            //save user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            //update the authentication state
            dispatch({type: "LOGIN", payload: json})
            setLoading(false)
            // console.log("username: " + username + " password: " + password)
            console.log(json)
        }
    }
    return { login, loading, error }
}
