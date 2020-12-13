import React from 'react';
import {ButtonA, ButtonLink} from "../components/Buttons";

const textStyle = {
	margin: 10,
};

const buttonStyle = {
	display: 'grid', placeItems: 'center'
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
			<ButtonLink to='/'>
				restart
			</ButtonLink>
			<ButtonA to='https://github.com/aljedaxi/hoffmann-v60/issues'>
				suggest improvements
			</ButtonA>
			<ButtonA to='https://www.youtube.com/channel/UCMb0O2CdPBNi-QqPk5T3gsQ'>
				more hoffmann
			</ButtonA>

		</Common>
	)
};

const Eldric = props => {
	return (
		<Common
			text={
				<div>
					you'll want to adjust your grind size such that the total brew time is about 2:30-3:30
				</div>
			}
		>
			<ButtonLink to='/'>
				restart
			</ButtonLink>
			<ButtonA to='https://github.com/aljedaxi/hoffmann-v60/issues'>
				suggest improvements
			</ButtonA>
		</Common>
	)
};

const pages = {
	Hoffmann, Eldric, FrenchPress: Hoffmann
};

export const Done = pages[process.env.REACT_APP_TECHNIQUE];
