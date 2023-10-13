import { useState } from "react";
import { useAdminContext } from "../../../hooks/useAdminContext";
import ApperanceSettings from "./appearanceSetings";
import Preview from "../preview";

const Appearance = ({ windowWidth, windowHeight }) => {
    const { dispatch, admin} = useAdminContext()
    const [gradientDirection, setGradientDirection] = useState("")
    if (windowWidth > 767) {
        return (
            <div className="flex">
                <div className="h-[calc(100vh-96px)] w-2/3 py-20 xl:px-40 lg:px-30 md:px-25 kdi:px-20 sm:px-10 idk:px-5 border-r border-r-solid border-divsion-line border-r-4 overflow-auto">
                    {admin && <ApperanceSettings admin={admin} windowWidth={windowWidth} windowHeight={windowHeight} dispatch={dispatch}/>}
                </div>
                {admin && <Preview admin={admin} />}
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

export default Appearance;