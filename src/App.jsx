import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route, 
} from 'react-router-dom';
import './App.css';
import {Home} from './pages/Home';
import {Rules} from './pages/Settings';
import {Step} from './pages/Steps';
import {Done} from './pages/Done';

const mainStyle = {
	background: 'black',
	color: 'white',
	width: '50%',
	height: '50%',
	display: 'grid',
	placeItems: 'center',
};

const pageStyle = {
	display: 'grid',
	placeItems: 'center',
	height: '100%',
	width: '100%',
};

function App() {
  return (
    <div style={pageStyle}>
			<Router>
				<main style={mainStyle}>
					<Switch>
						<Route path='/settings'>
							<Rules />
						</Route>
						<Route path='/step'>
							<Step/>
						</Route>
						<Route path='/done'>
							<Done/>
						</Route>
						<Route path='/'>
							<Home/>
						</Route>
					</Switch>
				</main>
			</Router>
    </div>
  );
}

export default App;
