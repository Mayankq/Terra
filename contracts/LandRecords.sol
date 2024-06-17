// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LandRecords {
    struct Land {
        uint256 id;
        string title;
        string description;
        string location;
        string ownerName;
        string ownerContact;
        string ownerEmail;
        string zoningType;
        string[] utilities;
        string[] images;
        bool listed;
        bool listableForFractionalOwnership;
        uint256 numberOfFractions;
    }

    mapping(uint256 => Land) public lands;
    uint256 public landCount;

    event LandAdded(uint256 id);

    struct LandInput {
        uint256 id;
        string title;
        string description;
        string location;
        string ownerName;
        string ownerContact;
        string ownerEmail;
        string zoningType;
        string[] utilities;
        string[] images;
        bool listed;
        bool listableForFractionalOwnership;
        uint256 numberOfFractions;
    }

    function addLands(LandInput[] memory landInputs) public {
        for (uint256 i = 0; i < landInputs.length; i++) {
            LandInput memory input = landInputs[i];
            require(input.id > 0, "ID must be greater than zero");

            Land storage newLand = lands[input.id];
            require(newLand.id == 0, "Land with this ID already exists");

            newLand.id = input.id;
            newLand.title = input.title;
            newLand.description = input.description;
            newLand.location = input.location;
            newLand.ownerName = input.ownerName;
            newLand.ownerContact = input.ownerContact;
            newLand.ownerEmail = input.ownerEmail;
            newLand.zoningType = input.zoningType;
            newLand.utilities = input.utilities;
            newLand.images = input.images;
            newLand.listed = input.listed;
            newLand.listableForFractionalOwnership = input.listableForFractionalOwnership;
            newLand.numberOfFractions = input.numberOfFractions;

            landCount++;
            emit LandAdded(input.id);
        }
    }
}
