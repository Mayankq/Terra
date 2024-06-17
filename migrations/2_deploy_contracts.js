const LandRecords = artifacts.require("LandRecords");

module.exports = function(deployer) {
    deployer.deploy(LandRecords);
};
