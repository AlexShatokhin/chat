import  {useEffect, useRef} from "react"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import {io} from "socket.io-client"
import { useDispatch } from "react-redux";

import { addSocket } from "../../actions/actions";

import Authorization from "../authorization/authorization";
import MainPage from "../mainPage/mainPage";

import './App.css';
function App() {

	const socket = useRef();
	const dispatch = useDispatch();

	useEffect(() => {
		console.log("hello!")
		socket.current = io("http://localhost:3030");
		dispatch(addSocket(socket))
	}, [])

	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/" element = {
						<header className="App-header">
							<Authorization />
						</header>
					}/>
					<Route path = "/:login" element = {<MainPage />}/>
				</Routes>
			</BrowserRouter>

		</div>
	);
}

export default App;
