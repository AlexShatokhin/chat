import  {useEffect, useRef, useState} from "react"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import {io} from "socket.io-client"

import Authorization from "../authorization/authorization";
import MainPage from "../mainPage/mainPage";

import './App.css';
function App() {

	const [userData, setUserData] = useState({});
	const socket = useRef();


	useEffect(() => {
		console.log("hello!")
		socket.current = io("http://localhost:3030");
	}, [])

	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/" element = {
						<header className="App-header">
							<Authorization setUserData = {setUserData} socket = {socket}/>
						</header>
					}/>
					<Route path = "/:login" element = {<MainPage data = {userData} socket = {socket}/>}/>
				</Routes>
			</BrowserRouter>

		</div>
	);
}

export default App;
