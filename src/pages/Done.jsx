import React from 'react';
import {ButtonA} from './Home';
import {ButtonLink} from './Steps';

const Hoffmann = props => {
	return (
		<div>
			<div>
				is your coffee too acidic? try to fine up your grind
				<br/>
				too bitter? coarsen up a bit
			</div>
			<ButtonLink to='/'>
				restart
			</ButtonLink>
			<ButtonA to='https://github.com/aljedaxi/hoffmann-v60/issues'>
				suggest improvements
			</ButtonA>
			<ButtonA to='https://www.youtube.com/channel/UCMb0O2CdPBNi-QqPk5T3gsQ'>
				more hoffmann
			</ButtonA>
		</div>
	);
};

const Eldric = props => {
	return (
		<div>
			<div>
				is your coffee too acidic? try to fine up your grind
				<br/>
				too bitter? coarsen up a bit
			</div>
			<ButtonLink to='/'>
				restart
			</ButtonLink>
			<ButtonA to='https://github.com/aljedaxi/hoffmann-v60/issues'>
				suggest improvements
			</ButtonA>
		</div>
	);
};

const pages = {
	Hoffmann, Eldric
};

export const Done = pages[process.env.REACT_APP_TECHNIQUE];
