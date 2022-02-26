import { useEffect, useState } from "react";
import {
	Alert,
	ImageBackground,
	Pressable,
	StyleSheet,
	Text,
	View,
} from "react-native";
import Cross from "../components/Cross";

const copyArray = original => {
	const copy = JSON.parse(JSON.stringify(original));
	return copy;
};

export default function GameScreen() {
	const [map, setMap] = useState([
		["", "", ""],
		["", "", ""],
		["", "", ""],
	]);
	const [currentPlayer, setCurrentPlayer] = useState("x");

	const handlePress = (row, col) => {
		if (map[row][col] !== "") {
			return Alert.alert("Oops", "Position already occupied!");
		}

		setMap(prev => {
			const updatedMap = [...prev];
			updatedMap[row][col] = currentPlayer;
			return updatedMap;
		});

		setCurrentPlayer(currentPlayer === "x" ? "o" : "x");
	};

	const getWinner = winnerMap => {
		//Check rows

		for (let i = 0; i < 3; i++) {
			const isRowXWinning = winnerMap[i].every(cell => cell === "x");
			const isRowOWinning = winnerMap[i].every(cell => cell === "o");

			if (isRowXWinning) {
				return "x";
			}
			if (isRowOWinning) {
				return "o";
			}
		}

		//Check columns

		for (let col = 0; col < 3; col++) {
			let isColumnXWinner = true;
			let isColumnOWinner = true;
			for (let row = 0; row < 3; row++) {
				if (winnerMap[row][col] !== "x") {
					isColumnXWinner = false;
				}
				if (winnerMap[row][col] !== "o") {
					isColumnOWinner = false;
				}
			}
			if (isColumnXWinner) {
				return "x";
			}
			if (isColumnOWinner) {
				return "o";
			}
		}

		//Check diagonals
		let diagonal1XWinner = true;
		let diagonal1OWinner = true;
		let diagonal2XWinner = true;
		let diagonal2OWinner = true;

		for (let i = 0; i < 3; i++) {
			if (winnerMap[i][i] !== "x") {
				diagonal1XWinner = false;
			}
			if (winnerMap[i][i] !== "o") {
				diagonal1OWinner = false;
			}
			if (winnerMap[i][2 - i] !== "x") {
				diagonal2XWinner = false;
			}
			if (winnerMap[i][2 - i] !== "o") {
				diagonal2OWinner = false;
			}
		}
		if (diagonal1XWinner || diagonal2XWinner) {
			return "x";
		}
		if (diagonal1OWinner || diagonal2OWinner) {
			return "o";
		}
	};

	const checkTieState = () => {
		if (!map.some(row => row.some(cell => cell === ""))) {
			Alert.alert("OOPS!", `Its a TIE`, [
				{
					text: "Restart",
					onPress: resetGame,
				},
			]);
		}
	};

	const gameWon = player => {
		Alert.alert("Hurray!", `Player ${player} WON`, [
			{
				text: "Restart",
				onPress: resetGame,
			},
		]);
	};

	const resetGame = () => {
		setMap([
			["", "", ""],
			["", "", ""],
			["", "", ""],
		]);
		setCurrentPlayer("x");
	};

	const botTurn = () => {
		const possiblePositions = [];

		map.forEach((row, rowIndex) => {
			row.forEach((cell, colIndex) => {
				if (cell === "") {
					possiblePositions.push({ row: rowIndex, col: colIndex });
				}
			});
		});

		let chosenOption;

		//Attack
		possiblePositions.forEach(possiblePosition => {
			const mapCopy = copyArray(map);
			mapCopy[possiblePosition.row][possiblePosition.col] = "o";

			const winner = getWinner(mapCopy);
			if (winner === "o") {
				chosenOption = possiblePosition;
			}
		});

		if (!chosenOption) {
			//Defend
			possiblePositions.forEach(possiblePosition => {
				const mapCopy = copyArray(map);
				mapCopy[possiblePosition.row][possiblePosition.col] = "x";

				const winner = getWinner(mapCopy);
				if (winner === "x") {
					chosenOption = possiblePosition;
				}
			});
		}

		if (!chosenOption) {
			chosenOption =
				possiblePositions[Math.floor(Math.random() * possiblePositions.length)];
		}

		if (chosenOption) {
			handlePress(chosenOption.row, chosenOption.col);
		}
	};

	useEffect(() => {
		if (currentPlayer === "o") {
			botTurn();
		}
	}, [currentPlayer]);

	useEffect(() => {
		const winner = getWinner(map);
		if (winner) {
			gameWon(winner);
		} else {
			checkTieState();
		}
	}, [map]);

	return (
		<View style={styles.container}>
			<ImageBackground
				source={require("../../assets/bg.jpeg")}
				style={styles.bg}
				resizeMode='contain'>
				<Text
					style={{
						fontSize: 24,
						color: "#fff",
						position: "absolute",
						top: 50,
					}}>
					Current Turn : {currentPlayer.toUpperCase()}
				</Text>
				<View style={styles.map}>
					{map.map((row, rowIndex) => {
						return (
							<View key={`row-${rowIndex}`} style={styles.row}>
								{row.map((cell, colIndex) => {
									return (
										<Pressable
											onPress={() => handlePress(rowIndex, colIndex)}
											style={styles.cell}
											key={`col-${colIndex}`}>
											{cell === "o" && <View style={styles.circle} />}

											{cell === "x" && <Cross />}
										</Pressable>
									);
								})}
							</View>
						);
					})}
					{/*
					 */}
				</View>
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#242D34",
	},
	bg: {
		width: "100%",
		height: "100%",
		alignItems: "center",
		justifyContent: "center",
		paddingTop: 20,
	},
	map: {
		width: "80%",
		aspectRatio: 1,
	},
	row: {
		flex: 1,
		flexDirection: "row",
	},
	cell: {
		width: 100,
		height: 100,
		flex: 1,
	},
	circle: {
		flex: 1,
		borderRadius: 50,
		borderColor: "#fff",
		borderWidth: 10,
		alignItems: "center",
		justifyContent: "center",
		margin: 10,
	},
});
