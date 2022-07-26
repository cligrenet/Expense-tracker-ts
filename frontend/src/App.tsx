import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Home from './pages/Home';
import Income from './pages/Income';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/income" element={<Income />} />
					<Route path="/expense" element={<Income />} />
					<Route path="/auth/login" element={<Login />} />
					<Route path="/auth/signup" element={<Signup />} />
				</Routes>
			</Router>
			<ToastContainer newestOnTop />
		</>
	);
}

export default App;
