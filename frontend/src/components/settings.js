import { useAuthContext } from "../hooks/useAuthContext";
import { useAdminContext } from "../hooks/useAdminContext";
import { FaPencil } from "react-icons/fa6";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { useEffect, useRef, useState } from "react";
import { useLogout } from "../hooks/useLogout";

const validator = require('validator')
const Settings = ({ windowWidth, windowHeight }) => {
    const { user } = useAuthContext()
    const { logout } = useLogout()
    const { dispatch, admin } = useAdminContext()
    const [isEditing, setIsEditing] = useState("")
    const [editInfo, setEditInfo] = useState("")
    const [email, setEmail] = useState(admin.email)
    const [username, setUsername] = useState(admin.username)
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const [password1Visible, setPassword1Visible] = useState(false)
    const [password2Visible, setPassword2Visible] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const handleEditClick = (name) => {
        if (isEditing !== name) {
            setIsEditing(name)
            console.log('hello world')
            // document.getElementById(`${name}`).click() 
        }

    }

    const editFirstName = async (username, firstName) => {
        if (username && firstName && admin.firstName !== firstName) {
            const response = await fetch('/api/admin/patch', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({username, firstName})
            })
    
            const json = await response.json() 

            if (!response.ok) {
                console.log(json.error)
            } else if (response.ok) {
                dispatch({type: 'EDIT_FIRST_NAME', payload: json})
                console.log('first name edited')
            }
        }
    }

    const editLastName = async (username, lastName) => {
        if (username && lastName && admin.lastName !== lastName) {
            const response = await fetch('/api/admin/patch', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({username, lastName})
            })
    
            const json = await response.json() 

            if (!response.ok) {
                console.log(json.error)
            } else if (response.ok) {
                dispatch({type: 'EDIT_LAST_NAME', payload: json})
                console.log('last name edited')
            }
        }
    }

    const editEmail = async (username, email) => {
        if (username && email) {
            setIsLoading(true)
            setError('')
            const response = await fetch('/api/admin/patch', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({username, email})
            })
    
            const json = await response.json() 

            if (!response.ok) {
                setIsLoading(false)
                setError(json.error)
            } else if (response.ok) {
                setIsLoading(false)
                setIsEditing('')
                dispatch({type: 'EDIT_EMAIL', payload: json})
                console.log('email edited')
            } 
        }
    }

    const editUsername = async (username, newUsername) => {
        if (username && newUsername) {
            setIsLoading(true)
            setError('')
            const response = await fetch('/api/admin/patch', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({username, newUsername})
            })
    
            const json = await response.json()

            if (!response.ok) {
                setIsLoading(false)
                setError(json.error)
            } else if (response.ok) {
                setIsLoading(false)
                setIsEditing('')
                dispatch({type: 'EDIT_USERNAME', payload: json})
                let userData = JSON.parse(localStorage.getItem('user'))
                userData.username = newUsername
                localStorage.setItem('user', JSON.stringify(userData));
                // logout()
                console.log('username edited')
            }
        }
    }

    const changePassword = async (username, password1, password2) => {
        if (username && password1, password2) {
            setPassword1('')
            setPassword2('')
            setPassword1Visible(false)
            setPassword2Visible(false)
            setIsLoading(true)
            setError('')
            const response = await fetch('/api/admin/patch', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({username, password1, password2})
            })
    
            const json = await response.json()

            if (!response.ok) {
                setIsLoading(false)
                setError(json.error)
            } else if (response.ok) {
                setIsLoading(false)
                setIsEditing('')
                dispatch({type: 'CHANGE_PASSWORD', payload: json})
                console.log('password changed')
            }
        }
    }

    const handleChangeEditInfo = (field) => {
        setIsEditing('')
        setError('')
        setIsLoading(false)
        setEmail(admin.email)
        setUsername(admin.email)
        setPassword1('')
        setPassword2('')
        setPassword1Visible(false)
        setPassword2Visible(false)
        if (field === 'firstName') {
            setEditInfo(['firstName', admin.firstName])
        } else if (field === 'lastName') {
            setEditInfo(['lastName', admin.lastName])
        }
    }

    const handleChange = (value) => {
        const updatedArr = [...editInfo]
        updatedArr[1] = value
        setEditInfo(updatedArr)
    }

    const handleChangeIsEditing = (field) => {
        setError('')
        setIsLoading(false)
        setIsEditing(field)
        if (field === 'email') {
            setUsername(admin.username)
            setPassword1('')
            setPassword2('')
            setPassword1Visible(false)
            setPassword2Visible(false)
        } else if (field === 'username') {
            setEmail(admin.email)
            setPassword1('')
            setPassword2('')
            setPassword1Visible(false)
            setPassword2Visible(false)
        } else if (field === 'password') {
            setUsername(admin.username)
            setEmail(admin.email)
        }
    }

    const handleCancel = (field) => {
        setIsEditing('')
        setError('')
        setIsLoading(false)
        if (field === 'email') {
            setEmail(admin.email)
        } else if (field === 'username') {
            setUsername(admin.username)
        } else if (field === 'password') {
            setPassword1('')
            setPassword2('')
            setPassword1Visible(false)
            setPassword2Visible(false)
        }
    }

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (editInfo[0] === 'firstName') {
                if (e.target.id !== 'firstName1' && e.target.id !== 'firstName2' && e.target.id !== 'firstName3' && e.target.id !== 'firstName4') {
                    if (editInfo[1].length <= 15 && validator.isAlpha(editInfo[1])) {
                        console.log('clicked outside of firstName')
                        editFirstName(admin.username, editInfo[1])
                        setEditInfo([])
                    } else {
                        setEditInfo([])
                    }
                }
            } else if (editInfo[0] === 'lastName') {
                if (e.target.id !== 'lastName1' && e.target.id !== 'lastName2' && e.target.id !== 'lastName3' && e.target.id !== 'lastName4') {
                    if (editInfo[1].length <= 15 && validator.isAlpha(editInfo[1])) {
                        console.log('clicked outside of lastName')
                        editLastName(admin.username, editInfo[1])
                        setEditInfo([])
                    } else {
                        setEditInfo([])
                    }
                }
            }
        }

        const handleEnterPress = (e) => {
            if (editInfo[0] === 'firstName' && e.key === 'Enter') {
                if (editInfo[1].length <= 15 && validator.isAlpha(editInfo[1])) {
                    console.log('clicked enter on firstName')
                    editFirstName(admin.username, editInfo[1])
                    setEditInfo([])
                } else {
                    setEditInfo([])
                }
            } else if (editInfo[0] === 'lastName' && e.key === 'Enter') {
                if (editInfo[1].length <= 15 && validator.isAlpha(editInfo[1])) {
                    console.log('clicked enter on lastName')
                    editLastName(admin.username, editInfo[1])
                    setEditInfo([])
                } else {
                    setEditInfo([])
                }
            } else if (isEditing === 'email' && e.key === 'Enter') {
                editEmail(admin.username, email)
            } else if (isEditing === 'username' && e.key === 'Enter') {
                editUsername(admin.username, username)
            } else if (isEditing === 'password' && e.key === 'Enter') {
                changePassword(admin.username, password1, password2)
            }
        }

        document.addEventListener('click', handleOutsideClick)
        document.addEventListener('keydown', handleEnterPress)

        return () => {
            document.removeEventListener('click', handleOutsideClick)
            document.removeEventListener('keydown', handleEnterPress)
        }
    }, [editInfo, isEditing, email, username, password1, password2])

    
    return (
        <div className="idk:p-20 xxxs:p-10 xxxxs:p-5">
            <div className="flex flex-col gap-5">
                <h1 className="font-bold text-3xl">Settings</h1>
                {/* <button className="bg-blue-400 p-2 rouned-md font-bold text-white" onClick={() => editFirstName(admin.username, 'deviin')}>Edit First Name</button>
                <button className="bg-blue-400 p-2 rouned-md font-bold text-white" onClick={() => editLastName(admin.username, 'willy')}>Edit Last Name</button>
                <button className="bg-blue-400 p-2 rouned-md font-bold text-white" onClick={() => editEmail(admin.username, 'something@gmail.com')}>Edit Email</button> */}
                <div className="border border-solid border-black p-5 rounded-md bg-white flex flex-col gap-5">
                    <h2 className="font-semibold text-lg">Edit Settings</h2>
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-2">
                            <div className="flex xxs:flex-row xxxxs:flex-col gap-2 xxs:items-center">
                                <p className="font-medium hover:cursor-default">First Name:</p>
                                <div id='firstName1' className={`${editInfo[0] === 'firstName' ? '' : 'border border-solid border-stone-300 hover:border-stone-500 hover:cursor-pointer p-2'}  rounded  flex items-center w-fit gap-2`} onClick={() => handleChangeEditInfo('firstName')}>
                                    {editInfo[0] !== 'firstName' && <p id='firstName2'>{admin.firstName}</p>}
                                    {editInfo[0] !== 'firstName' && <FaPencil id='firstName3'/>}
                                    {editInfo[0] === 'firstName' && <input autoFocus autoComplete="off" spellCheck="false" id='firstName4' type="text" className="!outline-none 2xl:w-[1900px] xl:w-[1600px] lg:w-[1350px] md:w-[1100px] kdi:w-[850px] sm:w-[600px] idk:w-[450px]" onChange={(e) => handleChange(e.target.value)} value={editInfo[1]}></input>}
                                </div>
                            </div>
                            {editInfo[0] === 'firstName' && editInfo[1].length > 15 ? <p className="p-2 rounded-md bg-red-600 font-medium text-white">First name cannot have more than 15 characters</p> : null}
                            {editInfo[0] === 'firstName' && !validator.isAlpha(editInfo[1]) ? <p className="p-2 rounded-md bg-red-600 font-medium text-white">First name only allows letters A-Z</p> : null}
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex xxs:flex-row xxxxs:flex-col gap-2 xxs:items-center">
                                <p className="font-medium hover:cursor-default">Last Name:</p>
                                <div id='lastName1' className={`${editInfo[0] === 'lastName' ? '' : 'border border-solid border-stone-300 hover:border-stone-500 hover:cursor-pointer p-2'}  rounded  flex items-center w-fit gap-2`} onClick={() => handleChangeEditInfo('lastName')}>
                                    {editInfo[0] !== 'lastName' && <p id='lastName2'>{admin.lastName}</p>}
                                    {editInfo[0] !== 'lastName' && <FaPencil id='lastName3'/>}
                                    {editInfo[0] === 'lastName' && <input id='lastName4' autoFocus autoComplete="off" spellCheck="false" type="text" className="!outline-none 2xl:w-[1900px] xl:w-[1600px] lg:w-[1350px] md:w-[1100px] kdi:w-[850px] sm:w-[600px] idk:w-[450px]" onChange={(e) => handleChange(e.target.value)} value={editInfo[1]}></input>}
                                </div>
                            </div>
                            {editInfo[0] === 'lastName' && editInfo[1].length > 15 ? <p className="p-2 rounded-md bg-red-600 font-medium text-white">Last name cannot have more than 15 characters</p> : null}
                            {editInfo[0] === 'lastName' && !validator.isAlpha(editInfo[1]) ? <p className="p-2 rounded-md bg-red-600 font-medium text-white">Last name only allows letters A-Z</p> : null}
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex idk:flex-row xxxxs:flex-col gap-5 idk:items-center">
                                <div className="flex idk:flex-row xxxxs:flex-col gap-2 idk:items-center">
                                    <p className="font-medium hover:cursor-default">Email:</p>
                                    <div id='email1' className={`${isEditing === 'email' ? 'border border-solid border-black ' : 'border border-solid border-stone-300 hover:border-stone-500 hover:cursor-pointer'} p-2 rounded  flex items-center gap-2 w-fit`} onClick={() => handleChangeIsEditing('email')}>
                                        {isEditing !== 'email' && <p className="xs:max-w-sm xxs:max-w-[300px] xxxs:max-w-[190px] xxxxs:max-w-[175px] truncate" id='email2'>{email}</p>}
                                        {isEditing !== 'email' && <FaPencil id='email3'/>}
                                        {isEditing === 'email' && <input id='email4' autoFocus autoComplete="off" spellCheck="false" type="text" className="!outline-none bg-transparent w-full" onChange={(e) => setEmail(e.target.value)} value={email}></input>}
                                    </div>
                                </div>
                                {isEditing === 'email' &&
                                <div className="flex xxxs:flex-row xxxxs:flex-col gap-2">
                                    <button onClick={() => editEmail(admin.username, email)} className="p-2 rounded-md font-bold text-white bg-gradient-to-b from-gradient-su-blue to-gradient-su-teal flex items-center justify-center">{isLoading ? <span className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-white rounded-full"></span>: "Done"}</button>
                                    <button className="p-2 rounded-md font-bold text-neutral-700 bg-neutral-400" onClick={() => handleCancel('email')}>Cancel</button>
                                </div>}
                            </div>
                            {isEditing === 'email' && error ? <p className="p-2 rounded bg-red-600 text-white font-semibold">{error}</p> : null}
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex idk:flex-row xxxxs:flex-col gap-5 idk:items-center">
                                <div className="flex xxs:flex-row xxxxs:flex-col gap-2 xxs:items-center">
                                    <p className="font-medium hover:cursor-default">Username:</p>
                                    <div className={`${isEditing === 'username' ? 'border border-solid border-black' : 'border border-solid border-stone-300 hover:border-stone-500 hover:cursor-pointer'} p-2 rounded  flex items-center w-fit gap-2`} onClick={() => handleChangeIsEditing('username')}>
                                        {isEditing !== 'username' && <p className="">{admin.username}</p>}
                                        {isEditing !== 'username' && <FaPencil/>}
                                        {isEditing === 'username' && <input autoFocus autoComplete="off" spellCheck="false" id="username" type="text" className="!outline-none bg-transparent" onChange={(e) => setUsername(e.target.value)} value={username}></input>}
                                    </div>
                                </div>
                                {isEditing === 'username' && 
                                <div className="flex idk:flex-row xxxxs:flex-col gap-2">
                                    <button onClick={() => editUsername(admin.username, username)} className="p-2 rounded-md font-bold text-white bg-gradient-to-b from-gradient-su-blue to-gradient-su-teal flex items-center justify-center">{isLoading ? <span className="flex align-center animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-white rounded-full"></span> : "Done"}</button>
                                    <button className="p-2 rounded-md font-bold text-neutral-700 bg-neutral-400" onClick={() => handleCancel('username')}>Cancel</button>
                                </div>}
                            </div>
                            {isEditing === 'username' && error ? <p className="p-2 rounded bg-red-600 text-white font-semibold">{error}</p> : null}
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex kdi:flex-row xxxxs:flex-col gap-2 kdi:items-center">
                                <p className="font-medium hover:cursor-default">Password:</p>
                                {/* <button className="p-2 rounded-md font-bold text-neutral-700 bg-neutral-400" onClick={() => setIsEditing('')}>Cancel</button> */}
                                <div className={`${isEditing === 'password' ? '' : 'border border-solid border-stone-300 hover:border-stone-500 hover:cursor-pointer'} p-2 rounded  flex items-center w-fit gap-2`} onClick={() => handleChangeIsEditing('password')}>
                                    {isEditing !== 'password' && <p className="">{'\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022'}</p>}
                                    {isEditing !== 'password' && <FaPencil/>}
                                    {isEditing === 'password' &&
                                    // <div className="flex flex-col">
                                    //     <div className="flex items-center gap-5">
                                            <div className="flex kdi:flex-row xxxxs:flex-col gap-5">
                                                <div className="flex flex-col border border-solid border-black rounded-md gap-1 p-2 w-fit">
                                                    <p>New Password</p>
                                                    <div className="flex gap-2 items-center">
                                                        <input autoFocus autoComplete="off" spellCheck="false" className="border border-solid border-black rounded outline-none p-1 xxs:max-w-none xxxs:max-w-[170px] xxxxs:max-w-[140px]" type={password1Visible ? "text" : "password"}  onChange={(e) => setPassword1(e.target.value)} value={password1}></input>
                                                        {password1Visible ? <AiFillEyeInvisible className="hover:cursor-pointer" onClick={() => setPassword1Visible(!password1Visible)}/> : <AiFillEye className="hover:cursor-pointer" onClick={() => setPassword1Visible(!password1Visible)}/>}
                                                    </div>
                                                </div>
                                                <div className="flex flex-col border border-solid border-black rounded-md gap-1 p-2">
                                                    <p>Confirm New Password</p>
                                                    <div className="flex xxxs:gap-2 xxxs:justify-normal xxxxs:justify-between items-center">
                                                        <input autoComplete="off" spellCheck="false" className="border border-solid border-black rounded outline-none p-1 xxs:max-w-none xxxs:max-w-[170px] xxxxs:max-w-[140px]" type={password2Visible ? "text" : "password"} onChange={(e) => setPassword2(e.target.value)} value={password2}></input>
                                                        {password2Visible ? <AiFillEyeInvisible className="hover:cursor-pointer" onClick={() => setPassword2Visible(!password2Visible)}/> : <AiFillEye className="hover:cursor-pointer" onClick={() => setPassword2Visible(!password2Visible)}/>}
                                                    </div>
                                                </div>
                                            </div>}
                                        {/* </div>
                                    </div> */}
                                </div>
                                {isEditing === 'password' && 
                                <div className="flex idk:flex-row xxxxs:flex-col gap-2">
                                    <button className="p-2 rounded-md font-bold text-white bg-gradient-to-b from-gradient-su-blue to-gradient-su-teal flex items-center justify-center" onClick={() => changePassword(admin.username, password1, password2)}>{isLoading ? <span className="flex align-center animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-white rounded-full"></span> : "Done"}</button>
                                    <button className="p-2 rounded-md font-bold text-neutral-700 bg-neutral-400" onClick={() => handleCancel('password')}>Cancel</button>
                                </div>}
                            </div>
                            {isEditing === 'password' && error ? <p className="p-2 rounded bg-red-600 text-white font-semibold">{error}</p> : null}
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    )

}

export default Settings;