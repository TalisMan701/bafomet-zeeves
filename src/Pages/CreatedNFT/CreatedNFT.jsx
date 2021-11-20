import React from 'react';
import classes from './CreatedNFT.module.css'
import LoadingCreateNft from "../LoadingCreateNFT/LoadingCreateNFT";
const CreatedNft = (props) => {
	return (
		<main className={classes.main}>
			<div className={classes.container}>
				<div className={classes.card}>
					{props.fetchCreateNFT ?
						<LoadingCreateNft walletInfo={props.walletInfo} setShowConfirmWallet={props.setShowConfirmWallet}/>:
						<>
							<div className={classes.title}>We create some for you</div>
							<div className={classes.desc}>Your request: Wild animals</div>
							<div className={classes.items}>
								<div className={classes.item}>
									<img src="https://wellbe.s3.amazonaws.com/media/telegram-cloud-photo-size-2-5244491824373020085-y_1.jpg" alt="" className={classes.itemImg}/>
									<div className={classes.itemBtns}>
										<div className={classes.itemBtnLike}>
											<i className="pi pi-heart"/>
										</div>
										<div className={classes.itemBtnMint}>Mint NFT</div>
									</div>
								</div>
								<div className={classes.item}>
									<img src="https://wellbe.s3.amazonaws.com/media/telegram-cloud-photo-size-2-5244491824373020085-y_1.jpg" alt="" className={classes.itemImg}/>
									<div className={classes.itemBtns}>
										<div className={classes.itemBtnLike}>
											<i className="pi pi-heart"/>
										</div>
										<div className={classes.itemBtnMint}>Mint NFT</div>
									</div>
								</div>
								<div className={classes.item}>
									<img src="https://wellbe.s3.amazonaws.com/media/telegram-cloud-photo-size-2-5244491824373020085-y_1.jpg" alt="" className={classes.itemImg}/>
									<div className={classes.itemBtns}>
										<div className={classes.itemBtnLike}>
											<i className="pi pi-heart"/>
										</div>
										<div className={classes.itemBtnMint}>Mint NFT</div>
									</div>
								</div>
							</div>
							<div className={classes.text}>If you don’t like this puctures, try again or change request</div>
							<div className={classes.btns}>
								<div className={classes.btnTry}>Try again</div>
								<div className={classes.btnChange}>Change request</div>
							</div>
						</>
					}

				</div>
				<img src="https://wellbe.s3.amazonaws.com/media/Ellipse_1.svg" alt="" className={classes.backEllipse1}/>
				<img src="https://wellbe.s3.amazonaws.com/media/Ellipse_2.svg" alt="" className={classes.backEllipse2}/>
			</div>
		</main>
	);
};

export default CreatedNft;
