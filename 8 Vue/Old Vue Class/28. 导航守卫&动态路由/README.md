- beforeRouteLeave  当离开这个路径时执行
- beforeRouteEnter  进入组件执行
- beforeRouteUpdate （路径切换了 但组件继续被复用）组件路径更新会执行 切换路径不切换组件可以配合 mounted
- to from next 

# 动态路由
- /question/:id 
- this.$route.params.xxx  
- this.$route.query.xxx  通过问号形式传参数 
- 例 localhost/question?questionId = 201801

- 1.this.$route.query的使用
A、传参数：
this.$router.push({
         path: '/monitor',
         query:{
               id:id,
          }
}）
B、获取参数：
this.$route.query.id
C、在url中形式（url中带参数）
http://172.19.186.224:8080/monitor?id=1
D、页面之间用路由跳转传参时，刷新跳转后传参的页面，数据还会显示存在（项目中遇到此问题）
 
- 2.this.$route.params的使用
A、传参数：
this.$router.push({
         name: 'monitor',
         params:{
               id:id,
          }
}）
B、获取参数：
this.$route.params.id
C、在url中形式（url中不带参数）
http://172.19.186.224:8080/monitor