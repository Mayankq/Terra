import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from "@nextui-org/react";
import { Link } from 'react-router-dom';
import TwitterLogo from './components/twitterLogo';
import Linkedin from './components/linkedin';
import Ne from './components/ne';
import { Avatar } from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import './Landdesc.css';
import ImageCarousel from "./components/ImageCarousel";
import logo from './assets/trsutlogo.png';
import { LocationMarkerIcon, CurrencyDollarIcon, LightningBoltIcon, DocumentTextIcon, CheckIcon } from '@heroicons/react/outline'; // Import Tailwind UI icons

import Web3 from 'web3';
import MyContract from './build/contracts/MyContract.json';

const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");

const networkId = await web3.eth.net.getId();
const deployedNetwork = MyContract.networks[networkId];
const instance = new web3.eth.Contract(
  MyContract.abi,
  deployedNetwork && deployedNetwork.address,
);

// Now you can interact with your contract instance

// Example function to call the increment function of the contract
async function incrementCount() {
    const accounts = await web3.eth.getAccounts();
    await instance.methods.increment().send({ from: accounts[0] });
  }
  
  // Example function to get the count value
  async function getCount() {
    const count = await instance.methods.count().call();
    alert(count);
  }
  


const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));





const Landdesc = () => {
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
                    <Link className="appName" to="/dashboard">
      TerraTrust
    </Link>
                </NavbarBrand>
                <NavbarContent justify="end">
                    <NavbarItem>
                        <Dropdown>
                            <DropdownTrigger>
                                <div className="flex gap-4 items-center">
                                    <Avatar isBordered color="default" src={userFromLocalStorage ? userFromLocalStorage.dp : ''} />
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
            <div className="content bg-gray-100 p-8">
                <div className="max-w-3xl mx-auto">
                    <h1 className="font-semibold mb-4" style={{fontSize:'3em'}}>{landDetails.title}</h1>
                    <br></br>
                    <h2 className="text-xl font-semibold mb-4" style={{fontSize:'2em'}}>Details</h2>
                    <br></br>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="flex items-center mb-2"><LocationMarkerIcon className="h-5 w-5 mr-2" /> <b>Location:&#0160;</b> {landDetails.location.address}, {landDetails.location.city}, {landDetails.location.state}, {landDetails.location.country}, {landDetails.location.zipCode}</p>
                            <p className="flex items-center mb-2"><CurrencyDollarIcon className="h-5 w-5 mr-2" /> <b>Price:&#0160;</b> {landDetails.price}</p>
                            <p className="flex items-center mb-2"><CheckIcon className="h-5 w-5 mr-2" /> <b>Ownership Type:&#0160;</b> {landDetails.ownershipType}</p>
                            <p className="flex items-center mb-2"><DocumentTextIcon className="h-5 w-5 mr-2" /> <b>Legal Documents:&#0160;</b> {landDetails.legalDocuments.join(', ')}</p>
                        </div>
                        <div>
                            <p className="flex items-center mb-2"><LightningBoltIcon className="h-5 w-5 mr-2" /> <b>Water:&#0160;</b> {landDetails.utilities.water ? 'Available' : 'Not Available'}</p>
                            <p className="flex items-center mb-2"><LightningBoltIcon className="h-5 w-5 mr-2" /> <b>Electricity:&#0160;</b> {landDetails.utilities.electricity ? 'Available' : 'Not Available'}</p>
                            <br></br><br></br>
                            <p className="flex items-center mb-2"><b>Size: &#0160;</b>{landDetails.size}</p>
                            <p className="flex items-center mb-2"><b>Zoning Type:&#0160;</b> {landDetails.zoningType}</p>
                            <p className="flex items-center mb-2"><b>Accessibility:&#0160;</b> {landDetails.accessibility}</p>
                        </div>
                    </div>
                    <br></br><br></br>
                    <div className="flex">
                        <Button size="lg" color="primary" onClick={incrementCount}>Buy</Button>
                        &#0160;&#0160;&#0160;
                        <Button size="lg" color="warning" onClick={getCount}>Buy Tokens</Button>
                        &#0160;&#0160;&#0160;
                        <Button size="lg" color="secondary">Sell</Button>
                        &#0160;&#0160;&#0160;
                        <Button size="lg" color="secondary">Tokenize</Button>
                    </div>
                </div>
                </div>
        </>
    );
}

export default Landdesc;
