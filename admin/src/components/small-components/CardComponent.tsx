import React from "react";

interface LayoutProps {
    name: string;
    description: string;
}

export const Card: React.FC<LayoutProps> = ({ name, description }) => {
    return(
        <>
        <div className="card mc-cards">
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">{description}</p>
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                </div>
            </div>
        </div>
        </>
    )
}
