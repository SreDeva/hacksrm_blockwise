import { ethers } from 'ethers';
import { ContractAbi } from '../App';
import { contractAddress } from '../App';

export default async function grantPermissionToFile(_id, _holder, _granted){
    try {
        if (!window.ethereum) {
            throw new Error('MetaMask is not installed');
        }

        if(!_id || !_holder || typeof _granted !== 'boolean'){
            throw new Error('Invalid parameters');
        }

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(contractAddress, ContractAbi, signer);

        async function callFunction(_id, _holder, _granted) {
            try {
                const gasEstimate = await contract.estimateGas.handlePermissionRequest(_id, _holder, _granted);
                console.log('Estimated Gas:', gasEstimate.toString());

                const txResponse = await contract.handlePermissionRequest(_id, _holder, _granted, {
                    gasLimit: gasEstimate,
                });
                console.log('Transaction hash:', txResponse.hash);

                const receipt = await txResponse.wait();
                console.log('Transaction receipt:', receipt);

            } catch (error) {
                console.error('An error occurred during the transaction:', error);
                if (error.code === ethers.errors.UNPREDICTABLE_GAS_LIMIT) {
                    console.error('The contract may revert due to unmet conditions. Please check the parameters or contract logic.');
                }
                throw error;
            }
        }
        await callFunction(_id, _holder, _granted);
    } catch (error) {
        console.error('An error occurred:', error);
        if (error.code === 'ACTION_REJECTED') {
            throw new Error('MetaMask transaction was rejected by the user');
        }
        throw error;
    }
}
