import documentImage from "C:/Users/srede/Downloads/product@2x.png";
import securityImage from "C:/Users/srede/Downloads/transfer-files-concept-landing-page/2916138.jpg";
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center mt-6 lg:mt-20">
      <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
        Secure & Private
        <span className="text-[#4CAF50]"> File Sharing</span>
      </h1>
      <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
        Leverage Zero-Knowledge Proofs (ZKPs) and decentralized identity (DID)  
        to securely verify, store, and share documents without compromising privacy.
      </p>
      <div className="flex justify-center my-10">
         <Link to={'/verification'}>    <button className="py-3 px-4 mx-3 rounded-md border bg-[#4CAF50] text-[#ffffff]">
             Verify
         </button>
        </Link> 
        <Link to={'/view'}>    <button className="py-3 px-4 mx-3 rounded-md border border-[#4CAF50] text-[#4CAF50]">
             View Files
         </button>
        </Link> 
      </div>
      <div className="flex mt-10 justify-center">
        <img
          src={documentImage}
          className="rounded-lg w-1/2 border border-[#4CAF50] shadow-sm shadow-[#4CAF50] mx-2 my-4"
          alt="Document Verification"
        />
        <img
          src={securityImage}
          className="rounded-lg w-1/2 border border-[#4CAF50] shadow-sm shadow-[#4CAF50] mx-2 my-4"
          alt="Privacy & Security"
        />
      </div>
    </div>
  );
};

export default HeroSection;
