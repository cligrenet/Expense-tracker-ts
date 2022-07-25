/* eslint-disable */
export default (state: any, action: any) => {
	switch (action.type) {
		// case 'SIGNUP_SUCCESS':
		// 	return {
		// 		...state,
		// 		isAuthSuccess: true,
		// 		isAuthLoading: false,
		// 		user: action.payload,
		// 	};
		case 'SIGNUP_FAILED':
			return {
				...state,
				isAuthError: true,
				isAuthLoading: false,
				user: null,
				authMessage: action.payload,
			};
		case 'SIGNUP_LOADING':
			return {
				...state,
				isAuthLoading: true,
			};
		case 'LOGIN_SUCCESS':
			return {
				...state,
				isAuthSuccess: true,
				isAuthLoading: false,
				user: action.payload,
			};
		case 'LOGIN_FAILED':
			return {
				...state,
				isAuthError: true,
				isAuthLoading: false,
				user: null,
				authMessage: action.payload,
			};
		case 'LOGIN_LOADING':
			return {
				...state,
				isAuthLoading: true,
			};
		case 'LOGOUT_SUCCESS':
			return {
				user: null,
			};
		default:
			throw new Error('Unknown action ' + action.type);
	}
};
