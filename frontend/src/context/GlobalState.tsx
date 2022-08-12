import { createContext, useReducer } from 'react';
import axios from 'axios';
import AppReducer from './AppReducer';

// Global axios setup (create an instance to allow setup of middlewares)
axios.defaults.baseURL = 'http://localhost:3333';

// Get user from localStorage
// @ts-ignore
const user = JSON.parse(localStorage.getItem('user'));

// Types
export interface UserInterface {
	firstName?: string;
	lastName?: string;
	email: string;
	password: string;
	password2?: string;
}

export interface TransactionInterface {
	id?: number;
	text: string;
	amount: number;
	category: string;
	userId?: number;
	createdAt?: string;
	updatedAt?: string;
	type?: string;
}

export interface GlobalContextInterface {
	user: { userId: string; firstName?: string; lastName?: string; email: string; access_token: string };
	isAuthError: boolean;
	isAuthSuccess: boolean;
	isAuthLoading: boolean;
	authMessage: string | null;

	signup: (userData: UserInterface) => void;
	login: (userData: UserInterface) => void;
	logout: () => void;

	transactions: Array<TransactionInterface>;
	transactionsError: string;
	isTransactionsError: boolean;
	isTransactionsSuccess: boolean;
	isTransactionsLoading: boolean;
	transactionsSortingDirection: string;
	transactionsSelectedCategories: string[];

	getTransactions: (token: string) => void;
	getIncomes: (token: string) => void;
	getExpenses: (token: string) => void;
	deleteTransaction: (transactionId: number, token: string) => void;
	addTransaction: (transaction: TransactionInterface, token: string) => void;
	toggleTransactionSortDirection: () => void;
	handleTransactionsSelectedCategories: (newCategories: string[]) => void;

	getMe: (token: string) => void;
	editUser: (userId: number, token: string, newUserData: UserInterface) => void;
}

//// Initial state
const initialState = {
	user: user ? user : null,
	isAuthError: false,
	isAuthSuccess: false,
	isAuthLoading: false,
	authMessage: '',

	signup: () => {},
	login: () => {},
	logout: () => {},

	transactions: [],
	transactionsError: '',
	isTransactionsError: false,
	isTransactionsSuccess: false,
	isTransactionsLoading: true,
	transactionsSortingDirection: 'desc',
	transactionsSelectedCategories: [],

	getTransactions: () => {},
	getIncomes: () => {},
	getExpenses: () => {},
	deleteTransaction: () => {},
	addTransaction: () => {},
	toggleTransactionSortDirection: () => {},
	handleTransactionsSelectedCategories: () => {},

	getMe: () => {},
	editUser: () => {},
};

//// Create context
export const GlobalContext = createContext<GlobalContextInterface>(initialState);

//// Provider component
export const GlobalProvider = ({ children }: { children: JSX.Element }) => {
	const [state, dispatch] = useReducer(AppReducer, initialState);

	// NOTE Actions => make calls to the reducer, make changes to initial state

	// Signup user
	async function signup(userData: UserInterface) {
		dispatch({
			type: 'SIGNUP_LOADING',
		});

		try {
			const response = await axios.post('/auth/signup', userData);

			if (response.data) {
				localStorage.setItem('user', JSON.stringify(response.data));
			}
			// console.log("signup ", response.data);

			dispatch({
				type: 'LOGIN_SUCCESS',
				payload: response.data,
			});
		} catch (err: any) {
			console.log({ err });
			dispatch({
				type: 'SIGNUP_FAILED',
				payload:
					typeof err.response.data.message === 'string'
						? err.response.data.message
						: err.response.data.message[0],
			});
		}
	}

	// Login user
	async function login(userData: UserInterface) {
		dispatch({
			type: 'LOGIN_LOADING',
		});

		try {
			const response = await axios.post('/auth/login', userData);

			if (response.data) {
				localStorage.setItem('user', JSON.stringify(response.data));
			}
			// console.log("login" ",response.data);

			dispatch({
				type: 'LOGIN_SUCCESS',
				payload: response.data,
			});
		} catch (err: any) {
			console.log(typeof err, err);
			dispatch({
				type: 'LOGIN_FAILED',
				payload:
					typeof err.response.data.message === 'string'
						? err.response.data.message
						: err.response.data.message[0],
			});
		}
	}

	// Logout user
	function logout() {
		localStorage.removeItem('user');

		dispatch({
			type: 'LOGOUT_SUCCESS',
		});
	}

	// Fetch transactions
	// Add queries into URL to do sorting and filtering
	async function getTransactions(token: string) {
		try {
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};

			let filters = '';

			if (state.transactionsSelectedCategories) {
				filters =
					'&' +
					state.transactionsSelectedCategories
						.map((category: string) => {
							return `filters[]=${encodeURI(category)}`;
						})
						.join('&');
			}

			const res = await axios.get(
				`/transactions?sort_direction=${state.transactionsSortingDirection}${filters}`,
				config,
			);
			// console.log('GlobalState fetch transactions', res.data.data);

			dispatch({
				type: 'GET_TRANSACTIONS',
				payload: res.data,
			});
		} catch (err: any) {
			console.log(err);
			dispatch({
				type: 'TRANSACTION_ERROR',
				payload:
					typeof err.response.data.message === 'string'
						? err.response.data.message
						: err.response.data.message[0],
			});
		}
	}

	async function getIncomes(token: string) {
		try {
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};

			let filters = '';

			if (state.transactionsSelectedCategories) {
				filters =
					'&' +
					state.transactionsSelectedCategories
						.map((category: string) => {
							return `filters[]=${encodeURI(category)}`;
						})
						.join('&');
			}

			const res = await axios.get(
				`/transactions?sort_direction=${state.transactionsSortingDirection}${filters}`,
				config,
			);
			// console.log('GlobalState fetch transactions', res.data.data);

			const incomes = await res.data.filter((transaction: TransactionInterface) => transaction.amount > 0);

			dispatch({
				type: 'GET_INCOMES',
				payload: incomes,
			});
		} catch (err: any) {
			console.log(err);
			dispatch({
				type: 'TRANSACTION_ERROR',
				payload:
					typeof err.response.data.message === 'string'
						? err.response.data.message
						: err.response.data.message[0],
			});
		}
	}

	async function getExpenses(token: string) {
		try {
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};

			let filters = '';

			if (state.transactionsSelectedCategories) {
				filters =
					'&' +
					state.transactionsSelectedCategories
						.map((category: string) => {
							return `filters[]=${encodeURI(category)}`;
						})
						.join('&');
			}

			const res = await axios.get(
				`/transactions?sort_direction=${state.transactionsSortingDirection}${filters}`,
				config,
			);
			// console.log('GlobalState fetch transactions', res.data.data);

			const expenses = await res.data.filter((transaction: TransactionInterface) => transaction.amount < 0);

			dispatch({
				type: 'GET_EXPENSES',
				payload: expenses,
			});
		} catch (err: any) {
			console.log(err);
			dispatch({
				type: 'TRANSACTION_ERROR',
				payload:
					typeof err.response.data.message === 'string'
						? err.response.data.message
						: err.response.data.message[0],
			});
		}
	}

	// Delete transaction
	async function deleteTransaction(transactionId: number, token: string) {
		try {
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};

			await axios.delete(`/transactions/${transactionId}`, config);
			dispatch({ type: 'DELETE_TRANSACTION', payload: transactionId });
		} catch (err: any) {
			console.log(err);
			dispatch({
				type: 'TRANSACTION_ERROR',
				payload:
					typeof err.response.data.message === 'string'
						? err.response.data.message
						: err.response.data.message[0],
			});
		}
	}

	// Create transaction
	async function addTransaction(transaction: TransactionInterface, token: string) {
		try {
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
			};

			const res = await axios.post('/transactions', transaction, config);
			// console.log('GlobalState create transaction', res.data);

			dispatch({
				type: 'ADD_TRANSACTION',
				payload: res.data,
			});
		} catch (err: any) {
			console.log(err);
			dispatch({
				type: 'TRANSACTION_ERROR',
				payload:
					typeof err.response.data.message === 'string'
						? err.response.data.message
						: err.response.data.message[0],
			});
		}
	}

	// Sort transactions
	async function toggleTransactionSortDirection() {
		dispatch({
			type: 'TRANSACTIONS_SORT',
			payload: state.transactionsSortingDirection === 'asc' ? 'desc' : 'asc',
		});
	}

	// Filter transactions by category
	function handleTransactionsSelectedCategories(newCategories: string[]) {
		dispatch({
			type: 'TRANSACTIONS_FILTER_BY_CATEGORY',
			payload: newCategories,
		});
	}

	// TODO
	// Fetch current user complete data
	async function getMe(token: string) {
		try {
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};

			const res = await axios.get('/users/me', config);
			console.log('GlobalState get user', res.data);

			dispatch({
				type: 'GET_USER',
				payload: res.data.data,
			});
		} catch (err: any) {
			console.log(err);
		}
	}

	// TODO
	async function editUser(userId: number, token: string, newUserData: UserInterface) {
		try {
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
					body: newUserData,
				},
			};
			const res = await axios.patch(`/users/${userId}`, config);
			console.log('GlobalState eidt user', res.data);

			dispatch({
				type: 'EDIT_USER',
				payload: res.data.data,
			});
		} catch (err: any) {
			console.log(err);
		}
	}

	return (
		<GlobalContext.Provider
			value={{
				user: state.user,
				isAuthError: state.isAuthError,
				isAuthSuccess: state.isAuthSuccess,
				isAuthLoading: state.isAuthLoading,
				authMessage: state.authMessage,
				signup,
				login,
				logout,
				transactions: state.transactions,
				transactionsError: state.transactionsError,
				isTransactionsError: state.isTransactionsError,
				isTransactionsLoading: state.isTransactionsLoading,
				isTransactionsSuccess: state.isTransactionsSuccess,
				transactionsSortingDirection: state.transactionsSortingDirection,
				transactionsSelectedCategories: state.transactionsSelectedCategories,
				getTransactions,
				getIncomes,
				getExpenses,
				deleteTransaction,
				addTransaction,
				toggleTransactionSortDirection,
				handleTransactionsSelectedCategories,
				getMe,
				editUser,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
