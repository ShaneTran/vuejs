<template>
  <div class="user-list">
    <h1>User List</h1>
    <p>
      <a href="javascript:void(0)" class="btn" v-bind:class="{'btn-primary' : layout == 'table'}" @click.prevent="changeView('table')">Table</a>
      <a href="javascript:void(0)" class="btn" v-bind:class="{'btn-primary' : layout == 'grid'}" @click.prevent="changeView('grid')">Grid</a>
    </p>
    <input type="text" v-model="textSearch">
    <div v-if="layout=='table'">
      <table ref="myTable" class="table table-striped">
        <thead>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Website</th>
          <th></th>
        </thead>
        <tbody>
          <tr v-for="user in filterUsers">
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
    </div>
    <div v-if="layout=='grid'">
      <ul v-for="user in filterUsers" style="background: gainsboro;">
        <li>{{user.name}}</li>
        <li>{{user.email}}</li>
        <li>{{user.phone}}</li>
        <li>{{user.website}}</li>
      </ul>
      <hr/>
      <hr/>
    </div>

    Relo search: <input type="text" v-model='repoSearch'>
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <ul class="nav navbar-nav">
          <li v-bind:class="{active : typeRepo == 'all'}"><a href="javascript:void(0)" @click="repoFilter('all')">All</a></li>
          <li v-bind:class="{active : typeRepo == 'public'}"><a href="javascript:void(0)" @click="repoFilter('public')">Public</a></li>
          <li v-bind:class="{active : typeRepo == 'private'}"><a href="javascript:void(0)" @click="repoFilter('private')">Private</a></li>
          <li v-bind:class="{active : typeRepo == 'fork'}"><a href="javascript:void(0)" @click="repoFilter('fork')">Fork</a></li>
        </ul>
      </div>
      <p v-for="repo in filterRepos">
        {{repo.name}}
      </p>
    </nav>
    <router-link :to="{path: 'user/new', name: 'user_create'}" class="btn btn-primary">Add new</router-link>
    <user-list1></user-list1>
    <user-list2 v-bind:countries='countries'></user-list2>
  </div>
</template>
<script>
  import $ from 'jquery'
  import UserList1 from '@/components/UserList1'
  import UserList2 from '@/components/UserList2'
  import Func from '@/components/Functions'

  export default {
    name: 'users',
    demoParentOption: 'This is demoParentOption',
    props: {
      name: {
        type: String
      }
    },
    data () {
      return {
        repoSearch: '',
        typeRepo: 'all',
        textSearch: '',
        layout: 'table',
        setText: 'setText parent demo',
        users: [],
        countries: [
          {name: 'VN'},
          {name: 'SG'},
        ],
        repos: [
          {name: "Public", public: true, private: false, fork: false },
          {name: "Public fork 1", public: true, private: false, fork: true },
          {name: "Public fork 2", public: true, private: false, fork: true },
          {name: "Private", public: false, private: true, fork: false },
          {name: "Private fork 1", public: false, private: true, fork: true },
          {name: "Private fork 2", public: false, private: true, fork: true },
          {name: "Fork", public: false, private: false, fork: true },
          {name: "Fork 1", public: false, private: false, fork: true },
          {name: "Fork 2", public: false, private: false, fork: true },
        ]
      }
    },
    beforeCreate() {
    },
    created () {
      this.fetch();
      console.log($(".user-list"));
      this.$nextTick(function() {
        console.log($(".user-list"));
        var myTable = this.$refs.myTable;
        console.log($(myTable));
      })
    },
    beforeMount() {
    },
    mounted() {
    },
    beforeDestroy() {
    },
    destroyed() {
    },
    components: {
      UserList1, UserList2
    },
    computed: {
      filterRepos() {
        var repos_arr = this.repos;
        var type = this.typeRepo;
        var repotext = this.repoSearch;
        if (!(type == 'all')) {
          repos_arr = repos_arr.filter(function(i) {
            return i[type];
          });
        }
        if (repotext) {
          repos_arr = repos_arr.filter(function(i) {
            return i.name.toLowerCase().indexOf(repotext.toLowerCase()) != -1;
          });
        }
        return repos_arr;
      },
      filterUsers() {
        // var users_array = this.users,
        //     searchString = this.textSearch;

        // if (!searchString) {
        //     return users_array;
        // }

        // searchString = searchString.trim().toLowerCase();

        // users_array = users_array.filter(function(item) {
        //     if(item.name.toLowerCase().indexOf(searchString) != -1){
        //         return item;
        //     }
        // })

        // return users_array;
        var self = this
        return this.users.filter(function(item) {
            return item.name.toLowerCase().indexOf(self.textSearch.toLowerCase()) > -1;
        });
      }
    },
    methods: {
      fetch () {
        var _this = this;
        Func.methods.getUserList().done(function(data) {
          _this.$set(_this, 'users', data);
        });
      },
      deleteUser(user) {
        var _this = this;
        $.ajax("http://jsonplaceholder.typicode.com/users/"+user, {
          method: 'DELETE'
        }).done(function(data) {
          _this.fetch();
          _this.$forceUpdate();
        });
      },
      parentMethod(str) {
        console.log("hello parentMethod with name: "+ str)
      },
      changeView(type) {
        this.$set(this, 'layout', type);
      },
      repoFilter(type) {
        this.$set(this, 'typeRepo', type);
      }
    }
  }
</script>
