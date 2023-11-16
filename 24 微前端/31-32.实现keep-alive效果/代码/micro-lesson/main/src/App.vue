<template>
  <div id="app">
    <el-container>
      <el-container>
        <el-aside width="200px">
          <el-menu @select="changeMenu" :default-active="currentTab" class="el-menu-vertical-demo" router>
            <el-menu-item v-for="item in menuData" :index="item.value" :key="item.value">
              <template #title>{{ item.name }}</template>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-container>
          <el-header>Micro-App</el-header>
          <el-main>

            <el-tabs v-model="currentTab" closable @tab-remove="removeTab" type="card" @tab-click="changeTab">
              <el-tab-pane
                v-for="item in allTabs"
                :label="item.name"
                :name="item.value"
                :key="item.value"
              >
              </el-tab-pane>
            </el-tabs>

            <div 
              v-for="item in microApps"
              :key="item.name"
              :id="item.container.slice(1)"
              v-show="$route.path.startsWith(item.props.routerBase)"
            ></div>

            <!-- 主应用自身的路由 -->
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </el-main>
        </el-container>
        
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { loadMicroApp, initGlobalState } from 'qiankun';

//初始化state
const actions = initGlobalState({})

export default {
  name: "App",
  data(){
    return {
      menuData:[
        {name:'主应用的Home页面',value:'/'},
        {name:'子应用Vue2的home页面',value:'/app-vue2-demo'},
        {name:'子应用Vue2的users页面',value:'/app-vue2-demo/users'},
        {name:'子应用Vue2的about页面',value:'/app-vue2-demo/about'},
        {name:'子应用React的home页面',value:'/app-react-demo'},
        {name:'子应用React的about页面',value:'/app-react-demo/about'},
        {name:'子应用React的info页面',value:'/app-react-demo/info'},
      ],
      currentTab:'/',
      allTabs: [],
      loadedApp: {},
      microApps:[
        {
          name:'app-vue2-demo',
          entry:'//localhost:4001',
          container:'#appContainer1',
          props:{
            routerBase:'/app-vue2-demo',
          }
        },
        {
          name:'app-react-demo',
          entry:'//localhost:4002',
          container:'#appContainer2',
          props:{
            routerBase:'/app-react-demo',
          }
        }
      ]
    }
  },
  methods:{
    changeMenu(indexPath){
      console.log(indexPath);
      if(this.currentTab === indexPath && this.currentTab !== '/') return;

      //判断是否已经存在tab
      const existTab = this.allTabs.find(item => item.value === indexPath);

      if(existTab){
        this.currentTab = existTab.value;
      }
      else {
        //获取是否是子应用
        const microApp = this.microApps.find(item => indexPath.includes(item.props.routerBase));
 
        //如果存在，证明是子应用
        if (microApp) { 
          //将子路由截取出来
          const childRoutePath = indexPath.replace(microApp.props.routerBase, "");

          if (!this.loadedApp[microApp.name]) { 
            let app = loadMicroApp(microApp);
            this.loadedApp[microApp.name] = {
              app,
              childRoute:[]
            }
          }

          this.loadedApp[microApp.name].childRoute.push(childRoutePath);
          console.log("----", this.loadedApp);
          actions.setGlobalState(this.loadedApp);
        }
        
        //添加到tabs中
        const selectMenu = this.menuData.find(item => item.value === indexPath);
        if(selectMenu){
          this.allTabs.push(selectMenu);
          this.currentTab = selectMenu.value;
        }
      }
    },
    changeTab(tab){
      console.log(tab);
      if(tab.name === this.$route.path) return;
      this.$router.push(this.currentTab);
    },
    removeTab(tab){
      console.log("removeTab---",tab);

      //判断是否是子应用
      const microApp = this.microApps.find(item => tab.includes(item.props.routerBase));

      if (microApp) { 
        //把子应用的子路由截取出来
        const childRoutePath = tab.replace(microApp.props.routerBase, "");
        //从数组中删除，需要获取对应的下标
        const childRouteIndex = this.loadedApp[microApp.name].childRoute.indexOf(childRoutePath);
        this.loadedApp[microApp.name].childRoute.splice(childRouteIndex, 1);
        //删除之后应该更新全局通信数据
        actions.setGlobalState(this.loadedApp);

        //如果子应用的tab也全部被关闭了，其实也就是说childRoute数组为空了，那么整个子应用都关闭了
        //所以子应用需要卸载
        if(this.loadedApp[microApp.name].childRoute.length === 0){
          this.loadedApp[microApp.name].app.unmount();
          this.loadedApp[microApp.name] = null;
        }
      }

      const deleteTabIndex = this.allTabs.findIndex(item => item.value === tab);
      console.log(deleteTabIndex);

      //如果删除的是当前选中的tab，需要判断
      if(tab === this.currentTab){
        let defaultTab = "/";
        //如果删除当前，上一个存在，就选上一个，否则选下一个
        if(this.allTabs[deleteTabIndex + 1]){
          defaultTab = this.allTabs[deleteTabIndex + 1].value;
        }
        else if(this.allTabs[deleteTabIndex - 1]){
          defaultTab = this.allTabs[deleteTabIndex - 1].value;
        }
        
        //获取当前激活状态
        this.currentTab = defaultTab;
        //切换路由
        this.changeTab({name:defaultTab});
      }

      this.allTabs.splice(deleteTabIndex,1);
    },
    initTab(){
      let {fullPath} = this.$route;
      this.changeMenu(fullPath);
    }
  },
  mounted(){
    this.initTab();
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.el-header{
  background-color: #fafafa;
  font-size: 20px;
  color: #333;
  text-align: left;
  line-height: 60px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
#nprogress .bar{
  background-color: chocolate !important;
  height: 10px !important;
}
</style>
