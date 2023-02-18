import React from "react";
import "./styles/macroservices.css"

const Macroservices: React.FC = () => {
    
    const OneCard = () => {
        return(
        <div>
            <div className="card mc-cards">
                <div className="card-body">
                    <h5 className="card-title">Macroservice #1</h5>
                    <p className="card-text">This label for small description for this current MC</p>
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                    </div>
                </div>
            </div>
        </div>
        )
    }

    return(
        <>
        <h1>This is Macroservices</h1>
            <OneCard />
            <OneCard />
            <OneCard />
            <OneCard />
        </>
    )
}

export default Macroservices;