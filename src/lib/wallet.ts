import { ethers } from 'ethers';

export interface WalletState {
  address: string | null;
  chainId: number | null;
  isConnected: boolean;
}

export class WalletService {
  private provider: ethers.BrowserProvider | null = null;
  private signer: ethers.Signer | null = null;

  async connect(): Promise<WalletState> {
    if (!window.ethereum) {
      throw new Error('MetaMask is not installed');
    }

    try {
      this.provider = new ethers.BrowserProvider(window.ethereum);
      await this.provider.send('eth_requestAccounts', []);
      this.signer = await this.provider.getSigner();
      const address = await this.signer.getAddress();
      const network = await this.provider.getNetwork();

      return {
        address,
        chainId: Number(network.chainId),
        isConnected: true,
      };
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    this.provider = null;
    this.signer = null;
  }

  async getContract(address: string, abi: any[]) {
    if (!this.signer) {
      throw new Error('Wallet not connected');
    }
    return new ethers.Contract(address, abi, this.signer);
  }

  async switchChain(chainId: number): Promise<void> {
    if (!window.ethereum) {
      throw new Error('MetaMask is not installed');
    }

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      });
    } catch (error: any) {
      if (error.code === 4902) {
        throw new Error('Chain not added to MetaMask');
      }
      throw error;
    }
  }

  getProvider() {
    return this.provider;
  }

  getSigner() {
    return this.signer;
  }
}

export const walletService = new WalletService();

declare global {
  interface Window {
    ethereum?: any;
  }
}
