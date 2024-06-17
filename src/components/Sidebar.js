import React, { useState, useEffect } from 'react';
import { Card, CardBody } from '@nextui-org/react';
import { AiOutlineHome, AiOutlineSearch, AiOutlineFileText } from 'react-icons/ai';
import { FiActivity } from "react-icons/fi";
import './sidebar.css';

export default function Sidebar() {
  const [activeLink, setActiveLink] = useState('home');

  useEffect(() => {
    const pathname = window.location.pathname;
    if (pathname === '/dashboard') {
      setActiveLink('home');
    } else if (pathname === '/search') {
      setActiveLink('search');
    } else if (pathname === '/terms') {
      setActiveLink('terms');
    } else if (pathname === '/Bestselect') {
      setActiveLink('best');
    }
  }, []);

  const handleSetActiveLink = (link) => {
    setActiveLink(link);
  };

  return (
    <div className="fixed-sidebar">
      <Card className="h-full" style={{ paddingLeft: '20px', paddingRight: '50px', paddingTop: '40px' }} radius="none">
        <CardBody className="flex flex-col h-full">
          <a href="./dashboard" onClick={() => handleSetActiveLink('home')} className={`flex items-center font-bold text-lg mb-4 link ${activeLink === 'home' ? 'active' : ''}`}>
            <AiOutlineHome className="icon mr-2" /> Home
          </a>
          <a href="./search" onClick={() => handleSetActiveLink('search')} className={`flex items-center font-bold text-lg mb-4 link ${activeLink === 'search' ? 'active' : ''}`}>
            <AiOutlineSearch className="icon mr-2" /> Search
          </a>
          <a href="./terms" onClick={() => handleSetActiveLink('terms')} className={`flex items-center font-bold text-lg mb-4 link ${activeLink === 'terms' ? 'active' : ''}`}>
            <AiOutlineFileText className="icon mr-2" /> Terms and conditions
          </a>
          <a href="./Bestselect" onClick={() => handleSetActiveLink('best')} className={`flex items-center font-bold text-lg mb-4 link ${activeLink === 'best' ? 'active' : ''}`}>
            <FiActivity className="icon mr-2" /> Buy Tokens
          </a>
        </CardBody>
      </Card>
    </div>
  );
}
