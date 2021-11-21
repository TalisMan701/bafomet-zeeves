import React, {useEffect, useState} from 'react';
import classes from './NftAccount.module.css'
import {backAPI} from "../../api/api";
import {BN, bytes, Long, units} from "@zilliqa-js/util";
import {Link, Redirect} from "react-router-dom";
import {Dialog} from "primereact/dialog";

const NftAccount = (props) => {
    const [pictures, setPictures] = useState([])
    const [showFetchMint, setShowFetchMint] = useState(false)
    const [linkToTranz, setLinkToTranz] = useState('')
    const [redirectSuccess, setRedirectSuccess] = useState(false)
    const [timerId, setTimerId] = useState(null)
    const [status, setStatus] = useState(0)
    const [imageSel, setImageSel] = useState(null)

    useEffect(()=>{
        if(props.walletInfo)
            backAPI.getAllMyPicture(props.walletInfo.bech32)
            .then(responce => {
                setPictures(responce.data)
            })

    },[props.walletInfo])

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
                <div className={classes.title}>My picture</div>
                <div className={classes.content}>
                    {props.walletInfo
                        ?
                        <div>{pictures.length !== 0
                            ?
                            <div>
                                <div className={classes.item}>
                                    <div>Image</div>
                                    <div>Date</div>
                                    <div>Request</div>
                                    <div>State</div>
                                </div>
                               {pictures.map((picture)=>{
                                        return (
                                            <div className={classes.item}>
                                                <div><img src={picture.image_url} alt=""/></div>
                                                <div>{picture.created_at}</div>
                                                <div>{picture.text}</div>
                                                <div>{picture.blocked
                                                    ? <span className={classes.minted}>Minted</span>
                                                    :<button
                                                        onClick={()=>{
                                                            if(props.walletInfo){
                                                                setImageSel(picture)
                                                                createNft(picture.image_url)
                                                            }else{
                                                                props.setShowConfirmWallet(true)
                                                                props.toast.current.show({severity: 'error', summary: 'Mint picture', detail: 'Connect wallet'});
                                                            }

                                                        }}
                                                        className={classes.mintBtn}
                                                    >Mint</button>}
                                                </div>
                                            </div>
                                        )
                                    })}
                            </div>
                                :   <span>Pictures not found</span>
                            }
                        </div>
                        :
                        <span className={classes.connect}>Connect wallet</span>
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
}

export default NftAccount;
