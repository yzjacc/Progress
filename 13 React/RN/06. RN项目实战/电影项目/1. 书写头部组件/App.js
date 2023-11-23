import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// 引入相应的页面
import HomeScreen from "./views/HomeScreen";

// 引入相应的组件
import HomeBar from "./components/HomeBar"

// 创建一个栈导航
const Stack = createNativeStackNavigator();

export default function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* 里面就配置一个个页面 */}
        <Stack.Screen 
          name="Home"
          component={HomeScreen}
          options={{
            header:()=><HomeBar />
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
