import axios from 'axios';
import React, { useState } from 'react';
import './App.css';
import 'antd/dist/antd.min.css';

import Home from './components/Home';
import LoginForm from './components/pages/login/loginForm';

axios.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response.status === 401) {
			console.log('intercepted 401');
		}
	},
);
function App() {
	const [isLoggedin, setIsLoggedin] = useState(false);
	const [signupFlag, setSignupFlag] = useState(false);
	return (

  <div className="App">
    {isLoggedin
    	? <Home isLoggedin />
    	: (
      <LoginForm
        setLoginFunc={setIsLoggedin}
        signupFlag={signupFlag}
        setSignupFlag={setSignupFlag}
      />
    	) }

  </div>

	);
}

export default App;
