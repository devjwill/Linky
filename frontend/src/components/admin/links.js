import { useEffect, useRef, useState } from 'react'
import { FaPlus, FaHeading, FaGripVertical, FaImage, FaStar, FaLock, FaLockOpen, FaChartColumn, FaToggleOff, FaToggleOn, FaTrashCan, FaPencil, FaCheck  } from 'react-icons/fa6'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useAdminContext } from '../../hooks/useAdminContext'
const Links = ({ windowWidth }) => {
    const { user } = useAuthContext()
    const { dispatch, admin } = useAdminContext()
    const [isAdding, setIsAdding] = useState(false)
    const [isLoading, setIsLoading] = useState(null)
    const [error, setError] = useState("")
    const [title, setTitle] = useState("")
    const [url, setUrl] = useState("")
    const [editIndex, setEditIndex] = useState([])
    const [isEditing, setIsEditing] = useState(false)
    const editField = useRef(null)

    // const helloWorld = () => {
    //     console.log("Hello World!")
    // }

    // const editLink = async (id, title, url, thumbnail, visible) => {
    //     let subject;
    //     let content;

    //     if (title) {
    //         subject = "title"
    //         content = title
    //     } else if (url) {
    //         subject = "url"
    //         content = url
    //     } else if (thumbnail) {
    //         subject = "thumbnail"
    //         content = thumbnail
    //     } else if (visible) {
    //         subject = "visible"
    //         content = visible
    //     }

    //     const response = await fetch('/api/admin/' + id, {
    //         method: 'PATCH',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'authorization': `Bearer ${user.token}`
    //         },
    //         body: {subject: content}
    //     })

    //     const json = await response.json()

    //     if(!response.ok) {
    //         console.log(json.error)
    //     }

    //     if(response.ok) {
    //         console.log("edit success")
    //     }
    // }

    useEffect(() => {
        const handleUserInteraction = (event) => {
            if (isEditing) {
                console.log(event)
                if (editIndex[1] === 'title') {
                    // if (event.key === "Enter") {
                    //     console.log("enter press")
                    //     editLink(admin.links[editIndex[0]]._id, editIndex[2], null, null, null)
                    //     setEditIndex([])
                    //     setIsEditing(false)  
                    //     return
                    // }

                    if (!editField.current.contains(event.target) && event.target.id !== `editTitle-${editIndex[0]}`) {
                        if (event.target.localName === "path" && event.target.parentElement.id === `editTitle-${editIndex[0]}`) {
                            console.log("path clicked")
                        } else {
                            console.log("click: outisde of title")
                            setEditIndex([])
                            setIsEditing(false)
                        }
                    }
                }

                if(editIndex[1] === 'url') {
                    if (event.key === "Enter") {
                        console.log("enter press")
                        setEditIndex([])
                        setIsEditing(false)
                        return
                    }

                    if (!editField.current.contains(event.target) && event.target.id !== `editUrl-${editIndex[0]}`) {
                        if (event.target.localName === "path" && event.target.parentElement.id === `editUrl-${editIndex[0]}`) {
                            console.log('path clicked')
                        } else {
                            console.log("click: outside of url")
                            console.log("New url: " + editIndex[2])
                            setEditIndex([])
                            setIsEditing(false) 
                        }
                    }
                }
            }
        }

            document.addEventListener('click', handleUserInteraction)
            document.addEventListener('keypress', handleUserInteraction)
        return () => {
            document.removeEventListener('click', handleUserInteraction)
            document.removeEventListener('keypress', handleUserInteraction)
        }
    }, [isEditing, editIndex])

    if (windowWidth > 767) {

        const handleTitleAdd = () => {
            console.log("Adding title to database")
        }

        const addLink = async () => {
            setError(null)
            setIsLoading(true)
            if (!title || !url) {
                setError("Input required inputs, Title and URL")
                setIsLoading(false)
                return error
            }
            
            const linkData = { url, title }
            const response = await fetch('/api/admin/' + admin.user.username, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(linkData)
            })

            const json = await response.json()

            if (!response.ok) {
                setIsLoading(false)
                setError(json.error)
            }

            if (response.ok) {
                setTitle("")
                setUrl("")
                setError(null)
                setIsLoading(false)
                setIsAdding(false)
                dispatch({type: "ADD_LINK", payload:json})
                console.log(json)
                console.log(admin)
            }
        }

        const handleTitleAndURL = (e) => {
            e.preventDefault()
            console.log('handling title and url edit')
        }

        const deleteLink = async (url) => {
            console.log('deleting: ' + url)
            setError(null)
            const response = await fetch('/api/admin/' + admin.user.username, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({url})
            })

            const json = await response.json()

            if(!response.ok) {
                setError(json.error)
            }

            if(response.ok) {
                dispatch({type: "DELETE_LINK", payload: json})
                console.log(admin)
            }
        }

        const handleClick = (index, field, content) => {
            setEditIndex([index, field, content])
            setIsEditing(true)
        }

        const handleChange = (value) => {
            const updatedArr = [...editIndex]
            updatedArr[2] = value
            setEditIndex(updatedArr)
        }

        return (
            <div className="flex">
                {/* Link Side px-40 xl:px-40 xl:px-20 sm:px-10*/}
                <div className={`w-2/3 h-[calc(100vh-96px)] py-20 xl:px-40 lg:px-30 md:px-25 kdi:px-20 sm:px-10 idk:px-5  border-r border-r-solid border-divsion-line border-r-4`}>
                    {/* Buttons */}
                    <div className="flex flex-col gap-4 mb-12">
                        <button onClick={() => setIsAdding(true)} className='flex justify-center items-center gap-1 px-max py-3 rounded-full bg-app-blue text-white font-bold text-xl'><FaPlus className='inline' size={22}/>Add Link Window width: {windowWidth}</button>
                        <button onClick={handleTitleAdd} className='self-start flex justify-center gap-1 items-center px-5 py-2 rounded-full bg-gray-300 font-medium text-xl'><FaHeading className='inline'/>Add Header</button>
                        {error && <h1 className='bg-red-600 rounded-md p-3 text-white font-bold'>{error}</h1>}
                    </div>
                    {/* Links */}
                    <div className='max-h-[710px] overflow-auto'>
                        {isAdding && 
                        <div className='mb-5'>
                            <div className='bg-gray-400 p-5 flex justify-between'>
                                <input type='text' className='rounded p-3' placeholder='Title' onChange={(e) => setTitle(e.target.value)} value={title}></input>
                                <input type='text' className='rounded p-3' placeholder='Link' onChange={(e) => setUrl(e.target.value)} value={url}></input>
                                <button onClick={addLink}>{isLoading ? "Loading..." : "Done"}</button>
                            </div>  
                            {error && <h1 className='bg-red-600 rounded-md p-3 text-white font-bold'>{error}</h1>}                          
                        </div>}
                        <div>
                            {admin && admin.links.map((link, index) => (
                                <div key={index} className='flex py-3.5 px-5 bg-white rounded full shadow-xl border border-black mb-5'>
                                    <FaGripVertical color='#A8A8A8' size={25} className='self-center mr-4 hover:cursor-grab shrink-0'/>
                                    <div className='flex flex-col gap-5 mr-auto'> {/* Middle*/}
                                        <div className=''>
                                            {editIndex[0] === index ? (
                                            <div>
                                                <div className='flex items-center gap-2' ref={editField}>
                                                    {editIndex[1] === "title" && <input type='text' autoFocus={isEditing} ref={editField} className='3xl:w-[73rem] 2xl:w-[62rem]  lg:w-[48rem] md:w-[39rem] kdi:w-[30rem] sm:w-[25rem] idk:w-[18rem] border-none outline-none font-medium ' onChange={(e) => handleChange(e.target.value)} value={editIndex[2]}/>}
                                                    {editIndex[1] === "url" && <p className='3xl:max-w-[73rem] 2xl:max-w-[62rem]  lg:max-w-[48rem] md:max-w-[39rem] kdi:max-w-[30rem] sm:max-w-[25rem] idk:max-w-[18rem] font-medium hover:cursor-pointer' onClick={() => handleClick(index, 'title', link.title)}>{link.title}</p>}
                                                    {editIndex[1] === "url" && <FaPencil className='hover:cursor-pointer' onClick={() => handleClick(index, 'title', link.title)}/>}
                                                </div>
                                                <div className='flex items-center gap-2' ref={editField}>
                                                    {editIndex[1] === "url" && <input type='text' autoFocus={isEditing} ref={editField} className='3xl:w-[73rem] 2xl:w-[62rem]  lg:w-[48rem] md:w-[39rem] kdi:w-[30rem] sm:w-[25rem] idk:w-[18rem] border-none outline-none font-medium ' onChange={(e) => handleChange(e.target.value)} value={editIndex[2]}/>}
                                                    {editIndex[1] === "title" && <p className='3xl:max-w-[73rem] 2xl:max-w-[62rem]  lg:max-w-[48rem] md:max-w-[39rem] kdi:max-w-[30rem] sm:max-w-[25rem] idk:max-w-[18rem] font-medium hover:cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis' onClick={() => handleClick(index, 'url', link.url)}>{link.url}</p>}
                                                    {editIndex[1] === "title" && <FaPencil className='hover:cursor-pointer' onClick={() => handleClick(index, 'url', link.url)}/>}
                                                </div>     
                                            </div>
                                            ) : (
                                            <div>
                                                {/* id={"editTitle-" + index} onClick={() => handleClick(index, 'title', link.title)} */}
                                                <div className='flex items-center gap-2' >
                                                    <p className='3xl:max-w-[73rem] 2xl:max-w-[62rem]  lg:max-w-[48rem] md:max-w-[39rem] kdi:max-w-[30rem] sm:max-w-[25rem] idk:max-w-[18rem] font-medium hover:cursor-pointer' id={'editTitle-' + index} onClick={() => handleClick(index, 'title', link.title)}>{link.title}</p>
                                                    <FaPencil className='hover:cursor-pointer'  id={"editTitle-" + index} onClick={() => handleClick(index, 'title', link.title)}/>
                                                </div>
                                                {/* id={'editUrl-' + index} onClick={() => handleClick(index, 'url', link.url)} */}
                                                <div className='flex items-center gap-2' >
                                                    <p className='3xl:max-w-[73rem] 2xl:max-w-[62rem]  lg:max-w-[48rem] md:max-w-[39rem] kdi:max-w-[30rem] sm:max-w-[25rem] idk:max-w-[18rem] font-medium hover:cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis' id={'editUrl-' + index} onClick={() => handleClick(index, 'url', link.url)}>{link.url}</p>
                                                    <FaPencil className='hover:cursor-pointer' id={'editUrl-' + index} onClick={() => handleClick(index, 'url', link.url)}/>
                                                </div>
                                            </div>    
                                            )}
                                        </div>
                                        <div className='flex gap-6 items-center'>
                                            <FaImage color='#404040' size={20} className='hover:cursor-pointer'/>
                                            <FaStar color='#404040' size={22} className='hover:cursor-pointer'/>
                                            <FaLock color='#404040' size={19} className='hover:cursor-pointer'/>
                                            <FaChartColumn color='#404040' size={20} className='hover:cursor-pointer'/>
                                        </div>                                  
                                    </div>{/* Middle*/}
                                    <div className='flex flex-col justify-between ml-4 shrink-0'>
                                        {link.visible ? <FaToggleOn color='green' size={22} className='hover:cursor-pointer'/> : <FaToggleOff color='grey' size={22} className='hover:cursor-pointer'/>}
                                        <FaTrashCan onClick={() => deleteLink(link.url)} color='black' size={20} className='hover:cursor-pointer'/>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Phone Preview Side */}
                <div className="w-1/3 p-32">
                    <div className="bg-black p-20 border rounded-xl shadow-md flex">
                        <div className='bg-white w-[32rem] h-[35rem] rounded'></div>
                    </div>
                </div>
            </div>
        ) 
    } else {
        return (
            <div>
                <h1>small screen gang</h1>
            </div>
        )
    }

}

export default Links;