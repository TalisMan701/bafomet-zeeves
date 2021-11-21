import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-dark-teal/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import './App.css';
import {Route} from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import {useEffect, useRef, useState} from "react";
import {Toast} from "primereact/toast";
import classes from './App.module.css'
import "zeeves-auth-sdk-js";
import Header from "./Components/Header/Header";
import {Dialog} from "primereact/dialog";
import CreatedNft from "./Pages/CreatedNFT/CreatedNFT";
import NftAccount from "./Pages/NftAccount/NftAccount";


function App(props) {
	const [walletInfo,setWalletInfo] = useState(null);
	const toast = useRef(null)
	const [isMobile, setIsMobile] = useState(false)
	const [isTablet, setIsTablet] = useState(false)
	const [showConfirmWallet, setShowConfirmWallet] = useState(false)
	const [fetchCreateNFT, setFetchCreateNFT] = useState(false)

	let zeeves = window.Zeeves;
	const connectZeeves = async () => {
		if (!zeeves) {
			throw new Error('Zeeves is not supported');
		}
		const info = await zeeves.getSession();
		setWalletInfo(info)
	}

	useEffect(() => {
		window.addEventListener("resize", resetHeight);
		resetHeight();
		return () => {
			window.removeEventListener("resize", resetHeight)
		}
	}, [])

	const resetHeight = () => {
		setIsMobile(window.innerWidth <= 450)
		setIsTablet(window.innerWidth <= 768)
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	}

	return (
		<>
			<Header setShowConfirmWallet={setShowConfirmWallet} walletInfo={walletInfo} setWalletInfo={setWalletInfo}/>
			<Route exact path={'/'} render={() => <Landing isMobile={isMobile} isTablet={isTablet}/>}/>
			<Route path={'/created_nft'} render={() => <CreatedNft fetchCreateNFT={fetchCreateNFT} walletInfo={walletInfo} setShowConfirmWallet={setShowConfirmWallet} isMobile={isMobile} isTablet={isTablet}/>}/>
			<Route path={'/my_nft'} render={() => <NftAccount walletInfo={walletInfo} />}/>
			<Dialog
				visible={showConfirmWallet}
				onHide={() => setShowConfirmWallet(false)}
				className={classes.dialog}
				showHeader={false}
				onMaskClick={()=>{setShowConfirmWallet(false)}}
			>
				<div className={classes.dialogTitle}>Connect yor wallet</div>
				<div className={classes.dialogDesc}>Connect your wallet with Zeeves to mint NFTs</div>
				<div
					className={classes.dialogBtnConfirm}
					onClick={()=>{connectZeeves()}}
				>Confirm</div>
				<div
					className={classes.dialogBtnCansel}
					onClick={()=>{setShowConfirmWallet(false)}}
				>Cancel</div>
			</Dialog>
			<Toast ref={toast} position="bottom-right" className={classes.toast}/>
		</>
	);
}

export default App;
