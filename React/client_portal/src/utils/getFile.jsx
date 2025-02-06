import { ethers } from 'ethers';
import { ContractAbi } from '../App';
import { contractAddress } from '../App';

export default async function getFileViaId(_id){
    try {
        if (!window.ethereum) {
            throw new Error('MetaMask is not installed');
        }

        

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(contractAddress, ContractAbi, signer);

        const result = await contract.callStatic.getFileInfoById(_id);
        console.log('FilesInfo from blockchain:', result);
        return result;
    } catch (error) {
        console.error('An error occurred:', error);
        if (error.code === 'ACTION_REJECTED') {
            throw new Error('MetaMask transaction was rejected by the user');
        }
        throw error;
    }
}

