import React, { useState } from 'react';
import './App.css';
import 'antd/dist/antd.min.css';

import Home from './components/Home';
import LoginForm from './components/pages/login/loginForm';

function App() {
	const [isLoggedin, setIsLoggedin] = useState(false);

	return (

  <div className="App">
    {isLoggedin ? <Home isLoggedin /> : <LoginForm setLoginFunc={setIsLoggedin} /> }

  </div>

	);
}

export default App;
