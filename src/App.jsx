import React from 'react';
import {Index} from './pages/Index';
import './App.css';

const pageStyle = {
	display: 'grid',
	placeItems: 'center',
	height: '100%',
	width: '100%',
};

function App() {
  return (
    <div style={pageStyle}>
			<Index/>
    </div>
  );
}

export default App;
