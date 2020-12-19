import * as React from 'react';
import {map, fst, filter, pairs} from 'sanctuary';
import {
	BrowserRouter as Router,
	Switch,
	Route, 
	Link,
} from 'react-router-dom';
import {homes} from './pages/Home';
import {steps} from './pages/Steps';
import {dones} from './pages/Done';
import {useOrientation} from './hooks';
import {meta} from './meta';
import {ButtonLink} from './components/Buttons';

const {REACT_APP_TECHNIQUE: TECHNIQUE} = process.env;
const techniqueNames = map (fst) (pairs (meta));

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

const fuck = t => 
	<ButtonLink key={`${t}-link`} to={`/${t}`}>{t}</ButtonLink>;
const Meta = _ => (
	<Layout>
		{
			map (fuck) (filter (t => t !== 'Index') (techniqueNames))
		}
	</Layout>
)

const convertIndexBack = s => s === '/' ? 'Index' : s;
const AppProper = ({technique, base}) => {
	document.title = meta[convertIndexBack(technique)]?.title ?? 'coffee time';
	if (technique === '/') return <Meta/>;
	const Home = homes[technique];
	const Done = dones[technique];
	const Step = steps[technique];
  return (
		<>
			<Route path={`${base}/step`}>
				<Step technique={technique} base={base}/>
			</Route>
			<Route path={`${base}/done`}>
				<Layout>
					<Done base={base}/>
				</Layout>
			</Route>
			<Route path={`${base}/`}>
				<Layout>
					<Home base={base}/>
				</Layout>
			</Route>
		</>
  );
}

const epic = t => <Route key={`${t}-route`} path={`/${t}`}><AppProper technique={t} base={`/${t}`}/></Route>;
const Index = props => {
	const techne = techniqueNames.map(t => t === 'Index' ? '/' : t);
	return (
		<Router>
			<Switch>
				{map (epic) (techne)}
			</Switch>
		</Router>
	);
};

const App = () => TECHNIQUE === 'Index' 
	? <Index />
	: <Router>
			<Switch>
				<AppProper technique={TECHNIQUE} base={''}/>
			</Switch>
		</Router>

export default App;
