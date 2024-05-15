import React from "react";
import logo from './assets/trsutlogo.png'
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import TwitterLogo from './components/twitterLogo';
import Linkedin from './components/linkedin';
import Ne from './components/ne';
import {Avatar} from "@nextui-org/react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";
import Sidebar from "./components/Sidebar";
import {Input} from "@nextui-org/react";
import './search.css'
import {Select, SelectItem} from "@nextui-org/react";
import {indianStates} from "./data";
import {Card, CardBody, Image, Slider} from "@nextui-org/react";
import {Pagination} from "@nextui-org/react";

const Search = () => {
    const [liked, setLiked] = React.useState(false);
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
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <Sidebar/>
        <div style={{ flex: '1', padding: "20px" }}> {/* Set flex: 1 */}
        <div className="searchBar">
        <Select label="Select a state" radius='full' className="inp">
  {indianStates.map((state) => (
    <SelectItem key={state.value} value={state.value}>
      {state.label}
    </SelectItem>
  ))}
</Select>
        <Input
          radius='full'
          label="State"
          placeholder="Enter state"
        />
        </div>
        <Card
  isBlurred
  className="border-none bg-background/60 dark:bg-default-100/50 cad"
  shadow="sm"
>
  <CardBody>
    <div className="flex items-center">
      <div className="flex-shrink-0">
        <Image
          alt="Album cover"
          className="object-cover"
          height={200}
          shadow="md"
          src="https://as1.ftcdn.net/v2/jpg/06/29/77/62/1000_F_629776270_D5wh0yAYyAbAmnhPjt97TfyLKIarkja3.jpg"
          width={200} // Set a fixed width or use a percentage
        />
      </div>
      <div className="flex-grow" style={{padding:"5px 5px 5px 10px"}}>
        {/* Content here will now be aligned to the right of the image */}
        <b>Serene Woodland Retreat:</b> Nestled amidst towering pine trees and winding forest paths, this plot of land offers a secluded haven for nature lovers. With a babbling brook meandering through its heart and abundant wildlife, it's an idyllic canvas for your dream cabin or eco-friendly retreat.
      </div>
    </div>
  </CardBody>
</Card>
<Card
  isBlurred
  className="border-none bg-background/60 dark:bg-default-100/50 cad"
  shadow="sm"
>
  <CardBody>
    <div className="flex items-center">
      <div className="flex-shrink-0">
        <Image
          alt="Album cover"
          className="object-cover"
          height={200}
          shadow="md"
          src="https://as1.ftcdn.net/v2/jpg/06/29/77/62/1000_F_629776270_D5wh0yAYyAbAmnhPjt97TfyLKIarkja3.jpg"
          width={200} // Set a fixed width or use a percentage
        />
      </div>
      <div className="flex-grow" style={{padding:"5px 5px 5px 10px"}}>
        {/* Content here will now be aligned to the right of the image */}
        <b>Coastal Paradise:</b> Overlooking the shimmering expanse of the azure ocean, this prime coastal plot boasts breathtaking panoramic views and direct access to pristine sandy beaches. Whether you envision a luxury seaside villa or a charming beachside cottage.</div>
    </div>
  </CardBody>
</Card><Card
  isBlurred
  className="border-none bg-background/60 dark:bg-default-100/50 cad"
  shadow="sm"
>
  <CardBody>
    <div className="flex items-center">
      <div className="flex-shrink-0">
        <Image
          alt="Album cover"
          className="object-cover"
          height={200}
          shadow="md"
          src="https://as1.ftcdn.net/v2/jpg/06/29/77/62/1000_F_629776270_D5wh0yAYyAbAmnhPjt97TfyLKIarkja3.jpg"
          width={200} // Set a fixed width or use a percentage
        />
      </div>
      <div className="flex-grow" style={{padding:"5px 5px 5px 10px"}}>
        {/* Content here will now be aligned to the right of the image */}
        <b>Tranquil Countryside Haven:</b> Set in the rolling hills of the countryside, this picturesque plot exudes rustic charm and tranquility. Surrounded by emerald fields and meadows dotted with wildflowers, it offers endless possibilities for cultivating a hobby farm</div>
    </div>
  </CardBody>
</Card><Card
  isBlurred
  className="border-none bg-background/60 dark:bg-default-100/50 cad"
  shadow="sm"
>
  <CardBody>
    <div className="flex items-center">
      <div className="flex-shrink-0">
        <Image
          alt="Album cover"
          className="object-cover"
          height={200}
          shadow="md"
          src="https://as1.ftcdn.net/v2/jpg/06/29/77/62/1000_F_629776270_D5wh0yAYyAbAmnhPjt97TfyLKIarkja3.jpg"
          width={200} // Set a fixed width or use a percentage
        />
      </div>
      <div className="flex-grow" style={{padding:"5px 5px 5px 10px"}}>
        {/* Content here will now be aligned to the right of the image */}
        Serene Woodland Retreat: Nestled amidst towering pine trees and winding forest paths, this plot of land offers a secluded haven for nature lovers. With a babbling brook meandering through its heart and abundant wildlife, it's an idyllic canvas for your dream cabin or eco-friendly retreat.
      </div>
    </div>
  </CardBody>
</Card><Card
  isBlurred
  className="border-none bg-background/60 dark:bg-default-100/50 cad"
  shadow="sm"
>
  <CardBody>
    <div className="flex items-center">
      <div className="flex-shrink-0">
        <Image
          alt="Album cover"
          className="object-cover"
          height={200}
          shadow="md"
          src="https://as1.ftcdn.net/v2/jpg/06/29/77/62/1000_F_629776270_D5wh0yAYyAbAmnhPjt97TfyLKIarkja3.jpg"
          width={200} // Set a fixed width or use a percentage
        />
      </div>
      <div className="flex-grow" style={{padding:"5px 5px 5px 10px"}}>
        {/* Content here will now be aligned to the right of the image */}
        Serene Woodland Retreat: Nestled amidst towering pine trees and winding forest paths, this plot of land offers a secluded haven for nature lovers. With a babbling brook meandering through its heart and abundant wildlife, it's an idyllic canvas for your dream cabin or eco-friendly retreat.
      </div>
    </div>
  </CardBody>
</Card><Card
  isBlurred
  className="border-none bg-background/60 dark:bg-default-100/50 cad"
  shadow="sm"
>
  <CardBody>
    <div className="flex items-center">
      <div className="flex-shrink-0">
        <Image
          alt="Album cover"
          className="object-cover"
          height={200}
          shadow="md"
          src="https://as1.ftcdn.net/v2/jpg/06/29/77/62/1000_F_629776270_D5wh0yAYyAbAmnhPjt97TfyLKIarkja3.jpg"
          width={200} // Set a fixed width or use a percentage
        />
      </div>
      <div className="flex-grow" style={{padding:"5px 5px 5px 10px"}}>
        {/* Content here will now be aligned to the right of the image */}
        Serene Woodland Retreat: Nestled amidst towering pine trees and winding forest paths, this plot of land offers a secluded haven for nature lovers. With a babbling brook meandering through its heart and abundant wildlife, it's an idyllic canvas for your dream cabin or eco-friendly retreat.
      </div>
    </div>
  </CardBody>
</Card>
<br></br>
<Pagination total={5} initialPage={1} />
        </div>
        </div>
        </>
    );
}

export default Search;