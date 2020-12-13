import {Button} from "@material-ui/core";
import React from "react";
import {Link} from "react-router-dom";

const commonStyle = {
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

const Common = Squish => props => {
  const {to, children} = props;
  const style = Object.assign({}, buttonStyle, props.style);
  return (
    <div style={style}>
      <Squish to={to} href={to} style={{textDecoration: 'none'}}>
        <Button style={{fontFamily: 'Lotion'}}> {children} </Button>
      </Squish>
    </div>
  );
};

export const ButtonA = Common ('a');

export const ButtonLink = Common (Link);
