import React, {useState} from 'react';
import {Button} from '@material-ui/core';
import {Redirect} from 'react-router-dom';
import {stepVarieties} from '../v60';
import {Layout} from '../App';
import {useSearch, useSeconds} from '../hooks';
import {buttonStyle} from "../components/Buttons";

const getStep = n => props => {
	const maybeDesc = stepVarieties[process.env.REACT_APP_TECHNIQUE][n - 1];
	try {
		return maybeDesc (props);
	} catch {
		return maybeDesc;
	}
};

const containerStyle = {
	display: 'flex',
	flexFlow: 'row wrap',
	alignContent: 'space-evenly',
	alignItems: 'center',
	justifyContent: 'space-evenly',
	width: '100%'
};

export const getUrls = step => props => {
	const queryString = Object.entries(props).reduce((acc, [k,v]) => `${acc}&${k}=${v}`, '');
	return {
		nextUrl: `/step?step=${step+1}${queryString}`,
		lastUrl: `/step?step=${step-1}${queryString}`,
	}
};

const showTimer = process.env.REACT_APP_TECHNIQUE !== 'Eldric';

const Timer = props => {
	const {seconds, pause, start, isRunning} = useSeconds();
	const handleClickTimer = _ => {
		if (isRunning) pause();
		start();
	};
	return (
		<div style={buttonStyle}>
			<Button onClick={handleClickTimer}>
				{isRunning || seconds ? seconds : 'start timer'}
			</Button>
		</div>
	);
};

export const Step = props => {
	const {step, ...rest} = useSearch();
	const [blooming, setBlooming] = useState(false);
	const {nextUrl, lastUrl} = getUrls (step) (rest);
	const beginBlooming = _ => setBlooming(true);
	const currentDesc = getStep (step) (rest);
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
