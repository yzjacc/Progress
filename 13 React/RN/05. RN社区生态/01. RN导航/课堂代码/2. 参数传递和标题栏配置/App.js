import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {Image, Button} from "react-native"

import HomeScreen from "./views/HomeScreen";
import DetailScreen from "./views/DetailScreen";

// 创建一个栈导航器
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
        }}
      >
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            // title: "主页",
            // headerStyle: {
            //   backgroundColor: '#f4511e',
            // },
            // headerTintColor: '#fff',
            headerTitle : ()=>{
              return (
                // <Image
                //   style={{width:30,height:30}}
                //   source={require("./assets/logo.jpg")}
                // />
                <Button title="主页按钮"/>
              )
            }
          }}
        />
        <Stack.Screen
          name="DetailScreen"
          component={DetailScreen}
          // options={{
          //   title: "详情页"
          // }}
          // initialParams={{
          //   name : "謝傑"
          // }}
          options={({ route }) => ({
            title: route.params.name,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
