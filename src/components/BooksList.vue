<template>
  <div class="book-list">
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Author</th>
          <th>Vote</th>
          <th>Rating</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in books">
          <td>
            <span v-if="!edit">{{book.name}}</span>
            <span v-else="edit"><input type="text" v-model="book.name"></span>
          </td>
          <td>
            <span v-if="!edit">{{book.author}}</span>
            <span v-else="edit"><input type="text" v-model="book.author"></span>
          </td>
          <td>{{book.vote}}</td>
          <td v-if="book.vote >= 90">5</td>
          <td v-else-if="book.vote >=70">4</td>
          <td v-else-if="book.vote >= 50">3</td>
          <td v-else-if="book.vote >= 30">2</td>
          <td v-else-if="book.vote > 10">1</td>
          <td v-else>0</td>
          <td>
            <a href="javascript:void(0)" class="btn btn-info" v-if="!edit" @click.prevent="editBook(book)">Edit</a>
            <a href="javascript:void(0)" class="btn btn-success" v-if="edit" @click.prevent="updateBook(book)">Update</a>
            <a href="javascript:void(0)" class="btn btn-danger" v-if="edit" @click.prevent="cancleBook(book)">Cancel</a>
            <a href="javascript:void(0)" class="btn btn-primary" v-if="!edit" @click.prevent="vote(book)">Vote</a>
            <a href="javascript:void(0)" class="btn btn-danger" v-if="!edit" @click.prevent="remove(book)">Delete</a>
          </td>
        </tr>
        <tr>
          <td>
            <input type="text" v-model="book.name">
          </td>
          <td>
            <input type="text" v-model="book.author">
          </td>
          <td>0</td>
          <td>0</td>
          <td>
            <a href="javascript:void(0)" class="btn btn-success" @click.prevent="save">Save</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
  import {mapActions} from "vuex"
  export default {
    data() {
      return {
        edit: false,
        books: this.$store.getters.fetchAllBook,
        book: {
          name: '',
          author: ''
        }
      }
    },
    computed: {
    },
    methods: {
      ...mapActions(['voteBook', 'deleteBook', 'saveBook']),
      updateBook(book) {
        var _this = this;
        return this.$store.state.books.filter(function(i) {
          if (i.id == book.id) {
            i.name = book.name;
            i.author = book.author;
          }
          _this.edit = false;
        });
      },
      save() {
        this.saveBook(this.book);
      },
      editBook(book) {
        this.edit = true;
      },
      cancleBook() {
        this.edit = false;
      },
      vote(book) {
        this.voteBook(book);
      },
      remove(book) {
        this.deleteBook(book);
      }
    }
  }
</script>
