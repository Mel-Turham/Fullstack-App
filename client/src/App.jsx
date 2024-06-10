import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import Home from './Pages/Home';
import ErrorPage from './Pages/ErrorPage';

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='*' element={<ErrorPage />} />
			</Routes>
		</BrowserRouter>
	);
};
export default App;
