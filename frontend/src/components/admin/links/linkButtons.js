const LinkButtons = ({admin, isAdding, handleLinkAdd, addLink, isLoading, handleTitleAdd, handleCancelLinkAdd, title, setTitle, url, setUrl, examples, exampleIndex, error, windowWidth, windowHeight, FaPlus, FaHeading }) => {
    if (admin.links.length === 0 && !isAdding) {
        return (
            <div className="flex flex-col justify-center h-full">
                <h1 className="text-3xl font-bold text-center">You currently have no links, click <span className="text-transparent bg-clip-text bg-gradient-to-b from-gradient-su-blue to-gradient-su-teal hover:cursor-pointer" onClick={handleLinkAdd}>here</span> to get started.</h1>
            </div>
        )
    } else if (!isAdding) {
        return (
            <div className="flex flex-col gap-4 ">
                <button onClick={handleLinkAdd} className='flex justify-center items-center gap-1 px-max py-3 rounded-full bg-app-blue text-white font-bold text-xl'><FaPlus className='inline' size={22}/>Add link</button>
                {/* <button onClick={handleTitleAdd} className='self-start flex justify-center gap-1 items-center px-5 py-2 rounded-full bg-gray-300 font-medium text-xl'><FaHeading className='inline'/>Add Header</button> */}
                {error && <h1 className='bg-red-600 rounded-md p-3 text-white font-bold'>{error}</h1>}
            </div>
        )
    } else if (isAdding) {
        return (
            <div className='border border-solid border-black rounded shadow-xl bg-white flex flex-col gap-5 p-5 '>
                <div className='flex justify-between items-center '>
                    {/* {windowWidth > 767 &&  */}
                    <div>
                        <h2 className='font-bold'>Title:</h2>
                        <input type='text' className='md:w-auto kdi:w-52 sm:w-48 idk:w-40 xs:w-40 xxs:w-32 xxxs:w-24 border border-solid border-gray-400 rounded p-3 bg-gray-200' placeholder={`e.g. ${examples[exampleIndex].title}`} onChange={(e) => setTitle(e.target.value)} value={title}></input>
                    </div>
                    {/* {windowWidth > 767 && */}
                    <div>
                        <h2 className='font-bold'>Link:</h2>
                        <input type='text' className='md:w-auto kdi:w-48 sm:w-48 idk:w-40 xs:w-40 xxs:w-32 xxxs:w-24 border border-solid border-gray-400 rounded p-3 bg-gray-200' placeholder={`e.g. ${examples[exampleIndex].link}`} onChange={(e) => setUrl(e.target.value)} value={url}></input>
                    </div>
                
                    {/* {windowWidth < 767 &&
                    <div className="flex flex-col">
                        <div>
                            <h2 className='font-bold'>Title:</h2>
                            <input type='text' className='md:w-auto kdi:w-52 sm:w-48 idk:w-40  border border-solid border-gray-400 rounded p-3 bg-gray-200' placeholder={`e.g. ${examples[exampleIndex].title}`} onChange={(e) => setTitle(e.target.value)} value={title}></input>
                        </div>
                        <div>
                            <h2 className='font-bold'>Link:</h2>
                            <input type='text' className='md:w-auto kdi:w-48 sm:w-48 idk:w-40 border border-solid border-gray-400 rounded p-3 bg-gray-200' placeholder={`e.g. ${examples[exampleIndex].link}`} onChange={(e) => setUrl(e.target.value)} value={url}></input>
                        </div> 
                    </div>} */}
                    <div className='flex flex-col gap-2'>
                        <button onClick={addLink} className='py-1 px-2 rounded-md bg-[#008000] text-white font-medium'>{isLoading ? "Loading..." : "Done"}</button>
                        <button onClick={handleCancelLinkAdd} className='py-1 px-2 rounded-md bg-gray-400 font-medium'>Cancel</button>
                    </div>               
                </div>
                {error && <h1 className='bg-red-600 rounded-md p-3 text-white font-bold text-center'>{error}</h1>}
            </div>
        )
    }
}

export default LinkButtons;