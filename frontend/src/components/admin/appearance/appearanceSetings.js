import { FaCircleUser } from "react-icons/fa6"
import { useEffect, useRef, useState } from "react"
import { useAuthContext } from "../../../hooks/useAuthContext"

 //Background Images
import space from '../../../assests/space.jpg'
import matrix from '../../../assests/matrix.jpg'
import sunset from '../../../assests/sunset.jpg'
import graffiti from '../../../assests/graffiti.jpg'
import sea from '../../../assests/sea.jpg'
import jungle from '../../../assests/jungle.jpg'
import bookshelf from '../../../assests/bookshelf.jpg'
import gaming from '../../../assests/gaming.jpg'

// import { ChromePicker, CompactPicker, CustomPicker, SketchPicker, ColorfulPicker, HuePicker, CirclePicker, AlphaPicker, BlockPicker, GithubPicker, GooglePicker } from 'react-color'
import Colorful from '@uiw/react-color-colorful'


const ApperanceSettings = ({ admin, dispatch, windowWidth, windowHeight }) => {
    const { user } = useAuthContext()
    const colors = ['#FF0000', '#FFA500', '#FFFF00', '#008000', '#0000FF', '#4B0082', '#9400D3']
    const [backgrounds, setBackgrounds] = useState([{
        name: 'Solid',
        type: 'color',
        active: false,
        design: admin.user.appearance.background.length <= 7 && admin.user.appearance.background[0] === '#' ? admin.user.appearance.background : colors[Math.floor(Math.random() * colors.length)]
    },
    {
        name: 'Gradient',
        active: false,
        type: 'gradient',
        design: admin.user.appearance.background.length > 7 && admin.user.appearance.background[0] === '#' ? admin.user.appearance.background : `${colors[Math.floor(Math.random() * colors.length)]} ${colors[Math.floor(Math.random() * colors.length)]} up`
    },
    {
        name: 'Space',
        type: 'image',
        active: false,
        design: `url('${space}')` 
    },
    {
        name: 'Matrix',
        type: 'image',
        active: false,
        design: `url('${matrix}')` 
    },
    {
        name: 'Sunset',
        type: 'image',
        active: false,
        design: `url('${sunset}')` 
    },
    {
        name: 'Graffiti',
        type: 'image',
        active: false,
        design: `url('${graffiti}')` 
    },
    {
        name: 'Sea',
        type: 'image',
        active: false,
        design: `url('${sea}')` 
    },
    {
        name: 'Jungle',
        type: 'image',
        active: false,
        design: `url('${jungle}')`
    },
    {
        name: 'Bookshelf',
        type: 'image',
        active: false,
        design: `url('${bookshelf}')`
    },
    {
        name: 'Gaming',
        type: 'image',
        active: false,
        design: `url('${gaming}')`
    }])
    const [activeIndex, setActiveIndex] = useState(admin.user.appearance.background[0] === '#' ? backgrounds.findIndex((item) => item.design === admin.user.appearance.background) : backgrounds.findIndex((item) => item.name === admin.user.appearance.background))
    const [profileTitle, setProfileTitle] = useState(admin.user.appearance.profileTitle)
    const [bio, setBio] = useState(admin.user.bio)
    const [profileTitleCharCount, setProfileTitleCharCount] = useState(0)
    const [bioCharCount, setBioCharCount] = useState(0)
    const [bgColor, setBgColor] = useState(backgrounds[0].design)
    const [bgGradient, setBgGradient] = useState(backgrounds[1].design)
    const [gradientDirection, setGradientDirection] = useState(backgrounds[1].design.split(" ")[2])
    const [isEditing, setIsEditing] = useState("")
    const profileTitleRef = useRef(null)
    const bioRef = useRef(null)
    const bgColorRef = useRef(null)
    const bgGradientRef1 = useRef(null)
    const bgGradientRef2 = useRef(null)
    const colorPicker = useRef(null)
    const gradientPicker1 = useRef(null)
    const gradientPicker2 = useRef(null)

    const editProfilePicture = async (username, profilePicture) => {
        const response = await fetch('/api/admin/patch', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({username, profilePicture})
        })

        const json = await response.json() 

        if (!response.ok) {
            console.log(json.error)
        } else if (response.ok) {
            dispatch({type:'EDIT_PROFILE_PICTURE', payload: json})
            console.log('profile picture edited')
        }
    }

    const changeBackground = async (username, background) => {
        if (username && background && background !== admin.user.appearance.background) {
            // if (background[0] === '#')
            const response = await fetch('/api/admin/patch', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({username, background})
            })
            
            const json = await response.json()

            if (!response.ok) {
            console.log(json.error)
            } else if (response.ok) {
            dispatch({type: 'EDIT_BACKGROUND', payload: json})
            console.log("change background called")
            } 
        }
    }

    const editProfileTitle = async (username, profileTitle) => {
        if (profileTitle === admin.user.appearance.profileTitle) {
            console.log("no changes made to profile title")
        } else {
            const response = await fetch('/api/admin/patch', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({username, profileTitle})
            })

            const json = await response.json()

            if (!response.ok) {
                console.log(json.error)
            } else if (response.ok) {
                dispatch({type: 'EDIT_PROFILE_TITLE', payload: json})
                console.log("profile title change success")
            }
        }
    }

    const editBio = async (username, bio) => {
        if (bio === admin.user.bio) {
            console.log("no changes made to bio")
        } else {
            const response = await fetch('/api/admin/patch', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({username, bio})
            })

            const json = await response.json()

            if (!response.ok) {
                console.log(json.error)
            } else if (response.ok) {
                dispatch({type: 'EDIT_BIO', payload: json})
                console.log("bio change success")
            }            
        }
    }

    const editButtonDesign = async (username, design) => {
        if (username && design && design !== admin.user.appearance.buttons.design) {
            const response = await fetch('/api/admin/patch', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({username, design})
            })

            const json = await response.json() 

            if (!response.ok) {
                console.log(json.error)
            } else if (response.ok) {
                dispatch({type: 'EDIT_BUTTON_DESIGN', payload: json})
                console.log('change button design called')
            }
        }
    }

    const editButtonColor = async (username, btnColor) => {
        if (username && btnColor && btnColor !== admin.user.appearance.buttons.color) {
            const response = await fetch('/api/admin/patch', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({username, btnColor})
            }) 

            const json = await response.json()

            if (!response.ok) {
                console.log(json.error)
            } else if (response.ok) {
                dispatch({type: 'EDIT_BUTTON_COLOR', payload: json})
            }
        }
    }

    const editButtonShadowColor = async (username, btnShadowColor) => {
        if (username && btnShadowColor && btnShadowColor !== admin.user.appearance.buttons.shadowColor) {
            const response = await fetch('/api/admin/patch', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({username, btnShadowColor})
            }) 

            const json = await response.json()

            if (!response.ok) {
                console.log(json.error)
            } else if (response.ok) {
                dispatch({type: 'EDIT_BUTTON_SHADOW_COLOR', payload: json})
            }
        }
    }

    const editButtonFontColor = async (username, btnFontColor) => {
        if (username && btnFontColor && btnFontColor !== admin.user.appearance.buttons.fontColor) {
            const response = await fetch('/api/admin/patch', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({username, btnFontColor})
            }) 

            const json = await response.json()

            if (!response.ok) {
                console.log(json.error)
            } else if (response.ok) {
                dispatch({type: 'EDIT_BUTTON_FONT_COLOR', payload: json})
            } 
        }
    }

    useEffect(() => { 
        if (backgrounds[activeIndex].design[0] === "#") { //updated bacgrounds is either solid or gradient
            changeBackground(admin.user.username, backgrounds[activeIndex].design)
        } else if (backgrounds[activeIndex].design[0] !== '#') { //updated background is an image
            changeBackground(admin.user.username, backgrounds[activeIndex].name)
        }
    }, [activeIndex]) //handles change background calls when clicking a background example that isnt active

    useEffect(() => { //handles outside clicks and enter presses when editing profile title and bio
        const handleOutsideClick = (e) => {
            if (isEditing === "profileTitle") {
                if (profileTitleRef.current && !profileTitleRef.current.contains(e.target)) {
                    setIsEditing("")
                    console.log('clicked outside of profile title')
                    if (profileTitleCharCount < 31) {
                        editProfileTitle(admin.user.username, profileTitle) //call function to make change to profileTitle in db
                    } else {
                        console.log("maximum profile title character count")
                    }
                }
            } else if (isEditing === "bio") {
                if (bioRef.current && !bioRef.current.contains(e.target)) {
                    setIsEditing("")
                    console.log('clicked outside of bio')
                    if (bioCharCount < 81) {
                        editBio(admin.user.username, bio) //call function to make change to bio in db
                    } else {
                        console.log('maximum bio character count exceded')
                    }
                }
            } else if (isEditing === "bgColor") {
                if (bgColorRef.current && !bgColorRef.current.contains(e.target)) {
                    if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(backgrounds[0].design)) {
                        if (colorPicker.current.contains(e.target)) {
                            setIsEditing("")
                            document.getElementById('bgColor').blur()
                            console.log("clicked color picker while editing solid color")
                        } else {
                            setIsEditing("")
                            console.log("clicked outside bg color")
                            changeBackground(admin.user.username, backgrounds[0].design)
                        }
                    } else {
                        setIsEditing("")
                        console.log('clicked outside of bg color with invalid hex code')
                    }
                }
            } else if (isEditing === 'bgGradient1') {
                if (bgGradientRef1.current && !bgGradientRef1.current.contains(e.target)) {
                    if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(backgrounds[1].design.split(" ")[0])) { 
                        if (gradientPicker1.current.contains(e.target)) {
                            setIsEditing("")
                            document.getElementById('bgGradient1').blur()
                            console.log("clicked color picker while editing the first gradient color")
                        } else {
                            setIsEditing("")
                            console.log("clicked outside first bg gradient")
                            changeBackground(admin.user.username, backgrounds[1].design)
                        }
                    } else {
                        setIsEditing("")
                        console.log('clicked outside of the first bg gradient with invalid hex code')
                    }
                }
            } else if (isEditing === 'bgGradient2') {
                if (bgGradientRef2.current && !bgGradientRef2.current.contains(e.target)) {
                    if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(backgrounds[1].design.split(" ")[1])) {
                        if (gradientPicker2.current.contains(e.target)) {
                            setIsEditing("")
                            document.getElementById('bgGradient2').blur()
                            console.log("click color picker while editing the second gradient color")
                        } else {
                            setIsEditing("")
                            console.log("clciked outside the second bg gradient")
                            changeBackground(admin.user.username, backgrounds[1].design) 
                        }
                    } else {
                        setIsEditing("")
                        console.log('clicked outside of the second bg gradient with invalid hex code')
                    }
                }
            }
        }

        const handleEnterPress = (e) => {
            if (isEditing && e.key === 'Enter') {
                if (isEditing === "profileTitle") {
                    setIsEditing("")
                    document.getElementById(isEditing).blur()
                    console.log('clicked enter on profile title')
                    if (profileTitleCharCount < 31) {
                        editProfileTitle(admin.user.username, profileTitle) //call function to make change to profileTitle in db
                    } else {
                        console.log("maximum profile title character count")
                    }
                } else if (isEditing === "bio") {
                    setIsEditing("")
                    document.getElementById(isEditing).blur()
                    console.log('clicked enter on bio')
                    if (bioCharCount < 81) {
                        editBio(admin.user.username, bio) //call function to make change to bio in db
                    } else {
                        console.log('maximum bio character count exceded')
                    }
                } else if (isEditing === "bgColor") {
                    if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(backgrounds[0].design)) {
                        setIsEditing("")
                        document.getElementById('bgColor').blur()
                        console.log("clicked enter on bg color")
                        changeBackground(admin.user.username, backgrounds[0].design)
                    } else {
                        setIsEditing("")
                        document.getElementById('bgColor').blur()
                        console.log("clicked enter on bg color win invalid hex code")
                    }
                } else if (isEditing === 'bgGradient1') {
                    if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(backgrounds[1].design.split(" ")[0])) {
                        setIsEditing("")
                        document.getElementById('bgGradient1').blur()
                        console.log("clicked enter on first gradient text input")
                        changeBackground(admin.user.username, backgrounds[1].design)
                    } else {
                        setIsEditing("")
                        document.getElementById('bgGradient1').blur()
                        console.log("clicked enter on first gradient text input with invalid hex code")
                    }
                } else if (isEditing === 'bgGradient2') {
                    if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(backgrounds[1].design.split(" ")[1])) {
                        setIsEditing("")
                        document.getElementById('bgGradient2').blur()
                        console.log("clicked enter on second gradient text input")
                        changeBackground(admin.user.username, backgrounds[1].design) 
                    } else {
                        setIsEditing("")
                        document.getElementById('bgGradient2').blur()
                        console.log("clicked enter on second gradient text input with invalid hex code")
                    }
                }
            }
        }

        document.addEventListener('click', handleOutsideClick)
        document.addEventListener('keydown', handleEnterPress)

        return () => {
            document.removeEventListener('click', handleOutsideClick)
            document.removeEventListener('keydown', handleEnterPress)
        }
    }, [isEditing, profileTitle, bio, profileTitleCharCount, bioCharCount, bgColor, backgrounds])

    useEffect(() => { //keeps track of bio character length
        setBioCharCount(bio.length)
    }, [bio])

    useEffect(() => { //keeps track of profile title character length
        setProfileTitleCharCount(profileTitle.length) // keeps track of profile character length
    }, [profileTitle])

    useEffect(() => { //updates background example when change color
        const updatedBackgrounds = backgrounds
        updatedBackgrounds[0].design = bgColor
        setBackgrounds(updatedBackgrounds)
    }, [bgColor])

    useEffect(() => { // updates background example when change gradient
        const updatedBackgrounds = backgrounds
        updatedBackgrounds[1].design = `${bgGradient.split(" ")[0]} ${bgGradient.split(" ")[1]} ${gradientDirection}`
        setBackgrounds(updatedBackgrounds)

    }, [bgGradient])

    const dynamicStyles = (item) => {
        if (item.type === 'color') {
            return { background: item.design }
        } else if (item.type === 'image') {
            return { backgroundImage: item.design, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }
        } else if (item.type === 'gradient') {
            const colorsArr = item.design.split(" ") //bgGradient state or context ?
            const color1 = colorsArr[0]
            const color2 = colorsArr[1]
            // return { backgroundImage: `linear-gradient(to top, ${color1}, ${color2})` }
            if (gradientDirection === 'up' || !gradientDirection) {
                return { backgroundImage: `linear-gradient(to top, ${color1}, ${color2})` }
            } else if (gradientDirection === 'down') {
                return  { backgroundImage: `linear-gradient(to bottom, ${color1}, ${color2})` }
            }
        }
    }

    const active = (index) => {
        if (index === activeIndex) {
            return { border: '2px solid black', borderRadius: '10px', padding: '10px' }
        }
    }

    const editingStyles = (input) => {
        if (isEditing === input) {
            if (input === 'profileTitle' && profileTitleCharCount > 30 ) {
                return {border: '1px solid #DC2626' }
            } else if (input === 'bio' && bioCharCount > 80) {
                return { border: '1px solid #DC2626' }
            } else if (input === 'bgColor' && /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(bgColor) === false) {
                return { border: '1px solid #DC2626' }
            } else if (input === 'bgGradient1' && /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(bgGradient.split(" ")[0]) === false) {
                return { border: '1px solid #DC2626'}
            } else if (input === 'bgGradient2' && /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(bgGradient.split(" ")[1]) === false) {
                return { border: '1px solid #DC2626' }
            }
            return { border: '1px solid black' }
        }
    }

    const handleBackgroundChange = (index) => {
        if (index === activeIndex) {
            console.log('active index was clicked')
        } else {
            setActiveIndex(index)
        }
    }

    const handleDivClick = (name) => {
        setIsEditing(name)
        document.getElementById(name).focus()
    }

    const handleProfilePicChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                console.log(reader.result)
                editProfilePicture(admin.user.username, reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleTest = () => {
        console.log('handle test button')
    }

    const handleMouseUp = (name) => {
        console.log(name)
        if (name === 'solid') {
            console.log('mouse up event called on solid picker')
            changeBackground(admin.user.username, backgrounds[0].design)
        } else if (name === 'gradient') {
            console.log('mouse up event called on 1st gradient picker')
            changeBackground(admin.user.username, backgrounds[1].design)
        }
    }

    const handleGradientDirectionChange = (direction) => {
        if (gradientDirection === direction) {
            console.log("the gradient selected is already set")
        } else if (gradientDirection !== direction) {
            if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(bgGradient.split(" ")[0]) === false || /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(bgGradient.split(" ")[1]) === false) {
                console.log("invalid hex codes when trying to set gradient direction")
            } else {
                setGradientDirection(direction)
                const split = backgrounds[1].design.split(" ")
                let updatedBackgrounds = backgrounds
                // updatedBackgrounds[1].design = updatedBackgrounds[1].design + " " + gradientDirection
                updatedBackgrounds[1].design = `${split[0]} ${split[1]} ${direction}`
                setBackgrounds(updatedBackgrounds)
                changeBackground(admin.user.username, backgrounds[1].design)
            }
        }
    }


    return (
        <div className="flex flex-col gap-20">
            <div className="flex flex-col gap-5">
                <h1 className="text-3xl font-bold">Profile</h1>
                <button className="bg-blue-500 p-2 rounded-md text-white font-bold" onClick={handleTest}>Test me</button>
                <div className="flex flex-col gap-10 w-full border border-solid border-black border-1 rounded-md shadow-2xl bg-white p-5">
                    {!admin.user.profilePicture && 
                    <div className="flex gap-5">
                        <FaCircleUser color="737373" size={65} className="p-0 m-0"/>
                        <button className="rounded-full border border-solid border-app-blue w-full text-center bg-app-blue py-1.5 text-white font-semibold text-xl" onClick={() => document.getElementById('setProfilePictureBTN').click()}>Set Profile Picture</button>
                        <input type="file" id="setProfilePictureBTN" className="hidden" accept=".jpg, .jpeg, .png" onChange={handleProfilePicChange}></input>
                    </div>}
                    {admin.user.profilePicture && 
                    <div className="flex gap-5">
                        <img src={admin.user.profilePicture} className="w-[86px] h-[86px] border border-solid border-[#D9D9D9] rounded-full" alt="User's profile"></img>
                        <div className="flex flex-col w-full gap-2.5">
                            <button className="rounded-full border border-solid border-app-blue text-center bg-app-blue py-1.5 text-white font-semibold" onClick={() => document.getElementById('setProfilePictureBTN').click()}>Change Profile Picture</button>
                            <input type="file" id="setProfilePictureBTN" className="hidden" accept=".jpg, .jpeg, .png" onChange={handleProfilePicChange}></input>
                            <button className="rounded-full border border-solid border-[#D9D9D9] text-center py-1.5 font-semibold" onClick={() => editProfilePicture(admin.user.username, 'x')}>Remove Profile Picture</button>
                        </div>
                    </div>}
                    <div>
                        <div className="bg-[#D9D9D9] p-1.5 rounded-md" onClick={() => handleDivClick("profileTitle")} style={editingStyles("profileTitle")} ref={profileTitleRef}>
                            <p className="text-[#8F8F8F]" onClick={() => handleDivClick("profileTitle")}>Profile Title</p>
                            <input type="text" id="profileTitle" className="bg-[#D9D9D9] font-medium !outline-none w-full" value={profileTitle} onChange={(e) => setProfileTitle(e.target.value)} autoComplete="off"></input>
                        </div>
                        {profileTitleCharCount > 30 && <p className="px-1.5 text-red-600 text-sm">Profile cannot exceed 30 characters.</p>} 
                    </div>
                    <div className="flex flex-col">
                        <div className="bg-[#D9D9D9] p-1.5 rounded-md" onClick={() => handleDivClick("bio")} style={editingStyles("bio")} ref={bioRef}>
                            <p className="text-[#8F8F8F]">Bio</p>
                            <input type="text" id="bio" className="bg-[#D9D9D9] font-medium w-full !outline-none" value={bio} onChange={(e) => setBio(e.target.value)} autoComplete="off"></input>
                        </div>
                        <div className="flex">
                            {bioCharCount > 80 && <p className="px-1.5 text-red-600 text-sm">Bio cannot exceed 80 characters.</p>}
                            <p className={`ml-auto  text-sm ${bioCharCount < 81 ? 'text-[#8F8F8F]' : 'text-red-600'}`}>{bioCharCount} / 80</p>
                        </div> 
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-5">
                <h1 className="text-3xl font-bold">Backgrounds {windowWidth}</h1>
                <div className="w-full h-auto border border-solid border-black border-1 rounded-md shadow-2xl bg-white p-5">
                    <div className="w-full h-full inline-grid grid-cols-[repeat(auto-fill,_minmax(135px,_1fr))] gap-5 items-baseline">
                        {backgrounds.map((item, index) => (
                            <div key={item.name} className="hover:cursor-pointer h-full flex flex-col items-center justify-self-center " style={active(index)} onClick={() => handleBackgroundChange(index)}>
                                <div className="w-[130px] h-[175px] rounded-md" style={dynamicStyles(item)}></div>
                                <p className="text-center font-medium">{item.name}</p>
                            </div>
                        ))}
                    </div>
                    {activeIndex === 0 &&
                    <div className="mt-10 border-t border-t-solid border-t-stone-400 border-t-1 pt-5">
                        <p className="font-medium text-lg mb-2.5">Color</p>
                        <div className="flex gap-5 items-center justify-evenly">
                            <div id="colorPicker" className="bg-[#D9D9D9] p-3 rounded-md flex items-center" onMouseUp={() => handleMouseUp('solid')}>
                                <Colorful color={bgColor} disableAlpha={true}  onChange={(color) => {setBgColor(color.hex)}} className="border border-solid solid-black border-5" ref={colorPicker}/>
                            </div>
                            <div className="flex flex-col bg-[#D9D9D9] p-1.5 rounded-md" style={editingStyles("bgColor")} ref={bgColorRef} onClick={() => handleDivClick('bgColor')}>
                                <p className="text-[#8F8F8F]">Color</p>
                                <input type="text" id="bgColor" maxLength={7} value={bgColor} className="!outline-none bg-transparent uppercase" onChange={(e) => setBgColor(e.target.value)}></input>
                                {/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(bgColor) === false && <p className="text-red-500 font-bold">Invalid Color</p>}
                            </div>
                        </div>
                    </div>}
                    {activeIndex === 1 &&
                    <div className="mt-10 border-t border-t-solid border-t-stone-400 border-t-1 pt-5">
                        <p className="font-medium text-lg mb-2.5">Color</p>
                        <div className="flex justify-evenly mb-5">
                            <div className="flex flex-col gap-5">
                                <div id="gradientPicker1" className="bg-[#D9D9D9] p-3 rounded-md" onMouseUp={() => handleMouseUp("gradient")}>
                                    <p>Gradient Color #1</p>
                                    <Colorful color={bgGradient.split(" ")[0]} disableAlpha={true} onChange={(color) => {setBgGradient(`${color.hex} ${bgGradient.split(" ")[1]}`)}} ref={gradientPicker1}/>
                                </div>
                                <div ref={bgGradientRef1} className="flex flex-col bg-[#D9D9D9] p-1.5 rounded-md" style={editingStyles("bgGradient1")} onClick={() => handleDivClick('bgGradient1')}>
                                    <p className="text-[#8F8F8F]">Color</p>
                                    <input type="text" id="bgGradient1" maxLength={7} className="!outline-none bg-transparent uppercase" value={bgGradient.split(" ")[0]} onChange={(e) => setBgGradient(`${e.target.value} ${bgGradient.split(" ")[1]}`)}></input>
                                    {/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(bgGradient.split(" ")[0]) === false && <p className="text-red-500 font-bold">Invalid Color</p>}
                                </div>
                            </div>
                            <div className="flex flex-col gap-5"> 
                                <div id="gradientPicker2" className="bg-[#D9D9D9] p-3 rounded-md" onMouseUp={() => handleMouseUp("gradient")}>
                                    <p>Gradient Color #2</p>
                                    <Colorful color={`${bgGradient.split(" ")[1]}`} disableAlpha={true} onChange={(color) => {setBgGradient(`${bgGradient.split(" ")[0]} ${color.hex}`)}} ref={gradientPicker2}/>
                                </div>
                                <div ref={bgGradientRef2} className="flex flex-col bg-[#D9D9D9] p-1.5 rounded-md" style={editingStyles('bgGradient2')} onClick={() => handleDivClick('bgGradient2')}>
                                    <p className="text-[#8F8F8F]">Color</p>
                                    <input type="text" id="bgGradient2" maxLength={7} className="!outline-none bg-transparent uppercase" value={`${bgGradient.split(" ")[1]}`} onChange={(e) => setBgGradient(`${bgGradient.split(" ")[0]} ${e.target.value}`)}></input>
                                    {/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(bgGradient.split(" ")[1]) === false && <p className="text-red-500 font-bold">Invalid Color</p>}
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className="font-medium text-lg mb-2.5">Gradient</p>
                            <div className="flex gap-5">
                                <div className="flex items-center gap-2">
                                    <div className=" bg-[#D9D9D9] rounded-full w-8 h-8 p-1.5 hover:cursor-pointer" onClick={() => handleGradientDirectionChange('up')}>
                                        <button className={`${gradientDirection === 'up' && 'bg-neutral-500'} w-full h-full rounded-full hover:bg-neutral-400`} ></button>
                                    </div>
                                    <p>Gradient Up</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="bg-[#D9D9D9] rounded-full w-8 h-8 p-1.5 hover:cursor-pointer" onClick={() => handleGradientDirectionChange('down')}>
                                        <button className={`${gradientDirection === 'down' && 'bg-neutral-500'} w-full h-full rounded-full hover:bg-neutral-400`} ></button>
                                    </div>
                                    <p>Gradient Down</p>
                                </div>
                            </div>
                        </div>
                    </div>}
                </div>
            </div>
            <div className="flex flex-col">
                <h1 className="text-3xl font-bold">Buttons</h1>
                <div className="flex flex-col border border-solid border-black rounded-md bg-white p-5 gap-5">
                    <div className="flex flex-col gap-7">
                        <div className="flex flex-col gap-2">
                            <p className="font-medium">Fill</p>
                            <div className="flex gap-8">
                                <div className={`w-full h-[70px] p-2 ${admin.user.appearance.buttons.design === 'fill-square' && 'border border-solid border-black'}`} onClick={() => editButtonDesign(admin.user.username, 'fill-square')}>
                                    <button className="w-full h-full bg-black"></button>
                                </div>
                                <div className={`w-full h-[70px] p-2 ${admin.user.appearance.buttons.design === 'fill-rounded' && 'border border-solid border-black'}`} onClick={() => editButtonDesign(admin.user.username, 'fill-rounded')}>
                                    <button className="w-full h-full bg-black rounded-md"></button>
                                </div>
                                <div className={`w-full h-[70px] p-2 ${admin.user.appearance.buttons.design === 'fill-roundedFull' && 'border border-solid border-black'}`} onClick={() => editButtonDesign(admin.user.username, 'fill-roundedFull')}>
                                    <button className="w-full h-full bg-black rounded-full"></button>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="font-medium">Outline</p>
                            <div className="flex gap-8">
                                <div className={`w-full h-[70px] p-2 ${admin.user.appearance.buttons.design === 'outline-square' && 'border border-solid border-black'}`} onClick={() => editButtonDesign(admin.user.username, 'outline-square')}>
                                    <button className="w-full h-full border border-solid border-black"></button>
                                </div>
                                <div className={`w-full h-[70px] p-2 ${admin.user.appearance.buttons.design === 'outline-rounded' && 'border border-solid border-black'}`} onClick={() => editButtonDesign(admin.user.username, 'outline-rounded')}>
                                    <button className="w-full h-full border border-solid border-black rounded-md"></button>
                                </div>
                                <div className={`w-full h-[70px] p-2 ${admin.user.appearance.buttons.design === 'outline-roundedFull' && 'border border-solid border-black'}`} onClick={() => editButtonDesign(admin.user.username, 'outline-roundedFull')}>
                                    <button className="w-full h-full border border-solid border-black rounded-full"></button>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="font-medium">Soft Shadow</p>
                            <div className="flex gap-8">
                                <div className={`w-full h-[70px] p-2 ${admin.user.appearance.buttons.design === 'softShadow-square' && 'border border-solid border-black'}`} onClick={() => editButtonDesign(admin.user.username, 'softShadow-square')}>
                                    <button className="w-full h-full shadow-[0_8px_8px_0_rgb(0,0,0,0.24)]"></button>
                                </div>
                                <div className={`w-full h-[70px] p-2 ${admin.user.appearance.buttons.design === 'softShadow-rounded' && 'border border-solid border-black'}`} onClick={() => editButtonDesign(admin.user.username, 'softShadow-rounded')}>
                                    <button className="w-full h-full shadow-[0_8px_8px_0_rgb(0,0,0,0.24)] rounded-md"></button>
                                </div>
                                <div className={`w-full h-[70px] p-2 ${admin.user.appearance.buttons.design === 'softShadow-roundedFull' && 'border border-solid border-black'}`} onClick={() => editButtonDesign(admin.user.username, 'softShadow-roundedFull')}>
                                    <button className="w-full h-full shadow-[0_8px_8px_0_rgb(0,0,0,0.24)] rounded-full"></button>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="font-medium">Hard Shadow</p>
                            <div className="flex gap-8">
                                <div className={`w-full h-[70px] p-2 ${admin.user.appearance.buttons.design === 'hardShadow-square' && 'border border-solid border-black'}`} onClick={() => editButtonDesign(admin.user.username, 'hardShadow-square')}>
                                    <button className="w-full h-full border border-solid border-black shadow-[4px_4px_0_0_black] h-12"></button>
                                </div>
                                <div className={`w-full h-[70px] p-2 ${admin.user.appearance.buttons.design === 'hardShadow-rounded' && 'border border-solid border-black'}`} onClick={() => editButtonDesign(admin.user.username, 'hardShadow-rounded')}>
                                    <button className="w-full h-full border border-solid border-black shadow-[4px_4px_0_0_black] rounded-md"></button>
                                </div>
                                <div className={`w-full h-[70px] p-2 ${admin.user.appearance.buttons.design === 'hardShadow-roundedFull' && 'border border-solid border-black'}`} onClick={() => editButtonDesign(admin.user.username, 'hardShadow-roundedFull')}>
                                    <button className="w-full h-full border border-solid border-black shadow-[4px_4px_0_0_black] rounded-full"></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-between gap-3">
                        <div className="flex flex-col gap-1.5">
                            <p className="font-medium">Button Color</p>
                            <div className="flex gap-5">
                                <div className="w-24 h-auto bg-[#D9D9D9] p-2 rounded-md">
                                    <div className="w-full h-full rounded-md" style={{backgroundColor: admin.user.appearance.buttons.color}}></div> {/*  */}
                                </div>
                                <div className="flex flex-col bg-[#D9D9D9] p-1.5 rounded-md">
                                    <p className="font-medium">Button Color</p>
                                    <div className="flex flex-col gap-3">
                                        <div className="flex gap-3">
                                            <div className={`h-7 w-7 bg-red-600 border-solid border-2 ${admin.user.appearance.buttons.color === '#dc2626' ? 'border-black' : 'border-red-600 hover:border-neutral-500 hover:cursor-pointer'} rounded-full`} onClick={() => editButtonColor(admin.user.username, '#dc2626')}></div>
                                            <div className={`h-7 w-7 bg-orange-500 border-solid border-2 ${admin.user.appearance.buttons.color === '#f97316' ? 'border-black' : 'border-orange-500 hover:border-neutral-500 hover:cursor-pointer'} rounded-full`} onClick={() => editButtonColor(admin.user.username, '#f97316')}></div>
                                            <div className={`h-7 w-7 bg-yellow-400 border-solid border-2 ${admin.user.appearance.buttons.color === '#facc15' ? 'border-black' : 'border-yellow-400 hover:border-neutral-500 hover:cursor-pointer'} rounded-full`} onClick={() => editButtonColor(admin.user.username, '#facc15')}></div>
                                            <div className={`h-7 w-7 bg-green-600 border-solid border-2 ${admin.user.appearance.buttons.color === '#16a34a' ? 'border-black' : 'border-green-600 hover:border-neutral-500 hover:cursor-pointer'} rounded-full`} onClick={() => editButtonColor(admin.user.username, '#16a34a')}></div>
                                            <div className={`h-7 w-7 bg-blue-700 border-solid border-2 ${admin.user.appearance.buttons.color === '#1d4ed8' ? 'border-black' : 'border-blue-700 hover:border-neutral-500 hover:cursor-pointer'} rounded-full`} onClick={() => editButtonColor(admin.user.username, '#1d4ed8')}></div>                                        
                                        </div>
                                        <div className="flex gap-3">
                                            <div className={`h-7 w-7 bg-purple-700 border-solid border-2 ${admin.user.appearance.buttons.color === '#7e22ce' ? 'border-black' : 'border-purple-700 hover:border-neutral-500 hover:cursor-pointer'} rounded-full`} onClick={() => editButtonColor(admin.user.username, '#7e22ce')}></div>
                                            <div className={`h-7 w-7 bg-fuchsia-500 border-solid border-2 ${admin.user.appearance.buttons.color === '#d946ef' ? 'border-black' : 'border-fuchsia-500 hover:border-neutral-500 hover:cursor-pointer'} rounded-full`} onClick={() => editButtonColor(admin.user.username, '#d946ef')}></div>
                                            <div className={`h-7 w-7 bg-yellow-900 border-solid border-2 ${admin.user.appearance.buttons.color === '#713f12' ? 'border-black' : 'border-yellow-900 hover:border-neutral-500 hover:cursor-pointer'} rounded-full`} onClick={() => editButtonColor(admin.user.username, '#713f12')}></div>
                                            <div className={`h-7 w-7 bg-black border-solid border-2 ${admin.user.appearance.buttons.color === 'black' ? 'border-neutral-500' : 'border-black hover:border-neutral-500 hover:cursor-pointer'} rounded-full`} onClick={() => editButtonColor(admin.user.username, 'black')}></div>
                                            <div className={`h-7 w-7 bg-white border-solid border-2 ${admin.user.appearance.buttons.color === 'white' ? 'border-black' : 'border-white hover:border-neutral-500 hover:cursor-pointer'} rounded-full`} onClick={() => editButtonColor(admin.user.username, 'white')}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {(admin.user.appearance.buttons.design.split("-")[0] === 'hardShadow' || admin.user.appearance.buttons.design.split("-")[0] === 'softShadow') && 
                        <div className="flex flex-col gap-1.5">
                            <p className="font-medium">Button Shadow Color</p>
                            <div className="flex gap-5">
                                <div className="w-24 h-auto bg-[#D9D9D9] p-2 rounded-md">
                                    <div className="w-full h-full rounded-md" style={{backgroundColor: admin.user.appearance.buttons.shadowColor}}></div>
                                </div>
                                <div className="flex flex-col bg-[#D9D9D9] p-1.5 rounded-md">
                                    <p className="font-medium">Button Color</p>
                                    <div className="flex flex-col gap-3">
                                        <div className="flex gap-3">
                                            <div className={`h-7 w-7 bg-red-600 border-solid border-2 ${admin.user.appearance.buttons.shadowColor === '#dc2626' ? 'border-black' : 'border-red-600 hover:border-neutral-500 hover:cursor-pointer'} rounded-full`} onClick={() => editButtonShadowColor(admin.user.username, '#dc2626')}></div>
                                            <div className={`h-7 w-7 bg-orange-500 border-solid border-2 ${admin.user.appearance.buttons.shadowColor === '#f97316' ? 'border-black' : 'border-orange-500 hover:border-neutral-500 hover:cursor-pointer'} rounded-full`} onClick={() => editButtonShadowColor(admin.user.username, '#f97316')}></div>
                                            <div className={`h-7 w-7 bg-yellow-400 border-solid border-2 ${admin.user.appearance.buttons.shadowColor === '#facc15' ? 'border-black' : 'border-yellow-400 hover:border-neutral-500 hover:cursor-pointer'} rounded-full`} onClick={() => editButtonShadowColor(admin.user.username, '#facc15')}></div>
                                            <div className={`h-7 w-7 bg-green-600 border-solid border-2 ${admin.user.appearance.buttons.shadowColor === '#16a34a' ? 'border-black' : 'border-green-600 hover:border-neutral-500 hover:cursor-pointer'} rounded-full`} onClick={() => editButtonShadowColor(admin.user.username, '#16a34a')}></div>
                                            <div className={`h-7 w-7 bg-blue-700 border-solid border-2 ${admin.user.appearance.buttons.shadowColor === '#1d4ed8' ? 'border-black' : 'border-blue-700 hover:border-neutral-500 hover:cursor-pointer'} rounded-full`} onClick={() => editButtonShadowColor(admin.user.username, '#1d4ed8')}></div>                                        
                                        </div>
                                        <div className="flex gap-3">
                                            <div className={`h-7 w-7 bg-purple-700 border-solid border-2 ${admin.user.appearance.buttons.shadowColor === '#7e22ce' ? 'border-black' : 'border-purple-700 hover:border-neutral-500 hover:cursor-pointer'} rounded-full`} onClick={() => editButtonShadowColor(admin.user.username, '#7e22ce')}></div>
                                            <div className={`h-7 w-7 bg-fuchsia-500 border-solid border-2 ${admin.user.appearance.buttons.shadowColor === '#d946ef' ? 'border-black' : 'border-fuchsia-500 hover:border-neutral-500 hover:cursor-pointer'} rounded-full`} onClick={() => editButtonShadowColor(admin.user.username, '#d946ef')}></div>
                                            <div className={`h-7 w-7 bg-yellow-900 border-solid border-2 ${admin.user.appearance.buttons.shadowColor === '#713f12' ? 'border-black' : 'border-yellow-900 hover:border-neutral-500 hover:cursor-pointer'} rounded-full`} onClick={() => editButtonShadowColor(admin.user.username, '#713f12')}></div>
                                            <div className={`h-7 w-7 bg-black border-solid border-2 ${admin.user.appearance.buttons.shadowColor === 'black' ? 'border-neutral-500' : 'border-black hover:border-neutral-500 hover:cursor-pointer'} rounded-full`} onClick={() => editButtonShadowColor(admin.user.username, 'black')}></div>
                                            <div className={`h-7 w-7 bg-white border-solid border-2 ${admin.user.appearance.buttons.shadowColor === 'white' ? 'border-black' : 'border-white hover:border-neutral-500 hover:cursor-pointer'} rounded-full`} onClick={() => editButtonShadowColor(admin.user.username, 'white')}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>}
                        <div className="flex flex-col gap-1.5">
                            <p className="font-medium">Button Font Color</p>
                            <div className="flex gap-5">
                                <div className="w-24 h-auto bg-[#D9D9D9] p-2 rounded-md">
                                    <div className="w-full h-full rounded-md" style={{backgroundColor: admin.user.appearance.buttons.fontColor}}></div>
                                </div>
                                <div className="flex flex-col bg-[#D9D9D9] p-1.5 rounded-md">
                                    <p className="font-medium">Button Color</p>
                                    <div className="flex flex-col gap-3">
                                        <div className="flex gap-3">
                                            <div className={`h-7 w-7 bg-red-600 border-solid border-2 ${admin.user.appearance.buttons.fontColor === '#dc2626' ? 'border-black' : 'border-red-600 hover:border-neutral-500 hover:cursor-pointer'} rounded-full`} onClick={() => editButtonFontColor(admin.user.username, '#dc2626')}></div>
                                            <div className={`h-7 w-7 bg-orange-500 border-solid border-2 ${admin.user.appearance.buttons.fontColor === '#f97316' ? 'border-black' : 'border-orange-500 hover:border-neutral-500 hover:cursor-pointer'} rounded-full`} onClick={() => editButtonFontColor(admin.user.username, '#f97316')}></div>
                                            <div className={`h-7 w-7 bg-yellow-400 border-solid border-2 ${admin.user.appearance.buttons.fontColor === '#facc15' ? 'border-black' : 'border-yellow-400 hover:border-neutral-500 hover:cursor-pointer'} rounded-full`} onClick={() => editButtonFontColor(admin.user.username, '#facc15')}></div>
                                            <div className={`h-7 w-7 bg-green-600 border-solid border-2 ${admin.user.appearance.buttons.fontColor === '#16a34a' ? 'border-black' : 'border-green-600 hover:border-neutral-500 hover:cursor-pointer'} rounded-full`} onClick={() => editButtonFontColor(admin.user.username, '#16a34a')}></div>
                                            <div className={`h-7 w-7 bg-blue-700 border-solid border-2 ${admin.user.appearance.buttons.fontColor === '#1d4ed8' ? 'border-black' : 'border-blue-700 hover:border-neutral-500 hover:cursor-pointer'} rounded-full`} onClick={() => editButtonFontColor(admin.user.username, '#1d4ed8')}></div>                                        
                                        </div>
                                        <div className="flex gap-3">
                                            <div className={`h-7 w-7 bg-purple-700 border-solid border-2 ${admin.user.appearance.buttons.fontColor === '#7e22ce' ? 'border-black' : 'border-purple-700 hover:border-neutral-500 hover:cursor-pointer'} rounded-full`} onClick={() => editButtonFontColor(admin.user.username, '#7e22ce')}></div>
                                            <div className={`h-7 w-7 bg-fuchsia-500 border-solid border-2 ${admin.user.appearance.buttons.fontColor === '#d946ef' ? 'border-black' : 'border-fuchsia-500 hover:border-neutral-500 hover:cursor-pointer'} rounded-full`} onClick={() => editButtonFontColor(admin.user.username, '#d946ef')}></div>
                                            <div className={`h-7 w-7 bg-yellow-900 border-solid border-2 ${admin.user.appearance.buttons.fontColor === '#713f12' ? 'border-black' : 'border-yellow-900 hover:border-neutral-500 hover:cursor-pointer'} rounded-full`} onClick={() => editButtonFontColor(admin.user.username, '#713f12')}></div>
                                            <div className={`h-7 w-7 bg-black border-solid border-2 ${admin.user.appearance.buttons.fontColor === 'black' ? 'border-neutral-500' : 'border-black hover:border-neutral-500 hover:cursor-pointer'} rounded-full`} onClick={() => editButtonFontColor(admin.user.username, 'black')}></div>
                                            <div className={`h-7 w-7 bg-white border-solid border-2 ${admin.user.appearance.buttons.fontColor === 'white' ? 'border-black' : 'border-white hover:border-neutral-500 hover:cursor-pointer'} rounded-full`} onClick={() => editButtonFontColor(admin.user.username, 'white')}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-5">
                <h1 className="text-3xl font-bold">Fonts</h1>
                <div className="flex flex-col border border-solid border-black rounded-md bg-white p-5">
                    <div>
                        <p className="font-medium">Font</p>
                        <div className="flex gap-6 items-center border border-solid border-neutral-400 rounded-md p-7">
                            <div className="border border-solid border-neutral-300 rounded-md p-5">
                                <p className="font-bold text-xl">Aa</p>
                            </div>
                            <div className="flex justify-evenly">
                                <div>
                                    <button className="font-bold text-xl">Inter</button>
                                </div>
                                <div>
                                    <button className="font-bold text-xl">Inter</button>
                                </div>
                                <div>
                                    <button className="font-bold text-xl">Inter</button>
                                </div>
                                <div>
                                    <button className="font-bold text-xl">Inter</button>
                                </div>
                                <div>
                                    <button className="font-bold text-xl">Inter</button>
                                </div>
                                <div>
                                    <button className="font-bold text-xl">Inter</button>
                                </div>
                                <div>
                                    <button className="font-bold text-xl">Inter</button>
                                </div>
                                <div>
                                    <button className="font-bold text-xl">Inter</button>
                                </div>
                                <div>
                                    <button className="font-bold text-xl">Inter</button>
                                </div>
                                <div>
                                    <button className="font-bold text-xl">Inter</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p>Color</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ApperanceSettings