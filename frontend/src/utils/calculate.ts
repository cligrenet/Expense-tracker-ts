import { Transaction } from '../context/GlobalState';

export const calcIncomeTotal = (transactions: Array<Transaction>) => {
	return transactions
		? transactions
				.map((transaction) => transaction.amount)
				.filter((amount) => +amount > 0)
				.reduce((acc, amount) => (acc += +amount), 0)
				.toFixed(2)
		: 0;
};

export const calcExpenseTotal = (transactions: Array<Transaction>) => {
	return transactions
		? (
				transactions
					.map((transaction) => transaction.amount)
					.filter((amount) => +amount < 0)
					.reduce((acc, amount) => (acc += +amount), 0) * -1
		  ).toFixed(2)
		: 0;
};
