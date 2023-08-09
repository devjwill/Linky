import Navbar from "../components/nav"
import connect from "../assests/connect.jpg"
import business from "../assests/business.jpg"
import discover from "../assests/discover.jpg"
import Lottie from "lottie-react"
import connectAni from "../assests/connectAni.json"
import promoteAni from "../assests/promoteAni.json"
import music from "../assests/music.json"

const Home = () => {
    return  (
        <div>
            <Navbar/>
            <div className="p-20 flex flex-col gap-36 ">
                <section className="flex rounded shadow-2xl shadow-app-blue p-10 items-center justify-between shrink-0">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-5xl font-bold">Connect with people</h2>
                        <p className="leading-9 text-xl">Explore a curated collection of social links, allowing you to discover and connect with like-minded individuals, expand your network, and engage in enriching conversations. Whether you're a creative professional, an entrepreneur, or simply looking to meet new friends, this platform empowers you to build valuable relationships and create lasting bonds.</p>
                    </div>
                    <div className="flex justify-end shrink-0">
                        <Lottie animationData={connectAni} loop={true} className="w-5/12"/>
                    </div>
                </section>
                <section className="flex rounded shadow-2xl shadow-app-blue p-10 items-center justify-between shrink-0">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-5xl font-bold">Promote your business</h2>
                        <p className="leading-9 text-xl">Showcase your brand, products, and services through a centralized platform, allowing you to reach a wider audience and attract potential customers. Utilize this space to share your website, social media profiles, and other promotional materials, empowering you to elevate your business to new heights and drive growth like never before.</p>
                    </div>
                    <div className="flex justify-end shrink-0">
                        <Lottie animationData={promoteAni} loop={true} className="w-2/5"/>
                    </div>
                </section>
                <section className="flex rounded shadow-2xl shadow-app-blue p-10 items-center justify-between shrink-0">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-5xl font-bold">Discover new interests</h2>
                        <p className="leading-9 text-xl">Uncover a diverse range of links that cater to various interests, from art and culture to technology and education. Immerse yourself in a world of knowledge, inspiration, and entertainment, as you click through a curated selection of resources handpicked to broaden your horizons and spark curiosity. Embark on a journey of continuous learning and discovery, all in one convenient place.</p>
                    </div>
                    <div className="flex justify-end shrink-0">
                        <Lottie animationData={music} loop={true} className="w-2/5"/>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Home