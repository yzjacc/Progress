import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./views/HomeScreen"
import DetailScreen from "./views/DetailScreen"

// 创建一个栈导航器
const Stack = createNativeStackNavigator();

export default function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: "主页"
          }}
        />
        <Stack.Screen 
          name="DetailScreen"
          component={DetailScreen}
          options={{
            title: "详情页"
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}