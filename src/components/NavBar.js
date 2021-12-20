import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoBaseballOutline } from 'react-icons/io5';
import './NavBar.css';


/* 
 * NavBar Function
 *
 * @param {boolean} showTeamsNav To display the 'Teams' navigation link in the NavBar
 * @param {integer} teamId Routing information for the respective specific team link in the NavBar
 * @param {string} teamName To display the respective specific team link in the NavBar
 */ 

const Navbar = ({showTeamsNav, teamId, teamName}) => {

    return (
        <>
        <nav className='navbar'>
            <div className='navbar-container'>
            <Link to='/' className='navbar-logo'>
                <IoBaseballOutline/>
                &nbsp; Baseball Stats
            </Link>
            <ul className='nav-menu'>
                {teamId && <li className='nav-item'>
                <Link to={`/${teamId}`} className='nav-links'>
                    {teamName}
                </Link>
                </li>}
                {showTeamsNav === true && <li className='nav-item'>
                <Link to='/' className='nav-links'>
                    All Teams
                </Link>
                </li>}
            </ul>
            </div>
        </nav>
        </>
    );
}

export default Navbar;