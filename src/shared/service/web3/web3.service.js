import React from 'react';
import Web3 from 'web3';
import { MARKET_CONTRACT_ABI, MARKET_CONTRACT_ADDRESS } from '../../../config/contracts/market-contract.config';
import { TOKEN_CONTRACT_ABI, TOKEN_CONTRACT_ADDRESS } from '../../../config/contracts/token-contract.config';

const web3Instance = new Web3(Web3.givenProvider || "http://localhost:8545");

const marketContract = new web3Instance.eth.Contract(MARKET_CONTRACT_ABI, MARKET_CONTRACT_ADDRESS);

const tokenContract = new web3Instance.eth.Contract(TOKEN_CONTRACT_ABI, TOKEN_CONTRACT_ADDRESS);
tokenContract.methods.setMarket(marketContract.options.address).call();

const AccountContext = React.createContext(0);

const getMarketContract = () => {
	return marketContract;
};

const getTokenContract = () => {
	return tokenContract;
};

const getAccounts = async () => {
	return await web3Instance.eth.getAccounts();
};

const getAccountBalance = (account) => {
	return web3Instance.eth.getBalance(account);
};

const web3Service = {
	getAccounts,
	getAccountBalance,
	web3Instance,
	getMarketContract,
	getTokenContract,
};

export default web3Service;

export { AccountContext };
