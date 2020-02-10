<template>
  <div class="learn">
    {{ courseName }}
    {{ coursePrice}}
    
    <button @click="handleClick">改变</button>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters('learn', ['coursePrice']),
    ...mapState('learn', ['courseName'])
  },
  methods: {
    handleClick () {
      this.$store.commit('learn/changePrice', {price: 20})
    }
  }
}
</script>


