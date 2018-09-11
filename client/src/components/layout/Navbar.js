import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Ant Queen CDLs
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/oc">
            Orfen & Core CDLs
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/bosses">
            Boss Respawns
          </Link>
        </li>
        <li className="nav-item dropdown">
          <Link
            className="nav-link dropdown-toggle"
            to="/"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Admin Panel
          </Link>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <Link className="dropdown-item" to="/addchar/aq">
              Add new AQ character
            </Link>
            <Link className="dropdown-item" to="/deletechar/aq">
              Delete an AQ character
            </Link>
            <Link className="dropdown-item" to="/">
              Edit AQ table
            </Link>
            <div className="dropdown-divider" />
            <Link className="dropdown-item" to="/addchar/oc">
              Add new Orfen&Core character
            </Link>
            <Link className="dropdown-item" to="/deletechar/oc">
              Delete an Orfen&Core character
            </Link>
            <Link className="dropdown-item" to="/">
              Edit Orfen&Core table
            </Link>
            {/* <div className="dropdown-divider" />
            <a className="dropdown-item" href="#">
              Create new admin account
            </a> */}
            <div className="dropdown-divider" />
            <Link className="dropdown-item" to="/bosses/edit">
              Add boss Time of Death
            </Link>
            <div className="dropdown-divider" />
            <a
              className="dropdown-item"
              href=""
              onClick={this.onLogoutClick.bind(this)}
            >
              Logout
            </a>
          </div>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Ant Queen CDLs
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/oc">
            Orfen & Core CDLs
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/bosses">
            Boss Respawns
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Admin Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <Link className="navbar-brand" to="/">
          Perkunas
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
