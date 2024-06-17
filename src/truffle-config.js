module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545, // This is the default port for Ganache GUI. Use 8545 for Ganache CLI.
      network_id: "*", // Match any network id
    },
  },
  // Configure your compilers
  compilers: {
    solc: {
      version: "0.5.1"
},
  },
};
