import React, { useCallback } from "react";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import * as AuthService from "./services/auth.service";
import IUser from "./types/user.type";

import Login from "./components/Login";
import Microservices from "./components/Microservices";
import Users from "./components/Users";
import { Nav } from "reactstrap";
import { NavigationLink } from "./components/small-components/NavigationLink";

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);
  const [onLogedIn, setLogedInBool] = useState<boolean>(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, [onLogedIn]);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
    setLogedInBool(false);
  };

  const onLogin = useCallback(() => {
    setLogedInBool(true);
  }, []);

  return (
    <div>
      <Nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-nav mr-auto"></div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <NavigationLink link={"/Microservices"} text={"Microservices"} />
            <NavigationLink link={"/users"} text={"Users"} />

            <NavigationLink link={"/login"} text={"LogOut"} onClick={logOut} />
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <NavigationLink link={"/login"} text={"Login"} />
          </div>
        )}
      </Nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Microservices />} />
          <Route path="/login" element={<Login onLogin={onLogin} />} />
          <Route path="/microservices" element={<Microservices />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
