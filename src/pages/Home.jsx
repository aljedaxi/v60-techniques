import React, {useState} from 'react';
import {getUrls} from './Steps';
import {useRatio} from '../hooks';
import {ButtonA, ButtonLink, buttonStyle} from "../components/Buttons";

const containerStyle = {
	display: 'grid', placeItems: 'center'
};

export const InputGrams = ({style, ...rest}) => 
	<div>
		<input style={{borderStyle: 'none', fontFamily: 'Lotion', fontSize: '1em', ...style}} type='number' {...rest}/> g
	</div>;

const Box = ({children, style, ...rest}) => 
	 <div style={Object.assign({}, buttonStyle, style)} {...rest}>
		 {children}
	</div>;

export const Settings = props => {
	const {coffeeToWater, waterToCoffee, coffee, setCoffee} = props;
	const style = Object.assign({}, buttonStyle, {display: 'flex', flexDirection: 'row', padding: 10}, );
	return (
		<div style={style}>
			using&nbsp;
			<InputGrams style={{width: '2.5rem'}} onChange={setty(setCoffee)} value={coffee}/>
			&nbsp;of coffee
		</div>
	);
};

const ShowWater = ({water}) =>
	<Box>
		&nbsp;{water.toString().length < 3 ? ' ' : ''}getting {water}g of water&nbsp;
	</Box>

export const Hoffmann = props => {
	const {waterToCoffee, coffeeToWater} = useRatio({water: 50, coffee: 3});
	const [coffee, setCoffee] = useState(30);
	const water = coffeeToWater(coffee);
	const vid = "https://www.youtube.com/watch?v=AI4ynXzkSQo";
	const {nextUrl} = getUrls (0) ({coffee, roast: 'light', water});
	return (
		<div style={containerStyle}>
			<ButtonA to={vid}>
				original video
			</ButtonA>
			<Settings {...{coffeeToWater, waterToCoffee, coffee, setCoffee}}/>
			<ShowWater water={water}/>
			<ButtonLink to={nextUrl}>begin</ButtonLink>
		</div>
	);
};

const setty = s => e => s(e.target.value);
export const Eldric = props => {
	const {coffeeToWater, waterToCoffee} = useRatio({water: 11, coffee: 1});
	const [coffee, setCoffee] = useState(23);
	const water = coffeeToWater(coffee);
	const {nextUrl} = getUrls (0) ({coffee, water: coffeeToWater(coffee)});
	return (
		<div>
			<Settings {...{coffeeToWater, waterToCoffee, coffee, setCoffee}}/>
			<ShowWater water={water}/>
			<ButtonLink to={nextUrl}>begin</ButtonLink>
		</div>
	)
};

const FrenchPress = props => {
	const {coffeeToWater, waterToCoffee} = useRatio({water: 500, coffee: 30});
	const [coffee, setCoffee] = useState(30);
	const water = coffeeToWater(coffee);
	const vid = 'https://www.youtube.com/watch?v=st571DYYTR8';
	const {nextUrl} = getUrls (0) ({
		coffee, water, 
		alertAt: JSON.stringify({seconds: 60 * 4, step: 4})
	});
	return (
		<div>
			<ButtonA style={{width: 'auto'}} to={vid}>
				original video
			</ButtonA>
			<Settings {...{coffeeToWater, waterToCoffee, coffee, setCoffee}}/>
			<ShowWater water={water}/>
			<ButtonLink to={nextUrl}>begin</ButtonLink>
		</div>
	)
};

const homes = {
	Hoffmann, Eldric, FrenchPress
};

export const Home = homes[process.env.REACT_APP_TECHNIQUE];
