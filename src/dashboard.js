import React, { useState, useEffect } from "react";
import logo from './assets/trsutlogo.png';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import TwitterLogo from './components/twitterLogo';
import Linkedin from './components/linkedin';
import Ne from './components/ne';
import { Avatar } from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import Sidebar from "./components/Sidebar";
import LineChart from "./components/LineChart";
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { Link } from "react-router-dom";

const Dashboard = () => {
  const chartData = [12, 19, 3, 5, 2, 3];
  const chartLabels = ['January', 'February', 'March', 'April', 'May', 'June'];
  const [authenticated, setAuthenticated] = useState(localStorage.getItem('authenticated') === 'true');
  const [userLands, setUserLands] = useState([]);
  const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (userFromLocalStorage) {
      fetchUserLands(userFromLocalStorage.landIds);
    }
  }, [userFromLocalStorage]);

  const fetchUserLands = async (landIds) => {
    try {
      const response = await axios.post(`http://localhost:3001/userLands`, { landIds });
      setUserLands(response.data);
    } catch (error) {
      console.error('Error fetching user lands:', error);
    }
  };
  

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
                <DropdownItem key="edit"><Link href="./profile">Profile Settings</Link></DropdownItem>
                <DropdownItem key="delete" className="text-danger" color="danger">
                  <Link onClick={handleLogout} href="./">Logout</Link>
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
              <Link key={land._id} to={`/land/${land._id}`}> {/* Link to land description page with landId */}
              <Card key={land._id}>
                <CardHeader>{land.title}</CardHeader>
                <CardBody>
                  <Image src={land.images[0]} width={200} height={150} />
                  <p>Price: {land.price}</p>
                  <p>City: {land.location.city}</p>
                  <p>State: {land.location.state}</p>
                  {/* Add more details as needed */}
                </CardBody>
              </Card>
              </Link>
            ))}
          </div>
          <br></br>
          <br></br>
          <hr></hr>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
