import { ethers, artifacts, network } from "hardhat";
import * as fs from "fs";
import * as path from "path";

async function main() {
  console.log("Deploying AuthRegistry contract...");

  // Deploy contract
  const AuthRegistry = await ethers.getContractFactory("AuthRegistry");
  const authRegistry = await AuthRegistry.deploy();
  await authRegistry.deployed();

  const contractAddress = authRegistry.address;
  console.log(`AuthRegistry deployed to: ${contractAddress}`);

  const chainId = network.config.chainId;
  console.log(`Network: ${network.name} (Chain ID: ${chainId})`);

  // Read ABI from compiled artifact
  const artifact = await artifacts.readArtifact("AuthRegistry");

  const metadata = {
    contractName: "AuthRegistry",
    chains: [
      {
        chainId,
        address: contractAddress,
        deployedAt: new Date().toISOString(),
      },
    ],
    abi: artifact.abi,
  };

  // Ensure interfaces directory exists
  const interfacesDir = path.join(__dirname, "..", "interfaces");
  if (!fs.existsSync(interfacesDir)) {
    fs.mkdirSync(interfacesDir, { recursive: true });
  }

  // Write metadata
  const metadataPath = path.join(interfacesDir, "metadata.json");
  fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));

  console.log(`Metadata exported to: ${metadataPath}`);
  console.log("\nDeployment Summary:");
  console.log("===================");
  console.log(`Contract: AuthRegistry`);
  console.log(`Address: ${contractAddress}`);
  console.log(`Network: ${network.name}`);
  console.log(`Chain ID: ${chainId}`);
  console.log(`Metadata: contracts/interfaces/metadata.json`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
