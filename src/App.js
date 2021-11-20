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

function App(props) {
	const toast = useRef(null)
	const [isMobile, setIsMobile] = useState(false)
	const [isTablet, setIsTablet] = useState(false)
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
			<Route exact path={'/'} render={() => <Landing isMobile={isMobile} isTablet={isTablet}/>}/>

			<Toast ref={toast} position="bottom-right" className={classes.toast}/>
		</>
	);
}

export default App;
