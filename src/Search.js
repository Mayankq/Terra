import React, { useState, useEffect } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Input, Card, CardBody, Image, Pagination } from "@nextui-org/react";
import logo from './assets/trsutlogo.png';
import TwitterLogo from './components/twitterLogo';
import Linkedin from './components/linkedin';
import Ne from './components/ne';
import Sidebar from "./components/Sidebar";
import './search.css';
import { Link } from "react-router-dom";

const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));

const {Web3} = require('web3');
const contract = require('./LandRecords.json'); // Adjust the path if necessary

const web3 = new Web3('http://127.0.0.1:7545'); // Replace with your Ganache provider // Use 127.0.0.1 instead of localhost
const contractAddress = '0xc165F89CBCC171777A7334400ED7f74C6A249590'; // Replace with the deployed contract address
const landRecordsContract = new web3.eth.Contract(contract.abi, contractAddress);

const Search = () => {
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [lands, setLands] = useState([]); // Now stores detailed land data

  // Function to fetch land IDs based on city or state (or both)
  const fetchLandIds = async () => {
    try {
      let landIds;
      if (city && state) {
        landIds = await landRecordsContract.methods.getLandsByCityAndState(city, state).call();
      } else if (city) {
        landIds = await landRecordsContract.methods.getLandsByCity(city).call();
      } else if (state) {
        landIds = await landRecordsContract.methods.getLandsByState(state).call();
      } else {
        // Handle case where neither city nor state is provided (fetch all lands?)
        console.warn('No search criteria provided. Consider fetching all lands or implementing a default behavior.');
        return [];
      }
      return landIds; // Return fetched land IDs
    } catch (err) {
      console.error('Error fetching land IDs:', err);
      return [];
    }
  };

  // Function to fetch land details based on IDs
  const fetchLandDetails = async (landIds) => {
    try {
      const lands = await Promise.all(
        landIds.map(async (landId) => {
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
        })
      );
      setLands(lands); // Update state with detailed land data
    } catch (error) {
      console.error('Error fetching land details:', error);
    }
  };

  // Combined search function (triggers fetching IDs and then details)
  const handleSearch = async () => {
    const landIds = await fetchLandIds(); // Fetch land IDs based on search criteria
    if (landIds.length > 0) {
      await fetchLandDetails(landIds); // Fetch details for retrieved land IDs
    } else {
      setLands([]); // No lands found, clear the state
    }
  };

  useEffect(() => {
    // Empty dependency array to fetch lands on component mount (optional)
  }, []);

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
                <Avatar isBordered color="default" src={userFromLocalStorage ? userFromLocalStorage.dp : ''} />
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
        <div style={{ flex: '1', padding: "20px", alignItems:"center", justifyContent:"center" }}>
          <div className="searchBar" style={{ display: "flex", alignItems: "center" }}>
            <Input
              radius='full'
              label="State"
              placeholder="Enter state"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
            <Input
              radius='full'
              label="City"
              placeholder="Enter city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <Button onClick={handleSearch} style={{borderRadius:"50px", width:'50px', height:'50px', backgroundColor:"white", marginLeft:'5px'}}>&#128270;</Button>
          </div>
          {lands.length > 0 ? (
            lands.map(land => (
              <Link key={land.id} to={`/land/${land.id}`}> {/* Link to land description page with landId */}
                <Card key={land.id} isBlurred className="border-none bg-background/60 dark:bg-default-100/50 cad" shadow="sm">
                  <CardBody>
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Image
                          alt="Land"
                          className="object-cover"
                          height={200}
                          shadow="md"
                          src={land.images && land.images[0] || 'https://via.placeholder.com/200'}
                          width={200}
                        />
                      </div>
                      <div className="flex-grow" style={{ padding: "5px 5px 5px 10px" }}>
                        <em><b><h2>{land.title}</h2></b></em>
                        <p><strong>Price:</strong> {land.price}</p>
                        <p><strong>City:</strong> {land.city}</p>
                        <p><strong>State:</strong> {land.state}</p>
                        <p><strong>Pincode:</strong> {land.location.zipCode}</p>
                        {/* Add other fields as needed based on your land data structure */}
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Link>
            ))
          ) : (
            <p>No lands found matching your search criteria.</p>
          )}
          {lands.length > 10 && <Pagination total={Math.ceil(lands.length / 10)} initialPage={1} />}
        </div>
      </div>
    </>
  );
};

export default Search;
