import { useState } from "react";
import { useAdminContext } from "../../../hooks/useAdminContext";
import ApperanceSettings from "./appearanceSetings";
import Preview from "../preview";
import LinksOrPreview from "../linksOrPreview";

const Appearance = ({ windowWidth, windowHeight, isVisible, setIsVisible }) => {
    const { dispatch, admin} = useAdminContext()
    const [gradientDirection, setGradientDirection] = useState("")
    if (windowWidth > 767) {
        return (
            <div className="flex">
                <div className="h-[calc(100vh-96px)] w-2/3 py-20 xl:px-40 lg:px-30 md:px-25 kdi:px-20 sm:px-10 idk:px-5 border-r border-r-solid border-divsion-line border-r-4 overflow-auto">
                    {admin && <ApperanceSettings admin={admin} windowWidth={windowWidth} windowHeight={windowHeight} dispatch={dispatch}/>}
                </div>
                {admin && <Preview admin={admin} windowWidth={windowWidth} windowHeight={windowHeight}/>}
            </div>
        )
    } else {
        if (admin && isVisible === 'links') {
            return (
                <div className="flex flex-col gap-5 p-10 overflow-auto" style={{maxHeight: windowHeight - 96}}>
                    <ApperanceSettings admin={admin} windowWidth={windowWidth} windowHeight={windowHeight} dispatch={dispatch}/>
                    <div className="fixed bottom-10 inset-x-1/2">
                        <LinksOrPreview isVisible={isVisible} setIsVisible={setIsVisible}/>
                    </div>
                </div>
            )
        } else if (admin && isVisible === 'preview') {
            return (
                <div className="px-10 flex flex-col gap-5 w-full h-full">
                    <Preview admin={admin} windowWidth={windowWidth} windowHeight={windowHeight}/>
                    <LinksOrPreview isVisible={isVisible} setIsVisible={setIsVisible}/>
                </div>
            )
        }
    }
}

export default Appearance;