import React from "react";
import { StyleSheet, View } from "react-native";

const Cross = () => {
	return (
		<View style={styles.cross}>
			<View style={styles.crossLine} />
			<View style={[styles.crossLine, styles.crossLine2]} />
		</View>
	);
};

const styles = StyleSheet.create({
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

export default Cross;
