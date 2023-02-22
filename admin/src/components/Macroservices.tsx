import React from "react";
import "./styles/macroservices.css"
import { Card } from "./small-components/CardComponent";

//MC means macroservices

// Adding cards and names and descriptions for them
function MCCard() {
    return(
    <>
        <Card name="First MC" description="Description of first macroservice" />
        <Card name="Second MC" description="Description of second macroservice" />
        <Card name="Third MC" description="Description of third macroservice" />
    </>
    )
}


// MCs page component
const Macroservices: React.FC = () => {

    return(
        <>
            <MCCard />
        </>
    )
}

export default Macroservices;