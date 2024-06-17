import React from "react";
import logo from './assets/trsutlogo.png'
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import TwitterLogo from './components/twitterLogo';
import Linkedin from './components/linkedin';
import Ne from './components/ne';
import {Avatar} from "@nextui-org/react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";
import Sidebar from "./components/Sidebar";
import './bestselect.css'
import { Image } from "@nextui-org/react";
import fimage from './assets/best1.png'
import simage from './assets/best2.png'


const Best = () => {
    return(
        <>
        <Navbar maxWidth={'full'}>
          <NavbarBrand>
            <img src={logo} width="80px" alt="TerraTrust Logo"></img>
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
        <hr></hr>
        <div style={{ display: 'flex' }}>
          <Sidebar />
          <div style={{ flex: 1, padding: '10px' }}>
          <div className="featuredrow1" >
          <Image
      isZoomed
      className="imgs"
      alt="Featured Selection 1"
      src={fimage}
    />
    <Image
      isZoomed
      className="imgs2"
      alt="Featured Selection 1"
      src={simage}
    />
    </div>
    <div className="featuredrow2">
    <Image
      isZoomed
      className="imgs3"
      alt="Featured Selection 1"
      src={fimage}
    />
    <Image
      isZoomed
      className="imgs4"
      alt="Featured Selection 1"
      src={fimage}
    />
    </div>
    <div className="featuredrow2">
    <Image
      isZoomed
      className="imgs5"
      alt="Featured Selection 1"
      src={fimage}
    />
    <Image
      isZoomed
      className="imgs6"
      alt="Featured Selection 1"
      src={fimage}
    />
    </div>
    <div className="featuredrow3">
    <Image
      isZoomed
      className="imgs7"
      alt="Featured Selection 1"
      src={fimage}
    />
    <div>
    <Image
      isZoomed
      className="imgs8"
      alt="Featured Selection 1"
      src={fimage}
    />
    <Image
      isZoomed
      className="imgs9"
      alt="Featured Selection 1"
      src={fimage}
    />
    </div>
    </div>
        </div>
        </div>
        </>
    );
}

export default Best;