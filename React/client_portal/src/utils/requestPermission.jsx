import { ethers } from 'ethers';
import { ContractAbi } from '../App';
import { contractAddress } from '../App';


export default async function requestPermissionForFile(_id, _fileName, _holder, _duration){
    try {
        if (!window.ethereum) {
            throw new Error('MetaMask is not installed');
        }

        if(!_id && !_holder && !_duration){
            throw new Error('Invalid parameters');
        }

        

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(contractAddress, ContractAbi, signer);

        async function callFunction(_id, _holder, _duration) {
            try {
              const method = contract.interface.encodeFunctionData('requestPermission', [_id, _fileName, _holder, _duration]);
      
              const gasEstimate = await contract.estimateGas.requestPermission(_id, _fileName, _holder, _duration);
              console.log('Estimated Gas:', gasEstimate.toString());
      
              const gasPrice = await provider.getGasPrice();
              console.log('Current Gas Price:', gasPrice.toString());
      
              const balance = await provider.getBalance(await signer.getAddress());
              console.log('Account Balance:', ethers.utils.formatEther(balance));
      
              const tx = {
                to: contractAddress,
                data: method,
                gasLimit: gasEstimate, 
                gasPrice: gasPrice, 
              };
      
              const txResponse = await signer.sendTransaction(tx);
              console.log('Transaction hash:', txResponse.hash);
      
              const receipt = await txResponse.wait();
              console.log('Transaction receipt:', receipt);
            } catch (error) {
              console.error('An error occurred during the transaction:', error);
              throw error;
            }
          }
      
          callFunction(_id, _holder, _duration);

    } catch (error) {
        console.error('An error occurred:', error);
        if (error.code === 'ACTION_REJECTED') {
            throw new Error('MetaMask transaction was rejected by the user');
        }
        throw error;
    }
}