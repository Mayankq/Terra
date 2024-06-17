import React, { useState } from 'react';
import { Input } from "@nextui-org/react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from "@nextui-org/react";
import { Link } from 'react-router-dom';
import { Image } from "@nextui-org/react";
import './signup.css';
import logo from './assets/trsutlogo.png';
import sn from './assets/sn.jpg';
import TwitterLogo from './components/twitterLogo';
import Linkedin from './components/linkedin';
import Ne from './components/ne';

function Signup() {
    const [aadhar, setAadhar] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registrationMessage, setRegistrationMessage] = useState('');
    const [aadharExists, setAadharExists] = useState(false);

    const handleSignup = async () => {
        // Check if Aadhar number exists
        const aadharCheckResponse = await fetch(`http://localhost:3001/checkAadhar/${aadhar}`);
        const aadharCheckData = await aadharCheckResponse.json();

        if (aadharCheckData.exists) {
            setAadharExists(true);
            setRegistrationMessage('Aadhar number already exists.');
            return;
        }

        const user = { aadhar, phone, email, password };

        try {
            const response = await fetch('http://localhost:3001/addUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('User added:', result);
                setRegistrationMessage('Registration successful. Please go to the login page.');
            } else {
                console.error('Failed to add user');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <Navbar maxWidth={'full'}>
                <NavbarBrand>
                    <img src={logo} width="80px" alt="TerraTrust Logo"></img>
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
                        <Link to='/login'>Login</Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Button href="#" variant="flat">
                            <TwitterLogo />
                            <Linkedin />
                            <Ne />
                        </Button>
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
            <hr></hr>
            <div className="container">
                <div className="form-container" style={{ width: "40%" }}>
                    <h3 className="signup" style={{ fontSize: '1.8em' }}>Signup</h3>
                    <br></br>
                    <div className="input">
                        <div>
                            <Input
                                type="text"
                                label="Aadhar Number"
                                radius="full"
                                value={aadhar}
                                onChange={(e) => setAadhar(e.target.value)}
                            />
                            <br></br>
                            <Input
                                type="text"
                                label="Phone Number"
                                radius="full"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <br></br>
                            <Input
                                type="email"
                                label="Email Id"
                                radius="full"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <br></br>
                            <Input
                                type="password"
                                label="Password"
                                radius="full"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <br></br>
                            <br></br>
                            <Button color="black" variant="bordered" onClick={handleSignup}>
                                SignUp
                            </Button>
                            <br></br>
                            <br></br>
                            {registrationMessage && <p style={{ color: 'green' }}>{registrationMessage}</p>}
                        </div>
                    </div>
                </div>
                <div className='image-container'>
                    <Image
                        isZoomed
                        alt="land image"
                        src={sn}
                        style={{ height: "90vh", width: "100vw" }}
                    />
                </div>
            </div>
        </div>
    );
}

export default Signup;
