import React from "react";
import {Link} from "react-router-dom";

const commonStyle = {
	padding: 10,
	fontSize: '1em',
	borderStyle: 'none',
  width: 'max-content',
  margin: 10,
  display: 'grid',
  placeItems: 'center',
  textDecoration: 'none',
  fontFamily: 'Lotion',
};

export const invertedButtonStyle = {
  color: 'white',
  background: 'black',
	...commonStyle,
};

export const buttonStyle = {
  color: 'black',
  background: 'white',
	...commonStyle,
};

const extras = {
	textTransform: 'uppercase',
};

export const Button = ({style, children, ...rest}) => 
	<button style={Object.assign({}, commonStyle, extras, style)} {...rest}>{children}</button>;

const Common = Squish => props => {
  const {to, children} = props;
  return (
		<Squish to={to} href={to} style={{textDecoration: 'none'}}>
			<Button style={{fontFamily: 'Lotion'}}> {children} </Button>
		</Squish>
  );
};

export const ButtonA = Common ('a');

export const ButtonLink = Common (Link);
