const fs = require('fs');
const { Web3 } = require('web3');
const contract = require('./build/contracts/LandRecords.json'); // Adjust path if necessary

const web3 = new Web3('http://127.0.0.1:7545'); // Replace with your Ganache provider
const contractAddress = '0x3c0C4463367E84dA0925E8D674006108d9AF397F'; // Deployed contract address
const landRecordsContract = new web3.eth.Contract(contract.abi, contractAddress);
const BATCH_SIZE = 10; // Adjust based on needs

// Read and parse JSON file
const landData = JSON.parse(fs.readFileSync('lands.json'));

// Helper function to split data into chunks
function chunkArray(array, size) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    return result;
}

// Prepare data for batch processing
const landInputs = landData.map(record => ({
    id: record.id,
    details: {
        title: record.details.title,
        description: record.details.description,
        location: record.details.location,
        zoningType: record.details.zoningType,
        utilities: record.details.utilities,
        images: record.details.images,
        listed: record.details.listed,
        listableForFractionalOwnership: record.details.listableForFractionalOwnership,
        numberOfFractions: record.details.numberOfFractions,
        price: record.details.price
    },
    owner: {
        name: record.owner.name,
        contact: record.owner.contact,
        email: record.owner.email,
        aadharNumber: record.owner.aadharNumber
    },
    city: record.city,
    state: record.state
}));

// Split data into chunks
const landChunks = chunkArray(landInputs, BATCH_SIZE);

async function addLandsInBatches() {
    const accounts = await web3.eth.getAccounts();
    const fromAccount = accounts[0];

    for (let i = 0; i < landChunks.length; i++) {
        try {
            await landRecordsContract.methods.addLands(landChunks[i]).send({
                from: fromAccount,
                gas: 60000000
            });
            console.log(`Batch ${i + 1} added successfully`);
        } catch (error) {
            console.error(`Error adding batch ${i + 1}:`, error);
            // Optionally add retry logic or log failed batch details
        }
    }
}

addLandsInBatches().catch(console.error);
