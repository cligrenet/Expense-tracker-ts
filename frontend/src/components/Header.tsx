import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

const Header = () => {
	const { user } = useContext(GlobalContext);

	return <h2 className="font-sans text-2xl my-5 text-purple">Hello {user.firstName ? user.firstName : ''} !</h2>;
};

export default Header;
