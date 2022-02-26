import React, { useContext } from "react";
import { Image, StyleSheet, View } from "react-native";
import Dropdown from "../components/Dropdown";
import Input from "../components/Input";
import Context from "../context/Context";

const Start = () => {
	const { player1, setPlayer1 } = useContext(Context);

	return (
		<View style={styles.container}>
			<Image source={require("../../assets/logo.png")} style={styles.logo} />
			<Input
				onChangeText={text => setPlayer1(text)}
				iconName='email'
				label='Name'
				placeholder='Enter your name'
				value={player1}
			/>
			<Dropdown />
		</View>
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
