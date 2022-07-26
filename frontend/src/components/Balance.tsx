import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { numberWithCommas } from '../utils/format';

const Balance = () => {
	const { transactions } = useContext(GlobalContext);

	const balance =
		transactions && transactions.length !== 0
			? transactions.reduce((acc, curTransaction) => (acc += Number(curTransaction.amount)), 0)
			: 0;

	return (
		<>
			<h3 className="font-sans text-l text-center text-darkblue-1">Total Balance</h3>
			<h1 className="text-3xl text-slate-200 text-center mb-5">€{numberWithCommas(Number(balance))}</h1>
		</>
	);
};

export default Balance;
