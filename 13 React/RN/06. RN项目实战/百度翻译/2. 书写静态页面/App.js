// 引入导航
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import {Image} from "react-native"


// 引入其他屏幕
import HomeScreen from "./views/Home";
import HistoryScreen from "./views/History";
import LanguageScreen from "./views/Language";

// 引入静态资源
import HomeIcon from "./assets/icon1.png";
import HistoryIcon from "./assets/icon2.png";
import SelHomeIcon from "./assets/icon1Sel.png"
import SelHistoryIcon from "./assets/icon2Sel.png"


// 创建一个标签页导航
const Tab = createBottomTabNavigator();
const topTab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={({route})=>({
        // 图标
        tabBarIcon : ({focused})=>{
          let iconSource;

          if(route.name === "首页"){
            iconSource = focused ? SelHomeIcon : HomeIcon;
          } else if(route.name === "历史"){
            iconSource = focused ? SelHistoryIcon : HistoryIcon;
          }

          return <Image style={{width:30,height:30}} source={iconSource}/>
        },
        // 底部 tab 字体
        tabBarActiveTintColor : "#1c1b21",
        tabBarInactiveTintColor : "#bfbfbf",
        tabBarLabelStyle : {
          fontSize: 12,
          fontWeight: "900"
        },
        // 头部样式
        headerStyle : {
          backgroundColor: "#4b3c96",
          height : 50
        },
        headerTintColor: "#fff"
      })}>
        <Tab.Screen name="首页">
          {()=>(
            <topTab.Navigator>
              <topTab.Screen name="翻译" component={HomeScreen}/>
              <topTab.Screen name="语言" component={LanguageScreen}/>
            </topTab.Navigator>
          )}
        </Tab.Screen>
        <Tab.Screen name="历史" component={HistoryScreen}></Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  )
}
