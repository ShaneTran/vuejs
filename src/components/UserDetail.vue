<template>
  <div class="user_show">
    <h1>Information</h1>
    <p>
      Name: <input :value="data.name" v-model="data.name" />
    </p>
    <p>
      Email: <input :value="data.email" v-model="data.email" />
    </p>
    <p>
      Phone: <input :value="data.phone" v-model="data.phone" />
    </p>
    <p>
      <button @click.prevent="saveUser" class="btn btn-default">Save</button>
    </p>
  </div>
</template>

<script>
  import $ from 'jquery'
  export default {
    name: "userdetail",
    data() {
      return {
        data: ''
      }
    },
    created: function() {
      this.getUser();
    },
    methods: {
      getUser() {
        var _this = this;
        $.get("http://jsonplaceholder.typicode.com/users/"+this.$route.params.userID, function(data) {
          _this.data = data;
        });
      },
      saveUser() {
        var _this = this;
        var dataObj= {
          name: _this.data.name,
          email: _this.data.email,
          phone: _this.data.phone
        }
        $.ajax("http://jsonplaceholder.typicode.com/users/"+_this.$route.params.userID, {
          method: 'PUT',
          data: dataObj
        }).then(function(data) {
          _this.data = data;
        });
      }
    }
  }
</script>
