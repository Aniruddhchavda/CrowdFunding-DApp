import React, { useContext } from "react";
import { ethers } from "ethers";
import ProgressBar from "@ramonak/react-progress-bar";
import { TransactionContext } from "../context/TransactionContext";

import useFetch from "../hooks/useFetch";
import dummyData from "../utils/dummyData";
import { shortenAddress } from "../utils/shortenAddress";

const TransactionsCard = ( {Num, Name, Category, Description, Location, AmountGathered, Amount, Status, Account} ) => {
  
  const { updateTransaction, deleteTransaction } = useContext(TransactionContext);

  const handleSubmit1 = (e) => {
    e.preventDefault();
    updateTransaction(Num, 1);
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();
    updateTransaction(Num, 2);
  };

  const handleSubmit3 = (e) => {
    e.preventDefault();
    deleteTransaction(Num);
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
        <p className="text-white text-base">Status : {Status.toString()}</p>
        <p className="text-white text-base">Num : {Num.toString()}</p>
        <p className="text-white text-base">Amount : {Amount.toString()}</p>

        </div>
        <ProgressBar className="flex flex-col items-center w-full mt-3" completed={AmountGathered} maxCompleted={Amount}></ProgressBar>
  
          <button type="button" value="true" onClick={handleSubmit1} className="bg-black p-3 px-10 py-5 w-full rounded-3xl mt-5 shadow-2xl">
          <span className="text-[#37c7da] font-bold">Approve</span>
          </button>

          <button type="button" value="false" onClick={handleSubmit2} className="bg-black p-3 px-10 py-5 w-full rounded-3xl mt-5 shadow-2xl">
          <span className="text-[#37c7da] font-bold">Reject</span>
          </button>


          <button type="button" value="false" onClick={handleSubmit3} className="bg-black p-3 px-10 py-5 w-full rounded-3xl mt-5 shadow-2xl">
          <span className="text-[#37c7da] font-bold">Delete</span>
          </button>


      </div>
    </div>
  );
};

const Admin = () => {
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
          {[...transactions].sort((a,b) => b.Amount - a.Amount).map((transaction, i) => (
            <TransactionsCard key={i} {...transaction} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
