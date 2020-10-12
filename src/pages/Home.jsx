import React from 'react';
import { ButtonLink } from './Steps';

const containerStyle = {
	display: 'flex', flexDirection: 'column', alignItems: 'center'
};
export const Home = props => {
	const vid = "https://www.youtube.com/watch?v=AI4ynXzkSQo";
	return (
		<div style={containerStyle}>
			<ButtonLink style={{width: 'auto'}} to={vid}>
				original video
			</ButtonLink>
			<ButtonLink to='/settings'>choose settings</ButtonLink>
			<ButtonLink to='/step?step=1'>accept defaults</ButtonLink>
		</div>
	);
};
