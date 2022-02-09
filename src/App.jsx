import React from 'react';
import './App.css';
import 'antd/dist/antd.css';

// import {
// 	Routes,
// 	Route,
// } from 'react-router-dom';
import Sidebar from './components/Sidebar';

function App() {
	return (

  <div className="App">
    <Sidebar />
    {/* <Routes>
      <Route path="/" element={<Sidebar />}>
        <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </Routes> */}

  </div>

	);
}

export default App;
