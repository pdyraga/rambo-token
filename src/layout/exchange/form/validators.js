import dictionary from '../../../shared/dictionary/dictionary';
import web3 from 'web3';
import web3Service  from '../../../shared/service/web3/web3.service';

const validate = (transactionValue, componentProps) => (
	validateAccountBalance(transactionValue, componentProps)
		.then(() => validateMinimumAmountOfTransfer(transactionValue, componentProps))
);

const validateAccountBalance = (transactionValue, componentProps) =>
	getBalanceMethod(componentProps)
		.then(balance => checkAccountBalance(transactionValue, balance, componentProps));

const getBalanceMethod = ({exchangeType, account}) => {
	if(exchangeType === 'sell')
		return web3Service.getTokenContract().methods.balanceOf(account).call();
	return web3Service.getAccountBalance(account);
};

const checkAccountBalance = (transactionValue, balance, componentProps) => {
	if(web3.utils.toBN(balance).cmp(web3.utils.toBN(transactionValue)) < 0)
		return Promise.reject(getAccountBalanceValidationMessage(componentProps, balance));
	return Promise.resolve();
};

const getAccountBalanceValidationMessage = ({ exchangeType }, balance) => {
	const currencyName = exchangeType === 'sell'
		? dictionary.app.ramboTokenLabel
		: dictionary.app.ethLabel;
	return dictionary.exchangeForm.balanceValidationMsg(currencyName, balance);
};

const validateMinimumAmountOfTransfer = (transactionValue, { exchangeType }) =>{
	if(exchangeType === 'sell')
		return Promise.resolve();

	return web3Service.getMarketContract().methods
		.minimumAmount()
		.call()
		.then(minimumAmount => checkRequiredMinimumAmount(transactionValue, minimumAmount));
};

const checkRequiredMinimumAmount = (transactionValue, minimumAmount) => {
	if(web3.utils.toBN(minimumAmount).cmp(web3.utils.toBN(transactionValue)) === 1)
		return Promise.reject(dictionary.exchangeForm.minimumAmountTransactionValidationMsg(minimumAmount));
	return Promise.resolve();
};

const validators = {
	validate,
};

export default validators;
