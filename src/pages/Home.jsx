import React from 'react';
import {getUrls} from './Steps';
import {ButtonA, ButtonLink} from "../components/Buttons";

const containerStyle = {
	display: 'grid', placeItems: 'center'
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
};

const homes = {
	Hoffmann, Eldric
};

export const Home = homes[process.env.REACT_APP_TECHNIQUE];
