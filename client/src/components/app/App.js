import  {useEffect, useRef, useState} from "react"
import {io} from "socket.io-client"

import Authorization from "../authorization/authorization";

import './App.css';
function App() {

	const [isSign, setIsSign] = useState(false);
	const socket = useRef();

	useEffect(() => {
		console.log("hello!")
		socket.current = io("http://localhost:3030");
		socket.current.on("connect", () => {
			console.log("User connected successfully!");
			socket.current.on("authChecked", (data) => {
				const {name} = data;
				if(typeof name !== "number")
					setIsSign(true);
				else
					setIsSign(false)
			})
		})
	}, [])

	function checkUserAuth(login, password){
		socket.current.emit("auth", login, password)
	}

	return (
		<div className="App">
			<header className="App-header">
				<Authorization checkUserAuth = {(login, password) => checkUserAuth(login, password)} />
				{isSign ? "Hello!" : null}
			</header>
		</div>
	);
}

export default App;
