// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LandRecords {
    struct FractionOwner {
        address owner;
        uint256 fraction;
    }

    struct LandDetails {
        string title;
        string description;
        string location;
        string zoningType;
        string[] utilities;
        string[] images;
        bool listed;
        bool listableForFractionalOwnership;
        uint256 numberOfFractions;
    }

    struct OwnerDetails {
        string name;
        string contact;
        string email;
        string aadharNumber;
    }

    struct Land {
        uint256 id;
        LandDetails details;
        OwnerDetails owner;
        string city;
        string state;
        FractionOwner[] fractionOwners;
    }

    mapping(uint256 => Land) public lands;
    uint256 public landCount;

    mapping(string => uint256[]) private cityToLandIds;
    mapping(string => uint256[]) private stateToLandIds;
    mapping(string => uint256[]) private ownerToLandIds;

    event LandAdded(uint256 id);
    event OwnershipTransferred(uint256 landId, string newAadharNumber, string newContact);
    event FractionalOwnershipUpdated(uint256 landId);

    struct LandInput {
        uint256 id;
        LandDetails details;
        OwnerDetails owner;
        string city;
        string state;
    }

    function addLands(LandInput[] memory landInputs) public {
        for (uint256 i = 0; i < landInputs.length; i++) {
            LandInput memory input = landInputs[i];
            require(input.id > 0, "ID must be greater than zero");

            Land storage newLand = lands[input.id];
            require(newLand.id == 0, "Land with this ID already exists");

            newLand.id = input.id;
            newLand.details = input.details;
            newLand.owner = input.owner;
            newLand.city = input.city;
            newLand.state = input.state;

            cityToLandIds[input.city].push(input.id);
            stateToLandIds[input.state].push(input.id);
            ownerToLandIds[input.owner.aadharNumber].push(input.id);

            landCount++;
            emit LandAdded(input.id);
        }
    }

    function getLandsByCity(string memory city) public view returns (uint256[] memory) {
        return cityToLandIds[city];
    }

    function getLandsByState(string memory state) public view returns (uint256[] memory) {
        return stateToLandIds[state];
    }

    function getLandsByCityAndState(string memory city, string memory state) public view returns (uint256[] memory) {
        uint256[] memory cityLands = cityToLandIds[city];
        uint256[] memory stateLands = stateToLandIds[state];
        uint256[] memory result = new uint256[](cityLands.length);
        uint256 count = 0;

        for (uint256 i = 0; i < cityLands.length; i++) {
            for (uint256 j = 0; j < stateLands.length; j++) {
                if (cityLands[i] == stateLands[j]) {
                    result[count] = cityLands[i];
                    count++;
                }
            }
        }

        uint256[] memory filteredResult = new uint256[](count);
        for (uint256 k = 0; k < count; k++) {
            filteredResult[k] = result[k];
        }

        return filteredResult;
    }

    function getLandsByAadhar(string memory aadharNumber) public view returns (uint256[] memory) {
        return ownerToLandIds[aadharNumber];
    }

    function getLandsByOwnerName(string memory ownerName) public view returns (uint256[] memory) {
        uint256[] memory result = new uint256[](landCount);
        uint256 count = 0;

        for (uint256 i = 1; i <= landCount; i++) {
            if (keccak256(abi.encodePacked(lands[i].owner.name)) == keccak256(abi.encodePacked(ownerName))) {
                result[count] = lands[i].id;
                count++;
            }
        }

        uint256[] memory filteredResult = new uint256[](count);
        for (uint256 j = 0; j < count; j++) {
            filteredResult[j] = result[j];
        }

        return filteredResult;
    }

    function transferOwnership(uint256 landId, string memory newAadharNumber, string memory newContact) public {
        Land storage land = lands[landId];
        string memory oldAadharNumber = land.owner.aadharNumber;

        require(bytes(oldAadharNumber).length > 0, "Land not found");

        land.owner.aadharNumber = newAadharNumber;
        land.owner.contact = newContact;

        for (uint256 i = 0; i < ownerToLandIds[oldAadharNumber].length; i++) {
            if (ownerToLandIds[oldAadharNumber][i] == landId) {
                ownerToLandIds[oldAadharNumber][i] = ownerToLandIds[oldAadharNumber][ownerToLandIds[oldAadharNumber].length - 1];
                ownerToLandIds[oldAadharNumber].pop();
                break;
            }
        }

        ownerToLandIds[newAadharNumber].push(landId);
        emit OwnershipTransferred(landId, newAadharNumber, newContact);
    }

    function manageFractionalOwnership(uint256 landId, address[] memory owners, uint256[] memory fractions) public {
        require(owners.length == fractions.length, "Owners and fractions length mismatch");

        Land storage land = lands[landId];
        require(land.id != 0, "Land not found");
        require(land.details.listableForFractionalOwnership, "Land not listable for fractional ownership");

        delete land.fractionOwners;
        uint256 totalFractions = 0;

        for (uint256 i = 0; i < owners.length; i++) {
            land.fractionOwners.push(FractionOwner({
                owner: owners[i],
                fraction: fractions[i]
            }));
            totalFractions += fractions[i];
        }

        require(totalFractions == 100, "Total fractions must equal 100");

        emit FractionalOwnershipUpdated(landId);
    }

    function getFractionOwners(uint256 landId) public view returns (FractionOwner[] memory) {
        return lands[landId].fractionOwners;
    }
}
