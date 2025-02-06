// import React, { useEffect, useState } from 'react';
// import { ethers } from 'ethers';
// import getHolderFiles from '../utils/ViewUtils';
// import getFileViaId from '../utils/getFile';
// import requestPermissionForFile from '../utils/requestPermission';
// import getAndDecryptFile from '../utils/openFile';
// import panIcon from '../assets/pan.png';
// import aadharIcon from '../assets/aadhar.jpg';
// import ImageSlider from './carousel';

// const getImagePath = (fileName) => {
//   const fileNameLower = fileName.toLowerCase();
//   if (fileNameLower.includes('pan')) return panIcon;
//   if (fileNameLower.includes('aadhaar')) return aadharIcon;
//   return panIcon; // Default image
// };

// export default function View() {
//   const [files, setFiles] = useState([]);
//   const [searchAddress, setSearchAddress] = useState('');
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedTimeInSeconds, setSelectedTimeInSeconds] = useState(0);
  
//   useEffect(() => {
//     const getAddress = async () => {
//       if (!window.ethereum) return console.error('MetaMask is not installed');
//       try {
//         const provider = new ethers.providers.Web3Provider(window.ethereum);
//         const accounts = await provider.listAccounts();
//         if (accounts.length > 0) setSearchAddress(accounts[0]);
//       } catch (error) {
//         console.error('Error fetching wallet address:', error);
//       }
//     };
//     getAddress();
//   }, []);

//   useEffect(() => {
//     if (searchAddress) fetchFiles();
//   }, [searchAddress]);

//   const fetchFiles = async () => {
//     if (!searchAddress) return;
//     try {
//       const holderFiles = await getHolderFiles(searchAddress);
//       if (Array.isArray(holderFiles)) {
//         setFiles(holderFiles.map(file => ({ id: file[0], fileName: file[1] })));
//       }
//     } catch (error) {
//       console.error('Error fetching files:', error);
//     }
//   };

//   const handleFileClick = async (file) => {
//     setSelectedFile(file);
//     try {
//       const fileInfo = await getFileViaId(file.id);
//       await getAndDecryptFile(fileInfo);
//     } catch (error) {
//       console.error('An error occurred:', error);
//       if (error.code === 'ACTION_REJECTED') {
//         console.error('Transaction rejected by user');
//       }
//       setModalVisible(true);
//     }
//   };

//   const handlePermission = async () => {
//     if (!selectedFile) return;
//     try {
//       await requestPermissionForFile(selectedFile.id, selectedFile.fileName, searchAddress, selectedTimeInSeconds);
//       setModalVisible(false);
//     } catch (error) {
//       console.error('Error requesting permission:', error);
//     }
//   };

//   return (
//     <div className='galaxy-bg min-h-screen flex flex-col items-center relative'>
//       <div className='bubbles'></div> {/* Added bubbling effect */}
//       <div className='flex flex-col items-center w-full p-6'>
//         <h1 className='text-5xl font-extrabold text-gray-100 mb-6 fade-in'>Your Digital Vault</h1>
//         <div className='flex gap-3 w-full max-w-lg bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105'>
//           <input
//             value={searchAddress}
//             type='search'
//             className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'
//             placeholder='Enter Wallet Address'
//             onChange={(e) => setSearchAddress(e.target.value)}
//           />
//           <button className='bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-all' onClick={fetchFiles}>Search</button>
//         </div>
//       </div>
//       <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-10 w-full'>
//         {files.length > 0 ? (
//           files.map((file, index) => (
//             <div key={index} className='bg-white p-5 rounded-xl shadow-lg hover:scale-110 transition-transform cursor-pointer' onClick={() => handleFileClick(file)}>
//               <img src={getImagePath(file.fileName)} alt={file.fileName} className='w-full h-48 object-cover rounded-lg' />
//               <h2 className='mt-4 text-xl font-semibold text-gray-800 uppercase'>{file.fileName}</h2>
//               <p className='text-gray-600'>Card No: <span className='font-medium'>XXX...{file.id.slice(-4)}</span></p>
//             </div>
//           ))
//         ) : (
//           <p className='text-gray-200 text-center col-span-full'>No files found</p>
//         )}
//       </div>
//       <div className='mt-10 w-full flex justify-center'>
//         <ImageSlider />
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from 'react';
import getHolderFiles from '../utils/ViewUtils';
import { ethers } from 'ethers';
import getFileViaId from '../utils/getFile';
import requestPermissionForFile from '../utils/requestPermission';
import getAndDecryptFile from '../utils/openFile';
import panIcon from '../assets/pan.png';
import aadharIcon from '../assets/aadhar.jpg';
import { features } from "../constants";
import Carousel from './carousel';

const getImagePath = (fileName) => {
  const fileNameLower = fileName.toLowerCase();
  if (fileNameLower.includes('pan')) return panIcon;
  if (fileNameLower.includes('aadhaar')) return aadharIcon;
  return panIcon; 
};


export default function View() {
  const [files, setFiles] = useState([]);
  const [searchAddress, setSearchAddress] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedTimeInSeconds, setSelectedTimeInSeconds] = useState(0);
  const [selectedFileIndex, setSelectedFileIndex] = useState(null);

  useEffect(() => {
    const getAddress = async () => {
      if (!window.ethereum) {
        throw new Error('MetaMask is not installed');
      }
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.listAccounts();
      if (accounts.length > 0) {
        setSearchAddress(accounts[0]);
      } else {
        console.error('No accounts found');
      }
    };
    getAddress();
  }, []);

  const fetchFiles = async () => {
    if (!searchAddress) return;

    try {
      const holderFiles = await getHolderFiles(searchAddress);
      console.log(holderFiles);
      if (Array.isArray(holderFiles)) {
        setFiles(holderFiles.map(file => ({ id: file[0], fileName: file[1] })));
      } else {
        console.error('getHolderFiles did not return an array');
      }
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  useEffect(() => {
    if (searchAddress) {
      fetchFiles();
    }
  }, [searchAddress]);

  const handleSearch = () => {
    fetchFiles();
  };

  const handleFileClick = async (file, index) => {
    setSelectedFileIndex(index);
    setSelectedFile(file);
    try {
      const fileInfo = await getFileViaId(file.id);
      await getAndDecryptFile(fileInfo);
    } catch (error) {
      console.error('An error occurred:', error.errorName);
      if (error.code === 'ACTION_REJECTED') {
        throw new Error('MetaMask transaction was rejected by the user');
      }
      setModalVisible(true);
      throw error;
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedFile(null);
  };

  const handleTimeSelection = (timePeriod) => {
    setSelectedTime(timePeriod);
    let timeInSeconds = 0;
    switch (timePeriod) {
      case '1 Day':
        timeInSeconds = 24 * 60 * 60;
        break;
      case '1 Week':
        timeInSeconds = 7 * 24 * 60 * 60;
        break;
      case '1 Month':
        timeInSeconds = 30 * 24 * 60 * 60;
        break;
      default:
        timeInSeconds = 0;
    }
    setSelectedTimeInSeconds(timeInSeconds);
    console.log('Selected time in seconds:', timeInSeconds);
  };

  const handlePermission = async () => {
    console.log('Permission requested for file:', selectedFile, 'for', selectedTimeInSeconds, 'seconds.');
    console.log('Files before permission', files);
    await requestPermissionForFile(files[selectedFileIndex].id, files[selectedFileIndex].fileName, searchAddress, selectedTimeInSeconds);
    handleCloseModal();
  };


  return (
    <div className='flex flex-col h-screen'>
      <div className='flex flex-col items-center'>
        <div className='flex gap-3 w-full max-w-md p-6 rounded-md mt-10'>
          <input
            value={searchAddress}
            type="search"
            className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Enter the wallet address'
            onChange={(e) => setSearchAddress(e.target.value)}
          />
          <button onClick={handleSearch}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search hover:scale-110 transition-all">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </button>
        </div>
      </div>
      <div className='flex flex-col gap-4 m-10'>
        <h1 className='font-bold text-3xl text-gray-700 border-b-4 w-fit border-b-blue-950'>Your wallet files are:</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-[100%] mt-5'>
          {Array.isArray(files) && files.length > 0 ? (
            files.map((f, index) => (
              <div
                key={index}
                className='bg-white border-2 border-light-500 group hover:bg-zinc-300 hover:scale-110 transition-all hover:cursor-pointer duration-500 shadow-md rounded-lg'
                onClick={() => handleFileClick(f, index)}
              >
                <img src={getImagePath(f.fileName)} alt={f.fileName} className='w-full h-40 object-cover rounded-t-lg' />
                <div className='p-5'>
                  <h1 className='text-xl font-semibold uppercase group-hover:text-gray-800'>{f.fileName}</h1>
                  <h3 className='text-lg tracking-tight text-gray-700'>
                    Card No: <span className='font-medium text-gray-700'>XXX...{f.id.slice(-4)}</span>
                  </h3>
                </div>
              </div>
            ))
          ) : (
            <p>No files found</p>
          )}
        </div>
              
      {modalVisible && (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50'>
          <div className='bg-white p-6 rounded-lg shadow-lg w-80'>
            <h2 className='text-xl font-semibold mb-4'>Permission Request</h2>
            <p className='mb-4'>Do you want to request permission to access the file:<span className=' font-semibold uppercase'> {selectedFile?.fileName}? </span></p>
            <div className='flex flex-col justify-end gap-4'>
              <div className='flex flex-col gap-4'>
                <h1 className=' text-lg tracking-tight font-medium'>Select the time period of access</h1>
                <div className='flex gap-2'>
                  <button 
                    onClick={() => handleTimeSelection('1 Day')} 
                    className={`p-2 rounded-md ${selectedTime === '1 Day' ? 'bg-black text-white' : 'bg-gray-200'}`}>
                    1 Day
                  </button>
                  <button 
                    onClick={() => handleTimeSelection('1 Week')} 
                    className={`p-2 rounded-md ${selectedTime === '1 Week' ? 'bg-black text-white' : 'bg-gray-200'}`}>
                    1 Week
                  </button>
                  <button 
                    onClick={() => handleTimeSelection('1 Month')} 
                    className={`p-2 rounded-md ${selectedTime === '1 Month' ? 'bg-black text-white' : 'bg-gray-200'}`}>
                    1 Month
                  </button>
                </div>
              </div>
              <div className='flex justify-around gap-2 mt-4'>
                <button onClick={handlePermission} className='bg-blue-500 text-white px-4 py-2 rounded-lg'>Request</button>
                <button onClick={handleCloseModal} className='bg-red-500 text-white px-4 py-2 rounded-lg'>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
        
          
      </div>
      <div className=' flex items-center justify-center'>
          <Carousel />
        </div>
      
    </div>
  );
}
