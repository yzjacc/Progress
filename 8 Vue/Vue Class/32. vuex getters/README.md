# Vuex

## state
- this.$store.state.xxx
- mapState(['xxx'])  
- mapState({
  newXXX: state => state.xxx
})

## getters
- 根据vuex中state的值 如果有对应值改变 触发 getters（类似于计算属性）
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