<template>
  <div class="hello">
    <h1>{{ message }}</h1>
    <router-link to="users">User listing</router-link>
    <router-link to="todos">Todo listing</router-link>
    <BooksList></BooksList>
  </div>
</template>

<script>
import BooksList from '@/components/BooksList'

export default {
  name: 'hello',
  computed: {

  },
  data () {
    return {
      message: 'Welcome to vue App'
    }
  },
  components: {
    BooksList
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
