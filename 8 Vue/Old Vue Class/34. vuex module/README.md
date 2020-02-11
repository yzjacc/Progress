# Vuex

## state
- this.$store.state.xxx
- mapState(['xxx'])  
- mapState({
  newXXX: state => state.xxx
})

## getters
- this.$store.getters.xxx
- mapGetters(['xxx'])
- mapGetters({
  newXXX: 'xxx'
})
- getters: {
  func(state, getters) {
    return 'xxx'
  }
}

## mutations
- 改变vuex中的状态
- 只能执行同步的
- this.$store.commit('xxx')
- mapMutations(['xxx'])
- mapMutations({
  newXXX: 'xxx'
})


## actions
- 提交mutation，让mutation去更改状态
- 能够执行异步
- this.$store.dispatch('xxx')
- mapActions(['xxx'])
- mapActions({
  newXXX: 'xxx'
})


## modules
- 根据功能让vuex分出模块
- state会放入到每一个模块下，getters、mutations、actions会直接放入到全局

### 获取vuex中的数据（无namespaced）
- 获取state : this.$store.state.moduleName.xxx
- 获取getters： this.$store.getters.xxx
- 获取mutations： this.$store.commit('xxx')
- 获取actions： this.$store.dispatch('xxx')
- 可以通过mapXXX 方式拿到getters、mutations、action，但是不能拿到state，如果想通过这种方式获取state，需要加命名空间：namespaced：true

### 获取vuex中的数据（有namespaced）
- 获取state : this.$store.state.moduleName.xxx
- 获取getters： this.$store['moduleName/getters'].xxx
- 获取mutations： this.$store.commit('moduleName/xxx')
- 获取actions： this.$store.dispatch('moduleName/xxx')
- 可以通过mapXXX: mapXXX('moduleName', ['xxx'])  mapXXX('moduleName', {})