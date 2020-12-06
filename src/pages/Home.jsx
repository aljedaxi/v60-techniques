import React, {useState} from 'react';
import {getUrls} from './Steps';
import {useRatio} from '../hooks';
import {ButtonA, ButtonLink, buttonStyle} from "../components/Buttons";
import {InputGrams} from './Settings';

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

const setty = s => e => s(e.target.value);
export const Eldric = props => {
	const {coffeeToWater} = useRatio({water: 11, coffee: 1});
	const [coffee, setCoffee] = useState(23);
	const style = Object.assign({}, buttonStyle, {display: 'flex', flexDirection: 'row', padding: 10}, );
	const {nextUrl} = getUrls (0) ({coffee, water: coffeeToWater(coffee)});
	return (
		<div>
			<div style={style}>
				using&nbsp;
				<InputGrams style={{width: '3.5rem', fontFamily: 'Lotion'}} onChange={setty(setCoffee)} value={coffee}/>
				&nbsp;of coffee
			</div>
			<ButtonLink to={nextUrl}>begin</ButtonLink>
		</div>
	)
};

const homes = {
	Hoffmann, Eldric
};

export const Home = homes[process.env.REACT_APP_TECHNIQUE];
