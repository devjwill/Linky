import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Space from '../assests/space.jpg'
import Matrix from '../assests/matrix.jpg'
import Sunset from '../assests/sunset.jpg'
import Graffiti from '../assests/graffiti.jpg'
import Sea from '../assests/sea.jpg'
import Jungle from '../assests/jungle.jpg'
import Bookshelf from '../assests/bookshelf.jpg'
import Gaming from '../assests/gaming.jpg'


const LinkTree = () => {
    const { username } = useParams()
    const [userData, setUserData] = useState(null)
    const images = [{ 
        name: "Space",
        url: Space
    },
    { 
        name: "Matrix",
        url: Matrix
    },
    { 
        name: "Sunset",
        url: Sunset
    }, 
    { 
        name: "Graffiti",
        url: Graffiti
    }, 
    { 
        name: "Sea",
        url: Sea
    }, 
    { 
        name: "Jungle",
        url: Jungle
    }, 
    { 
        name: "Bookshelf",
        url: Bookshelf
    }, 
    { 
        name: "Gaming",
        url: Gaming
    }]

    useEffect(() => {
        fetch(`/api/page/${username}`)
        .then(response => response.json())
        .then(data => setUserData(data)) 
        console.log(userData)
    }, [username])

    // const handleView = async () => {
    //     console.log("link clicks, views: ")
    // }

    console.log(userData)

    const backgroundStyles = (background) => {
        if (background[0] === '#') {
            if (background.length <= 7) { //solid color
                return { background:`${background}` }
            } else if (background.length > 7) { //gradient color
                const colorArr = background.split(" ")
                const color1 = colorArr[0]
                const color2 = colorArr[1]
                const gradientDirection = colorArr[2]
                if (gradientDirection === 'up') {
                    return { backgroundImage: `linear-gradient(to top, ${color1}, ${color2})` }
                } else if (gradientDirection === 'down') {
                    return { backgroundImage: `linear-gradient(to bottom, ${color1}, ${color2})` }
                }
            }
        } else if (background[0] !== '#') { //image
            return { backgroundImage: `url(${images[images.findIndex((item) => item.name === background)].url})`, backgroundPosition: 'center', backgroundSize: 'cover' }
        }
    }

    const buttonStyles = (button) => {
        let effect
        let shape
        if (button.design.split("-")[0] === 'fill') {
            effect = { background: button.color }
        } else if (button.design.split("-")[0] === 'outline') {
            effect = { backgroundColor: 'rgba(250, 0, 0, 0)', border: '1px solid black' }
        } else if (button.design.split("-")[0] === 'softShadow') {
            if (button.shadowColor === 'black') {
                effect = { boxShadow: `0 8px 8px 0 rgb(0, 0, 0, 0.24)`, background: button.color }
            } else if (button.shadowColor === 'white') {
                effect = { boxShadow: `0 8px 8px 0 rgb(255, 255, 255, 0.24)`, background: button.color }
            } else {
                let hex = button.shadowColor.replace(/^#/, '')
                const bigint = parseInt(hex, 16);
                const red = (bigint >> 16) & 255;
                const green = (bigint >> 8) & 255;
                const blue = bigint & 255;
                effect = { boxShadow: `0 8px 8px 0 rgb(${red}, ${green}, ${blue}, 0.24)`, background: button.color }
            }
        } else if (button.design.split("-")[0] === 'hardShadow') {
            effect = { boxShadow: `4px 4px 0 0 ${button.shadowColor}`, background: button.color }
        }

        if (button.design.split("-")[1] === 'rounded') {
            shape = { borderRadius: '7px' }
        } else if (button.design.split("-")[1] === 'roundedFull') {
            shape = { borderRadius: '50px' }
        }

        const fontColor = { color: button.fontColor }

        const finalDesign = {...effect, ...shape, ...fontColor}
        return finalDesign  
    }

    if (userData && !userData.error) {
        return (
            <div className={`h-screen ${window.innerHeight > 550 ? 'p-10' : 'p-5 '} flex flex-col gap-6 items-center`} style={backgroundStyles(userData.appearance.background)}>
                <div className="flex flex-col gap-2.5">
                    {userData.profilePicture && <img src={userData.profilePicture} className="rounded-full xxs:w-[175px] xxs:h-[175px] xxxxs:w-[125px] xxxxs:h-[125px]"alt="profile"/>}
                    {userData.appearance.profileTitle || userData.appearance.userData.bio ? 
                    <div className="flex flex-col gap-0 items-center">
                        {userData.appearance.profileTitle && <h1 className={`font-${userData.appearance.font.fontFamily} font-bold`} style={{color: `${userData.appearance.font.fontColor}`}}>{userData.appearance.profileTitle}</h1>}
                        {userData.bio && <p className={`font-${userData.appearance.font.fontFamily} `} style={{color: `${userData.appearance.font.fontColor}` }}>{userData.bio}</p>}
                    </div> : null}
                </div>
                {userData.links[0] &&
                <div className="flex flex-col items-center gap-8">
                    {userData.links.map((link) => (
                        <div key={link.id} className="bg-white p-2 hover:cursor-pointer flex justify-center w-fit mx- items-center" style={buttonStyles(userData.appearance.buttons)}>
                            <a className={`font-${userData.appearance.font.fontFamily} `} href={`https://${link.url}`} target="_blank">{link.title}</a>
                        </div>
                    ))}
                </div>}
            </div>
        )
    } else if (userData && userData.error) {
        return (
            <div>
                <h1>{username} does not exist</h1>
            </div>
        )
    }
}

export default LinkTree;