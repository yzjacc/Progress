import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

// 引入相应的页面
import HomeScreen from "./views/HomeScreen";
import MovieDetailScreen from "./views/MovieDetailScreen";
import OnShowScreen from "./views/OnShowScreen";
import ComingSoonScreen from "./views/ComingSoonScreen";
import TheatreScreen from "./views/TheatreScreen.jsx";
import SearchScreen from "./views/SearchScreen.jsx";

// 引入相应的组件
import HomeBar from "./components/HomeBar";
import MoreHeader from "./components/MoreHeader";
import SearchBar from "./components/SearchBar.jsx";

// 创建一个栈导航
const Stack = createNativeStackNavigator();

// 创建一个顶部导航
const topTab = createMaterialTopTabNavigator();

// 引入仓库
import { Provider } from "react-redux";
import store from "./redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          {/* 里面就配置一个个页面 */}
          {/* 首页 */}
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              header: ({ navigation }) => <HomeBar navigation={navigation} />,
              animation: "none",
            }}
          />
          {/* 电影详情页 */}
          <Stack.Screen
            name="MovieDetail"
            component={MovieDetailScreen}
            options={{
              title: "电影详情",
              headerTitleAlign: "center",
            }}
          />
          {/* 更多电影 */}
          <Stack.Screen
            name="More"
            options={{
              header: ({ navigation }) => (
                <MoreHeader type="moreMovie" navigation={navigation} />
              ),
              animation: "none",
            }}
          >
            {() => (
              <topTab.Navigator>
                <topTab.Screen
                  name="正在热映"
                  component={OnShowScreen}
                ></topTab.Screen>
                <topTab.Screen
                  name="即将上映"
                  component={ComingSoonScreen}
                ></topTab.Screen>
              </topTab.Navigator>
            )}
          </Stack.Screen>
          {/* 影院 */}
          <Stack.Screen
            name="Theatre"
            component={TheatreScreen}
            options={{
              header: ({ navigation }) => (
                <MoreHeader type="theatre" navigation={navigation} />
              ),
              animation: "none",
            }}
          />
          {/* 搜索页面 */}
          <Stack.Screen
            name="SearchScreen"
            component={SearchScreen}
            options={{
              header: ({ navigation }) => <SearchBar navigation={navigation} />,
              animation: "none",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
