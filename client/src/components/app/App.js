import  {useEffect, useRef} from "react"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import {io} from "socket.io-client"
import { useDispatch, useSelector } from "react-redux";

import { addSocket } from "../../actions/actions";

import Authorization from "../authorization/authorization";
import MainPage from "../mainPage/mainPage";

import './App.css';
function App() {

	const isAuth = useSelector(state => !!Object.keys(state.authData).length)
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
					<Route path = "/:login" element = {isAuth ? <MainPage /> : <header className="App-header"> <Authorization /></header>}/>
				</Routes>
			</BrowserRouter>

		</div>
	);
}

export default App;
