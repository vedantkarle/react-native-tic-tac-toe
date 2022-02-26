import React, { useState } from "react";
import Context from "./Context";

export default function ContextWrapper(props) {
	const [player1, setPlayer1] = useState("");
	const [player2, setPlayer2] = useState("");
	const [gameMode, setGameMode] = useState("LOCAL");

	return (
		<Context.Provider
			value={{
				player1,
				setPlayer1,
				player2,
				setPlayer2,
				gameMode,
				setGameMode,
			}}>
			{props.children}
		</Context.Provider>
	);
}
