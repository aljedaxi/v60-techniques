import React from 'react';
import {ButtonA, ButtonLink} from "../components/Buttons";

const textStyle = {
	margin: 10,
};

const buttonStyle = {
	display: 'grid', placeItems: 'center'
};

export const links = props => {
	const {base} = props;
	const home = `${base}/`;
	const done = `${base}/done`;
	return {
		restart: home,
		home,
		done,
	};
};

const Common = props => {
	const {children, text} = props;
	return (
		<div>
			<div style={textStyle}>
				{text}
			</div>
			<div style={buttonStyle}>
				{children}
			</div>
		</div>
	);
}

const Hoffmann = props => {
	const {restart} = links(props);
  return (
  	<Common
			text={
				<div>
					is your coffee too acidic? try to fine up your grind
					<br/>
					too bitter? coarsen up a bit
				</div>
			}
		>
			<ButtonLink to={restart}>
				restart
			</ButtonLink>
			<ButtonA to='https://github.com/aljedaxi/hoffmann-v60/issues'>
				suggestions
			</ButtonA>
			<ButtonA to='https://www.youtube.com/channel/UCMb0O2CdPBNi-QqPk5T3gsQ'>
				more hoffmann
			</ButtonA>

		</Common>
	)
};

const Eldric = props => {
	const {restart} = links(props);
	return (
		<Common
			text={
				<div>
					you'll want to adjust your grind size such that the total brew time is about 2:30-3:30
				</div>
			}
		>
			<ButtonLink to={restart}>
				restart
			</ButtonLink>
			<ButtonA to='https://github.com/aljedaxi/hoffmann-v60/issues'>
				suggestions
			</ButtonA>
		</Common>
	)
};

export const dones = {
	Hoffmann, Eldric, FrenchPress: Hoffmann
};
