import React from "react";
import { NavLink } from "react-router-dom";
import "./header.scss";

const Header = () => {
  let activeStyle = {
    textDecoration: "underline",
  };

  let activeClassName = "underline";

  return (
    <nav className="navbar">
      <h5>MernApp</h5>
      <ul className="navbar-right">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "navbar-item active" : "navbar-item"
            }
          >
            CsvGenerator
          </NavLink>
        </li>
        <li>
          <NavLink
            to="page-2"
            className={({ isActive }) =>
              isActive ? "navbar-item active" : "navbar-item"
            }
          >
            JsonDownload
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
