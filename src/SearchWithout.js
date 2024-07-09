import React, { useState, useEffect } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Input, Card, CardBody, Image, Pagination } from "@nextui-org/react";
import logo from './assets/trsutlogo.png';
import { Link } from "react-router-dom";

const { Web3 } = require('web3');
const contract = require('./LandRecords.json');
const web3 = new Web3('http://127.0.0.1:7545');
const contractAddress = '0x3c0C4463367E84dA0925E8D674006108d9AF397F';
const landRecordsContract = new web3.eth.Contract(contract.abi, contractAddress);

const SearchWithout = () => {
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [lands, setLands] = useState([]);

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
        console.warn('No search criteria provided. Consider fetching all lands or implementing a default behavior.');
        return [];
      }
      return landIds;
    } catch (err) {
      console.error('Error fetching land IDs:', err);
      return [];
    }
  };

  const fetchLandDetails = async (landIds) => {
    try {
      const lands = await Promise.all(
        landIds.map(async (landId) => {
          const land = await landRecordsContract.methods.lands(landId).call();
          return {
            id: land.id.toString(),
            price: land.details.price.toString(),
            title: land.details.title,
            price: land.details.price,
            city: land.city,
            state: land.state,
            location: land.details.location,
            images: land.details.images || ['https://via.placeholder.com/200'], // Default image if no images found
          };
        })
      );
      setLands(lands);
    } catch (error) {
      console.error('Error fetching land details:', error);
    }
  };

  const handleSearch = async () => {
    const landIds = await fetchLandIds();
    if (landIds.length > 0) {
      await fetchLandDetails(landIds);
    } else {
      setLands([]);
    }
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
            <Button href="#" variant="flat">
              Search
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <hr />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <div style={{ flex: '1', padding: "20px", alignItems: "center", justifyContent: "center" }}>
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
            <Button onClick={handleSearch} style={{ borderRadius: "50px", width: '50px', height: '50px', backgroundColor: "white", marginLeft: '5px' }}>&#128270;</Button>
          </div>
          {lands.length > 0 ? (
            lands.map(land => (
                <Card key={land.id} isBlurred className="border-none bg-background/60 dark:bg-default-100/50 cad" shadow="sm">
                  <CardBody>
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Image
                          alt="Land"
                          className="object-cover"
                          height={200}
                          shadow="md"
                          src={land.images[0]}
                          width={200}
                        />
                      </div>
                      <div className="flex-grow" style={{ padding: "5px 5px 5px 10px" }}>
                        <em><b><h2>{land.title}</h2></b></em>
                        <p><strong>Price:</strong> {land.price}</p>
                        <p><strong>City:</strong> {land.city}</p>
                        <p><strong>State:</strong> {land.state}</p>
                        <p><strong>Pincode:</strong> {land.location.zipCode}</p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
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

export default SearchWithout;
