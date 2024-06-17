const fs = require('fs');
const { Web3 } = require('web3');
const contract = require('./build/contracts/LandRecords.json'); // Adjust the path if necessary

const web3 = new Web3('http://127.0.0.1:7545'); // Replace with your Ganache provider // Use 127.0.0.1 instead of localhost
const contractAddress = '0x1725623b7F1A1769C89F7ec002CB38a77e80DE14'; // Replace with the deployed contract address
const landRecordsContract = new web3.eth.Contract(contract.abi, contractAddress);
const BATCH_SIZE = 10; // Adjust this size based on your testing needs

// Read and parse the JSON file
const landData = JSON.parse(fs.readFileSync('lands.json'));

// Helper function to split the data into chunks
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
    title: record.title,
    description: record.description,
    location: record.address,
    ownerName: record.owner.name,
    ownerContact: record.owner.contact_number,
    ownerEmail: record.owner.email,
    zoningType: record.zoning_type,
    utilities: record.utilities,
    images: record.images,
    listed: record.listed,
    listableForFractionalOwnership: record.listable_for_fractional_ownership,
    numberOfFractions: record.number_of_fractions
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
                gas: 6000000 // Set a higher gas limit
            });
            console.log(`Batch ${i + 1} added successfully`);
        } catch (error) {
            console.error(`Error adding batch ${i + 1}:`, error);
            // Optionally, add retry logic or log the failed batch details
        }
    }
}

addLandsInBatches().catch(console.error);