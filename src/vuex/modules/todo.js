import $ from 'jquery'
import Api from '@/vuex/apis/todo'



export default {
  state: {
    todos: [],
    todo: {
      title: ''
    }
  },
  mutations: {
    SET_TODO_LIST(state, todos) {
      state.todos = todos;
    },
    ADD_TODO(state, todo) {
      state.todos.unshift(todo);
    },
    EDIT_TODO(state, todo) {
      state.todo = todo;
    },
    SAVE_TODO(state, todo) {
      state.todos.filter(function(i) {
        if (i.id == todo.id) {
          return i.title = todo.title;
        }
      });
    },
    SET_COMPLETED(state, todo) {
      state.todos.filter(function(i) {
        if (i.id == todo.id) {
          return i.completed = todo.completed;
        }
      });
    },
    REMOVE_TODO(state, todo) {
      var todos = state.todos;
      todos.splice(todos.indexOf(todo), 1);
    },
    SET_FIELD(state, obj) {
      var key = obj[0];
      var val = obj[1];
      state.todo[key] = val;
    }
  },
  actions: {
    fetchTodo(state) {
      Api.fecthTodo().then(function(data) {
        state.commit('SET_TODO_LIST', data);
      });
    },
    addTodo(state, todo) {
      Api.addTodo(todo).then(function(data) {
        state.commit('ADD_TODO', data);
      });
    },
    saveTodo(state, todo) {
      return Api.saveTodo(todo).then(function(data) {
        state.commit('SAVE_TODO', data);
      });
    },
    completedTodo(state, todo) {
      Api.setCompleted(todo, 'COMPLETED').then(function(data) {
        state.commit('SET_COMPLETED', data);
      });
    },
    unCompletedTodo(state, todo) {
      Api.setCompleted(todo, 'UNCOMPLETED').then(function(data) {
        state.commit('SET_COMPLETED', data);
      });
    },
    removeTodo(state, todo) {
      Api.removeTodo(todo).done(function(data) {
        state.commit('REMOVE_TODO', todo);
      });
    },
    editTodo(state, id) {
      Api.getTodoItem(id).then(function(data) {
        state.commit('EDIT_TODO', data);
      });
    }
  },
  getters: {
    getTodoCount(state) {
      return state.todos.length
    },
    getTodoId(state) {
      var _this = this;
      return function (id) {
        return state.todos.filter(function(i) { return i.id === id});
      };
    }
  }
}
