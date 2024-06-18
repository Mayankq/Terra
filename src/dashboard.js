import React, { useState, useEffect } from "react";
import logo from './assets/trsutlogo.png';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import TwitterLogo from './components/twitterLogo';
import Linkedin from './components/linkedin';
import Ne from './components/ne';
import { Avatar } from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import Sidebar from "./components/Sidebar";
import { Navigate } from 'react-router-dom';
import { Link } from "react-router-dom";
const { Web3 } = require('web3');
const contract = require('./LandRecords.json'); // Adjust the path if necessary

const web3 = new Web3('http://127.0.0.1:7545'); // Replace with your Ganache provider // Use 127.0.0.1 instead of localhost
const contractAddress = '0xc165F89CBCC171777A7334400ED7f74C6A249590'; // Replace with the deployed contract address
const landRecordsContract = new web3.eth.Contract(contract.abi, contractAddress);

const Dashboard = () => {
  const [authenticated, setAuthenticated] = useState(localStorage.getItem('authenticated') === 'true');
  const [userLands, setUserLands] = useState([]);
  const [featuredLands, setFeaturedLands] = useState([]);
  const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));

  const featuredLandIds = [560, 730, 720, 112];

  const fetchUserLands = async (aadharNumber) => {
    try {
      const landsByAadhar = await landRecordsContract.methods.getLandsByAadhar(aadharNumber.toString()).call();
      const landsDetails = await Promise.all(landsByAadhar.map(getLandDetails));
      setUserLands(landsDetails);
    } catch (error) {
      console.error('Error fetching user lands:', error);
    }
  };

  const fetchFeaturedLands = async () => {
    try {
      const landsDetails = await Promise.all(featuredLandIds.map(getLandDetails));
      setFeaturedLands(landsDetails);
    } catch (error) {
      console.error('Error fetching featured lands:', error);
    }
  };

  const getLandDetails = async (landId) => {
    try {
      const land = await landRecordsContract.methods.lands(landId).call();
      return {
        id: land.id.toString(),
        title: land.details.title,
        description: land.details.description,
        location: land.details.location,
        zoningType: land.details.zoningType,
        utilities: land.details.utilities,
        images: land.details.images,
        listed: land.details.listed,
        listableForFractionalOwnership: land.details.listableForFractionalOwnership,
        numberOfFractions: land.details.numberOfFractions.toString(),
        owner: {
          name: land.owner.name,
          contact: land.owner.contact,
          email: land.owner.email,
          aadharNumber: land.owner.aadharNumber
        },
        city: land.city,
        state: land.state,
        fractionOwners: (await landRecordsContract.methods.getFractionOwners(landId).call()).map(fractionOwner => ({
          owner: fractionOwner.owner,
          fraction: fractionOwner.fraction.toString()
        }))
      };
    } catch (error) {
      console.error('Error fetching land details:', error);
      return null;
    }
  };

  useEffect(() => {
    if (userFromLocalStorage) {
      fetchUserLands(userFromLocalStorage.aadhar);
    }
    fetchFeaturedLands();
  }, [userFromLocalStorage]);

  const handleLogout = () => {
    localStorage.removeItem('authenticated');
    localStorage.removeItem('user');
    setAuthenticated(false);
  };

  if (!authenticated) {
    return <Navigate to="/" />;
  }

  return (
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
                  <Avatar isBordered color="default" src={userFromLocalStorage ? userFromLocalStorage.dp : ''} />
                </div>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="new">New file</DropdownItem>
                <DropdownItem key="copy">Appearance</DropdownItem>
                <DropdownItem key="edit"><Link to="/profile">Profile Settings</Link></DropdownItem>
                <DropdownItem key="delete" className="text-danger" color="danger">
                  <Link onClick={handleLogout} to="/">Logout</Link>
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
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <Sidebar />
        <div style={{ flex: '1', padding: "20px" }}>
          <h1 style={{ fontFamily: "inter", fontSize: "1.5em" }}>Your Holdings</h1>
          <br></br>
          <div className="flex" style={{ justifyContent: "space-between", flexWrap: 'wrap' }}>
            {userLands.map(land => (
              <Link key={land.id} to={`/land/${land.id}`}> {/* Link to land description page with landId */}
                <Card key={land.id}>
                  <CardHeader>{land.title}</CardHeader>
                  <CardBody>
                    <Image src={land.images[0]} width={200} height={150} />
                    <p>Price: {land.price}</p>
                    <p>City: {land.city}</p>
                    <p>State: {land.state}</p>
                    {/* Add more details as needed */}
                  </CardBody>
                </Card>
              </Link>
            ))}
          </div>
          <br></br>
          <hr></hr>
          <br></br>
          <h1 style={{ fontFamily: "inter", fontSize: "1.5em" }}>Featured Lands</h1>
          <br></br>
          <div className="flex" style={{ justifyContent: "space-between", flexWrap: 'wrap' }}>
            {featuredLands.map(land => (
              <Link key={land.id} to={`/land/${land.id}`}> {/* Link to land description page with landId */}
                <Card key={land.id}>
                  <CardHeader>{land.title}</CardHeader>
                  <CardBody>
                    <Image src={land.images[0]} width={200} height={150} />
                    <p>Price: {land.price}</p>
                    <p>City: {land.city}</p>
                    <p>State: {land.state}</p>
                    {/* Add more details as needed */}
                  </CardBody>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
