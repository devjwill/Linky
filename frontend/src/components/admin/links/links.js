import { useEffect, useMemo, useRef, useState } from 'react'
import { FaPlus, FaHeading, FaGripVertical, FaImage, FaStar, FaLock, FaLockOpen, FaChartColumn, FaToggleOff, FaToggleOn, FaTrashCan, FaPencil, FaCheck  } from 'react-icons/fa6'
import { useAuthContext } from '../../../hooks/useAuthContext'
import { useAdminContext } from '../../../hooks/useAdminContext'
import Preview from '../preview'
import LinkButtons from './linkButtons'
import SortableLink from './sortableLink'
import { DndContext, closestCenter, onDragStat } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

const Links = ({ windowWidth, windowHeight, linkIds }) => {
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
    const [exampleIndex, setExampleIndex] = useState(null)
    const examples = [{title: "Youtube", link: "youtube.com/@MrBeast"}, {title: "Twitter", link: "twitter.com/elonmusk"}, {title: "Instagram", link: "instagram.com/cristiano"}]
    const [linksHeight, setLinksHeight] = useState(null)

    const editLink = async (id, title, url, thumbnail, visible) => {
        
        const content = {
            title: title,
            url: url,
            thumbnail: thumbnail,
            visible: visible
        }

        if(title || url) {
            if (content.title === admin.links[editIndex[0]].title || content.url === admin.links[editIndex[0]].url) {
                console.log("title or url copy")
                setEditIndex([])
                setIsEditing(false)
                return
            }  
        }


        const response = await fetch('/api/admin/patch', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({id, content})
        })

        const json = await response.json()

        if(!response.ok) {
            console.log(json.error)
        }

        if(response.ok) {
            console.log("edit success")
            setEditIndex([])
            setIsEditing(false)
            dispatch({type: "EDIT_LINK", payload:json})
        }
    }

    useEffect(() => {
        const handleUserInteraction = (event) => {
            if (isEditing) {
                console.log(event)
                console.log(editField.current)
                if (editIndex[1] === 'title') {
                    if (event.key === "Enter") {
                        console.log("enter press")
                        editLink(admin.links[editIndex[0]]._id, editIndex[2], null, null, null)
                    }

                    if (!editField.current.contains(event.target) && event.target.id !== `editTitle-${editIndex[0]}`) {
                        if (event.target.localName === "path" && event.target.parentElement.id === `editTitle-${editIndex[0]}`) {
                            console.log("title: path clicked")
                        } else {
                            console.log("click: outisde of title")
                            editLink(admin.links[editIndex[0]]._id, editIndex[2], null, null, null)
                        }
                    }
                }

                if(editIndex[1] === 'url') {
                    if (event.key === "Enter") {
                        console.log("enter press")
                        editLink(admin.links[editIndex[0]]._id, null, editIndex[2], null, null)
                    }

                    if (!editField.current.contains(event.target) && event.target.id !== `editUrl-${editIndex[0]}`) {
                        if (event.target.localName === "path" && event.target.parentElement.id === `editUrl-${editIndex[0]}`) {
                            console.log('url: path clicked')
                            // editLink(admin.links[editIndex[0]]._id, null, editIndex[2], null, null)
                        } else {
                            console.log("click: outside of url")
                            editLink(admin.links[editIndex[0]]._id, null, editIndex[2], null, null)
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

    useEffect (() => {
        let content = 304
        if(!error) {
            content += 112
            setLinksHeight(windowHeight - content)
        } else if (error) {
            content += 184
            setLinksHeight(windowHeight - content)
        }
    }, [isAdding, error, windowHeight])

    if (windowWidth > 767) {

        const handleLinkAdd = () => {
            const randomNumber = Math.floor(Math.random() * 3)
            setExampleIndex(randomNumber)
            setIsAdding(true)
        }

        const handleTitleAdd = () => {
            console.log("Adding title to database")
        }

        const handleCancelLinkAdd = () => {
            setError(null)
            setIsAdding(false)
        }

        const addLink = async () => {
            setError(null)
            setIsLoading(true)
            if (!title || !url) {
                setError("Title and Link required")
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

        const editOrder = async (username, userLinks) => {
            console.log("editing order of links")
            const response = await fetch('/api/admin/patch', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({username, userLinks})
            })

            // const json = await response.json()

            if (!response.ok) {
                console.log("reorder unseccessful")
            }

            if (response.ok) {
                console.log("reorder successful")
                // console.log(json)
                // dispatch({type: 'EDIT_ORDER', payload: json})
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

        const handleDragEnd = (event) => {
            const { active, over } = event
            const array = admin.links.map(link => link._id)

            console.log("ACTIVE: " + active.id)
            console.log("OVER: " + over.id)

            const activeIndex = array.indexOf(active.id)
            const overIndex = array.indexOf(over.id)

            if (active.id != over.id) {
                const links = arrayMove(array, activeIndex, overIndex).map(id => admin.links.find(link => link._id === id))
                const userLinks = arrayMove(array, activeIndex, overIndex)
                dispatch({type: 'EDIT_ORDER', payload: {links, userLinks}})
                editOrder(admin.user.username, userLinks)
            } else {
                console.log("drag ended on same link")
            }
        }

        return (
            <div className="flex">
                {/* Link Side */}
                <div className='h-[calc(100vh-96px)] w-2/3 py-20 xl:px-40 lg:px-30 md:px-25 kdi:px-20 sm:px-10 idk:px-5 border-r border-r-solid border-divsion-line border-r-4'>
                    {/* Buttons */}
                    {admin && <LinkButtons admin={admin} isAdding={isAdding} handleLinkAdd={handleLinkAdd} addLink={addLink} isLoading={isLoading} handleTitleAdd={handleTitleAdd} handleCancelLinkAdd={handleCancelLinkAdd} title={title} setTitle={setTitle} url={url} setUrl={setUrl} examples={examples} exampleIndex={exampleIndex} error={error} windowWidth={windowWidth} windowHeight={windowHeight} FaPlus={FaPlus} FaHeading={FaHeading} />}
                    <div>
                        {admin && 
                        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} >
                            <SortableContext items={admin.links.map(link => link._id)} strategy={verticalListSortingStrategy}>
                                <div className='p-4 overflow-auto' style={{ maxHeight: `${linksHeight}px` }} id='links'>
                                    {admin.links.map((link, index) => <SortableLink key={link._id} id={link._id} link={link} index={index} editIndex={editIndex} editField={editField} isEditing={isEditing} handleChange={handleChange} handleClick={handleClick} deleteLink={deleteLink} editLink={editLink} handle/>)}
                                </div>
                            </SortableContext>
                        </DndContext>
                        }
                    </div>
                </div>
                {/* Phone Preview Side */}
                {admin && <Preview admin={admin}/>}
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