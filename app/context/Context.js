import { createContext } from "react";

const Context = createContext({
	player1: "",
	setPlayer1: () => {},
	player2: "",
	setPlayer2: () => {},
	option: "",
	setOption: () => {},
});

export default Context;
