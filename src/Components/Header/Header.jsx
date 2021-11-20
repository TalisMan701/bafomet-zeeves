import React, {useEffect, useRef, useState} from 'react';
import classes from './Header.module.css'
import {Tooltip} from "primereact/tooltip";
import clsx from "clsx";
import {Link} from "react-router-dom";

const Header = (props) => {
	const [showMenu, setShowMenu] = useState(false)
	const tooltipRef = useRef(null)

	const handleMouseClick = (event) => {
		if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
			setShowMenu(false)
		}
	}

	useEffect(()=>{
		document.addEventListener('mousedown', handleMouseClick);
		return ()=>{
			document.removeEventListener("mousedown", handleMouseClick);
		}
	},[])

	return (
		<header className={classes.header}>
			<div className={classes.container}>
				<div className={classes.headerInner}>
					<Link to={'/'} className={classes.logoInner}>
						<img src="https://wellbe.s3.amazonaws.com/media/logo.svg" alt="" className={classes.logoImg}/>
						<div className={classes.logoText}>Zifomet</div>
					</Link>
					<div className={classes.content}>
						{props.walletInfo ?
							<>
								<div
									ref={tooltipRef}
									className={classes.dropDownContainer}
								>
									<div className={clsx(classes.downMenu, showMenu && classes.active)}>
										<div className={classes.tooltipContent}>
											<div className={classes.tooltipTitle}>Connected wallet</div>
											<div className={classes.tooltipAddress}>{`${props.walletInfo.bech32.substr(0,10)}...${props.walletInfo.bech32.substr(-7)}`}</div>
											{/*<div className={classes.line}/>*/}
											<Link to={'/'} className={classes.tooltipLink}>My NFTs</Link>
											{/*<div className={classes.line}/>*/}
											<div
												className={classes.tooltipLogout}
												onClick={()=>{
													setShowMenu(false)
													props.setWalletInfo(null)
												}}
											>Log out</div>
										</div>
									</div>
									<div
										onClick={()=>{setShowMenu(!showMenu)}}
										className={`${classes.connectBtn} tooltip-button`}

									>
										<i className="pi pi-user" style={{marginRight: 8}}/>
										<span>{`${props.walletInfo.bech32.substr(0,5)}...${props.walletInfo.bech32.substr(-5)}`}</span>
									</div>
								</div>
							</>:
							<div
								className={classes.connectBtn}
								onClick={()=>{props.setShowConfirmWallet(true)}}
							>
								Connect wallet
							</div>
						}
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
