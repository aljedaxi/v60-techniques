import React, {useState} from 'react';
import {waterToCoffee, coffeeToWater} from '../v60';
import {Button, TextField, InputAdornment, Select, MenuItem} from '@material-ui/core';
import { Link
} from 'react-router-dom';

const InputGrams = ({onChange, onBlur, value}) =>
	<TextField
		onChange={onChange} onBlur={onBlur} value={value}
		InputProps={{endAdornment: <InputAdornment position='end'>g</InputAdornment>}}
	/>

export const Rules = props => {
	const childStyle = {flex: '0 1 150px', margin: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'white', color: 'black', padding: 10};
	const parentStyle = {display: 'flex', flexWrap: 'wrap', justifyContent: 'center', width: '100%', height: '90%'};
	const inputStyle = {width: '100%'};
	const [water, setWater] = useState('0');
	const [coffee, setCoffee] = useState(waterToCoffee(props.water ?? water));
	const [roast, setRoast] = useState('light');

	const setty = s => e => s(e.target.value);

	const handleBlur = isWater => _ => {
		if(isWater) {
			setCoffee(waterToCoffee(water));
		} 
		setWater(coffeeToWater(coffee));
	};

	return (
		<div style={parentStyle}>
			<div style={childStyle}>
				water
				<InputGrams value={water} onChange={setty(setWater)} onBlur={handleBlur(true)}/>
			</div>
			<div style={childStyle}>
				coffee
				<InputGrams value={coffee} onChange={setty(setCoffee)} onBlur={handleBlur(false)}/>
				<div style={{height: 20}}/>
				<Link to={`/step?step=1&water=${water}&roast=${roast}`}>
					<Button tabIndex={-1} disabled={[0, '0'].includes(water)}>done</Button>
				</Link>
			</div>
			<div style={childStyle}>
				roast
				<Select style={inputStyle} value={roast} onChange={setty(setRoast)}>
					<MenuItem value={'light'}>Light</MenuItem>
					<MenuItem value={'medium'}>Medium</MenuItem>
					<MenuItem value={'dark'}>Dark</MenuItem>
				</Select>
			</div>
		</div>
	);
};
