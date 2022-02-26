import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import COLORS from "../colors";

const Input = ({ label, iconName, error, onFocus = () => {}, ...props }) => {
	const [isFocused, setIsFocused] = React.useState(false);
	return (
		<View style={{ marginBottom: 20 }}>
			<Text style={style.label}>{label}</Text>
			<View
				style={[
					style.inputContainer,
					{
						borderColor: error
							? COLORS.red
							: isFocused
							? COLORS.darkBlue
							: COLORS.light,
						alignItems: "center",
					},
				]}>
				<MaterialCommunityIcons
					name={iconName}
					style={{
						color: isFocused ? COLORS.darkBlue : COLORS.light,
						fontSize: 22,
						marginRight: 10,
					}}
				/>
				<TextInput
					autoCorrect={false}
					onFocus={() => {
						setIsFocused(true);
					}}
					onBlur={() => setIsFocused(false)}
					style={{ color: COLORS.darkBlue, flex: 1 }}
					{...props}
					placeholderTextColor={COLORS.grey}
				/>
			</View>
			{error && (
				<Text style={{ marginTop: 7, color: COLORS.red, fontSize: 12 }}>
					{error}
				</Text>
			)}
		</View>
	);
};

const style = StyleSheet.create({
	label: {
		marginVertical: 5,
		fontSize: 14,
		color: COLORS.grey,
	},
	inputContainer: {
		height: 55,
		width: "80%",
		backgroundColor: "transparent",
		flexDirection: "row",
		paddingHorizontal: 15,
		borderWidth: 0.5,
	},
});

export default Input;
