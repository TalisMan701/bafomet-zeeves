import React from 'react';
import classes from './LoadingCreateNFT.module.css'
const LoadingCreateNft = (props) => {
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
			<img src="https://wellbe.s3.amazonaws.com/media/chatbot.svg" alt="" className={classes.img}/>
		</>
	);
};

export default LoadingCreateNft;
