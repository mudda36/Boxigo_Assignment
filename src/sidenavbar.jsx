import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; 

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/Home">My Moves</Link>
        </li>
        <li>
          <Link to="">My Profile</Link>
        </li>
        <li>
          <Link to="">Logout</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
