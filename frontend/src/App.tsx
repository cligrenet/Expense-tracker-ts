import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Home from './pages/Home';
import Income from './pages/Income';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PrivateRoute from './components/PrivateRoute';

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<PrivateRoute />}>
						<Route path="/" element={<Home />} />
					</Route>
					<Route path="/" element={<PrivateRoute />}>
						<Route path="/income" element={<Income />} />
					</Route>
					<Route path="/" element={<PrivateRoute />}>
						<Route path="/expense" element={<Income />} />
					</Route>

					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
				</Routes>
			</Router>
			<ToastContainer newestOnTop />
		</>
	);
}

export default App;
