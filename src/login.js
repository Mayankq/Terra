import React, { useState } from 'react';
import { Input, Button } from "@nextui-org/react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import { Link } from 'react-router-dom';
import { Image } from "@nextui-org/react";
import './login.css';
import logo from './assets/trsutlogo.png';
import sn from './assets/sn.jpg';
import { Navigate } from 'react-router-dom';
import TwitterLogo from './components/twitterLogo';
import Linkedin from './components/linkedin';
import Ne from './components/ne';

function Login() {
  const [aadharNumber, setAadharNumber] = useState('');
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(localStorage.getItem('authenticated') === 'true');

  const handleAadharChange = (e) => {
    setAadharNumber(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    const response = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ aadhar: aadharNumber, password }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.authenticated) {
        localStorage.setItem('authenticated', 'true'); // Save authentication state
        localStorage.setItem('user', JSON.stringify(data.user)); // Save user data
        const userFromLocalStorage = JSON.parse(localStorage.getItem('user')); // Retrieve user data from local storage
    console.log(userFromLocalStorage); // Log the user data from local storage
        setAuthenticated(true);
      } else {
        alert('Invalid Aadhar number or password');
      }
    } else {
      console.error('Failed to authenticate');
    }
  };

  if (authenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div>
      <Navbar maxWidth={'full'}>
        <NavbarBrand>
          <img src={logo} width="80px" alt="TerraTrust Logo" />
          <Link className="appName" to="/">
      TerraTrust
    </Link>
        </NavbarBrand>
        <NavbarContent justify="center">
          <NavbarItem>
            <Link color="var(--accents-7)" href="#">
              Features
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link color="var(--accents-7)" href="#" aria-current="page">
              Customers
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="var(--accents-7)" href="#">
              Integrations
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <Link to='/signup'>SignUp</Link>
          </NavbarItem>
          <NavbarItem>
            <Button href="#" variant="flat">
              <TwitterLogo/>
              <Linkedin/>
              <Ne/>
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <hr></hr>
      <div className="container">
        <div className="form-container">
          <h2 className="login" style={{ fontSize: '1.8em' }}>GET STARTED NOW</h2>
          <br></br>
          <h3 className="login1" style={{ fontSize: '1.8em' }}>Login</h3>
          <br></br>
          <div className="input"></div>
          <div style={{width:"80%"}}>
            <Input type="aadhar" label="Aadhar Number" radius='full' value={aadharNumber} onChange={handleAadharChange} />
            <br></br>
            <Input type="password" label="Password" radius='full' value={password} onChange={handlePasswordChange} />
            <br></br>
            <br></br>
            <div className="button">
              <Button color="black" variant="bordered" onClick={handleLogin}>
                Login
              </Button>
            </div>
          </div>
        </div>
        <div className='image-container'>
          <Image
            isZoomed
            alt="land image"
            src={sn}
            style={{height:"90vh", width:"100vw"}}
          />
        </div>  
      </div>
    </div>
  );
}

export default Login;
