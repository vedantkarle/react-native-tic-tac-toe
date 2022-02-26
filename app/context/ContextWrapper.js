import React, { useState } from "react";
import Context from "./Context";

export default function ContextWrapper(props) {
	const [player1, setPlayer1] = useState("");
	const [player2, setPlayer2] = useState("");
	const [option, setOption] = useState("");

	return (
		<Context.Provider
			value={{ player1, setPlayer1, player2, setPlayer2, option, setOption }}>
			{props.children}
		</Context.Provider>
	);
}
