import React, { useState } from 'react';
import { Input, Button } from "@nextui-org/react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link } from "@nextui-org/react";
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
  const [otp, setOtp] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);

  const handleAadharChange = (e) => {
    setAadharNumber(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleGetOTP = () => {
    // Check Aadhar number and password
    if (aadharNumber === '123456789012' && password === 'abc123') {
      // Show OTP input field
      setShowOtpInput(true);
    } else {
      alert('Invalid Aadhar number or password');
    }
  };

  const handleLogin = () => {
    // Check OTP
    if (showOtpInput && otp === '999999') {
      // OTP is correct, authenticate the user
      setAuthenticated(true);
    } else {
      alert('Invalid OTP');
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
          <p className="appName">TerraTrust</p>
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
            <Link href='./signup'>SignUp</Link>
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
      <div className="container">
        <div className="form-container">
          <h2 className="login" style={{ fontSize: '1.8em' }}>GET STARTED NOW</h2>
          <br></br>
          <h3 className="login1" style={{ fontSize: '1.8em' }}>Login</h3>
          <br></br>
          <div className="input"></div>
          <div>
            <Input type="aadhar" label="Aadhar Number" radius='full' value={aadharNumber} onChange={handleAadharChange} />
            <br></br>
            <Input type="password" label="Password" radius='full' value={password} onChange={handlePasswordChange} />
            <br></br>
            {aadharNumber === '123456789012' && password === 'abc123' && (
              <>
                <Input type="otp" label="OTP" radius='full' value={otp} onChange={handleOtpChange} />
                <br></br>
              </>
            )}
            <br></br>
            <div className="button">
                <Button color="black" variant="bordered" onClick={handleGetOTP}>
                  Get OTP
                </Button>
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
