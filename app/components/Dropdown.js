import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import {
	Image,
	Modal,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import COLORS from "../colors";
import Context from "../context/Context";
import DropdownPicker from "./DropdownPicker";

const Dropdown = () => {
	const [isModalVisible, setIsModalVisible] = useState(false);

	const { gameMode, setGameMode, setPlayer2 } = useContext(Context);

	return (
		<>
			<TouchableOpacity
				style={styles.inputContainer}
				onPress={() => setIsModalVisible(true)}>
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					{gameMode !== "" && (
						<Image
							source={
								gameMode === "LOCAL"
									? require("../../assets/player.png")
									: require("../../assets/bot-med.png")
							}
							style={styles.image}
						/>
					)}
					<Text style={styles.text}>{gameMode}</Text>
				</View>

				<MaterialCommunityIcons
					name='arrow-right'
					style={{ color: COLORS.light }}
				/>
			</TouchableOpacity>
			<Modal
				transparent={true}
				animationType='slide'
				visible={isModalVisible}
				onRequestClose={() => setIsModalVisible(false)}>
				<DropdownPicker
					setIsModalVisible={setIsModalVisible}
					setGameMode={setGameMode}
					setPlayer2={setPlayer2}
				/>
			</Modal>
		</>
	);
};

export default Dropdown;

const styles = StyleSheet.create({
	inputContainer: {
		height: 55,
		width: "80%",
		marginTop: 15,
		backgroundColor: "transparent",
		flexDirection: "row",
		paddingHorizontal: 15,
		borderWidth: 0.5,
		borderColor: COLORS.light,
		alignItems: "center",
		justifyContent: "space-between",
	},
	text: { color: COLORS.light },
	image: {
		width: 30,
		height: 30,
		marginRight: 10,
	},
});
