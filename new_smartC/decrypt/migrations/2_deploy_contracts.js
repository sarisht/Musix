var MusicChain = artifacts.require("./MusicChain.sol");
module.exports = function(deployer) {
  deployer.deploy(MusicChain);
};