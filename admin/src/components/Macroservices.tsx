import React from "react";
import "./styles/macroservices.css"

interface LayoutProps {
    number: string;
    description: string;
}

const OneCard: React.FC<LayoutProps> = ({ number, description }) => {
    return(
        <>
        <div className="card mc-cards">
            <div className="card-body">
                <h5 className="card-title">Macroservice #{number}</h5>
                <p className="card-text">{description}</p>
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                </div>
            </div>
        </div>
        </>
    )
}

function All() {
    return(
    <>
        <OneCard number="1" description="Description of first macroservice" />
        <OneCard number="2" description="Description of second macroservice" />
        <OneCard number="3" description="Description of third macroservice" />
    </>
    )
}

const Macroservices: React.FC = () => {

    return(
        <>
            <h1>Here are Macroservices</h1>
            <All />
        </>
    )
}

export default Macroservices;