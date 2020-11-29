import React from 'react';
import {ButtonLink, getUrls} from './Steps';
import {Button} from '@material-ui/core';

const containerStyle = {
	display: 'flex', flexDirection: 'column', alignItems: 'center'
};
const buttonStyle = {color: 'black', textDecoration: 'none', background: 'white', width: 'max-content', margin: 10, display: 'grid', placeItems: 'center'};
export const ButtonA = props => {
	const {to, children} = props;
	const style = Object.assign({}, buttonStyle, props.style);
	return (
		<div style={style}>
			<a href={to} style={{textDecoration: 'none'}}>
				<Button> {children} </Button>
			</a>
		</div>
	);
};

export const Hoffmann = props => {
	const vid = "https://www.youtube.com/watch?v=AI4ynXzkSQo";
	const {nextUrl} = getUrls (0) ({water: 300, roast: 'light'});
	return (
		<div style={containerStyle}>
			<ButtonA style={{width: 'auto'}} to={vid}>
				original video
			</ButtonA>
			<ButtonLink to='/settings'>choose settings</ButtonLink>
			<ButtonLink to={nextUrl}>accept defaults</ButtonLink>
		</div>
	);
};

export const Eldric = props => {
	return (
		<div>
			<ButtonLink to='/step?step=1'>begin</ButtonLink>
		</div>
	)
}

const homes = {
	Hoffmann, Eldric
};

export const Home = homes[process.env.REACT_APP_TECHNIQUE];
