import React, { useContext } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";

import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";
import { Loader } from ".";

const companyCommonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
);


const Welcome = () => {
  const { currentAccount, connectWallet, handleChange, sendTransaction, formData, isLoading } = useContext(TransactionContext);

  const handleSubmit = (e) => {
    const { name, category, description, location, amount } = formData;

    e.preventDefault();

    if (!name || !category || !description || !location || !amount) return;

    sendTransaction();
  };
  
  return (
    <div className="flex w-full justify-center items-center min-h-[90vh]">
      <div className="block mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start items-start flex-col mf:mr-7">
          <h1 className="text-3xl sm:text-5xl text-white py-2">
            Create a New Application
          </h1>
          <br></br>

</div>
        <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
          <div className="p-3 flex justify-end items-start flex-col rounded-xl h-56 sm:w-96 w-full my-5 eth-card .white-glassmorphism ">
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                  <SiEthereum fontSize={21} color="#fff" />
                </div>
                <BsInfoCircle fontSize={17} color="#fff" />
              </div>
              <div>
                <p className="text-white font-light text-sm">
                  {shortenAddress(currentAccount)}
                </p>
                <p className="text-white font-semibold text-lg mt-1">
                  Ethereum
                </p>
              </div>
            </div>
          </div>
          <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
            <Input placeholder="name" name="name" type="text" handleChange={handleChange} />

            <select name="category"
    className="my-2 w-full rounded-sm p-2 outline-none bg-black text-white border-1 text-sm "
    handleChange={handleChange}
    onChange={(e) => handleChange(e, "category")}
    >
              <option value="1" >Accidents And Emergencies</option>
              <option value="2" >Animals</option>
              <option value="3" >Children</option>
              <option value="4" >Celebration/Event</option>

              <option value="5" >Community</option>
              <option value="6" >Education</option>
              <option value="7" >Environment</option>
              <option value="8" >Funeral</option>

              <option value="9" >Medical</option>
              <option value="10" >Sports/Clubs</option>
              <option value="11" >Volunteer/Service</option>
              <option value="12" >Startup and Projects </option>

              <option value="13" >Other</option>
            </select>


            <Input placeholder="description" name="description" type="text" handleChange={handleChange} />


            <select name="location"
    className="my-2 w-full rounded-sm p-2 outline-none bg-black text-white border-1 text-sm "
    handleChange={handleChange}
    onChange={(e) => handleChange(e, "location")}
    >
              <option value="1" >Lubbock</option>
              <option value="2" >San Antonio</option>
              <option value="3" >Dallas</option>
              <option value="4" >Austin</option>

              <option value="5" >Fort Worth</option>
              <option value="6" >El Paso</option>
              <option value="7" >Arlington</option>
              <option value="8" >Corpus Christi</option>

              <option value="9" >Plano</option>
              <option value="10" >Houston</option>
              <option value="11" >Other</option>

            </select>


            <Input placeholder="amount" name="amount" type="number" handleChange={handleChange} />
            <div className="h-[1px] w-full bg-gray-400 my-2" />

            {isLoading
              ? <Loader />
              : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                >
                  Create Application
                </button>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
