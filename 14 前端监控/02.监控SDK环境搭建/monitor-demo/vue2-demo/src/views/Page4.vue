<template>
  <div>
    <button @click="successXhr">xhr success</button>
    <button @click="errorXhr">xhr error</button>
    <button @click="successFetch">fetch success</button>
    <button @click="errorFetch">fetch error</button>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  methods: {
    successXhr() { 
      axios.get('http://localhost:3001/api/test').then(res => {
        console.log(res);
      })
    },
    errorXhr() { 
      axios.get('http://localhost:3001/api/test', { params: { error: true } }).then(res => {
        console.log(res);
      }).catch(err => { 
        console.log(err)
      })
    },
    successFetch() { 
      fetch('http://localhost:3001/api/test').then(res => {
        return res.text()
      }).then(res => {
        console.log(res);
      })
    },
    errorFetch() { 
      fetch('http://localhost:3001/api/test', {
        method: "GET",
        body: { error: true }
      }).then(res => {
        return res.text()
      }).then(res => {
        console.log(res);
      }).catch(err => { 
        console.log(err)
      })
    },
  }
}
</script>

