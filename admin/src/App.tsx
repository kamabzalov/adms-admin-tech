import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';


import Login from "./components/Login";
import { Link, Route, Routes } from 'react-router-dom';

const App: React.FC = () => {

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          aaa
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>
        </div>

          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>
          </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
