import React, {useEffect, useState} from 'react';
import classes from './Success.module.css'
import {Link} from "react-router-dom";

const Success = () => {
    return(
        <main className={classes.main}>
            <div className={classes.container}>
                <div className={classes.content}>
                    <i className="pi pi-check" style={{'fontSize': '6em', 'color': '#2CF8BC'}}></i>
                    <p>NFT was successfully added to your wallet</p>
                    <div className={classes.links}>
                        <Link className={classes.linkCreate} to={'/'}>Create new</Link>
                        <Link className={classes.linkMyNft} to={'/my_nft'}>Go to my NFTs</Link>
                    </div>
                </div>
                <img src="https://wellbe.s3.amazonaws.com/media/Ellipse_1.svg" alt="" className={classes.backEllipse1}/>
                <img src="https://wellbe.s3.amazonaws.com/media/Ellipse_2.svg" alt="" className={classes.backEllipse2}/>
            </div>
        </main>
    )
}

export default Success;