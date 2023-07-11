const ethers = require("ethers");
const fs = require("fs");
require("dotenv").config();

const main = async () => {
  // Step 1: Create wallet and encrypt the private key
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
  // Step 2: Encrypt the private key using the password provided
  const encryptedJSONKey = await wallet.encrypt(process.env.KEY_PASSWORD);
  console.log(encryptedJSONKey);
  // Store the encrypted key in the project
  fs.writeFileSync("./encryptKey.json", encryptedJSONKey);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log("Error :", error);
    process.exit(1);
  });
