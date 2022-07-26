import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Balance from '../components/Balance';
import IncomeExpenses from '../components/IncomeExpenses';
import ChartComp from '../components/Chart';
import TransactionList from '../components/TransactionList';
import AddTransaction from '../components/AddTransaction';

function Home() {
	const { logout } = useContext(GlobalContext);

	const navigate = useNavigate();

	const onLogout = () => {
		logout();

		navigate('/login');
	};

	return (
		<div className="container mx-auto px-5 max-w-md">
			<section className="flex flex-wrap justify-between">
				<Header />

				<button
					className="flex flex-nowrap col items-center text-slate-300  hover:text-yellow"
					onClick={onLogout}
				>
					<FaSignOutAlt className="mr-2" /> Logout
				</button>
			</section>

			<section className="relative">
				<div className="rounded-lg px-8 py-4 mb-5 bg-purple">
					<Balance />
					<IncomeExpenses />
				</div>

				<div className="px-20 mb-5">
					<ChartComp />
				</div>

				<div className="mb-5">
					<TransactionList />
				</div>

				<div className="fixed bottom-6 right-10">
					<AddTransaction />
				</div>
			</section>
		</div>
	);
}

export default Home;
