<template>
  <div class="user_show">
    <h1>Hello</h1>
    <router-view></router-view>
  </div>
</template>

<script>
  import $ from 'jquery'
  export default {
    name: "user",
    data() {
      return {
        data: ''
      }
    }
  }
</script>
