import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

export const TransactionsProvider = ({ children }) => {
  const [formData, setformData] = useState({ name: "", category: 1, description: "", location: "", amount: 1, status:1 });
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const handleChange = (e, name) => {
    setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
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
        const { name,category, description,location,amount,status } = formData;
        const transactionsContract = createEthereumContract();
        const transactionHash = await transactionsContract.addApplication(name,category,description,location,amount,status,currentAccount);

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


  const getAllTransactions = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();

        const availableTransactions = await transactionsContract.getAllTransactions();

        const structuredTransactions = availableTransactions.map((transaction) => ({
          Name: transaction.Name,
          Category: transaction.Category,
          Description:transaction.Description,
          Location: transaction.Location,
          Amount: transaction.Amount,
          Status: transaction.Status,
          Account : transaction.Account
        }));
        setTransactions(structuredTransactions);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }

  };





  useEffect(() => {
    checkIfWalletIsConnect();
    getAllTransactions();
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
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
