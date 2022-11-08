import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import Auth from "../../utils/auth";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <Navbar className="bg-main">
      <Container>
        <Navbar.Brand>
          <Link to="/">
            <img className="rounded" src="logo.png" alt="ChatBox Logo" />
          </Link>
        </Navbar.Brand>
        <div className="navbar-brand h1 bg-darkMain rounded ">
          <div className="px-5">ChatBox</div>
        </div>
        {Auth.loggedIn() ? (
          <Nav>
            <Link
              className="nav-link bg-dark text-light rounded"
              onClick={logout}
            >
              Log Out
            </Link>
          </Nav>
        ) : (
          <Nav>
            <Link
              className="nav-link bg-dark text-light rounded mx-1"
              to="/signup"
            >
              Sign Up
            </Link>
            <Link
              className="nav-link d-flex bg-dark text-light rounded"
              to="/login"
            >
              Login
            </Link>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
