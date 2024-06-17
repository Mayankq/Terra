import React, { useState } from "react";
import axios from 'axios';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Input, Card, CardBody, Image, Pagination } from "@nextui-org/react";
import logo from './assets/trsutlogo.png';
import TwitterLogo from './components/twitterLogo';
import Linkedin from './components/linkedin';
import Ne from './components/ne';
import Sidebar from "./components/Sidebar";
import './search.css';
import { Link } from "react-router-dom";

const Search = () => {
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [lands, setLands] = useState([]);

    const handleSearch = async () => {
        try {
            const params = { state };
            if (city) {
                params.city = city;
            }

            const response = await axios.get('http://localhost:3001/searchLands', {
                params
            });
            setLands(response.data);
        } catch (err) {
            console.error('Error fetching lands:', err);
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
                    {lands.map(land => (
                        <Link key={land._id} to={`/land/${land._id}`}> {/* Link to land description page with landId */}
                            <Card key={land._id} isBlurred className="border-none bg-background/60 dark:bg-default-100/50 cad" shadow="sm">
                                <CardBody>
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <Image
                                                alt="Land"
                                                className="object-cover"
                                                height={200}
                                                shadow="md"
                                                src={land.images[0] || 'https://via.placeholder.com/200'}
                                                width={200}
                                            />
                                        </div>
                                        <div className="flex-grow" style={{ padding: "5px 5px 5px 10px" }}>
                                            <em><b><h2>{land.title}</h2></b></em>
                                            <p><strong>Price:</strong> {land.price}</p>
                                            <p><strong>City:</strong> {land.location.city}</p>
                                            <p><strong>State:</strong> {land.location.state}</p>
                                            <p><strong>Pincode:</strong> {land.location.zipCode}</p>
                                            {/* Add other fields as needed */}
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Link>
                    ))}
                    {lands.length > 10 && <Pagination total={Math.ceil(lands.length / 10)} initialPage={1} />}
                </div>
            </div>
        </>
    );
}

export default Search;
