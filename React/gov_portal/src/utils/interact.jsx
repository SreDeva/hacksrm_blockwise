import { ethers } from 'ethers';
import FileEncrypt from './ecc';
import { ContractAbi } from '../App';
import { contractAddress } from '../App';
import { create } from 'ipfs-http-client';
import { PinataSDK } from "pinata-web3";
import { Buffer } from 'buffer';

export const pinata = new PinataSDK({
  pinataJwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJjNWIxNDc1MC0xYzkyLTRjOGQtYWI2Ni03ZWZlOGJkMjY0YzYiLCJlbWFpbCI6InNyZWRldmFqYW5ha2lyYW1AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjUzM2E4MDNlM2E3ZmFiYWY0NTZhIiwic2NvcGVkS2V5U2VjcmV0IjoiMGM4OTcyOWNlYWFmZjA4ZTMzNGQyYWQwZWU4MGZlZmY5YWM1MDUzZjhhMzFkMzQwM2ZjMGQ3YTZmYTk1ZDZjYiIsImV4cCI6MTc1OTg0MTU5OX0.3BK_RVBwaZqotECTwGy8-4NSHGmJQEvn-u2w0B8qbKQ",
  pinataGateway: "tomato-dear-capybara-748.mypinata.cloud",
});


const ipfs = create({
  host: 'localhost',
  port: '5001',
  protocol: 'http',
});


export default async function uploadFileToContract(file, data, _fileName, _holder) {
  try {
    if (!file || !(file instanceof File)) {
      throw new Error('Invalid file object');
    }

    const encryptedFileData = await FileEncrypt(file);

    if (!encryptedFileData || !encryptedFileData.file) {
      throw new Error('File encryption failed');
    }

    if (!window.ethereum) {
      throw new Error('MetaMask is not installed');
    }


    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(contractAddress, ContractAbi, signer);
    
    console.log("File", encryptedFileData.file)
    const added = await ipfs.add(encryptedFileData.file);
    console.log('File uploaded successfully. IPFS hash:', added.path);
    // const upload = await pinata.upload.base64(btoa(encryptedFileData.file));
    const fileHash = added.path;

    const fileData = {
      fileHash: fileHash,
      fileName: _fileName,
      holder: ethers.utils.getAddress(_holder),
      id: data["ui"], 
      metadataHash: ethers.utils.keccak256(ethers.utils.toUtf8Bytes(JSON.stringify(data))),
    };

    console.log("Before sending request to blockchain", fileData);
    async function callFunction(fileData) {
      try {
        const method = contract.interface.encodeFunctionData('uploadFile', [fileData]);

        const gasEstimate = await contract.estimateGas.uploadFile(fileData);
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

    callFunction(fileData);
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
}
