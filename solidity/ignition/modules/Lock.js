const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");


module.exports = buildModule("VerifierContract", (m) => {

  // Deploy the VerifierContract (Implementation)
  const VerifierContract = m.contract("VerifierContract");

  
  console.log("VerifierContract deployed at:", VerifierContract.address);



  return { VerifierContract };
});
