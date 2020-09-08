import React from 'react';

const Like = (props) => {
    console.log(props.liked);
    const classes = props.liked===true ? "fa fa-heart" : "fa fa-heart-o";
    return <i onClick={props.onClick} className={classes} aria-hidden="true"/>;
}
 
export default Like;
