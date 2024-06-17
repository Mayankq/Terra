const fs = require('fs');
const {Web3} = require('web3');
const contract = require('./build/contracts/LandRecords.json'); // Adjust the path if necessary

const web3 = new Web3('http://127.0.0.1:7545'); // Replace with your Ganache provider // Use 127.0.0.1 instead of localhost
const contractAddress = '0xc165F89CBCC171777A7334400ED7f74C6A249590'; // Replace with the deployed contract address
const landRecordsContract = new web3.eth.Contract(contract.abi, contractAddress);

// Helper function to fetch detailed land info
async function getLandDetails(landId) {
    const land = await landRecordsContract.methods.lands(landId).call();
    return {
        id: land.id.toString(),
        details: {
            title: land.details.title,
            description: land.details.description,
            location: land.details.location,
            zoningType: land.details.zoningType,
            utilities: land.details.utilities,
            images: land.details.images,
            listed: land.details.listed,
            listableForFractionalOwnership: land.details.listableForFractionalOwnership,
            numberOfFractions: land.details.numberOfFractions.toString()
        },
        owner: {
            name: land.owner.name,
            contact: land.owner.contact,
            email: land.owner.email,
            aadharNumber: land.owner.aadharNumber
        },
        city: land.city,
        state: land.state,
        fractionOwners: (await landRecordsContract.methods.getFractionOwners(landId).call()).map(fractionOwner => ({
            owner: fractionOwner.owner,
            fraction: fractionOwner.fraction.toString()
        }))
    };
}

// Helper function to fetch and log lands by different criteria
async function fetchAndLogLands() {
    try {
        const city = "Dehradun"; // Replace with a city present in your data
        const state = "Uttarakhand"; // Replace with a state present in your data
        const aadharNumber = "123434564567"; // Replace with an aadharNumber present in your data
        const ownerName = "Abhay Mishra"; // Replace with an ownerName present in your data

        // Get lands by city
        const landsByCity = await landRecordsContract.methods.getLandsByCity(city).call();
        const landsByCityDetails = await Promise.all(landsByCity.map(getLandDetails));
        console.log(`Lands in city ${city}:`, JSON.stringify(landsByCityDetails, null, 2));

        // Get lands by state
        const landsByState = await landRecordsContract.methods.getLandsByState(state).call();
        const landsByStateDetails = await Promise.all(landsByState.map(getLandDetails));
        console.log(`Lands in state ${state}:`, JSON.stringify(landsByStateDetails, null, 2));

        // Get lands by city and state
        const landsByCityAndState = await landRecordsContract.methods.getLandsByCityAndState(city, state).call();
        const landsByCityAndStateDetails = await Promise.all(landsByCityAndState.map(getLandDetails));
        console.log(`Lands in city ${city} and state ${state}:`, JSON.stringify(landsByCityAndStateDetails, null, 2));

        // Get lands by aadhar number
        const landsByAadhar = await landRecordsContract.methods.getLandsByAadhar(aadharNumber).call();
        const landsByAadharDetails = await Promise.all(landsByAadhar.map(getLandDetails));
        console.log(`Lands owned by aadhar number ${aadharNumber}:`, JSON.stringify(landsByAadharDetails, null, 2));

        // Get lands by owner name
        const landsByOwnerName = await landRecordsContract.methods.getLandsByOwnerName(ownerName).call();
        const landsByOwnerNameDetails = await Promise.all(landsByOwnerName.map(getLandDetails));
        console.log(`Lands owned by ${ownerName}:`, JSON.stringify(landsByOwnerNameDetails, null, 2));
    } catch (error) {
        console.error("Error fetching lands:", error);
    }
}

// Call the function to fetch and log lands
fetchAndLogLands().catch(console.error);
