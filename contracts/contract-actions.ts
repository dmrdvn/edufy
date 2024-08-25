import { getContract } from 'viem';
import { wagmiAbi } from '../data/abi';
import { walletClient } from './client';


export const registerUser = async () => {
  const [account] = await walletClient.getAddresses();


  const contract = getContract({
    address: '0x22fA060CC20C9DfE63077bA63223Eb7989a4aDD2',
    abi: wagmiAbi,
    client: walletClient,
  });

  
  const register = await walletClient.writeContract({
    address: contract.address,
    abi: contract.abi,
    functionName: 'registerUser',
    account, 
  });

  
  console.log('Register hash:', register);
  return register;
};


export const updateUser = async (username: string, photo: string, isVerified: boolean) => {
  const [account] = await walletClient.getAddresses();

  const contract = getContract({
    address: '0x22fA060CC20C9DfE63077bA63223Eb7989a4aDD2',
    abi: wagmiAbi,
    client: walletClient,
  });

  
  const update = await walletClient.writeContract({
    address: contract.address,
    abi: contract.abi,
    functionName: 'updateUser',
    args: [username, photo, isVerified],
    account, 
  });


 /*  console.log('Update User hash:', update); */
  return update;
};

export const getUserInfo = async (walletAddress: `0x${string}`) => {

  const contract = getContract({
    address: '0x22fA060CC20C9DfE63077bA63223Eb7989a4aDD2',
    abi: wagmiAbi,
    client: walletClient,
  });
  
  const userInfo = await contract.read.getUser([walletAddress]);

  /* console.log('User Info:', userInfo); */
  return userInfo;
};

export const isUserRegistered = async (walletAddress: `0x${string}`) => {
  const contract = getContract({
    address: '0x22fA060CC20C9DfE63077bA63223Eb7989a4aDD2',
    abi: wagmiAbi,
    client: walletClient,
  });

  const isRegistered = await contract.read.isUser([walletAddress]);
  return isRegistered;
};


export const createTable = async (
  tableContent: string,
  answer: string,
  initReward: number | bigint,
  tableEndDate: number | bigint
) => {
  const [account] = await walletClient.getAddresses();

  const reward = BigInt(initReward);
  const endDate = BigInt(tableEndDate);

  const contract = getContract({
    address: '0x22fA060CC20C9DfE63077bA63223Eb7989a4aDD2',
    abi: wagmiAbi,
    client: walletClient,
  });

  const createTableTx = await walletClient.writeContract({
    address: contract.address,
    abi: contract.abi,
    functionName: 'createTable',
    args: [tableContent, answer, reward, endDate],
    account,
  });

  /* console.log('Create Table Transaction hash:', createTableTx); */
  return createTableTx;
};

export const participateInTable = async (tableId: number | bigint, amount: number | bigint) => {
  const [account] = await walletClient.getAddresses();

  const id = BigInt(tableId);
  const amountNo = BigInt(amount);

  const contract = getContract({
    address: '0x22fA060CC20C9DfE63077bA63223Eb7989a4aDD2',
    abi: wagmiAbi,
    client: walletClient,
  });

  const participateTx = await walletClient.writeContract({
    address: contract.address,
    abi: contract.abi,
    functionName: 'participateInTable',
    args: [id, amountNo],
    account,
  });

 /*  console.log('Participate in Table Transaction hash:', participateTx); */
  return participateTx;
};

export const submitAnswer = async (tableId: number | bigint, userAnswer: string) => {
  const [account] = await walletClient.getAddresses();

  const id = BigInt(tableId);

  const contract = getContract({
    address: '0x22fA060CC20C9DfE63077bA63223Eb7989a4aDD2',
    abi: wagmiAbi,
    client: walletClient,
  });

  const submitAnswerTx = await walletClient.writeContract({
    address: contract.address,
    abi: contract.abi,
    functionName: 'submitAnswer',
    args: [id, userAnswer],
    account,
  });

 /*  console.log('Submit Answer Transaction hash:', submitAnswerTx); */
  return submitAnswerTx;
};

export const getAllTables = async () => {

  const contract = getContract({
    address: '0x22fA060CC20C9DfE63077bA63223Eb7989a4aDD2',
    abi: wagmiAbi,
    client: walletClient,
  });

  
  const tables = await contract.read.getAllTables();

 /*  console.log('All Tables:', tables); */
  return tables;
};
