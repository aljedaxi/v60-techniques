import React, {useState} from 'react';
import {useHotkeys} from 'react-hotkeys-hook';
import {Redirect, useHistory} from 'react-router-dom';
import {stepVarieties} from '../v60';
import {Layout} from '../App';
import {useSearch, useSeconds} from '../hooks';
import {Button} from '../components/Buttons';
import {compose, even} from 'sanctuary';

const getStep = n => props => {
	const maybeDesc = stepVarieties[process.env.REACT_APP_TECHNIQUE][n - 1];
	return typeof maybeDesc === 'function' ? maybeDesc (props) : maybeDesc;
};

const containerStyle = {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	width: '100%'
};

export const getUrls = step => props => {
	const stepN = parseInt(step);
	const queryString = Object.entries(props).reduce((acc, [k,v]) => `${acc}&${k}=${v}`, '');
	return {
		nextUrl: `/step?step=${stepN+1}${queryString}`,
		lastUrl: `/step?step=${stepN-1}${queryString}`,
	}
};

const showTimer = process.env.REACT_APP_TECHNIQUE !== 'Eldric';

const shouldAlert = alertAt => current =>
	(alertAt?.step === current.step) && (alertAt?.seconds < current.seconds);

const replace = what => replacement => s => s.replace(what, replacement);
const parseUrlJson = compose (JSON.parse) (replace (/%22/g) ('"'));

const Timer = props => {
	const {alertAt, step} = useSearch();
	const alertData = alertAt ? parseUrlJson(alertAt) : undefined;
	const {seconds, pause, start, isRunning, rawSeconds, minutes} = useSeconds();
	const time =
		(alertData?.seconds > 60 && minutes) ? `${minutes}:${rawSeconds}` : seconds;
	const alerting = shouldAlert (alertData) ({step: parseInt(step), seconds});
	const handleClickTimer = isRunning ? pause : start;
	const text = 
		  alerting               ? 'times up!'
		: (isRunning || seconds) ? time 
		: /*        else        */ 'start timer'
	const style = alerting && even(seconds) ? {color: 'white', background: 'black'} : {};
	return (
		<Button style={style} onClick={handleClickTimer} >
			{text}
		</Button>
	);
};

export const Step = props => {
	const {step, ...rest} = useSearch();
	const history = useHistory();
	const [blooming, setBlooming] = useState(false);
	const {nextUrl, lastUrl} = getUrls (step) (rest);
	console.log('nextUrl', nextUrl);
	const beginBlooming = _ => setBlooming(true);
	const currentDesc = getStep (step) (rest);
	const navigateNext = _ => history.push(nextUrl);
	const backUp = _ => history.push(lastUrl);

	useHotkeys('right', navigateNext, {}, [nextUrl]);
	useHotkeys('left', backUp, {}, [lastUrl]);

	if (step === '0') return <Redirect to='/'/>;
	if (!currentDesc) return <Redirect to='/done'/>;
	return (
		<Layout next={nextUrl} from={lastUrl}>
			{blooming ? <iframe style={{position: 'fixed', left: 69, top: 69}} src="https://www.youtube.com/embed/IxBQ8Er8DYc" frameBorder="0" allow="autoplay" title='bloom'/> : null}
			<div style={containerStyle}>
				<div style={{width: '60%', height: '100%', display: 'grid', placeItems: 'center'}}>
					<div style={{maxWidth: '90%'}}>
						{currentDesc.split(' ').flatMap(s => s === 'bloom' ? [<span onClick={beginBlooming}>bloom</span>, ' '] : [s, ' '])}
					</div>
				</div>
				{showTimer && <Timer/>}
			</div>
		</Layout>
	);
};

export const steps = new Proxy({}, {get: () => Step});
