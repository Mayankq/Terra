**TerraTrust**

TerraTrust is a decentralized application (dApp) for managing land records using blockchain technology. The project aims to bring transparency, security, and efficiency to land record management.

Table of Contents
Introduction
Features
Technologies Used
Installation
Usage
Project Structure
Contributing
License

**Introduction**
TerraTrust leverages blockchain technology to create a secure and transparent land record management system. The application allows users to view, manage, and transfer land ownership records securely.

**Features**
User Authentication: Secure login and authentication using Aadhaar numbers.
Land Records Management: View and manage land details including title, description, location, zoning type, utilities, images, and ownership information.
Search Functionality: Search for land records by city, state, owner's Aadhaar number, and owner's name.


**Technologies Used**
Frontend: React, NextUI, Axios
Backend: Node.js, Express
Blockchain: Solidity, Web3.js
Database: Ethereum Blockchain, Ganache for local development
Others: Truffle

**Installation**
Prerequisites
Node.js and npm installed
Ganache for local Ethereum blockchain setup
Steps
Clone the repository:

git clone https://github.com/yourusername/terratrust.git
cd terratrust

Install dependencies:

npm install
Compile and deploy the smart contracts:

truffle compile
truffle migrate
Start the development server:

npm start

Also start the terraserver, by going in the terraserver directory and running npm start.

Note: You might have to change some key details related to database and blockchain addresses.
Open the application in your browser:

http://localhost:3000

**Usage**
Login: Use your Aadhaar number to login.
View Holdings: View a list of your land holdings on the dashboard.
Search Lands: Search for lands by city, state, Aadhaar number, or owner's name.
Manage Lands: Add, edit, or transfer land records as needed.

**Contributing**
Contributions are welcome! Please fork the repository and submit a pull request.

Fork the Project
Create your Feature Branch (git checkout -b feature/AmazingFeature)
Commit your Changes (git commit -m 'Add some AmazingFeature')
Push to the Branch (git push origin feature/AmazingFeature)
Open a Pull Request


Thank you for using TerraTrust! If you have any questions or feedback, feel free to open an issue on GitHub.






