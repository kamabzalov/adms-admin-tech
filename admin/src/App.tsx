import React from "react";
import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import * as AuthService from "./services/auth.service";
import IUser from './types/user.type';

import Login from "./components/Login";
import Home from "./components/Home";
import Macroservices from "./components/Macroservices";
import Users from "./components/Users";
import Audit from "./components/Audit";
import Data from "./components/Data";
import { Nav } from "reactstrap";

const App: React.FC = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState<boolean>(false);
  const [showAdminBoard, setShowAdminBoard] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      // curently commented out due to the lack of data info
      //setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      //setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    // EventBus.on("logout", logOut);

    // return () => {
    //   EventBus.remove("logout", logOut);
    // };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  return (
    <div>
      <Nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/"} className="navbar-brand">
              Dashboard
            </Link>
        <div className="navbar-nav mr-auto">
         {/*<li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>*/}

          {showAdminBoard && (
              <Link to={"/admin"} className="nav-link">
                Admin Board
              </Link>
          )}

          {currentUser && (
              <Link to={"/user"} className="nav-link">
                User
              </Link>
          )}
        </div>

        {currentUser ? (
          
          <div className="navbar-nav ml-auto">
              <Link to={"/macroservices"} className="nav-link">
                Macroservices
              </Link>
              <Link to={"/audit"} className="nav-link">
                Audit
              </Link>
              <Link to={"/data"} className="nav-link">
                Data
              </Link>
              <Link to={"/users"} className="nav-link">
                Users
              </Link>

              <Link to={"/profile"} className="nav-link">
                Admin
              </Link>
              <Link to="/login" className="nav-link log-in-out" onClick={logOut}>
                LogOut
              </Link>
            
          </div>
        ) : (
          
          <div className="navbar-nav ml-auto">     
              <Link to={"/login"} className="nav-link log-in-out">
                Login
              </Link>
          </div>
        )}
      </Nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/macroservices" element={<Macroservices />} />
          <Route path="/users" element={<Users />} />
          <Route path="/audit" element={<Audit />} />
          <Route path="/data" element={<Data />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;