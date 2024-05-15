import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";
import logo from "../assets/trsutlogo.png"

const Footer = () => {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-screen-lg">
        <Card className="w-full max-w-[400px]">
          <CardHeader className="flex gap-3">
            <Image
              alt="TerraTrust Logo"
              height={40}
              radius="sm"
              src={logo}
              width={40}
            />
            <div className="flex flex-col">
              <p className="text-md">TerraTrust</p>
              <p className="text-small text-default-500">Terratrust.netlify.app</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <p>Buy and sell lands like you buy food.</p>
          </CardBody>
          <Divider />
          <CardFooter>
            <Link
              isExternal
              showAnchorIcon
              href="https://github.com/nextui-org/nextui"
            >
              Visit source code on GitHub.
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Footer;
