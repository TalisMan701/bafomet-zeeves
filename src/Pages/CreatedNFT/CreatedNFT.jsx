import React, {useEffect, useState} from 'react';
import classes from './CreatedNFT.module.css'
import LoadingCreateNft from "../LoadingCreateNFT/LoadingCreateNFT";
import {Long, bytes,units, BN} from "@zilliqa-js/util";
import {Link, Redirect} from "react-router-dom";
import {Skeleton} from "primereact/skeleton";
import {Dialog} from "primereact/dialog";
import {backAPI} from "../../api/api";
const CreatedNft = (props) => {
	const [showFetchMint, setShowFetchMint] = useState(false)
	const [linkToTranz, setLinkToTranz] = useState('')
	const [redirectSuccess, setRedirectSuccess] = useState(false)
	const [timerId, setTimerId] = useState(null)
	const [status, setStatus] = useState(0)
	const [imageSel, setImageSel] = useState(null)

	useEffect(()=>{
		if(status === 3){
			backAPI.mintImage(imageSel.id)
			clearInterval(timerId)
			setTimerId(null)
			setRedirectSuccess(true)
		}
	}, [status])

	const contractMint = "zil1xud3vqh66c4uk9ydpzv59cf3hln63prlz6rzfh";

	const myGasPrice = units.toQa('2000', units.Units.Li);

	const createNft = async (url) => {
		setShowFetchMint(true)
		const CHAIN_ID = 1;
		const MSG_VERSION = 1;
		const VER = bytes.pack(CHAIN_ID, MSG_VERSION);
		const address = props.walletInfo?.byte20;
		console.log(props.walletInfo)
		try {
			console.log(props.zeeves)
			const contract = await props.zeeves.contracts.at(contractMint)
			contract.signer.defaultAccount = props.zeeves.wallet.defaultAccount
			console.log(contract)
			const callTx = await contract.call(
				'Mint',
				[
					{
						vname: 'to',
						type: 'ByStr20',
						value: `${address}`,
					},
					{
						vname: 'token_uri',
						type: 'String',
						value: url,
					}
				],
				{
					version: VER,
					amount: new BN(0),
					gasPrice: myGasPrice,
					gasLimit: Long.fromNumber(10000),
				}
			);


			// check the pending status
			console.log(callTx)
			setLinkToTranz(`https://viewblock.io/zilliqa/tx/${callTx.ID}`)
			setTimerId(setInterval(async ()=>{
				const pendingStatus = await props.zeeves.blockchain.getTransactionStatus(callTx.ID);
				console.log(`Pending status is: `);
				console.log(pendingStatus.status);
				setStatus(pendingStatus.status)
			},7000))

			/*console.log(`Pending status is: `);
			console.log(pendingStatus);*/

			// process confirm
			console.log(`The transaction id is:`, callTx.ID);
			console.log(`Waiting transaction be confirmed`);
			const confirmedTxn = await callTx.confirm(callTx.ID);

			console.log(`The transaction status is:`);
			console.log(confirmedTxn.receipt);
		} catch (err) {
			console.log(err);
		}

	}

	if(redirectSuccess){
		return (
			<Redirect to={'/success'}/>
		)
	}

	return (
		<main className={classes.main}>
			<div className={classes.container}>
				<div className={classes.card}>
					{props.fetchCreateNFT ?
						<LoadingCreateNft walletInfo={props.walletInfo} setShowConfirmWallet={props.setShowConfirmWallet}/>:
						<>
							<div className={classes.title}>We create some for you</div>
							<div className={classes.desc}>Your request: {props.helloText}</div>
							<div className={classes.items}>
								{props.images?.map(image=>{
									if(image?.loading){
										return (
											<div className={classes.item}>
												<Skeleton width={334} height={334} borderRadius="36px"/>
												{/*<div className={classes.itemImgLoading}>
													<i className="pi pi-spin pi-spinner" style={{'fontSize': '3em'}}/>
												</div>*/}
												<div className={classes.itemBtns}>
													<Skeleton width={56} height={56}/>
													<Skeleton  width={256} height={56}/>
												</div>
											</div>
										)
									}
									return(
										<div className={classes.item}>
											<img src={image.image_url} alt="" className={classes.itemImg}/>
											<div className={classes.itemBtns}>
												<div className={classes.itemBtnLike}>
													<i className="pi pi-heart"/>
												</div>
												<div
													onClick={()=>{
														if(props.walletInfo){
															setImageSel(image)
															createNft(image.image_url)
														}else{
															props.setShowConfirmWallet(true)
															props.toast.current.show({severity: 'error', summary: 'Mint picture', detail: 'Connect wallet'});
														}

													}}
													className={classes.itemBtnMint}
												>Mint NFT</div>
											</div>
										</div>
									)
								})}

								{/*<div className={classes.item}>
									<img src="https://wellbe.s3.amazonaws.com/media/telegram-cloud-photo-size-2-5244491824373020085-y_1.jpg" alt="" className={classes.itemImg}/>
									<div className={classes.itemBtns}>
										<div className={classes.itemBtnLike}>
											<i className="pi pi-heart"/>
										</div>
										<div className={classes.itemBtnMint}>Mint NFT</div>
									</div>
								</div>*/}
							</div>
							<div className={classes.text}>If you don’t like this puctures, try again or change request</div>
							<div className={classes.btns}>
								{/*<div className={classes.btnTry}>Try again</div>*/}
								<a
									href={linkToTranz}
									target="_blank"
									className={classes.btnChange}
								>Change request</a>
							</div>
						</>
					}

				</div>
				<img src="https://wellbe.s3.amazonaws.com/media/Ellipse_1.svg" alt="" className={classes.backEllipse1}/>
				<img src="https://wellbe.s3.amazonaws.com/media/Ellipse_2.svg" alt="" className={classes.backEllipse2}/>
			</div>
			<Dialog
				visible={showFetchMint}
				onHide={() => setShowFetchMint(false)}
				className={classes.dialog}
				showHeader={false}
			>
				<i className="pi pi-spin pi-spinner" style={{'fontSize': '5em', color: "#2CF8BC"}}/>
				<div className={classes.dialogTitle}>Waiting</div>
				<div className={classes.dialogDesc}>Mint your Picture</div>
				<Link to={linkToTranz} className={classes.dialogLink}>Transaction</Link>
			</Dialog>
		</main>
	);
};

export default CreatedNft;
