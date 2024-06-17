import React, { useRef, useState } from 'react';
import './landing.css';
import logo from './assets/trsutlogo.png';
import contactImage from './assets/contact.png';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import { Image } from "@nextui-org/image";
import bg from './assets/bg.png';
import TwitterLogo from './components/twitterLogo';
import Linkedin from './components/linkedin';
import Ne from './components/ne';
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/react";
import { indianStates } from "./data";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import Customer from './components/customer';
import MyFooter from './components/footer';

function Landing() {
  const testimonialsRef = useRef(null);
  const sourceRef = useRef(null);
  const featuresRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToTestimonials = () => {
    testimonialsRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  const scrolltoFeatures = () => {
    featuresRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToSource = () => {
    sourceRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  

  return (
    <>
      <Navbar maxWidth={'full'}>
        <NavbarBrand>
          <img src={logo} width="80px" alt="TerraTrust Logo"></img>
          <p className="appName">TerraTrust</p>
        </NavbarBrand>
        <NavbarContent justify="center" className="nav-links">
          <NavbarItem>
            <Link color="var(--accents-7)" href="#" onClick={scrolltoFeatures}>
              Features
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link color="var(--accents-7)" href="#" aria-current="page" onClick={scrollToTestimonials}>
              Customers
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="var(--accents-7)" href="#" onClick={scrollToSource}>
              Source
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="nav-links">
            <Link href='./login'>Login</Link>
          </NavbarItem>
          <NavbarItem className="nav-links">
            <Link href='./signup'>SignUp</Link>
          </NavbarItem>
          <NavbarItem className="nav-links">
            <Button href="#" variant="flat">
              <TwitterLogo />
              <Linkedin />
              <Ne />
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <div>
        <div className='bgImage'>
          <div className='some'>
            <div className='inps'>
              <Select label="Select a state" radius='full' size='lg'>
                {indianStates.map((state) => (
                  <SelectItem key={state.value} value={state.value}>
                    {state.label}
                  </SelectItem>
                ))}
              </Select>
              <br></br>
              <br></br>
              <br></br>
              <Input radius='full' type="default" label="City" size='lg' />
              <br></br>
              <br></br>
            <Button size="lg" radius='full'>Search!!</Button>
            </div>
            <div>
              <h1 className='inText'>Let's Find The<br></br>Perfect Land<br></br>For You</h1>
              <h6 className='smallText'>Buy and sell lands as easy as clothes, with the security<br></br>of blockchain</h6>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '50px' }}>
            <Button size="lg" radius='full' onClick={scrolltoFeatures}>Still unsure? Know us more!!</Button>
          </div>
        </div>
      </div>

      <h1 ref={featuresRef} className='features' id='features'>Features</h1>
      <div className='card-container'>
        <Card className="py-4" isHoverable>
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold">Safety of blockchain</p>
            <small className="text-default-500">Uses Ethereum</small>
            <h3 className="font-bold text-large">Secure</h3>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <Image
              alt="Card background"
              className="object-cover rounded-xl"
              src="https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              width={270}
              height={180}
            />
          </CardBody>
        </Card>
        <Card className="py-4" isHoverable>
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold">Speed you can't imagine</p>
            <small className="text-default-500">Smooth as butter</small>
            <h4 className="font-bold text-large">Fast</h4>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <Image
              alt="Card background"
              className="object-cover rounded-xl"
              src="https://images.pexels.com/photos/169976/pexels-photo-169976.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              width={270}
              height={180}
            />
          </CardBody>
        </Card>
        <Card className="py-4" isHoverable>
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold">No complex paperworks</p>
            <small className="text-default-500">Easy as pie</small>
            <h4 className="font-bold text-large">Easy</h4>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <Image
              alt="Card background"
              className="object-cover rounded-xl"
              src="https://images.pexels.com/photos/4458418/pexels-photo-4458418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              width={270}
              height={180}
            />
          </CardBody>
        </Card>
        <Card className="py-4" isHoverable>
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold">No thirdman</p>
            <small className="text-default-500">Verified</small>
            <h4 className="font-bold text-large">Trustworthy</h4>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <Image
              alt="Card background"
              className="object-cover rounded-xl"
              src="https://images.pexels.com/photos/814544/pexels-photo-814544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              width={270}
              height={180}
            />
          </CardBody>
        </Card>
      </div>

      <h1 ref={testimonialsRef} className='testimonials' id='testimonials'>Our Customers</h1>
      <Customer link="https://images.pexels.com/photos/11905784/pexels-photo-11905784.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" para="I've never been one for complicated processes, especially when it comes to buying property. This app streamlined everything! From browsing available lands to securely making transactions, it's been a breeze. Highly recommend for anyone looking to invest in real estate hassle-free. - Pankaj Singh." />
      <Customer link="https://images.pexels.com/photos/4307884/pexels-photo-4307884.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" para="I've been in the real estate game for years, and I've seen my fair share of apps promising easy transactions. This one actually delivers. The level of security it offers is unmatched, and the buying process couldn't be smoother. Whether you're a seasoned investor or a novice buyer, this app is a game-changer." />
      <Customer link="https://images.pexels.com/photos/3707515/pexels-photo-3707515.jpeg?auto=compress&cs=tinysrgb&w=600" para="As a first-time land buyer, I was nervous about the whole process. But this app made it so simple and secure. The interface is intuitive, the listings are comprehensive, and the built-in security measures gave me peace of mind throughout. Thanks to this app, I now own the perfect piece of land for my dream home!" />
      <br ref={sourceRef}></br>
      <MyFooter />
    </>
  );
}

export default Landing;
