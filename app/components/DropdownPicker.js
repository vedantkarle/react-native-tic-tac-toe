import React from "react";
import {
	Dimensions,
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import COLORS from "../colors";

const OPTIONS = ["LOCAL", "BOT-MEDIUM", "BOT-HARD"];
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const DropdownPicker = ({ setIsModalVisible, setGameMode, setPlayer2 }) => {
	const option = OPTIONS.map((option, i) => {
		return (
			<TouchableOpacity
				style={styles.option}
				key={i}
				onPress={() => {
					setGameMode(option);
					{
						(option === "BOT-MEDIUM" || option === "BOT-HARD") &&
							setPlayer2(option);
					}
					setIsModalVisible(false);
				}}>
				<Image
					source={
						option === "LOCAL"
							? require("../../assets/player.png")
							: require("../../assets/bot-med.png")
					}
					style={styles.image}
				/>
				<Text style={styles.text}>{option}</Text>
			</TouchableOpacity>
		);
	});

	return (
		<TouchableOpacity
			style={styles.container}
			onPress={() => setIsModalVisible(false)}>
			<View style={[styles.modal, { width: width - 20, height: height / 2 }]}>
				<ScrollView>{option}</ScrollView>
			</View>
		</TouchableOpacity>
	);
};

export default DropdownPicker;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	modal: {
		backgroundColor: COLORS.darkBlue,
		borderRadius: 10,
		padding: 20,
	},
	option: {
		flexDirection: "row",
		alignItems: "flex-start",
		alignItems: "center",
	},
	image: {
		width: 40,
		height: 40,
	},
	text: {
		margin: 20,
		fontSize: 20,
		fontWeight: "bold",
	},
});
