import React from "react";
import logo from './assets/trsutlogo.png'
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import TwitterLogo from './components/twitterLogo';
import Linkedin from './components/linkedin';
import Ne from './components/ne';
import {Avatar} from "@nextui-org/react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
import Sidebar from "./components/Sidebar";
import LineChart from "./components/LineChart";
import Land1 from './assets/land1.png' 

const Dashboard = () => {
    const chartData = [12, 19, 3, 5, 2, 3];
    const chartLabels = ['January', 'February', 'March', 'April', 'May', 'June'];
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
        <DropdownItem key="edit"><Link href="./profile">Profile Settings</Link></DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger">
          <Link href="./">Logout</Link>
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
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <Sidebar/>
        <div style={{ flex: '1', padding: "20px" }}> {/* Set flex: 1 */}
        <h1 style={{fontFamily:"inter", fontSize:"1.5em"}}>Your Holdings</h1>
        <br></br>
        <div className="flex" style={{justifyContent:"space-between"}}>
        <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">Karnataka</p>
        <small className="text-default-500">1780 Sqft</small>
        <h4 className="font-bold text-large">Bengaluru</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={Land1}
          width={270}
        />
      </CardBody>
    </Card>
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">UttarPradesh</p>
        <small className="text-default-500">1200 Sqft</small>
        <h4 className="font-bold text-large">Lucknow</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={Land1}
          width={270}
        />
      </CardBody>
    </Card><Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">MadhyaPradesh</p>
        <small className="text-default-500">1000 Sqft</small>
        <h4 className="font-bold text-large">Indore</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={Land1}
          width={270}
        />
      </CardBody>
    </Card>
    </div>
    <br></br>
    <br></br>
    <hr></hr>
    <div style={{width:"90%"}}>
    <LineChart data={chartData} labels={chartLabels} />
    </div>
        </div>
        </div>
        </>
    );
}

export default Dashboard;