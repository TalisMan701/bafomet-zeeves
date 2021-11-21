import React from 'react';
import classes from './NftAccount.module.css'

const NftAccount = (props) => {
    return (
        <main className={classes.main}>
            <div className={classes.container}>
                <div className={classes.title}>My picture</div>
                <div className={classes.content}>
                    {/*{props.walletInfo
                        ?
                        :
                    }*/}

                </div>
                <img src="https://wellbe.s3.amazonaws.com/media/Ellipse_1.svg" alt="" className={classes.backEllipse1}/>
                <img src="https://wellbe.s3.amazonaws.com/media/Ellipse_2.svg" alt="" className={classes.backEllipse2}/>
            </div>
        </main>
    );
}

export default NftAccount;