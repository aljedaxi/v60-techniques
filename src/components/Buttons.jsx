import {Button} from "@material-ui/core";
import React from "react";
import {Link} from "react-router-dom";

export const buttonStyle = {
  color: 'black',
  textDecoration: 'none',
  fontFamily: 'Lotion',
  background: 'white',
  width: 'max-content',
  margin: 10,
  display: 'grid',
  placeItems: 'center'
};

const Common = Squish => props => {
  const {to, children} = props;
  const style = Object.assign({}, buttonStyle, props.style);
  return (
    <div style={style}>
      <Squish href={to} style={{textDecoration: 'none'}}>
        <Button style={{fontFamily: 'Lotion'}}> {children} </Button>
      </Squish>
    </div>
  );
}

export const ButtonA = Common ('a');

export const ButtonLink = Common (Link);
