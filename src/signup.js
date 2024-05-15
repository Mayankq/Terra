import React from 'react'
import {Input} from "@nextui-org/react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import {Image} from "@nextui-org/react";
import './signup.css'
import logo from './assets/trsutlogo.png'
import sn from './assets/sn.jpg'
import TwitterLogo from './components/twitterLogo';
import Linkedin from './components/linkedin';
import Ne from './components/ne';
function Signup(){
    return(
        <div>
            <Navbar maxWidth={'full'}>
          <NavbarBrand>
            <img src={logo} width="80px" alt="TerraTrust Logo"></img>
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
              <Link href='./login'>Login</Link>
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
        <div className = "container">
        <div className="form-container">
            <h3 className = "signup" style = {{fontSize:'1.8em'}}>Signup</h3>
            <br></br>
            <div className = "input"></div>
    <div>
      <Input type="aadhar" label="Aadhar Number"  radius='full'/>
      <br></br>
      <Input type="phno" label="Phone Number" radius='full'/>
      <br>
      </br>
      <Input type="email" label="Email Id" radius='full'/>
      <br></br>
      <Input type="passwd" label="Password" radius='full'/>
      <br></br>
      <br></br>
      <Button color="black" variant="bordered">
        SignUp
      </Button> 
      <br></br>
      <br></br>
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
export default Signup;