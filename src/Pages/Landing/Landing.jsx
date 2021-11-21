import React, {useState} from 'react';
import classes from './Landing.module.css'
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {ScrollTop} from "primereact/scrolltop";
import Fade from 'react-reveal/Fade';
import {Link, Redirect} from "react-router-dom";
import {backAPI} from "../../api/api";

const Landing = (props) => {
	const [redirect, setRedirect] = useState(false)

	const createImages = () => {
		props.setFetchCreateNFT(true)
		backAPI.createImages(props.helloText, props.walletInfo?.bech32)
			.then(response => {
				setRedirect(true)
				localStorage.setItem('idCreatingImages', response.data.id)
				props.setCreatingImagesId(response.data.id)
				props.setTimerId(setInterval(()=>{
					backAPI.updateStatus(response.data.id)
						.then(response=>{
							if(response.status === 200){
								props.setImages(response.data.result)
								props.setGoClearInterval(true)
								props.toast.current.show({severity: 'success', summary: 'Create images', detail: 'Was been success!'});
							}
							if(response.status === 201){
								props.setImages([...response.data.result, {loading: true}])
								props.setFetchCreateNFT(false)
							}
							if(response.status === 204){

							}
						})
						.catch(error=>{

						})
				}, 10000))
			})
			.catch(error => {
				props.toast.current.show({severity: 'error', summary: 'Create images', detail: 'This works was been mint'});
			})
	}

	if(redirect){
		return (
			<Redirect to={'/created_nft'}/>
		)
	}

	return (
		<>
			<main>
				<div className={classes.container}>
					<section className={classes.hello}>
						<div className={classes.helloTitle}>Get NFT <br/> you always want</div>
						<div className={classes.helloContent}>
							<div className={classes.helloContentTitle}>What you would like <br/> to create?</div>
							<div className={classes.helloContentDesc}>Describe the desire result</div>
							<div className={classes.helloContentInputs}>
								<InputText
									value={props.helloText}
									onChange={(e) => props.setHelloText(e.target.value)}
									className={classes.input}
								/>
								<div
									className={classes.btn}
									onClick={createImages}
								>
									Create
								</div>
							</div>
						</div>
						<img src="https://wellbe.s3.amazonaws.com/media/Ellipse_1.svg" alt="" className={classes.backEllipse1}/>
						<img src="https://wellbe.s3.amazonaws.com/media/Ellipse_2.svg" alt="" className={classes.backEllipse2}/>
					</section>
					<section className={classes.gallery}>
						<div className={classes.galleryTitle}>Gallery</div>
						<div className={classes.galleryDesc}>31 523 people already had their NFT</div>
						<Fade top cascade>
							<div className={classes.galleryContent}>
								<img src="https://wellbe.s3.amazonaws.com/media/telegram-cloud-photo-size-2-5244491824373020130-y_1.jpg" alt="" className={classes.galleryImg1}/>
								<img src="https://wellbe.s3.amazonaws.com/media/telegram-cloud-photo-size-2-5244491824373020124-y_1.jpg" alt="" className={classes.galleryImg2}/>
								<img src="https://wellbe.s3.amazonaws.com/media/telegram-cloud-photo-size-2-5244491824373020085-y_1.jpg" alt="" className={classes.galleryImg3}/>
								<img src="https://wellbe.s3.amazonaws.com/media/telegram-cloud-photo-size-2-5244491824373020092-y_1.jpg" alt="" className={classes.galleryImg4}/>
								<img src="https://wellbe.s3.amazonaws.com/media/telegram-cloud-photo-size-2-5244491824373020091-y_1.jpg" alt="" className={classes.galleryImg5}/>
							</div>
						</Fade>
						<div className={classes.galleryText}>3D world wide</div>
					</section>
				</div>
			</main>
			<Footer/>
			<ScrollTop />
		</>
	);
};

export default Landing;
