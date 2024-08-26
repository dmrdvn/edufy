import { getContract } from 'viem';
import { wagmiAbi } from '../data/abi';
import { walletClient } from './client';

const checkWalletClient = () => {
  if (!walletClient) {
    throw new Error("walletClient is not initialized. Make sure you are running this in a browser with MetaMask or another Ethereum provider.");
  }
  return walletClient;
};

export const registerUser = async () => {
  const client = checkWalletClient();
  const [account] = await client.getAddresses();

  const contract = getContract({
    address: '0x22fA060CC20C9DfE63077bA63223Eb7989a4aDD2',
    abi: wagmiAbi,
    client, // walletClient yerine artık client kullanıyoruz
  });

  const register = await client.writeContract({
    address: contract.address,
    abi: contract.abi,
    functionName: 'registerUser',
    account, 
  });

  console.log('Register hash:', register);
  return register;
};

export const updateUser = async (username: string, photo: string, isVerified: boolean) => {
  const client = checkWalletClient();
  const [account] = await client.getAddresses();

  const contract = getContract({
    address: '0x22fA060CC20C9DfE63077bA63223Eb7989a4aDD2',
    abi: wagmiAbi,
    client, // walletClient yerine artık client kullanıyoruz
  });

  const update = await client.writeContract({
    address: contract.address,
    abi: contract.abi,
    functionName: 'updateUser',
    args: [username, photo, isVerified],
    account, 
  });

  console.log('Update User hash:', update);
  return update;
};

export const getUserInfo = async (walletAddress: `0x${string}`) => {
  const client = checkWalletClient();

  const contract = getContract({
    address: '0x22fA060CC20C9DfE63077bA63223Eb7989a4aDD2',
    abi: wagmiAbi,
    client, // walletClient yerine artık client kullanıyoruz
  });

  const userInfo = await contract.read.getUser([walletAddress]);

  console.log('User Info:', userInfo);
  return userInfo;
};

export const isUserRegistered = async (walletAddress: `0x${string}`) => {
  const client = checkWalletClient();

  const contract = getContract({
    address: '0x22fA060CC20C9DfE63077bA63223Eb7989a4aDD2',
    abi: wagmiAbi,
    client, // walletClient yerine artık client kullanıyoruz
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
  const client = checkWalletClient();
  const [account] = await client.getAddresses();

  const reward = BigInt(initReward);
  const endDate = BigInt(tableEndDate);

  const contract = getContract({
    address: '0x22fA060CC20C9DfE63077bA63223Eb7989a4aDD2',
    abi: wagmiAbi,
    client, // walletClient yerine artık client kullanıyoruz
  });

  const createTableTx = await client.writeContract({
    address: contract.address,
    abi: contract.abi,
    functionName: 'createTable',
    args: [tableContent, answer, reward, endDate],
    account,
  });

  console.log('Create Table Transaction hash:', createTableTx);
  return createTableTx;
};

export const participateInTable = async (tableId: number | bigint, amount: number | bigint) => {
  const client = checkWalletClient();
  const [account] = await client.getAddresses();

  const id = BigInt(tableId);
  const amountNo = BigInt(amount);

  const contract = getContract({
    address: '0x22fA060CC20C9DfE63077bA63223Eb7989a4aDD2',
    abi: wagmiAbi,
    client, // walletClient yerine artık client kullanıyoruz
  });

  const participateTx = await client.writeContract({
    address: contract.address,
    abi: contract.abi,
    functionName: 'participateInTable',
    args: [id, amountNo],
    account,
  });

  console.log('Participate in Table Transaction hash:', participateTx);
  return participateTx;
};

export const submitAnswer = async (tableId: number | bigint, userAnswer: string) => {
  const client = checkWalletClient();
  const [account] = await client.getAddresses();

  const id = BigInt(tableId);

  const contract = getContract({
    address: '0x22fA060CC20C9DfE63077bA63223Eb7989a4aDD2',
    abi: wagmiAbi,
    client, // walletClient yerine artık client kullanıyoruz
  });

  const submitAnswerTx = await client.writeContract({
    address: contract.address,
    abi: contract.abi,
    functionName: 'submitAnswer',
    args: [id, userAnswer],
    account,
  });

  console.log('Submit Answer Transaction hash:', submitAnswerTx);
  return submitAnswerTx;
};

export const getAllTables = async () => {
  const client = checkWalletClient();

  const contract = getContract({
    address: '0x22fA060CC20C9DfE63077bA63223Eb7989a4aDD2',
    abi: wagmiAbi,
    client, // walletClient yerine artık client kullanıyoruz
  });

  const tables = await contract.read.getAllTables();

  console.log('All Tables:', tables);
  return tables;
};
