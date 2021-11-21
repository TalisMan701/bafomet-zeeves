import React, {useEffect, useState} from 'react';
import classes from './LoadingCreateNFT.module.css'
import {ProgressBar} from "primereact/progressbar";
const LoadingCreateNft = (props) => {
	/*const [count, setCount] = useState(0)
	const [timeLoad, setTimeLoad] = useState(0)
	useEffect(()=>{
		const timerId = setInterval(()=>{
			setCount(count + 1)
			setTimeLoad(timerId + 0.83)
		}, 2500)
		return ()=> {clearInterval(timerId)}
	})*/

	return (
		<>
			<div className={classes.title}>We are working on your <br/> request</div>
			{!props.walletInfo &&
				<>
					<div className={classes.desc}>While waiting you can connect your wallet <br/> to mint NFT</div>
					<div
						className={classes.btn}
						onClick={()=>{props.setShowConfirmWallet(true)}}
					>Connect wallet</div>
				</>
			}
			{/*<ProgressBar value={timeLoad} style={{width: "100%"}}/>*/}
			<object type="image/svg+xml" data='http://zeeves.wellbe.club/media/chatbot_2.svg' className={classes.img}/>

		</>
	);
};

export default LoadingCreateNft;
