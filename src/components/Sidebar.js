import React, { useState, useEffect } from 'react';
import { Card, CardBody } from '@nextui-org/react';
import { AiOutlineHome, AiOutlineSearch, AiOutlineFileText, AiOutlineMenu } from 'react-icons/ai'; // Import icons including the menu icon
import { FiActivity } from "react-icons/fi";
import './sidebar.css';

export default function Sidebar() {
  const [activeLink, setActiveLink] = useState('home');
  const [collapsed, setCollapsed] = useState(false); // State to control the collapsed state

  useEffect(() => {
    // Update active link based on the current pathname
    const pathname = window.location.pathname;
    if (pathname === '/dashboard') {
      setActiveLink('home');
    } else if (pathname === '/search') {
      setActiveLink('search');
    } else if (pathname === '/terms') {
      setActiveLink('terms');
    } else if (pathname === '/best') {
      setActiveLink('best');
    }
  }, []);

  const handleSetActiveLink = (link) => {
    setActiveLink(link);
  };

  const toggleNavbar = () => {
    setCollapsed(!collapsed); // Toggle the collapsed state
  };

  return (
    <div className={`sticky left-0 top-16 h-100 w-30 bg-white z-10 ${collapsed ? 'collapsed' : ''}`}>
      <Card className="h-full" style={{ paddingLeft: '20px', paddingRight:'50px', paddingTop:'40px'}} radius="none">
        <CardBody className="flex flex-col">
          <a href="./dashboard" onClick={() => handleSetActiveLink('home')} className={`flex items-center font-bold text-lg mb-4 link ${activeLink === 'home' ? 'active' : ''}`}>
            <AiOutlineHome className="icon mr-2" /> {!collapsed && 'Home'}
          </a>
          <a href="./search" onClick={() => handleSetActiveLink('search')} className={`flex items-center font-bold text-lg mb-4 link ${activeLink === 'search' ? 'active' : ''}`}>
            <AiOutlineSearch className="icon mr-2" /> {!collapsed && 'Search'}
          </a>
          <a href="./terms" onClick={() => handleSetActiveLink('terms')} className={`flex items-center font-bold text-lg mb-4 link ${activeLink === 'terms' ? 'active' : ''}`}>
            <AiOutlineFileText className="icon mr-2" /> {!collapsed && 'Terms and conditions'}
          </a>
          <a href="#" onClick={() => handleSetActiveLink('best')} className={`flex items-center font-bold text-lg mb-4 link ${activeLink === 'best' ? 'active' : ''}`}>
            <FiActivity className="icon mr-2" /> {!collapsed && 'Best Selects'}
          </a>
        </CardBody>
      </Card>
    </div>
  );
}
