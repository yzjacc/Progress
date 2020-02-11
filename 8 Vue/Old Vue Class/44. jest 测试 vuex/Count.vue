<template>
  <div>
    <h4>state: {{ count }}</h4>
    <h4>getters: {{ dbCount }}</h4>
    <button @click="changeCount(10)">点击1</button>
    <button @click="actionAdd(10)">点击2</button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
export default {
  computed: {
    ...mapState(['count']),
    ...mapGetters(['dbCount'])
  },
  methods: {
    ...mapMutations(['changeCount']),
    ...mapActions({
      actionAdd: 'changeCount'
    })
  }
}
</script>
