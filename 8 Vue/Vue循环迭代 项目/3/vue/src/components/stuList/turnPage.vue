<template>
  <div id="page">
    <ul class="turn-page">
      <li @click="turnPage(-1)">上一页</li>
      <!--  -->
      <template v-if="totalPage <=7">
        <li
          v-for="i in totalPage"
          :class="{'now-page': i == nowPage}"
          :key="i"
          @click="turnPage(i)"
        >{{i}}</li>
      </template>
      <template v-else>
        <template v-if="nowPage < 5">
          <li v-for="i in 6" :key="i" :class="{'now-page': i == nowPage}" @click="turnPage(i)">{{i}}</li>
        </template>
        <template v-if="nowPage >=5">
          <li @click="turnPage(1)">1</li>
          <li>...</li>
        </template>
        <template v-if="nowPage >=5 && nowPage<=totalPage-4">
          <li
            v-for="i in 5"
            :key="i"
            :class="{'now-page': i == 3 }"
            @click="turnPage(nowPage - 3 + i)"
          >{{nowPage - 3 +i}}</li>
        </template>
        <template v-if="nowPage<=totalPage-4">
          <li>...</li>
          <li @click="turnPage(totalPage)">{{totalPage}}</li>
        </template>
        <template v-if="nowPage > totalPage - 4">
          <li
            v-for="i in 6"
            :key="i"
            :class="{'now-page': totalPage-6+i == nowPage}"
            @click="turnPage(totalPage-6+i)"
          >{{totalPage - 6+ i}}</li>
        </template>
      </template>
      <li @click="turnPage(0)">下一页</li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["nowPage", "totalPage"])
  },
  methods: {
    turnPage(n) {
      this.$store.dispatch("turnPage", n);
    }
  }
};
</script>

<style>
.turn-page > li {
  list-style: none;
  display: inline-block;
  padding: 0 5px;
  font-size: 15px;
  font-weight: 900;
  cursor: pointer;
  user-select: none;
}

.now-page {
  color: #409eef;
}

.turn-page > li:hover {
  color: #409eef;
}
</style>