import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { FaGripVertical, FaImage, FaStar, FaLock, FaLockOpen, FaChartColumn, FaToggleOff, FaToggleOn, FaTrashCan, FaPencil, FaCheck } from 'react-icons/fa6'

const SortableLink = ({ index, link, id, editIndex, editField, isEditing, handleChange, handleClick, deleteLink, editLink }) => {

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: link._id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }


    return (
    <div style={style} className='flex py-3.5 xs:px-5 xxxs:px-2.5 xxxxs:px-1.5 bg-white rounded full shadow-xl border border-black mb-5' ref={setNodeRef} {...attributes}> 
        <FaGripVertical color='#A8A8A8' size={25} className='self-center mr-4 hover:cursor-grab shrink-0'  {...listeners}/>
        <div className='flex flex-col gap-5 mr-auto'> {/* Middle*/}
            <div className=''>
                {editIndex[0] === index ? (
                <div>
                    <div className='flex items-center gap-2' ref={editField}>
                        {editIndex[1] === "title" && <input type='text' autoFocus={isEditing} ref={editField} className='3xl:w-[73rem] 2xl:w-[62rem]  lg:w-[48rem] md:w-[37rem] kdi:w-[27rem] sm:w-[22rem] idk:w-[16rem] xs:w-[18rem] xxs:w-[12rem] xxxs:w-[7rem] xxxxs:w-[4rem] border-none outline-none font-medium ' id={'editTitle-' + index} onChange={(e) => handleChange(e.target.value)} value={editIndex[2]}/>}
                        {editIndex[1] === "url" && <p className='3xl:max-w-[73rem] 2xl:max-w-[62rem]  lg:max-w-[48rem] md:max-w-[37rem] kdi:max-w-[27rem] sm:max-w-[22rem] idk:max-w-[16rem] xs:max-w-[18rem] xxs:max-w-[12rem] xxxs:max-w-[7rem] xxxxs:max-w-[4rem] font-medium hover:cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis' onClick={() => handleClick(index, 'title', link.title)}>{link.title}</p>}
                        {editIndex[1] === "url" && <FaPencil className='hover:cursor-pointer' onClick={() => handleClick(index, 'title', link.title)}/>}
                    </div>
                    <div className='flex items-center gap-2' ref={editField}>
                        {editIndex[1] === "url" && <input type='text' autoFocus={isEditing} ref={editField} className='3xl:w-[73rem] 2xl:w-[62rem]  lg:w-[48rem] md:w-[37rem] kdi:w-[27rem] sm:w-[22rem] idk:w-[16rem] xs:w-[18rem] xxs:w-[12rem] xxxs:w-[7rem] xxxxs:w-[4rem] border-none outline-none font-medium ' onChange={(e) => handleChange(e.target.value)} value={editIndex[2]}/>}
                        {editIndex[1] === "title" && <p className='3xl:max-w-[73rem] 2xl:max-w-[62rem]  lg:max-w-[48rem] md:max-w-[37rem] kdi:max-w-[27rem] sm:max-w-[22rem] idk:max-w-[16rem] xs:max-w-[18rem] xxs:max-w-[12rem] xxxs:max-w-[7rem] xxxxs:max-w-[4rem] font-medium hover:cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis' onClick={() => handleClick(index, 'url', link.url)}>{link.url}</p>}
                        {editIndex[1] === "title" && <FaPencil className='hover:cursor-pointer' onClick={() => handleClick(index, 'url', link.url)}/>}
                    </div>     
                </div>
                ) : (
                <div>
                    <div className='flex items-center gap-2' >
                        <p className='3xl:max-w-[73rem] 2xl:max-w-[62rem]  lg:max-w-[48rem] md:max-w-[37rem] kdi:max-w-[27rem] sm:max-w-[22rem] idk:max-w-[16rem] xs:max-w-[18rem] xxs:max-w-[12rem] xxxs:max-w-[7rem] xxxxs:max-w-[4rem]  font-medium hover:cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis' id={'editTitle-' + index} onClick={() => handleClick(index, 'title', link.title)}>{link.title}</p>
                        <FaPencil className='hover:cursor-pointer'  id={'editTitle-' + index} onClick={() => handleClick(index, 'title', link.title)}/>
                    </div>
                    <div className='flex items-center gap-2' >
                        <p className='3xl:max-w-[73rem] 2xl:max-w-[62rem]  lg:max-w-[48rem] md:max-w-[37rem] kdi:max-w-[27rem] sm:max-w-[22rem] idk:max-w-[16rem] xs:max-w-[18rem] xxs:max-w-[12rem] xxxs:max-w-[7rem] xxxxs:max-w-[4rem]  font-medium hover:cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis' id={'editUrl-' + index} onClick={() => handleClick(index, 'url', link.url)}>{link.url}</p>
                        <FaPencil className='hover:cursor-pointer' id={'editUrl-' + index} onClick={() => handleClick(index, 'url', link.url)}/>
                    </div>
                </div>    
                )}
            </div>
            <div className='flex gap-6 xxxs:gap-3 xxxxs:gap-1.5 items-center'>
                <FaImage color='#404040' size={20} className='hover:cursor-pointer'/>
                <FaStar color='#404040' size={22} className='hover:cursor-pointer'/>
                <FaLock color='#404040' size={19} className='hover:cursor-pointer'/>
                <FaChartColumn color='#404040' size={20} className='hover:cursor-pointer'/>
            </div>                                  
        </div>{/* Middle*/}
        <div className='flex flex-col justify-between ml-4 shrink-0'>
            {link.visible ? <FaToggleOn color='green' size={22} className='hover:cursor-pointer' onClick={() => editLink(link._id, null, null, null, false)}/> : <FaToggleOff color='grey' size={22} className='hover:cursor-pointer' onClick={() => editLink(link._id, null, null, null, true)}/>}
            <FaTrashCan onClick={() => deleteLink(link.url)} color='black' size={20} className='hover:cursor-pointer'/>
        </div>
    </div>
    )
}

export default SortableLink;