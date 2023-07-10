const ethers = require("ethers");
const fs = require("fs");
const main = async () => {
  // 1. Get The RPC From the Ganache
  // 2. Install Ethers and Set the Provider
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:7575"
  );
  // 3. Create the Wallet in order to deploy the Contracts
  const wallet = new ethers.Wallet(
    "82417c3add99de30c581fdd63387f7411842123eb9392f1d571558f4dfcf0b7d",
    provider
  );
  // 4. Get the ABI and Bytecode to deploy the contract
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const bin = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin", "utf8");
  // 5. Create the contract factory object with ABI, Bytecode and Provider
  const contractFactory = new ethers.ContractFactory(abi, bin, wallet);
  console.log("Deploying the contract.....");
  // 6. Deploy the contract and await for the contract to be deployed
  const contract = await contractFactory.deploy();
  // Wait for the contract to be deployed for certain amount of block
  const deploymentReceipt = await contract.deployTransaction.wait(1);
  console.log(deploymentReceipt);

  //   console.log("Contract successfully Deployed", contract.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log("Error :", error);
    process.exit(1);
  });
