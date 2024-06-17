const {Web3} = require('web3');
const contract = require('./build/contracts/LandRecords.json'); // Adjust the path if necessary

const web3 = new Web3('http://127.0.0.1:7545'); // Replace with your Ganache provider
const contractAddress = '0xc165F89CBCC171777A7334400ED7f74C6A249590'; // Replace with the deployed contract address
const landRecordsContract = new web3.eth.Contract(contract.abi, contractAddress);

async function addLand() {
    const accounts = await web3.eth.getAccounts();
    const fromAccount = accounts[0];

    const landInput = {
        id: 1001,
        details: {
            title: "Bridge old contain.",
            description: "Grow give federal education value. Expect will owner decision section. Thousand down sometimes speech event store within. Anyone company tell who contain rate read spring.",
            location: "6526 Jones Pine",
            zoningType: "Agricultural",
            utilities: ["Sewer"],
            images: [
                "https://images.pexels.com/photos/102728/pexels-photo-102728.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                "https://images.pexels.com/photos/171328/pexels-photo-171328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                "https://images.pexels.com/photos/636342/pexels-photo-636342.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            ],
            listed: true,
            listableForFractionalOwnership: true,
            numberOfFractions: 28
        },
        owner: {
            name: "Abhay Mishra",
            contact: "+91-2842469441",
            email: "abhaymish@gmail.com",
            aadharNumber: "123434564567"
        },
        city: "Haridwar",
        state: "Uttarakhand"
    };

    try {
        await landRecordsContract.methods.addLands([landInput]).send({
            from: fromAccount,
            gas: 6000000 // Adjust gas limit as needed
        });
        console.log(`Land with ID ${landInput.id} added successfully.`);
    } catch (error) {
        console.error(`Error adding land: ${error.message}`);
    }
}

addLand().catch(console.error);
