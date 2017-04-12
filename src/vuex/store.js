
import Vue from 'vue';
import Vuex from 'vuex';
import TodoModule from '@/vuex/modules/todo'


Vue.use(Vuex)


const states = {
  books: [
    {id: 1, name: 'The Hunger Games', author: 'Suzanne Collins', vote: 50},
    {id: 2, name: 'Harry Potter', author: 'J.K. Rowling', vote: 20},
    {id: 3, name: 'To Kill a Mockingbird', author: 'Harper Lee', vote: 60},
    {id: 4, name: 'Pride and Prejudice', author: 'Jane Austen', vote: 80},
    {id: 5, name: 'The Book Thief', author: 'Markus Zusak', vote: 40},
    {id: 6, name: 'Animal Farm', author: 'George Orwell', vote: 10},
    {id: 7, name: 'Gone with the Wind', author: 'Margaret Mitchell', vote: 30},
    {id: 8, name: 'The Giving Tree', author: 'Shel Silverstein', vote: 70},
    {id: 9, name: 'The Fault in Our Stars', author: 'John Green', vote: 0},
    {id: 10, name: 'Wuthering Heights', author: 'Emily Brontë', vote: 90}
  ],
  token: localStorage.getItem('token')
}

const mutations = {
  VOTE_BOOK(state, book) {
    state.books.filter(function(i) {
      if (i.id === book.id) {
        return i.vote += 1;
      }
    })
  },
  DELETE_BOOK(state, book) {
    state.books.splice(state.books.indexOf(book), 1);
  },
  SAVE_BOOK(state, book) {
    state.books.push({id: 11, name: book.name, author: book.author, vote: 0});
  }
}

const actions = {
  voteBook(state, book) {
    state.commit('VOTE_BOOK', book);
  },
  deleteBook(state, book) {
    state.commit("DELETE_BOOK", book);
  },
  saveBook(state, book) {
    state.commit("SAVE_BOOK", book);
  }
}

const getters = {
  fetchAllBook(state) {
    return state.books;
  },
  checkLogined(state) {
    return !!state.token
  },
}


export default new Vuex.Store ({
  state: states,
  mutations: mutations,
  actions: actions,
  getters: getters,
  modules: {
    a: TodoModule
  },
  strict: true
});
