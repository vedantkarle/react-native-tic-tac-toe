import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { Alert, Button, Image, StyleSheet, View } from "react-native";
import Dropdown from "../components/Dropdown";
import Input from "../components/Input";
import Context from "../context/Context";

const Start = () => {
	const { player1, setPlayer1, player2, setPlayer2, gameMode } =
		useContext(Context);

	const navigation = useNavigation();

	const handlePress = () => {
		if (player1 === "") {
			return Alert.alert("Oops!", "Your name is required");
		}
		if (gameMode === "LOCAL" && player2 === "") {
			return Alert.alert("Oops!", "Opponent name is required");
		}
		navigation.navigate("Game");
	};

	return (
		<>
			<View style={styles.container}>
				<Image source={require("../../assets/logo.png")} style={styles.logo} />
				<Input
					onChangeText={text => setPlayer1(text)}
					iconName='email'
					placeholder='Enter your name'
					value={player1}
				/>
				{gameMode === "LOCAL" && (
					<Input
						onChangeText={text => setPlayer2(text)}
						iconName='email'
						placeholder='Enter opponent name'
						value={player2}
					/>
				)}
				<Dropdown />
			</View>
			<Button
				title='Start'
				color='#5D5FEE'
				style={styles.button}
				onPress={handlePress}
			/>
		</>
	);
};

export default Start;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#242D34",
	},
	logo: {
		transform: [{ rotate: "30deg" }],
		height: 160,
		width: 160,
	},
});
