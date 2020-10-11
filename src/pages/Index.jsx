import React, {useState} from 'react';
import {stepDescriptions, waterToCoffee, coffeeToWater} from '../v60';
import {Button, TextField, InputAdornment, Select, MenuItem} from '@material-ui/core';
import {useStopwatch} from 'react-timer-hook';

const mainStyle = {
	background: 'black',
	color: 'white',
	width: '40%',
	height: '40%',
	display: 'grid',
	placeItems: 'center',
};

const InputGrams = ({onChange, onBlur, value}) =>
	<TextField
		onChange={onChange} onBlur={onBlur} value={value}
		InputProps={{endAdornment: <InputAdornment position='end'>g</InputAdornment>}}
	/>

export const Rules = props => {
	const {onDone} = props;
	const childStyle = {flex: '0 1 150px', margin: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'white', color: 'black', padding: 10};
	const parentStyle = {display: 'flex', flexWrap: 'wrap', justifyContent: 'center', width: '100%', height: '90%'};
	const inputStyle = {width: '100%'};
	const [water, setWater] = useState('0');
	const [coffee, setCoffee] = useState(waterToCoffee(props.water ?? water));
	const [roast, setRoast] = useState('light');

	const handleChangeWater = e => setWater(e.target.value);
	const handleChangeCoffee = e => setCoffee(e.target.value);
	const handleChangeRoast = e => setRoast(e.target.value);

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
				<InputGrams value={water} onChange={handleChangeWater} onBlur={handleBlur(true)}/>
			</div>
			<div style={childStyle}>
				coffee
				<InputGrams value={coffee} onChange={handleChangeCoffee} onBlur={handleBlur(false)}/>
				<div style={{height: 20}}/>
				<Button tabIndex={-1} disabled={[0, '0'].includes(water)} onClick={onDone(water)(roast)}>done</Button>
			</div>
			<div style={childStyle}>
				roast
				<Select style={inputStyle} value={roast} onChange={handleChangeRoast}>
					<MenuItem value={'light'}>Light</MenuItem>
					<MenuItem value={'medium'}>Medium</MenuItem>
					<MenuItem value={'dark'}>Dark</MenuItem>
				</Select>
			</div>
		</div>
	);
};

const getStep = n => water => roast => {
	const maybeDesc = stepDescriptions[n - 1];
	try {
		return maybeDesc (water) (roast);
	} catch {
		return maybeDesc;
	}
}

const Step = props => {
	const {desc, onNext: handleNext, } = props;
	const {seconds, pause, start, isRunning} = useStopwatch();
	const buttonStyle = {background: 'white', width: 'fit-content', margin: 10};
	const handleClickTimer = _ => {
		if (isRunning) pause();
		start();
	};
	return (
		<div style={{width: '80%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
			<div style={{height: 50}}>
				{desc}
			</div>
			<div style={{display: 'flex', alignContent: 'space-between'}}>
				<div style={buttonStyle}>
					<Button onClick={handleNext}>next</Button>
				</div>
				<div style={buttonStyle}>
					<Button onClick={handleClickTimer}>
						{isRunning || seconds ? seconds : 'start timer'}
					</Button>
				</div>
			</div>
		</div>
	);
};

export const Index = props => {
	const [stepNumber, setStepNumber] = useState(0);
	const [roast, setRoast] = useState();
	const [water, setWater] = useState();

	const incStep = _ => setStepNumber(stepNumber + 1);

	const handleDone = water => roast => _ => {
		const intWater = parseInt(water);
		if (intWater) {
			setRoast(roast);
			setWater(water);
			incStep();
		} 
	};

	const currentDesc = getStep(stepNumber)(water)(roast);
	const content = 
		stepNumber === 0 ? <Rules onDone={handleDone}/> 
	: stepNumber === stepDescriptions.length + 1 ? <div>done!</div>
		: <Step desc={currentDesc} onNext={incStep}/>
		;

	return (
		<main style={mainStyle}>
			{content}
		</main>
	);
};
