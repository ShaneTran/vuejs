<template>
  <div>
    <ul v-for="i in countries">
      <li> {{i.name}}</li>
    </ul>
    <input type="text" v-model="textInput" @keyup="enterInput">
    <input type="text" ref="textInput1" @keyup="enterInput1">
    <button @click.prevent='demoOn'>Demo $on</button>
    <p>{{age}}</p>
    <div v-html="html"></div>
    <p v-if='number > 10'>Number > 10</p>
    <p v-else-if='number == 10'>Number == 10</p>
    <p v-else>Number < 10</p>
  </div>
</template>
<script>
  export default {
    name: 'UserList2',
    props: {
      countries: Array
    },
    demoOption: 'This is demoOption',
    data () {
      return {
        setText: 'setText demo',
        html: '<h4 style="color: red">html text</h4>',
        textInput: '',
        textInput1: '',
        number: 10,
        items: [
          {name: 'Alex', age: 20},
          {name: 'Sarah', age: 18},
          {name: 'Mike', age: 25},
        ]
      }
    },
    created() {
      console.log(this.$options.demoOption);
      this.$parent.$options.methods.parentMethod('Shane');
      this.$set(this, 'setText', 'children $set text')
      this.$set(this.$parent, 'setText', 'parent $set text')
      this.$delete(this.items, 0)
      this.$on('onTest', function(str) {
        alert("hello $on with: " + str)
      });
    },
    computed: {
      age: {
        get() {
          // return this.items = this.items.filter(function(i) { return i.age >= 20 });
        },
        set(age) {
          return this.items = this.items.filter(function(i) { return i.age >= age });
        }
      }
    },
    watch: {
      age() {
      }
    },
    methods: {
      enterInput() {
        this.age = this.textInput;
      },
      enterInput1() {
        console.log(this.$refs.textInput1.value);
      },
      demoOn() {
        console.log('demoOn');
        this.$emit('onTest', 'hi')
      }
    }
  }
</script>
