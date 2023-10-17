import Space from '../../assests/space.jpg'
import Matrix from '../../assests/matrix.jpg'
import Sunset from '../../assests/sunset.jpg'
import Graffiti from '../../assests/graffiti.jpg'
import Sea from '../../assests/sea.jpg'
import Jungle from '../../assests/jungle.jpg'
import Bookshelf from '../../assests/bookshelf.jpg'
import Gaming from '../../assests/gaming.jpg'

const Preview = ({ admin }) => {
    const visibleLinks = admin.links.filter(link => link.visible)
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

    const containerStyles = (background) => {
        if (background[0] === "#" && background.length <= 7) { //solid color
            return { background: `${background}` }
        } else if (background[0] === "#" && background.length > 7) { //gradient
            const colorsArr = background.split(" ")
            const color1 = colorsArr[0]
            const color2 = colorsArr[1]
            const gradientDirection = colorsArr[2]
            if (gradientDirection === 'up' || !gradientDirection) {
                return { backgroundImage: `linear-gradient(to top, ${color1}, ${color2})` }
            } else if (gradientDirection === 'down') {
                return { backgroundImage: `linear-gradient(to bottom, ${color1}, ${color2})` }
            }
        } else { //image
            return { backgroundImage: `url(${images[images.findIndex((item) => item.name === admin.user.appearance.background)].url})`, backgroundPosition: 'center', backgroundSize: 'cover' }
        }
    }

    const buttonStyles = (design) => {
        let effect
        let shape

        if (design.design.split("-")[0] === 'fill') {
            effect = { background: design.color }
        } else if (design.design.split("-")[0] === 'outline') {
            effect = { backgroundColor: 'rgba(250, 0, 0, 0)', border: '1px solid black' }
        } else if (design.design.split("-")[0] === 'softShadow') {
            if (design.shadowColor === 'black') {
                effect = { boxShadow: `0 8px 8px 0 rgb(0, 0, 0, 0.24)`, background: design.color }
            } else if (design.shadowColor === 'white') {
                effect = { boxShadow: `0 8px 8px 0 rgb(255, 255, 255, 0.24)`, background: design.color }
            } else {
                let hex = design.shadowColor.replace(/^#/, '')
                const bigint = parseInt(hex, 16);
                const red = (bigint >> 16) & 255;
                const green = (bigint >> 8) & 255;
                const blue = bigint & 255;
                effect = { boxShadow: `0 8px 8px 0 rgb(${red}, ${green}, ${blue}, 0.24)`, background: design.color }
            }
        } else if (design.design.split("-")[0] === 'hardShadow') {
            effect = { boxShadow: `4px 4px 0 0 ${design.shadowColor}`, background: design.color }
        }

        if (design.design.split("-")[1] === 'rounded') {
            shape = { borderRadius: '7px' }
        } else if (design.design.split("-")[1] === 'roundedFull') {
            shape = { borderRadius: '50px' }
        }

        const fontColor = { color: design.fontColor }

        const finalDesign = {...effect, ...shape, ...fontColor }
        return finalDesign
    }

    return (
        <div className="w-1/3 py-20 px-36 lg:px-28 md:px-20 kdi:px-11 sm:px-3 idk:px-1 flex justify-center">
            <div className='w-full h-full rounded-[40px] border border-4 border-solid border-zinc-500 p-2 bg-black'>
                <div className={`flex flex-col items-center w-full h-full rounded-[30px] p-6 font-${admin.user.appearance.font.fontFamily}`} style={containerStyles(admin.user.appearance.background)}>
                    <div className='flex flex-col items-center gap-2 mb-5'>
                        <img src={admin.user.profilePicture} className='rounded-full w-28 '></img>
                        <h1 className="font-bold text-xl" style={{color: `${admin.user.appearance.font.fontColor}`}}>{admin.user.appearance.profileTitle}</h1>
                        <p className="text-white">{admin.user.bio}</p>
                    </div>
                    <div className='flex flex-col items-center gap-3'>
                        {/* {admin.links.map((link) => (
                            <a key={link._id} className='border border-solid border-white border-2 rounded-full p-2 font-medium' href={`https://www.${link.url}`} target="_blank">{link.title}</a>
                        ))} */}
                        {visibleLinks.map((link) => (
                            <a key={link._id} className='p-2 font-medium' style={buttonStyles(admin.user.appearance.buttons)} href={`https://www.${link.url}`} target="_blank">{link.title}</a>
                        ))}
                    </div>
                </div>
            </div>
        </div> 
    )
}

export default Preview;