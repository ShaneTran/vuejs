<template>
  <div class="toto-edit">
    <h1>Todo info {{this.$route.params.id}} {{todo}}</h1>
    Title: <input type="text" :value="todo.title" @input="setField('title', $event)"><br/>
    Title: <input type="text" :value="todo.userId" @input="setField('userId', $event)"><br/>
    <button class="btn btn-primary" @click.prevent="save">Save</button>
  </div>
</template>

<script>
  import Api from '@/vuex/apis/todo'
  import { mapGetters, mapActions, mapState, mapMutations } from 'vuex'
  export default {
    data() {
      return {
      }
    },
    beforeCreate() {
      // this.$store.dispatch('editTodo', this.$route.params.id)
    },
    computed: {
      ...mapState({
        todo() {
          return this.$store.state.a.todo
        }
      })
    },
    created() {
      var id = this.$route.params.id;
      this.editTodo(id);
    },
    methods: {
      ...mapActions(['editTodo']),
      ...mapMutations(['SET_FIELD']),
      setField(attribute, event) {
        this.SET_FIELD([attribute, event.target.value])
      },
      save() {
        var _this = this;
        this.$store.dispatch('saveTodo', this.todo).done(function(data) {
          console.log(data);
          // _this.$router.push('/todos');
        }).catch(function() {
          console.log('error');
        })
      }
    }
  }
</script>
