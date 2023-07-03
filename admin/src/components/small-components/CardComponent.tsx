import React, { useCallback } from "react";
import CardMenu from "./CardMenu";

interface CardLayoutProps {
  name: string;
  description: string;
  state: boolean;
  index: number;
  onChange: (id: number, state: boolean) => void;
}

export const Card: React.FC<CardLayoutProps> = ({
  name,
  description,
  state,
  onChange,
  index,
}) => {
  const change = useCallback(() => {
    onChange(index, state);
  }, []);
  return (
    <>
      <div className="card mc-cards">
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{description}</p>
          <CardMenu id={index} />
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              checked={state}
              onChange={change}
              role="switch"
              id="flexSwitchCheckDefault"
            />
          </div>
        </div>
      </div>
    </>
  );
};
