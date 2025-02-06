import { ethers } from 'ethers';
import { ContractAbi } from '../App';
import { contractAddress } from '../App';

export default async function getHolderPermissionRequests() {
    try {
        if (!window.ethereum) {
            throw new Error('MetaMask is not installed');
        }

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(contractAddress, ContractAbi, signer);
        
        const accounts = await provider.listAccounts();
        const account = accounts[0];
        console.log("Account", account);
    
        const result = await contract.callStatic.getPendingRequests(account);
        console.log('Files result:', result);
        return result;
    } catch (error) {
        console.error('An error occurred:', error);
        if (error.code === 'ACTION_REJECTED') {
            throw new Error('MetaMask transaction was rejected by the user');
        }
        throw error;
    }
}
