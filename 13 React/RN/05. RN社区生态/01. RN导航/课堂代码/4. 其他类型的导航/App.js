import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "./views/HomeScreen";
import DetailScreen from "./views/DetailScreen";
import SettingScreen from "./views/SettingScreen";
import ProfileScreen from "./views/ProfileScreen";
import GameScreen from "./views/GameScreen";
import MovieScreen from "./views/MovieScreen";



// 创建一个栈导航器
const HomeStack = createNativeStackNavigator();
const SettingStack = createNativeStackNavigator();

// 创建一个标签页导航
const Tab = createBottomTabNavigator();
const topTab = createMaterialTopTabNavigator();

// 创建一个抽屉导航器
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* <Drawer.Navigator initialRouteName="HomeScreen">
        <Drawer.Screen name="主页" component={HomeScreen}></Drawer.Screen>
        <Drawer.Screen name="详情页" component={DetailScreen} initialParams={{
          id : 1,
          name : "xiejie",
          age : 18
        }}></Drawer.Screen>
      </Drawer.Navigator> */}
      <Tab.Navigator screenOptions={({route})=>({
        headerShown: false,
        tabBarIcon : ({focused, color, size})=>{

          let iconname = null;

          if(route.name === "First"){
            iconname = focused ? "ios-information-circle" : "ios-information-circle-outline"
          } else if(route.name === "Second"){
            iconname = focused ? "ios-mail" : "ios-mail-unread"
          }

          return <Ionicons name={iconname} size={size} color={color}/>;
        }
      })}>
        <Tab.Screen name="First" options={{
          tabBarBadge: 101
        }}>
          {()=>(
            // <HomeStack.Navigator>
            //   <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
            //   <HomeStack.Screen name="DetailScreen" component={DetailScreen} />
            // </HomeStack.Navigator>
            <topTab.Navigator>
              <topTab.Screen name="Game" component={GameScreen} />
              <topTab.Screen name="Movie" component={MovieScreen} />
            </topTab.Navigator>
          )}
        </Tab.Screen>
        <Tab.Screen name="Second">
          {()=>(
             <SettingStack.Navigator>
              <SettingStack.Screen name="SettingScreen" component={SettingScreen} />
              <SettingStack.Screen name="ProfileScreen" component={ProfileScreen} />
            </SettingStack.Navigator>
          )}
        </Tab.Screen>
      </Tab.Navigator>
      {/* <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingScreen} />
      </Tab.Navigator> */}
    </NavigationContainer>
  );
}
