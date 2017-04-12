<template>
  <div class="toto-list">
    <h1>Todo list {{getTodoCount}}--{{aaa}}</h1>
    <input type="text" v-model="todo.title">
    <a href="javascript:void(0)" class="btn btn-default" @click.prevent="add">Add</a>
    <table>
      <thead>
        <th>Title</th>
        <th>Complete</th>
        <th>User ID</th>
      </thead>
      <tbody>
        <tr v-for="todo in todos">
          <td>{{todo.title}}</td>
          <td><input type="checkbox" :checked="todo.completed" disabled></td>
          <td>{{todo.userId}}</td>
          <td>
            <router-link class="btn btn-default" :to="{ name: 'todoEdit', params: { id: todo.id }}">Edit</router-link>
            <a href="javascript:void(0)" class="btn btn-info" v-if="todo.completed" @click.prevent="setUnComplete(todo)">UnComplete</a>
            <a href="javascript:void(0)" class="btn btn-primary" v-if="!todo.completed" @click.prevent="setComplete(todo)">Complete</a>
            <a href="javascript:void(0)" class="btn btn-danger" @click.prevent="remove(todo)">Remove</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import Api from '@/vuex/apis/todo'
  import {mapActions, mapState, mapGetters} from 'vuex'
  import $ from 'jquery'


  export default {
    name: 'todos',
    data() {
      return {
        todo: {
          title: '',
        }
      }
    },
    beforeCreate() {
      // this.$store.dispatch('fetchTodo')
    },
    computed: {
      ...mapActions(['fetchTodo']),
      ...mapGetters(['getTodoCount', 'getTodoId']),
      ...mapState({
        todos() {
          return this.$store.state.a.todos;
        }
      }),
      aaa() {
        return this.getTodoId(3)
      }
    },
    created() {
      this.fetchTodo;
    },
    methods: {
      ...mapActions(['addTodo', 'completedTodo', 'unCompletedTodo', 'removeTodo']),
      add() {
        // return this.$store.dispatch('addTodo', this.todo);
        return this.addTodo(this.todo);
      },
      setComplete(todo) {
        // return this.$store.dispatch('completedTodo', todo);
        return this.completedTodo(todo);
      },
      setUnComplete(todo) {
        // return this.$store.dispatch('unCompletedTodo', todo);
        return this.unCompletedTodo(todo);
      },
      remove(todo) {
        // return this.$store.dispatch('removeTodo', todo);
        // return this.removeTodo(todo);
        var self = this;
        Api.removeTodo(todo).done(function(data) {
          self.removeTodo(todo);
        });
      }
    }
  }
</script>
