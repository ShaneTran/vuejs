<script>
  import $ from 'jquery'
  export default {
    methods: {
      getUserList() {
        return $.get('https://jsonplaceholder.typicode.com/users');
      }
    }
  }
</script>
