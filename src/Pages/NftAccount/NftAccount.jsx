import React, {useEffect, useState} from 'react';
import classes from './NftAccount.module.css'
import {backAPI} from "../../api/api";

const NftAccount = (props) => {
    const [pictures, setPictures] = useState([])
    useEffect(()=>{
        if(props.walletInfo)
            backAPI.getAllMyPicture(props.walletInfo.bech32)
            .then(responce => {
                setPictures(responce.data)
            })

    },[props.walletInfo])

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
                                                    :<button className={classes.mintBtn}>Mint</button>}
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
        </main>
    );
}

export default NftAccount;