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
import { NavigationLink } from "./components/small-components/NavigationLink";

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
            <NavigationLink link={"/"} text={"Dashboard"}/>
        <div className="navbar-nav mr-auto">
         {/*<li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>*/}

          {showAdminBoard && (
            <NavigationLink link={"/admin"}  text={"Admin Board"}/>
          )}

          {currentUser && (
            <NavigationLink link={"/user"}  text={"User"}/>
          )}
        </div>

        {currentUser ? (
          
          <div className="navbar-nav ml-auto">
             <NavigationLink link={"/macroservices"}  text={"Macroservices"}/>
             <NavigationLink link={"/audit"}  text={"Audit"}/>
             <NavigationLink link={"/data"}  text={"Data"}/>
             <NavigationLink link={"/users"} text={"Users"}/>
             <NavigationLink link={"/profile"} text={"Admin"}/>

             <NavigationLink link={"/login"} text={"LogOut"} onClick={logOut}/>
            
          </div>
        ) : (
          
          <div className="navbar-nav ml-auto">   
            <NavigationLink link={"/login"} text={"Login"}/>  
          </div>
        )}
      </Nav>

      <div className="container mt-3">
        <Routes>
          {currentUser ? (
            <Route path="/" element={<Macroservices />} />
          ) : (
            <Route path="/" element={<Login />} />
          )}
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