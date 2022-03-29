import React, { useContext } from "react";
import { ethers } from "ethers";

import { TransactionContext } from "../context/TransactionContext";

import useFetch from "../hooks/useFetch";
import dummyData from "../utils/dummyData";
import { shortenAddress } from "../utils/shortenAddress";

const startPayment = async ({ ether, addr }) => {
  try {
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");

    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    ethers.utils.getAddress(addr);
    const tx = await signer.sendTransaction({
      to: addr,
      value: ethers.utils.parseEther(ether)
    });
    console.log({ ether, addr });
    console.log("tx", tx);
  } catch (err) {
    console.log(err.message);
  }
};

const TransactionsCard = ( {Name, Category, Description, Location, Amount, Status, Account} ) => {

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    await startPayment({
      ether: data.get("ether"),
      addr: data.get("addr")
    });
  };


  return (
    <div className="bg-[#181918] m-4 flex flex-1
      2xl:min-w-[450px]
      2xl:max-w-[500px]
      sm:min-w-[270px]
      sm:max-w-[300px]
      min-w-full
      flex-col p-3 rounded-md hover:shadow-2xl"
    >
      <div className="flex flex-col items-center w-full mt-3">
        <div className="display-flex justify-start w-full mb-6 p-2">
        <p className="text-white text-base">Account : {Account}</p>
        <p className="text-white text-base">Name : {Name}</p>
        <p className="text-white text-base">Category : {Category.toString()}</p>
        <p className="text-white text-base">Description : {Description}</p>
        <p className="text-white text-base">Location : {Location}</p>
        <p className="text-white text-base">Amount : {Amount.toString()}</p>
        
        
        </div>

        <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
          <form onSubmit={handleSubmit}>
          <input
                name="addr"
                type="text"
                className="input input-bordered block w-full focus:ring focus:outline-none"
                placeholder={Account}
                defaultValue={Account}
              />

              <input
                name="ether"
                type="text"
                className="input input-bordered block w-full focus:ring focus:outline-none"
                placeholder="Amount in ETH"
              />
          <button type="submit">
          <p className="text-[#37c7da] font-bold">Donate</p>
          </button>
          </form>
          
        </div>
      </div>
    </div>
  );
};

const Transactions = () => {
  const { transactions, currentAccount } = useContext(TransactionContext);

  return (
    <div className="min-h-[90vh] flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col md:p-12 py-12 px-4">
        {currentAccount ? (
          <h3 className="text-white text-5xl text-center my-0">
            Applications
          </h3>
        ) : (
          <h3 className="text-white text-3xl text-center my-2">
            Connect your account to see the latest applications
          </h3>
        )}
<div>
</div>
        <div className="flex flex-wrap justify-center items-center mt-10">
          {[...transactions].reverse().map((transaction, i) => (
            <TransactionsCard key={i} {...transaction} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
