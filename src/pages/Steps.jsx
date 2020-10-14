import React from 'react';
import {Button} from '@material-ui/core';
import {
	Link, Redirect
} from 'react-router-dom';
import {stepDescriptions} from '../v60';
import {Layout} from '../App';
import {useSeconds, useSearch} from '../hooks';

const getStep = n => water => roast => {
	const maybeDesc = stepDescriptions[n - 1];
	try {
		return maybeDesc (water) (roast);
	} catch {
		return maybeDesc;
	}
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
	const {seconds, pause, start, isRunning} = useSeconds();
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
