import { ethers } from 'ethers';
import { ContractAbi } from '../App';
import { provider } from '../App'; 
import { contractAddress } from '../App';

export default async function getFileByHash(fileHash) {
  try {
    if (!fileHash) {
      throw new Error('Invalid file hash');
    }

    if (!window.ethereum) {
      throw new Error('MetaMask is not installed');
    }

    const ethProvider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = ethProvider.getSigner();

    const contract = new ethers.Contract(contractAddress, ContractAbi, signer);

    const method = contract.interface.encodeFunctionData('verifyFileByHash', [fileHash]);

    async function callFunction() {
      try {

        const gasEstimate = await contract.estimateGas.verifyFileByHash(fileHash);
        console.log('Estimated Gas:', gasEstimate.toString());

        const gasPrice = await provider.getGasPrice();
        console.log('Current Gas Price:', gasPrice.toString());

        const balance = await provider.getBalance(await signer.getAddress());
        console.log('Account Balance:', ethers.utils.formatEther(balance));

        const txResponse = await signer.sendTransaction({
          to: contractAddress,
          data: method,
          gasLimit: gasEstimate, 
          gasPrice: gasPrice, 
        });

        console.log('Transaction hash:', txResponse.hash);

        const receipt = await txResponse.wait();
        console.log('Transaction receipt:', receipt);

      } catch (error) {
        console.error('An error occurred during the transaction:', error);
        throw error;
      }
    }

    callFunction();
  } catch (error) {
    console.error('An error occurred:', error);
    if (error.code === 'ACTION_REJECTED') {
      throw new Error('MetaMask transaction was rejected by the user');
    }
    throw error;
  }
}
