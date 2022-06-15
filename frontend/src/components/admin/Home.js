import React from "react";
import { Link, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { logout } from "../common/utils";

function Home() {
  const navigate = useNavigate()
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light p-4">
        <a className="navbar-brand" href="#">
          GradeBook Admin
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="semester">
                <a className="nav-link">Semesters</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="course">
                <a className="nav-link">Courses Details</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="class">
                <a className="nav-link">Classes Details</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="lecture">
                <a className="nav-link">Lecturers</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="student">
                <a className="nav-link">Students Details</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="enrolls">
                <a className="nav-link">Enrolls</a>
              </Link>
            </li>
            <li className="nav-item">
            <a style={{cursor:'pointer'}} onClick={() => logout('admin',navigate)} className="nav-link">Logout</a>

            </li>
          </ul>
        </div>
      </nav>
      
      <div className="container">
      <Outlet />
      </div>
    </div>
  );
}

export default Home;
