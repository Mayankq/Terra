const {Web3} = require('web3');
const contract = require('./build/contracts/LandRecords.json'); // Adjust the path if necessary

const web3 = new Web3('http://127.0.0.1:7545'); // Replace with your Ganache provider
const contractAddress = '0xc165F89CBCC171777A7334400ED7f74C6A249590'; // Replace with the deployed contract address
const landRecordsContract = new web3.eth.Contract(contract.abi, contractAddress);

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

async function transferOwnershipAndVerify(landId, newAadharNumber, newContact) {
    const accounts = await web3.eth.getAccounts();
    const fromAccount = accounts[0];

    try {
        // Fetch land details before transfer
        const beforeTransfer = await getLandDetails(landId);
        console.log(`Land details before transfer:`, JSON.stringify(beforeTransfer, null, 2));

        // Transfer ownership
        await landRecordsContract.methods.transferOwnership(landId, newAadharNumber, newContact).send({
            from: fromAccount,
            gas: 600000 // Set a higher gas limit if necessary
        });

        // Fetch land details after transfer
        const afterTransfer = await getLandDetails(landId);
        console.log(`Land details after transfer:`, JSON.stringify(afterTransfer, null, 2));

        // Verify transfer
        if (afterTransfer.owner.aadharNumber === newAadharNumber && afterTransfer.owner.contact === newContact) {
            console.log(`Ownership transfer successful for land ID ${landId}`);
        } else {
            console.error(`Ownership transfer failed for land ID ${landId}`);
        }
    } catch (error) {
        console.error(`Error during ownership transfer: ${error.message}`);
    }
}

// Call the function to transfer ownership and verify
const landId = 1001; // Replace with a valid land ID
const newAadharNumber = "987654321098"; // Replace with the new aadhar number
const newContact = "9999999999"; // Replace with the new contact number

transferOwnershipAndVerify(landId, newAadharNumber, newContact).catch(console.error);
