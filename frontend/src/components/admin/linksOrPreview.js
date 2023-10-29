import { AiFillEye } from 'react-icons/ai'
import { FaLink } from 'react-icons/fa6'
const LinksOrPreview = ({ isVisible, setIsVisible }) => {
    if (isVisible === 'links') {
        return (
            <div className='flex justify-center'>
                <div className='flex items-center gap-2 shadow-xl rounded-full py-2 px-3 bg-app-blue hover:cursor-pointer' onClick={() => setIsVisible('preview')}>
                    <p className='font-bold text-white'>Preview</p>
                    <AiFillEye color='white'/>
                </div>
            </div>
        )
    } else if (isVisible === 'preview') {
        return (
            <div className='flex justify-center'>
                <div className='flex items-center gap-2 shadow-xl rounded-full py-2 px-3 bg-app-blue hover:cursor-pointer' onClick={() => setIsVisible('links')}>
                    <p className='font-bold text-white'>Links</p>
                    <FaLink color='white'/>
                </div>
            </div>
        )
    }
}

export default LinksOrPreview