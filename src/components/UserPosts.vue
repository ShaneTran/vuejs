<template>
  <div class="user_posts">
    <h1>User Posts</h1>
  </div>
</template>
<script>
  import $ from 'jquery'

  export default {
    name: 'user_posts',
    data () {
      return {

      }
    },
    created: function() {
      this.getUserPosts();
    },
    methods: {
      getUserPosts() {
        var _this = this;
        $.get("http://jsonplaceholder.typicode.com/posts?userId="+_this.$route.params.userID, function(data) {
          console.log(data);
        });
      }
    }
  }
</script>
