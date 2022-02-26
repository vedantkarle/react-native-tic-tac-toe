import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ContextWrapper from "./app/context/ContextWrapper";
import GameScreen from "./app/screens/GameScreen";
import Start from "./app/screens/Start";

const Stack = createStackNavigator();

function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen name='Start' component={Start} />
				<Stack.Screen name='Game' component={GameScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

function Main() {
	return (
		<ContextWrapper>
			<App />
		</ContextWrapper>
	);
}

export default Main;
