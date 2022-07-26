import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { calcIncomeTotal, calcExpenseTotal } from '../utils/calculate';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartComp = () => {
	const { transactions } = useContext(GlobalContext);

	const income = transactions ? calcIncomeTotal(transactions) : 0;
	const expense = transactions ? calcExpenseTotal(transactions) : 0;

	const chartData = {
		labels: ['Income', 'Expense'],
		datasets: [
			{
				data: [income, expense],
				backgroundColor: ['#01cb87', '#ff2e62'],
				borderColor: '#010a42',
				borderWidth: 4,
			},
		],
	};

	const options = {
		plugins: {
			legend: {
				display: false,
				// labels: {
				// 	color: 'rgb(203 213 225)',
				// },
			},
		},
	};

	return (
		<>
			<Doughnut data={chartData} options={options} />
		</>
	);
};

export default ChartComp;
