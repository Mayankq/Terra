import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Checkbox } from "@nextui-org/react";
import { Link } from 'react-router-dom';
import TwitterLogo from './components/twitterLogo';
import Linkedin from './components/linkedin';
import Ne from './components/ne';
import { Avatar } from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import './Landdesc.css';
import ImageCarousel from "./components/ImageCarousel";
import logo from './assets/trsutlogo.png';
import { LocationMarkerIcon, CurrencyDollarIcon, LightningBoltIcon, CheckIcon } from '@heroicons/react/outline'; // Import Tailwind UI icons
import MapEmbed from './MapEmbed';
const { Web3 } = require('web3');
const contract = require('./LandRecords.json'); // Adjust the path if necessary
const { BN } = require('bn.js'); // Import the BN class for handling big numbers
const { toBN } = require('web3-utils'); // Import the toBN function from web3-utils

const web3 = new Web3('http://127.0.0.1:7545'); // Replace with your Ganache provider // Use 127.0.0.1 instead of localhost
const contractAddress = '0x3c0C4463367E84dA0925E8D674006108d9AF397F'; // Replace with the deployed contract address
const landRecordsContract = new web3.eth.Contract(contract.abi, contractAddress);

const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY';
const latitude = 13.025556;
const longitude = 77.530111;
const zoom = 15;

const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));

const Landdesc = () => {
    const { id } = useParams();
    const [landDetails, setLandDetails] = useState(null);
    const [showBuyDiv, setShowBuyDiv] = useState(false);
    const [checked, setChecked] = useState(false);
    const [paymentMade, setPaymentMade] = useState(false);
    const [ownershipTransferred, setOwnershipTransferred] = useState(false);
    const [selectedTokens, setSelectedTokens] = useState(0); 
    const [selectedTokenCount, setSelectedTokenCount] = useState(1);
    const [showBuyTokensDiv, setShowBuyTokensDiv] = useState(false);
    const [checkedTokens, setCheckedTokens] = useState(false);
    const [showSellDiv, setShowSellDiv] = useState(false);
    const [sellPrice, setSellPrice] = useState('');

    useEffect(() => {
        fetchLandDetails(); // Fetch land details when component mounts
    }, []); // Empty dependency array to run only once

    const fetchLandDetails = async () => {
        try {
            const land = await landRecordsContract.methods.lands(id).call();
            setLandDetails({
                id: land.id.toString(),
                price: land.details.price.toString(),
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
                fractionOwners: (await landRecordsContract.methods.getFractionOwners(id).call()).map(fractionOwner => ({
                    owner: fractionOwner.owner,
                    fraction: fractionOwner.fraction.toString()
                }))
            });
        } catch (error) {
            console.error('Error fetching land details:', error);
        }
    };

    const handleCheckboxChange = (e) => {
        setChecked(e.target.checked);
    };

    const handleCheckboxChangeTokens = (e) => { // Add handleCheckboxChangeTokens
        setCheckedTokens(e.target.checked);
    };
    const handleMakePaymentTokens = () => { // Add handleMakePaymentTokens
        if (checkedTokens) {
            setPaymentMade(true);
            console.log('Payment made for tokens');
        }
    };

    const handleMakePayment = () => {
        if (checked) {
            setPaymentMade(true);
            console.log('Payment made');
        }
    };

    const handleConfirm = async () => {
        const accounts = await web3.eth.getAccounts();
        const fromAccount = accounts[0];
        if (paymentMade) {
            // Implement the actual confirmation logic here
            if (checked) {
                const landId = parseInt(id);
                try {
                    await landRecordsContract.methods.transferOwnership(landId, userFromLocalStorage.aadhar, "9929429193").send({
                        from: fromAccount,
                        gas: 600000 // Set a higher gas limit if necessary
                    });
                } catch (error) {
                    console.error(`Error during ownership transfer: ${error.message}`);
                }
            }
        }
    };

    const handleConfirmTokens = async () => {
        const accounts = await web3.eth.getAccounts();
        const fromAccount = accounts[0];
        if (checkedTokens) {
            const landId = parseInt(id);
            try {
                await landRecordsContract.methods.manageFractionalOwnership(landId, [fromAccount], [selectedTokens]).send({
                    from: fromAccount,
                    gas: 600000
                });
            } catch (error) {
                console.error(`Error during fractional ownership transfer: ${error.message}`);
            }
        }
    };

    const handleSellClick = () => {
        setShowSellDiv(true);
    };

    const handleConfirmSell = async () => {
        const accounts = await web3.eth.getAccounts();
        const fromAccount = accounts[0];
        const landId = parseInt(id);

        try {
            await landRecordsContract.methods.listLandForSale(landId, sellPrice).send({
                from: fromAccount,
                gas: 600000
            });
            fetchLandDetails(); // Refresh land details after listing
            setShowSellDiv(false); // Hide sell confirmation div after listing
        } catch (error) {
            console.error(`Error listing land for sale: ${error.message}`);
        }
    };
    const handleManageFractionalOwnership = async () => {
        try {
            const accounts = await web3.eth.getAccounts();
            const fromAccount = accounts[0];
            const landId = parseInt(id);
            
            // Call the manageFractionalOwnership function with selected tokens
            await landRecordsContract.methods.manageFractionalOwnership(landId, [fromAccount], [selectedTokens]).send({
                from: fromAccount,
                gas: 600000 // Set gas limit as needed
            });
        } catch (error) {
            console.error(`Error managing fractional ownership: ${error.message}`);
        }
    };
    
    if (!landDetails) {
        return <p>Loading...</p>;
    }

    const images = landDetails.images;

    const isOwner = userFromLocalStorage?.aadhar === landDetails.owner?.aadharNumber;

    const handleBuyClick = () => {
        setShowBuyDiv(true);
    };
    

    return (
        <>
            <Navbar className="navbar" maxWidth="full">
                <NavbarBrand>
                    <img src={logo} width="80px" alt="TerraTrust Logo" />
                    <Link className="appName" to="/dashboard">TerraTrust</Link>
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
                                    <Link to="/">Logout</Link>
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
            <hr />
            <div className="spanblack"><ImageCarousel images={images} /></div>
            <div className="content bg-gray-100 p-8">
                <div className="max-w-3xl mx-auto">
                    <h1 className="font-semibold mb-4" style={{ fontSize: '3em' }}>{landDetails.title}</h1>
                    <br />
                    <h2 className="text-xl font-semibold mb-4" style={{ fontSize: '2em' }}>Details</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="flex items-center mb-2"><LocationMarkerIcon className="h-5 w-5 mr-2" /> <b>Location:&#0160;</b> {landDetails.location}, {landDetails.city}, {landDetails.state}</p>
                            <p className="flex items-center mb-2"><CurrencyDollarIcon className="h-5 w-5 mr-2" /> <b>Price:&#0160;</b> {landDetails.price}</p>
                            <p className="flex items-center mb-2"><CheckIcon className="h-5 w-5 mr-2" /> <b>Ownership Type:&#0160;</b> {landDetails.ownershipType}</p>
                        </div>
                        <div>
                            <p className="flex items-center mb-2"><LightningBoltIcon className="h-5 w-5 mr-2" /> <b>Water:&#0160;</b> {landDetails.utilities?.water ? 'Available' : 'Not Available'}</p>
                            <p className="flex items-center mb-2"><LightningBoltIcon className="h-5 w-5 mr-2" /> <b>Electricity:&#0160;</b> {landDetails.utilities?.electricity ? 'Available' : 'Not Available'}</p>
                            <br /><br />
                            <p className="flex items-center mb-2"><b>Zoning Type:&#0160;</b> {landDetails.zoningType}</p>
                        </div>
                    </div>
                    <br /><br />
                    <MapEmbed latitude={latitude} longitude={longitude} />
                    <br></br><br></br>
                    <div className="flex">
                        {!isOwner && <Button size="lg" color="primary" onClick={handleBuyClick}>Buy</Button>}
                        &#0160;&#0160;&#0160;
                        {!isOwner && landDetails.listableForFractionalOwnership && <Button color="warning" onClick={() => setShowBuyTokensDiv(true)}>Buy Tokens</Button>}
                        &#0160;&#0160;&#0160;
                        {isOwner && (
                            <Button 
                                color="primary" 
                                onClick={handleSellClick} 
                                disabled={landDetails.listed}
                            >
                                {landDetails.listed ? 'Land Listed' : 'Sell'}
                            </Button>
                        )}
                    </div>
                </div>
            </div>
            {showBuyDiv && (
                <div className="buy-confirmation-div">
                    <div className="buy-confirmation-content">
                        <b><h1>Confirm Purchase</h1></b><br/>
                        <p>Are you sure you want to buy this land?</p>
                        <br/>
                        <div className="flex" style={{justifyContent:'center', alignItems:'center'}}> <p>I have read and agree to the <a href="/terms" style={{color:'blue'}} target="_blank">terms and conditions</a>.</p>
                        <Checkbox
                            checked={checked}
                            onChange={handleCheckboxChange}
                            label="I have read and agree to the terms and conditions"
                        /></div>
                        <br></br>
                        <div>
                            <Button color="secondary" onClick={() => setShowBuyDiv(false)}>Cancel</Button>&#0160;
                            <Button
                                color="primary"
                                disabled={!checked || paymentMade}
                                onClick={handleMakePayment}
                            >
                                Make Payment
                            </Button>&#0160;
                            <Button
                                color="warning"
                                disabled={!paymentMade}
                                onClick={handleConfirm}
                            >
                                Transfer Ownership
                            </Button>
                        </div>
                    </div>
                </div>
            )}
            {showBuyTokensDiv && (
    <div className="buy-confirmation-div">
        <div className="buy-confirmation-content">
            <b><h1>Confirm Purchase Tokens</h1></b><br/>
            <p>Are you sure you want to buy tokens for this land?</p>
            <br/>
            <div className="flex" style={{ justifyContent: 'center', alignItems: 'center' }}>
                <p>I have read and agree to the <a href="/terms" style={{ color: 'blue' }} target="_blank">terms and conditions</a>.</p>
                <Checkbox
                    checked={checkedTokens}
                    onChange={handleCheckboxChangeTokens}
                    label="I have read and agree to the terms and conditions"
                />
            </div>
            <br/>
            {/* Add Dropdown here */}
            <div style={{ margin: '20px 0' }}>
                <Dropdown>
                    <DropdownTrigger>
                        <Button>Choose Number of Tokens</Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Select number of tokens" onAction={setSelectedTokenCount}>
                        {Array.from({ length: landDetails.numberOfFractions }, (_, i) => i + 1).map(number => (
                            <DropdownItem key={number} value={number}>{number}</DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>
            </div>
            <div>
                <Button color="secondary" onClick={() => setShowBuyTokensDiv(false)}>Cancel</Button>&#0160;
                <Button
                    color="primary"
                    disabled={!checkedTokens}
                    onClick={handleMakePaymentTokens}
                >
                    Make Payment
                </Button>&#0160;
                <Button
                    color="warning"
                    disabled={!checkedTokens}
                    onClick={handleConfirmTokens}
                >
                    Transfer Ownership for Tokens
                </Button>
            </div>
        </div>
    </div>
)}
{showSellDiv && (
    <div className="buy-confirmation-div">
        <div className="buy-confirmation-content">
            <b><h1>Confirm Sale</h1></b><br/>
            <p>Are you sure you want to sell this land?</p>
            <br/>
            <div className="flex" style={{justifyContent:'center', alignItems:'center'}}> 
                <p>I have read and agree to the <a href="/terms" style={{color:'blue'}} target="_blank">terms and conditions</a>.</p>
                <Checkbox
                    isSelected={checked}
                    onChange={handleCheckboxChange}
                >
                </Checkbox>
            </div>
            <br/>
            <input 
                type="number" 
                value={sellPrice} 
                onChange={(e) => setSellPrice(e.target.value)} 
                placeholder="Enter selling price" 
                className="form-control"
            />
            <div>
            <br></br>
                <Button color="secondary" onClick={() => setShowSellDiv(false)}>Cancel</Button>&#0160;
                <Button
                    color="primary"
                    disabled={!sellPrice || !checked}
                    onClick={handleConfirmSell}
                >
                    Confirm Sale
                </Button>
            </div>
        </div>
    </div>
)}

        </>
    );
};

export default Landdesc;
