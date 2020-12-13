import * as React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route, 
	Link,
} from 'react-router-dom';
import './App.css';
import {Home} from './pages/Home';
import {Step} from './pages/Steps';
import {Done} from './pages/Done';
import {useOrientation} from './hooks';

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

const Basic = ({children}) =>
		<div style={pageStyle}>
			<main style={mainStyle}>
				{children}
			</main>
		</div>

const urlStyle =  {fontSize: 'xx-large', color: 'black', textDecoration: 'none',}
const portraitArrows = {
	display: 'flex',
	height: '100%',
	flexDirection: 'column',
	alignItems: 'center',
};
const landscapeArrows = {
	display: 'flex',
	height: '100%',
	flexDirection: 'row',
	alignItems: 'center',
};
export const Layout = ({children, next, from}) => {
	const {portrait} = useOrientation();
	const showArrows = next && from;
	const containerStyle = portrait ? portraitArrows        : landscapeArrows;
	const fromStyle      = portrait ? {marginTop: '10%'}    : {marginLeft: '10%'};
	const nextStyle      = portrait ? {marginBottom: '10%'} : {marginRight: '10%'};
	return showArrows
		? (
			<div style={containerStyle}>
				<Link style={{...urlStyle, ...fromStyle}} to={from}>
					&lt;=
				</Link>
				<Basic>{children}</Basic>
				<Link style={{...urlStyle, ...nextStyle}} to={next}>
					=&gt;
				</Link>
			</div>
		)
		: <Basic>{children}</Basic>;
}

function App() {
  return (
		<Router>
			<Switch>
				<Route path='/step'>
					<Step/>
				</Route>
				<Route path='/done'>
					<Layout>
						<Done/>
					</Layout>
				</Route>
				<Route path='/'>
					<Layout>
						<Home/>
					</Layout>
				</Route>
			</Switch>
		</Router>
  );
}

export default App;
