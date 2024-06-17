import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import TwitterLogo from './components/twitterLogo';
import Linkedin from './components/linkedin';
import Ne from './components/ne';
import { Avatar } from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import './Acquired.css';
import ImageCarousel from "./components/ImageCarousel";
import logo from './assets/trsutlogo.png';

const Acquired = () => {
    const { id } = useParams();
    const [landDetails, setLandDetails] = useState(null);

    useEffect(() => {
        fetchLandDetails(); // Fetch land details when component mounts
    }, []); // Empty dependency array to run only once

    const fetchLandDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/land/${id}`);
            setLandDetails(response.data);
        } catch (error) {
            console.error('Error fetching land details:', error);
        }
    };

    if (!landDetails) {
        return <p>Loading...</p>;
    }

    const images = landDetails.images;

    return (
        <>
            <Navbar className="navbar" maxWidth="full">
                <NavbarBrand>
                    <img src={logo} width="80px" alt="TerraTrust Logo" />
                    <a className="appName" href="./">TerraTrust</a>
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
                                <DropdownItem key="edit"><Link href="./profile">Profile Settings</Link></DropdownItem>
                                <DropdownItem key="delete" className="text-danger" color="danger">
                                    <Link href="./">Logout</Link>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
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
            <div className="spanblack"><ImageCarousel images={images} /></div>
            <div className="content">
                <h1 className="font-bold">{landDetails.title}</h1>
                <br></br>
                <h2>Details</h2>
                <br></br>
                <div className="details">
                    <p>Location: {landDetails.location.address}, {landDetails.location.city}, {landDetails.location.state}, {landDetails.location.country}, {landDetails.location.zipCode}</p>
                    <p>Size: {landDetails.size}</p>
                    <p>Price: {landDetails.price}</p>
                    <p>Ownership Type: {landDetails.ownershipType}</p>
                    <p>Zoning Type: {landDetails.zoningType}</p>
                    <p>Water: {landDetails.utilities.water ? 'Available' : 'Not Available'}</p>
                    <p>Electricity: {landDetails.utilities.electricity ? 'Available' : 'Not Available'}</p>
                    <p>Accessibility: {landDetails.accessibility}</p>
                    <p>Legal Documents: {landDetails.legalDocuments.join(', ')}</p>
                    {/* Render other details as needed */}
                </div>

            </div>
        </>
    );
}

export default Acquired;
