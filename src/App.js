import { BrowserRouter as  Router, Route, Routes  } from "react-router-dom"
import './App.css';
import  SignUp   from './components/Signup';
import  Login  from './components/Login';
import { Mainpage } from './components/Mainpage';
// import { Error } from './Error';
import { useState } from 'react';




function App() {
	const [ user, setLoginUser] = useState({})
	return (
		<>
		{console.log(user)}
			
				<Routes>
						<Route exact path="/" element={ user && user.email ? <Mainpage /> : <Login setLoginUser={setLoginUser} />} />
						<Route path="/pyelogin" element={ user && user.email  ? <Mainpage /> : <Login setLoginUser={setLoginUser} />} />
						<Route path="/login" element={<Login setLoginUser={setLoginUser} />}  />
						<Route path="/signup" element={<SignUp />} />
					
				</Routes>
			

		</>
	);
}

export default App;
