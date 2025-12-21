import * as dotenv from "dotenv";
dotenv.config();

import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    amoy: {
  url: "https://rpc.ankr.com/polygon_amoy",
  chainId: 80002,
  accounts: [process.env.PRIVATE_KEY!],
},


  },
};

export default config;
