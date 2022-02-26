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

	const { option, setOption } = useContext(Context);

	return (
		<>
			<TouchableOpacity
				style={styles.inputContainer}
				onPress={() => setIsModalVisible(true)}>
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					{option !== "" && (
						<Image
							source={
								option === "LOCAL"
									? require("../../assets/player.png")
									: require("../../assets/bot-med.png")
							}
							style={styles.image}
						/>
					)}
					<Text style={styles.text}>
						{option === "" ? "Choose Player" : option}
					</Text>
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
					setOption={setOption}
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
