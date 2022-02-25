import { useState } from "react";
import {
	Alert,
	ImageBackground,
	Pressable,
	StyleSheet,
	View,
} from "react-native";

export default function App() {
	const [map, setMap] = useState([
		["o", "x", ""],
		["", "o", ""],
		["", "x", "o"],
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

	const checkWinningState = () => {};

	return (
		<View style={styles.container}>
			<ImageBackground
				source={require("./assets/bg.jpeg")}
				style={styles.bg}
				resizeMode='contain'>
				<View style={styles.map}>
					{map.map((row, rowIndex) => {
						return (
							<View key={rowIndex} style={styles.row}>
								{row.map((cell, colIndex) => {
									return (
										<Pressable
											onPress={() => handlePress(rowIndex, colIndex)}
											style={styles.cell}>
											{cell === "o" && <View style={styles.circle} />}

											{cell === "x" && (
												<View style={styles.cross}>
													<View style={styles.crossLine} />
													<View style={[styles.crossLine, styles.crossLine2]} />
												</View>
											)}
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
	cross: {
		width: "100%",
		height: "100%",
	},
	crossLine: {
		position: "absolute",
		left: "48%",
		width: 10,
		height: "100%",
		backgroundColor: "#fff",
		borderRadius: 5,
		transform: [{ rotate: "45deg" }],
	},
	crossLine2: {
		transform: [{ rotate: "-45deg" }],
	},
});
