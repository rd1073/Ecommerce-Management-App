import React from 'react';
import '../components/buttons.css'
import logo from '../assets/logo.png';
import { FaReact } from 'react-icons/fa'; // Import the React icon component
import { RiAdminLine } from "react-icons/ri";
import { FaDiceSix } from "react-icons/fa";
import { TfiCommentsSmiley } from "react-icons/tfi";
import { PiFinnTheHumanThin } from "react-icons/pi";

import { IoGiftSharp } from "react-icons/io5";

import { GoFileSubmodule } from "react-icons/go";

import { GiTabletopPlayers } from "react-icons/gi";

import { FaSpinner } from "react-icons/fa";
import HeroPage from './Hero';


function MainMenu() {
  return (
    <><nav className="main-menu">
      <ul>
        <li>
          <a href="/dashboard">
            <i>
              <img className="nav-logo" src={logo} alt="Home" />

            </i>
            <span className="nav-textt">Ecommerce</span>
          </a>
        </li>
        <li>
          <a href="/admin">
            <RiAdminLine className="react-icon" style={{ color: 'red' }} />
            <span className="nav-text">Admins</span>
          </a>
        </li>
        <li>
          <a href="/seller">
            <FaDiceSix className="react-icon" style={{ color: 'purple' }} />
            <span className="nav-text">Sellers</span>
          </a>
        </li>
        <li>
          <a href="/customers">
            <TfiCommentsSmiley className="react-icon" style={{ color: 'green' }} />
            <span className="nav-text">Customers</span>
          </a>
        </li>
        <li>
          <a href="/orders">
            <PiFinnTheHumanThin className="react-icon" style={{ color: 'orange' }} />
            <span className="nav-text">Orders</span>
          </a>
        </li>
        <li>
          <a href="#">
            <IoGiftSharp className="react-icon" style={{ color: 'light-blue' }} />
            <span className="nav-text">Products</span>
          </a>
        </li>









      </ul>

    </nav><HeroPage /></>
  );
}

export default MainMenu;
