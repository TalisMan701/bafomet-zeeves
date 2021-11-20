import React from 'react';
import classes from './Footer.module.css'

const Footer = (props) => {
	return (
		<footer className={classes.footer}>
			<div className={classes.text}>By Bafomet</div>
			<img src="https://wellbe.s3.amazonaws.com/media/image_9.png" alt="" className={classes.img}/>
		</footer>
	);
};

export default Footer;
