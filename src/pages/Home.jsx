import React from 'react';
import { ButtonLink } from './Steps';
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
			<a href={to}>
				<Button> {children} </Button>
			</a>
		</div>
	);
};

export const Home = props => {
	const vid = "https://www.youtube.com/watch?v=AI4ynXzkSQo";
	return (
		<div style={containerStyle}>
			<ButtonA style={{width: 'auto'}} to={vid}>
				original video
			</ButtonA>
			<ButtonLink to='/settings'>choose settings</ButtonLink>
			<ButtonLink to='/step?step=1'>accept defaults</ButtonLink>
		</div>
	);
};
