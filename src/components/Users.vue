<template>
  <div class="user-list">
    <h1>User List</h1>
    <table class="table table-striped">
      <thead>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Website</th>
        <th></th>
      </thead>
      <tbody>
        <tr v-for="user in users">
          <td>{{user.name}}</td>
          <td>{{user.email}}</td>
          <td>{{user.phone}}</td>
          <td>{{user.website}}</td>
          <td>
            <router-link :to="{path: 'user', name: 'user', params: {userID: user.id}}" class="btn btn-primary">Edit</router-link>
            <a @click.prevent="deleteUser(user.id)" class="btn btn-danger">Delete</a>
            <router-link :to="{path: 'posts', name: 'user_post' ,params: {userID: user.id}}" class="btn btn-default">Posts</router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <user-list></user-list>
  </div>
</template>
<script>
  import $ from 'jquery'
  import UserList from '@/components/UserList'

  export default {
    name: 'users',
    data () {
      return {
        users: ''
      }
    },
    created () {
      this.fetch();
    },
    components: {
      UserList,
    },
    methods: {
      fetch () {
        var _this = this;
        $.get('https://jsonplaceholder.typicode.com/users', function(data) {
          _this.users = data;
        });
      },
      deleteUser(user) {
        var _this = this;
        $.ajax("http://jsonplaceholder.typicode.com/users/"+user, {
          method: 'DELETE'
        }).done(function(data) {
          _this.fetch();
        });
      }
    }
  }
</script>
