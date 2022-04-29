import React, { useContext } from "react";
import { ethers } from "ethers";

import { TransactionContext } from "../context/TransactionContext";

import useFetch from "../hooks/useFetch";
import dummyData from "../utils/dummyData";
import { shortenAddress } from "../utils/shortenAddress";
import ProgressBar from "@ramonak/react-progress-bar";

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


  const getAllRefunds = async () => {
    try {
      const { updateAmount , setUpvote, setDownvote, currentAccount, reduceAmount, createEthereumContract,setRefunds } = useContext(TransactionContext);
      if (window.ethereum) {
        const transactionsContract = createEthereumContract();

        const availableTransactions = await transactionsContract.getAllRefunds();

        const structuredRefunds = availableTransactions.map((refund) => ({
          Num : refund.id,
          Amount: refund.Amount,
          Account : refund.Account
        }));
        setRefunds(structuredRefunds);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }

  };

const TransactionsCard = ( {Num,Amount, Account} ) => {


  const { updateAmount , setUpvote, setDownvote, currentAccount, reduceAmount, createEthereumContract } = useContext(TransactionContext);

  if(Account != currentAccount) return null;

  const handleSubmit1 = (e) => {
    e.preventDefault();
    setUpvote(Num);
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();
    setDownvote(Num);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    const p1 = startPayment({
      ether: data.get("ether"),
      addr: data.get("addr")
    });

    const p2 = reduceAmount(Num,data.get("ether"));
    
    const result = Promise.all([p1,p2]);
  
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
        <p className="text-white text-base">Amount : {Amount.toString()}</p>
        <p className="text-white text-base">App No : {Num.toString()}</p>
        </div>

        
  
        <div className="bg-black p-3 px-5 w-full rounded-2xl -mt-1 shadow-2xl">
          <form onSubmit={handleSubmit}>
          <input
                name="addr"
                type="text"
                className="input input-bordered block w-full focus:ring focus:outline-none"
                placeholder={Account}
                defaultValue={Account}
              />

        <input
                name="addr"
                type="text"
                className="input input-bordered block w-full focus:ring focus:outline-none"
                placeholder={Num}
                defaultValue={Num}
              />

              <input
                name="ether"
                type="text"
                className="input input-bordered block w-full focus:ring focus:outline-none"
                placeholder={Amount}
                defaultValue={Amount}
              />
          <button type="submit">
          <p className="text-[#37c7da] font-bold px-10 py-5 mt-3">Provide Refund</p>
          </button>
          </form>


        </div>
      </div>
    </div>
  );
};

const Refund = () => {
  const { refunds, currentAccount, updateAmount } = useContext(TransactionContext);
  getAllRefunds();
  return (
    <div className="min-h-[90vh] flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col md:p-12 py-12 px-4">
        {currentAccount ? (
          <h3 className="text-white text-5xl text-center my-0">
            Refund Requests
          </h3>
        ) : (
          <h3 className="text-white text-3xl text-center my-2">
            Connect your account to see the latest refund requests !
          </h3>
        )}
<div>
</div>
        <div className="flex flex-wrap justify-center items-center mt-10">
          {[...refunds].map((refunds, i) => (
            <TransactionsCard key={i} {...refunds} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Refund;
