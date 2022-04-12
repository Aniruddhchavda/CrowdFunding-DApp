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

const TransactionsCard = ( {Num, Name, Category, Description, Location, AmountGathered,Amount, Status, Account , Upvote , Downvote} ) => {

  const { updateAmount , setUpvote, setDownvote } = useContext(TransactionContext);

  const handleSubmit1 = (e) => {
    e.preventDefault();
    setUpvote(Num);
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();
    setDownvote(Num);
  };

  const locations = {
    1:'Lubbock',
    2:'San Antonio',
    3:'Dallas',
    4:'Austin',
    5:'Fort Worth',
    6:'El Paso',
    7:'Arlington',
    8:'Corpus Christi',
    9:'Plano',
    10:'Houston',
    11:'Other'
  }

  const categories = {
    1:'Accidents & Emergencies',
    2:'Animals',
    3:'Children',
    4:'Celebration/Event',
    5:'Community',
    6:'Education',
    7:'Environment',
    8:'Funeral',
    9:'Medical',
    10:'Sports/Clubs',
    11:'Volunteer/Service',
    12:'Startup and Projects ',
    13:'Other'
  }

  const loc = locations[Category];
  const cat = categories[Location];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    

    await startPayment({
      ether: data.get("ether"),
      addr: data.get("addr")
    });

    updateAmount(Num,data.get("ether"));
    
  };

  if(Status != 1){
    return null;
  }
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
        <p className="text-white text-base">Category : {cat}</p>
        <p className="text-white text-base">Description : {Description}</p>
        <p className="text-white text-base">Location : {loc}</p>
        <p className="text-white text-base">Amount : {Amount.toString()}</p>
        <ProgressBar className="flex flex-col items-center w-full mt-1 p-4 " completed={AmountGathered} maxCompleted={Amount}></ProgressBar>
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
                placeholder="Amount in ETH"
              />
          <button type="submit">
          <p className="text-[#37c7da] font-bold px-10 py-5 mt-3">Donate</p>
          </button>
          </form>


        </div>

          <button type="button" value="true" onClick={handleSubmit1} className="bg-black p-3 px-10 py-5 w-full rounded-3xl mt-5 shadow-2xl">
          <span className="text-[#37c7da] font-bold">Upvotes {Upvote.toString()}</span> 
          </button>

          <button type="button" value="true" onClick={handleSubmit2} className="bg-black p-3 px-10 py-5 w-full rounded-3xl mt-5 shadow-2xl">
          <span className="text-[#37c7da] font-bold">Downvotes {Downvote.toString()}</span>
          </button>
      </div>
    </div>
  );
};

const Transactions = () => {
  const { transactions, currentAccount, updateAmount } = useContext(TransactionContext);

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
          {[...transactions].sort((a,b) => b.Upvote - a.Upvote).map((transaction, i) => (
            <TransactionsCard key={i} {...transaction} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
