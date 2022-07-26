import { createContext, useReducer } from 'react';
import axios from 'axios';
import AppReducer from './AppReducer';

// Global axios setup (create an instance to allow setup of middlewares)
axios.defaults.baseURL = 'http://localhost:3333';

// Get user from localStorage
// @ts-ignore
const user = JSON.parse(localStorage.getItem('user'));

// Types
export interface UserData {
	firstName?: string;
	lastName?: string;
	email: string;
	password: string;
	password2?: string;
}

export interface Transaction {
	id: number;
	text: string;
	amount: number;
	category: string;
	userId: number;
}

export interface GlobalContextType {
	user: { userId: string; email: string; assess_token: string };
	isAuthError: boolean;
	isAuthSuccess: boolean;
	isAuthLoading: boolean;
	authMessage: string | null;

	signup: (userData: UserData) => void;
	login: (userData: UserData) => void;
	logout: () => void;
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
};

//// Create context
export const GlobalContext = createContext<GlobalContextType>(initialState);

//// Provider component
export const GlobalProvider = ({ children }: { children: any }) => {
	const [state, dispatch] = useReducer(AppReducer, initialState);

	// NOTE Actions => make calls to the reducer, make changes to initial state

	// Signup user
	async function signup(userData: UserData) {
		dispatch({
			type: 'SIGNUP_LOADING',
		});

		try {
			const response = await axios.post('/auth/signup', userData);

			if (response.data) {
				localStorage.setItem('user', JSON.stringify(response.data));
			}

			dispatch({
				type: 'LOGIN_SUCCESS',
				payload: response.data,
			});
		} catch (err: any) {
			console.log({ err });
			dispatch({
				type: 'SIGNUP_FAILED',
				payload: err.response.data.message,
			});
		}
	}

	// Login user
	async function login(userData: { email: string; password: string }) {
		dispatch({
			type: 'LOGIN_LOADING',
		});

		try {
			const response = await axios.post('/auth/login', userData);

			if (response.data) {
				localStorage.setItem('user', JSON.stringify(response.data));
			}

			dispatch({
				type: 'LOGIN_SUCCESS',
				payload: response.data,
			});
		} catch (err: any) {
			console.log(typeof err, err);
			dispatch({
				type: 'LOGIN_FAILED',
				payload: err.response.data.message,
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
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
