import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

export const TransactionsProvider = ({ children }) => {
  const [formData, setformData] = useState({ name: "", category: "", description: "", location: "", amount: 1, status:1 });
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [refunds, setRefunds] = useState([]);

  const handleChange = (e, name) => {
    setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
    console.log(e.target.value);
  };

const checkIfWalletIsConnect = async () => {
  try {
    if (!ethereum) return alert("Please install MetaMask.");

    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length) {
      setCurrentAccount(accounts[0]);
    } else {
      console.log("No accounts found");
    }
  } catch (error) {
    console.log(error);
  }
};

const connectWallet = async () => {
  try {
    if (!ethereum) return alert("Please install MetaMask.");

    const accounts = await ethereum.request({ method: "eth_requestAccounts", });

    setCurrentAccount(accounts[0]);
    window.location.reload();
  } catch (error) {
    console.log(error);

    throw new Error("No ethereum object");
  }
};

const createEthereumContract = () => {

  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);
  return transactionsContract;
};



  const sendTransaction = async () => {
    try {
      if (ethereum) {
        const { name,category, description,location,amount } = formData;
        console.log(category);
        const transactionsContract = createEthereumContract();
        const transactionHash = await transactionsContract.addApplication(name,category,description,location,0, amount,0,currentAccount);

        setIsLoading(true);
        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
        setIsLoading(false);
        window.location.reload();
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const updateAmount = async (num,AmountGathered) => {
    try {
      if (ethereum) {

        const transactionsContract = createEthereumContract();
        const transactionHash = await transactionsContract.setAmount(num,AmountGathered,currentAccount);

        setIsLoading(true);
        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
        setIsLoading(false);
        window.location.reload();
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const reduceAmount = async (num,AmountGathered) => {
    try {
      if (ethereum) {

        const transactionsContract = createEthereumContract();
        const transactionHash = await transactionsContract.reduceAmount(num,AmountGathered,currentAccount);

        setIsLoading(true);
        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
        setIsLoading(false);
        window.location.reload();
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const setUpvote = async (num) => {
    try {
      if (ethereum) {

        const transactionsContract = createEthereumContract();
        const transactionHash = await transactionsContract.setUpvote(num);

        setIsLoading(true);
        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
        setIsLoading(false);
        window.location.reload();
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const setDownvote = async (num) => {
    try {
      if (ethereum) {

        const transactionsContract = createEthereumContract();
        const transactionHash = await transactionsContract.setDownvote(num);

        setIsLoading(true);
        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
        setIsLoading(false);
        window.location.reload();
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const updateTransaction = async (num,status) => {
    try {
      if (ethereum) {

        const transactionsContract = createEthereumContract();
        const transactionHash = await transactionsContract.setStatus(num,status);

        setIsLoading(true);
        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
        setIsLoading(false);
        window.location.reload();
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const deleteTransaction = async (num) => {
    try {
      if (ethereum) {

        const transactionsContract = createEthereumContract();
        const transactionHash = await transactionsContract.deleteElement(num);

        setIsLoading(true);
        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
        setIsLoading(false);
        window.location.reload();
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      throw new Error(error);
    }
  };


  // const getAllTransactions = async () => {
  //   try {
  //     if (ethereum) {
  //       const transactionsContract = createEthereumContract();

  //       const p1 = transactionsContract.getAllTransactions();
  //       const p2 = transactionsContract.getAllRefunds();

  //       const result = Promise.all([p1,p2])
  //       .then(([availableTransactions,availableRefunds]) => {
  //         const structuredTransactions = availableTransactions.map((transaction) => ({
  //         Num : transaction.id,
  //         Name: transaction.Name,
  //         Category: transaction.Category,
  //         Description:transaction.Description,
  //         Location: transaction.Location,
  //         AmountGathered : transaction.AmountGathered,
  //         Amount: transaction.Amount,
  //         Status: transaction.Status,
  //         Account : transaction.Account,
  //         Upvote : transaction.Upvote,
  //         Downvote : transaction.Downvote
  //       }))
  //       const structuredRefunds = availableRefunds.map((refund) => ({
  //         Num : refund.id,
  //         Amount: refund.Amount,
  //         Account : refund.Account
  //       }))
  //       setTransactions(structuredTransactions);
  //       setRefunds(structuredRefunds);
  //     })

  //   }


  //     else {
  //       console.log("Ethereum is not present");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }

  // };

  const getAllTransactions = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();

        const availableTransactions = await transactionsContract.getAllTransactions();

        const structuredTransactions = availableTransactions.map((transaction) => ({
          Num : transaction.id,
          Name: transaction.Name,
          Category: transaction.Category,
          Description:transaction.Description,
          Location: transaction.Location,
          AmountGathered : transaction.AmountGathered,
          Amount: transaction.Amount,
          Status: transaction.Status,
          Account : transaction.Account,
          Upvote : transaction.Upvote,
          Downvote : transaction.Downvote
        }));
        setTransactions(structuredTransactions);


      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }

  };

  const getRefund = async (num) => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();

        const availableTransactions = await transactionsContract.refund(num,currentAccount);
        console.log(availableTransactions);
        return availableTransactions;
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }

  };

  const createRefundRequest = async (num,amount) => {
    try {
      if (ethereum) {

        const transactionsContract = createEthereumContract();
        const transactionHash = await transactionsContract.requestRefund(num,amount,currentAccount);

        setIsLoading(true);
        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
        setIsLoading(false);
        window.location.reload();
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  // const getAllRefunds = async () => {
  //   try {
  //     if (ethereum) {
  //       const transactionsContract = createEthereumContract();

  //       const availableTransactions = await transactionsContract.getAllRefunds();

  //       const structuredRefunds = availableTransactions.map((refund) => ({
  //         Num : refund.id,
  //         Amount: refund.Amount,
  //         Account : refund.Account
  //       }));
  //       setRefunds(structuredRefunds);
  //     } else {
  //       console.log("Ethereum is not present");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }

  // };





  useEffect(() => {
    checkIfWalletIsConnect();
    getAllTransactions();
    // getAllRefunds();
  });

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        transactions,
        currentAccount,
        isLoading,
        sendTransaction,
        handleChange,
        formData,
        updateTransaction,
        deleteTransaction,
        updateAmount,
        setUpvote,
        setDownvote,
        getRefund,
        createRefundRequest,
        refunds,
        reduceAmount,
        createEthereumContract,
        setRefunds
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
