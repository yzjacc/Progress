import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import HomeScreen from "./views/HomeScreen";
import DetailScreen from "./views/DetailScreen";
import SettingScreen from "./views/SettingScreen";
import ProfileScreen from "./views/ProfileScreen";


// 创建一个栈导航器
const HomeStack = createNativeStackNavigator();
const SettingStack = createNativeStackNavigator();

// 创建一个标签页导航
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        {/* 第一个标签页 */}
        <Tab.Screen name="First">
          {/* 里面嵌套一个栈导航器 */}
          {()=>(
            <HomeStack.Navigator>
              <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
              <HomeStack.Screen name="DetailScreen" component={DetailScreen} />
            </HomeStack.Navigator>
          )}
        </Tab.Screen>
        {/* 第二个标签页 */}
        <Tab.Screen name="Second">
          {/* 里面嵌套一个栈导航器 */}
          {()=>(
             <SettingStack.Navigator>
              <SettingStack.Screen name="SettingScreen" component={SettingScreen} />
              <SettingStack.Screen name="ProfileScreen" component={ProfileScreen} />
            </SettingStack.Navigator>
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
