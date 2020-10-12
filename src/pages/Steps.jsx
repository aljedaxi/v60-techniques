import React from 'react';
import {useStopwatch} from 'react-timer-hook';
import {Button} from '@material-ui/core';
import {
	useLocation, Link, Redirect
} from 'react-router-dom';
import querySearch from 'stringquery';
import {stepDescriptions} from '../v60';
import {Layout} from '../App';

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
	return {water: parseInt(water), step: parseInt(step) || 1, roast};
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

const containerStyle = {
	display: 'flex',
	flexFlow: 'row wrap',
	alignContent: 'space-evenly',
	alignItems: 'center',
	justifyContent: 'space-evenly',
	width: '100%'
};
export const Step = props => {
	const {seconds, pause, start, isRunning} = useStopwatch();
	const {step,water,roast} = useSearch();
	const nextUrl = `/step?step=${step+1}&water=${water}&roast=${roast}`;
	const lastUrl = `/step?step=${step-1}&water=${water}&roast=${roast}`;
	const currentDesc = getStep(step)(water)(roast);
	const handleClickTimer = _ => {
		if (isRunning) pause();
		start();
	};
	if (!currentDesc) return <Redirect to='/done'/>;
	return (
		<Layout next={nextUrl} from={lastUrl}>
			<div style={containerStyle}>
				<div style={{width: '60%', height: '100%', display: 'grid', placeItems: 'center'}}>
					<div style={{maxWidth: '90%'}}>
						{currentDesc}
					</div>
					<div style={buttonStyle}>
						<Button onClick={handleClickTimer}>
							{isRunning || seconds ? seconds : 'start timer'}
						</Button>
					</div>
				</div>
			</div>
		</Layout>
	);
};
