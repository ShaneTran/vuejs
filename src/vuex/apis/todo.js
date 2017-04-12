import $ from 'jquery'
import axios from 'axios';


export default {
  fecthTodo: function() {
    // return $.get('http://jsonplaceholder.typicode.com/todos');
    return axios.get('http://jsonplaceholder.typicode.com/todos')
  },

  addTodo: function(todo) {
    return $.ajax('http://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      data: {
        title: todo.title,
        completed: false,
        userId: 1
      }
    });
  },

  getTodoItem: function(id) {
    return $.get('http://jsonplaceholder.typicode.com/todos/'+id);
  },

  saveTodo: function(todo) {
    return $.ajax('http://jsonplaceholder.typicode.com/todos/'+todo.id, {
      method: 'PATCH',
      data: {
        title: todo.title
      }
    });
  },

  removeTodo: function(todo) {
    return $.ajax('http://jsonplaceholder.typicode.com/todos/'+todo.id, {
        method: 'DELETE'
    });
  },

  setCompleted: function(todo, type) {
    var dataObj = {
      completed: true
    }
    if (type == 'COMPLETED') {
      dataObj.completed = true;
    } else {
      dataObj.completed = false;
    }
    return $.ajax('http://jsonplaceholder.typicode.com/todos/'+todo.id, {
      method: 'PATCH',
      data: dataObj
    });
  }
}
