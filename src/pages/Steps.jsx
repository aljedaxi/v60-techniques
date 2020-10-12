import React from 'react';
import {useStopwatch} from 'react-timer-hook';
import {Button} from '@material-ui/core';
import {
	useLocation, Link, Redirect
} from 'react-router-dom';
import querySearch from 'stringquery';
import {stepDescriptions} from '../v60';

const getStep = n => water => roast => {
	const maybeDesc = stepDescriptions[n - 1];
	try {
		return maybeDesc (water) (roast);
	} catch {
		return maybeDesc;
	}
}

const useSearch = _ => {
	const {search} = useLocation();
	const searchData = querySearch(search);
	const {
		water = '300', 
		step = '1', 
		roast = 'medium'
	} = searchData;
	return {water: parseInt(water), step: parseInt(step), roast};
};

const buttonStyle = {color: 'black', textDecoration: 'none', background: 'white', width: 'max-content', margin: 10, display: 'grid', placeItems: 'center'};
export const ButtonLink = props => {
	const {to, children} = props;
	const style = Object.assign({}, buttonStyle, props.style);
	return (
		<div style={style}>
			<Link to={to}>
				<Button> {children} </Button>
			</Link>
		</div>
	);
};

export const Step = props => {
	const {seconds, pause, start, isRunning} = useStopwatch();
	const {step,water,roast} = useSearch();
	const nextUrl = `/step?step=${step+1}&water=${water}&roast=${roast}`;
	const currentDesc = getStep(step)(water)(roast);
	const handleClickTimer = _ => {
		if (isRunning) pause();
		start();
	};
	if (!currentDesc) {
		return <Redirect to='/done'/>;
	}
	return (
		<div style={{width: '80%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
			<div style={{height: '100%'}}>
				{currentDesc}
			</div>
			<div style={{display: 'flex', alignContent: 'space-between'}}>
				<ButtonLink to={nextUrl}>next</ButtonLink>
				<div style={buttonStyle}>
					<Button onClick={handleClickTimer}>
						{isRunning || seconds ? seconds : 'start timer'}
					</Button>
				</div>
			</div>
		</div>
	);
};
