
export default {
	app: {
		ethLabel: 'ETH',
		weiLabel: 'WEI',
		ramboTokenLabel: 'RamboToken',
		pleaseLoginTxt: "Please login in to MetaMask, and refresh page",
		backBtnTxt: 'Back',
		metaMaskNotFound: 'We cannot detect your MetaMask plugin. Please refresh page and try again.',
		cantConnectToMetaMask: 'App can not connect to MetaMask. Please refresh page and try again.'
	},
	header: {
		title: 'RamboToken dApp',
	},
	homePage: {
		buyButtonTxt: 'Buy',
		sellButtonTxt: 'Sell'
	},
	footer: {
		footerTxt: 'Rafał Czajkowski'
	},
	accountInfo: {
		accountLabel: 'Account',
		ethBalanceLabel: 'ETH Balance (WEI) ',
		ramboBalanceLabel: 'RamboToken Balance ',
	},
	exchangeForm: {
		submitBtnTxt: 'Accept',
		balanceValidationMsg: (currencyName, balance) => `You don\'t have enough ${currencyName} on your account. Your current balance is ${balance}`,
		minimumAmountTransactionValidationMsg: (amount) => `The minimum value to exchange is ${amount} WEI`,
		inputPlaceholder: 'Amount'
	},
	transactionInProgress: {
		transactionLinkLabel: 'Transaction details',
		transactionLink: (transactionHash) => `https://ropsten.etherscan.io/tx/${transactionHash}`,
		inProgressLabel: 'Transaction in progress, please wait. Page will be automatically reloaded. To see transaction details click button below'
	},
	transactionComplete: {
		backBtnTxt: 'Back to home page',
		amountLabel: (amount, currencyName) => `Successfully exchanged ${amount} ${currencyName}`
	}
}