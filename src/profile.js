import React, { useState } from "react";
import logo from './assets/trsutlogo.png';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import Sidebar from "./components/Sidebar";
import { Input } from "@nextui-org/react";
import sn from './assets/sn.jpg'
import {Image} from "@nextui-org/react";
import TwitterLogo from './components/twitterLogo';
import Linkedin from './components/linkedin';
import Ne from './components/ne';
const Profile = () => {
  // Define state variables for form fields with initial values
  const [firstName, setFirstName] = useState("John"); // Replace with your desired name
  const [lastName, setLastName] = useState("Doe"); // Replace with your desired last name
  const [emailAddress, setEmailAddress] = useState("johndoe@example.com"); // Replace with your desired email
  const [mobileNumber, setMobileNumber] = useState("123-456-7890");
  const [aadharnumber, setAadharNumber] = useState("8648-5748-6893");
   

  const handleSubmit = (event) => {
    // Prevent default form submission behavior (optional)
    event.preventDefault();

    // Handle form submission logic (e.g., send data to server)
    console.log("Form submitted:", {
      firstName,
      lastName,
      emailAddress,
      mobileNumber,
    });
  };

  return (
    <>
      <Navbar maxWidth={'full'}>
        <NavbarBrand>
          <img src={logo} width="80px" alt="TerraTrust Logo" />
          <p className="appName">TerraTrust</p>
        </NavbarBrand>
        <NavbarContent justify="end">
          <NavbarItem>
            <Dropdown>
              <DropdownTrigger>
                <div className="flex gap-4 items-center">
                  <Avatar isBordered color="default" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                </div>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="new">New file</DropdownItem>
                <DropdownItem key="copy">Appearance</DropdownItem>
                <DropdownItem key="edit">Profile Settings</DropdownItem>
                <DropdownItem key="delete" className="text-danger" color="danger">
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
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
      <hr />
      <div className="flex">
        <Sidebar />
        <div className="content" style={{padding:'20px 20px 20px 20px'}}>
            <div style={{display:'flex',justifyContent:'space-between'}}>
                <div style={{flex:1}}>
          <h1 className="accountset" style={{ fontSize: '2em' }}>
            Account Settings
          </h1>
          <h2 className="accountset" style={{ fontSize: '1.8em' }}>
            Basic Info
          </h2>
          <br />
          <form onSubmit={handleSubmit}>
            <label>
              First Name:
              <Input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>
            <label>
              Last Name:
              <Input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
            <label>
              Email Address:
              <Input
                type="email"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
              />
            </label>
            <label>
              Mobile Number:
              <Input
                type="tel"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
            </label>
            <label>
              Aadhar Number
              <Input
                type="aadhar"
                value={aadharnumber}
                onChange={(e) => setAadharNumber(e.target.value)}
              />
            </label>
            <br></br>
            <Button color="black" variant="bordered">
              Submit
             </Button>
             </form> 
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
      </div>
    </>
  );
};
export default Profile;
