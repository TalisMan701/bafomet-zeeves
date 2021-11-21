import React, {useEffect, useState} from 'react';
import classes from './LoadingCreateNFT.module.css'
const LoadingCreateNft = (props) => {
	const [count, setCount] = useState(0)
	useEffect(()=>{
		const timerId = setInterval(()=>{
			setCount(count + 1)
		}, 3000)
		return ()=> {clearInterval(timerId)}
	})

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
			<object type="image/svg+xml" data={`https://zeeves.wellbe.club/media/chatbotAnim.svg?${count}`} className={classes.img}/>

		</>
	);
};

export default LoadingCreateNft;
