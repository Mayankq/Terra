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

const Terms = () => {
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
        <b style={{fontSize:"2em", fontFamily: "Inter"}}>Terms and Conditions</b>
        <br></br>
        <br></br>
        <p><strong>Welcome to TerraTrust</strong>, a real estate app designed to help you buy, sell, or rent properties. These terms and conditions ("<strong>Terms</strong>") outline your rights and responsibilities when using TerraTrust. By accessing or using TerraTrust, you agree to comply with these Terms. Please read them carefully.</p>

<b>1. Acceptance of Terms</b>
<p><strong>1.1</strong> By accessing or using TerraTrust, you agree to be bound by these Terms, our Privacy Policy, and all applicable laws and regulations.</p>
<p><strong>1.2</strong> If you do not agree with any provision of these Terms, please do not use TerraTrust.</p>

<h2>2. Registration</h2>
<p><strong>2.1</strong> You may need to register for an account to access certain features of TerraTrust. When registering, you agree to provide accurate and complete information.</p>
<p><strong>2.2</strong> You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>

<h2>3. Use of TerraTrust</h2>
<p><strong>3.1</strong> You agree to use TerraTrust solely for lawful purposes and in accordance with these Terms.</p>
<p><strong>3.2</strong> You may not use TerraTrust in any manner that could damage, disable, overburden, or impair our servers or networks, or interfere with any other party's use and enjoyment of TerraTrust.</p>
<p><strong>3.3</strong> You may not attempt to gain unauthorized access to any part of TerraTrust, other accounts, computer systems, or networks connected to TerraTrust.</p>

<h2>4. Property Listings</h2>
<p><strong>4.1</strong> TerraTrust provides property listings for informational purposes only. We do not guarantee the accuracy, completeness, or reliability of any property listing.</p>
<p><strong>4.2</strong> We do not endorse any property listed on TerraTrust, nor do we make any representations or warranties regarding the quality, safety, or legality of any property listed.</p>
<p><strong>4.3</strong> You are solely responsible for evaluating and verifying the accuracy of any information provided in property listings before entering into any transaction.</p>

<h2>5. User Content</h2>
<p><strong>5.1</strong> You may have the opportunity to submit or upload content to TerraTrust, including property listings, reviews, comments, and messages ("<strong>User Content</strong>").</p>
<p><strong>5.2</strong> By submitting User Content, you grant TerraTrust a non-exclusive, royalty-free, worldwide, perpetual, irrevocable, and sublicensable right to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such User Content in any form, media, or technology.</p>
<p><strong>5.3</strong> You represent and warrant that you have the necessary rights, permissions, and licenses to submit User Content to TerraTrust, and that such User Content does not violate any third party's rights or applicable laws.</p>

<h2>6. Intellectual Property</h2>
<p><strong>6.1</strong> TerraTrust and its content, features, and functionality are owned by TerraTrust or its licensors and are protected by copyright, trademark, and other intellectual property laws.</p>
<p><strong>6.2</strong> You may not use, reproduce, modify, adapt, distribute, display, or create derivative works of TerraTrust without our prior written consent.</p>

<h2>7. Termination</h2>
<p><strong>7.1</strong> We reserve the right to terminate or suspend your access to TerraTrust, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms.</p>
<p><strong>7.2</strong> Upon termination, your right to access TerraTrust will immediately cease, and you must cease all use of TerraTrust.</p>

<h2>8. Disclaimer of Warranties</h2>
<p><strong>8.1</strong> TerraTrust is provided on an "as is" and "as available" basis. We make no representations or warranties of any kind, express or implied, regarding the operation or availability of TerraTrust.</p>
<p><strong>8.2</strong> We disclaim all warranties, express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement.</p>

<h2>9. Limitation of Liability</h2>
<p><strong>9.1</strong> In no event shall TerraTrust, its directors, officers, employees, or agents be liable for any indirect, consequential, incidental, special, punitive, or exemplary damages arising out of or in connection with your use of TerraTrust, whether based on warranty, contract, tort (including negligence), or any other legal theory.</p>
<p><strong>9.2</strong> Our total liability to you for all claims arising out of or in connection with TerraTrust shall not exceed the amount paid by you, if any, to TerraTrust during the twelve (12) month period prior to the event giving rise to such liability.</p>

<h2>10. Governing Law</h2>
<p><strong>10.1</strong> These Terms shall be governed by and construed in accordance with the laws of [Jurisdiction], without regard to its conflict of law provisions.</p>

<h2>11. Changes to Terms</h2>
<p><strong>11.1</strong> We reserve the right to modify or replace these Terms at any time, in our sole discretion. If we make material changes to these Terms, we will notify you by posting the new Terms on TerraTrust.</p>
<p><strong>11.2</strong> Your continued use of TerraTrust after any such changes constitutes your acceptance of the new Terms.</p>

<h2>12. Contact Us</h2>
<p><strong>12.1</strong> If you have any questions about these Terms, please contact us at [email address].</p>
<br></br>

<p>Thank you for using TerraTrust!</p>
        </div>
        </div>
        </>
    );
}

export default Terms;