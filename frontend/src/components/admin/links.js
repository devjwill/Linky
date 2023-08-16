import { useState } from 'react'
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
    // const [isEditingTitle, setIsEditingTitle] = useState(false)
    // const [editTitle, setEditTitle] = useState("")
    // const [isEditingURL, setIsEditingURL] = useState(false)
    // const [editURL, setEditURL] = useState("")

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

        return (
            <div className="">
                {/* Link Side */}
                <div className={`w-2/3 h-[calc(100vh-96px)] py-20 px-40 border-r border-r-solid border-divsion-line border-r-4`}>
                    {/* Buttons */}
                    <div className="flex flex-col gap-4 mb-12">
                        <button onClick={() => setIsAdding(true)} className='flex justify-center items-center gap-1 px-max py-3 rounded-full bg-app-blue text-white font-bold text-xl'><FaPlus className='inline' size={22}/>Add Link</button>
                        <button onClick={handleTitleAdd} className='self-start flex justify-center gap-1 items-center px-5 py-2 rounded-full bg-gray-300 font-medium text-xl'><FaHeading className='inline'/>Add Header</button>
                    </div>
                    {/* Links */}
                    <div>
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
                                    <FaGripVertical color='#A8A8A8' size={25} className='self-center mr-4 hover:cursor-grab'/>
                                    <div className='flex flex-col gap-5 mr-auto'> {/* Middle*/}
                                        <div className=''>
                                            <div className='flex items-center gap-2'>
                                                <p className='font-medium hover:cursor-pointer '>{link.title}</p>
                                                <FaPencil className='hover:cursor-pointer'/>
                                            </div>
                                            <div className=' flex items-center gap-2'>
                                                <p className='max-w-[42rem] font-medium hover:cursor-pointer whitespace-nowrap overflow-hidden text-overflow-ellipsis'>{link.url}</p>
                                                <FaPencil className='hover:cursor-pointer'/>
                                            </div>
                                        </div>
                                        <div className='flex gap-6 items-center'>
                                            <FaImage color='#404040' size={20} className='hover:cursor-pointer'/>
                                            <FaStar color='#404040' size={22} className='hover:cursor-pointer'/>
                                            <FaLock color='#404040' size={19} className='hover:cursor-pointer'/>
                                            <FaChartColumn color='#404040' size={20} className='hover:cursor-pointer'/>
                                        </div>                                  
                                    </div>{/* Middle*/}
                                    <div className='flex flex-col justify-between ml-4'>
                                        <FaToggleOn color='green' size={22} className='hover:cursor-pointer'/>
                                        <FaTrashCan color='black' size={20} className='hover:cursor-pointer'/>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Phone Preview Side */}
                <div className="w-1/3">

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