<template>
  <div class="user-new">
    <h1>New User</h1>
    <div class="form-group">
      <label for="email">Title:</label>
      <input type="email" class="form-control" id="email" ref="title" v-model="user['feed_source[title]']">
    </div>
    <div class="form-group">
      <label for="pwd">message:</label>
      <input type="text" class="form-control" id="pwd" v-model="user['feed_source[message]']">
    </div>
    <div class="form-group">
      <div id="myDropzone" class="dropzone"></div>
      <!-- <dropzone id="myVueDropzone" ref="myVueDropzone" v-bind:url="url" v-bind:upload-multiple="true" v-bind:auto-process-queue="false" v-on:vdropzone-sending="sendingFile" v-on:vdropzone-file-added="addedFile" v-on:vdropzone-removed-file="removeFile"></dropzone> -->
    </div>
    <button type="submit" @click.prevent='createUser' class="btn btn-default">Submit</button>
  </div>
</template>

<script>
  import Dropzone from 'dropzone'
  import $ from 'jquery'

  export default {
    name: 'UserNew',
    data() {
      return {
        dropzone: null,
        url: 'http://dev.stacck.net/api/v2/feed_sources/save',
        index: 0,
        fileLength: 0,
        user: {
          token: 'c142f975f76ce93279fd99de58428721f4b4599f6f6ed1a98ab64ca3b595bbc328859c0595274ae59076218dae74f5c984f301c6944ac16b4a2f8fb0',
          company_id: 2,
          'feed_source[title]': '',
          'feed_source[message]': '',
          'feed_source[target_type]': 'by_employee',
          'feed_source[preselected_user_ids]': 108,
          'scheduler[schedule_type]': 'now',
          'scheduler[timezone_offset]': '+8'
        },
      }
    },
    created() {
      this.$nextTick(function() {
        var _this = this;
        Dropzone.autoDiscover = false;
        this.dropzone = new Dropzone("div#myDropzone", {
         url: this.url,
         paramName: 'feed_source[images]',
         uploadMultiple: true,
         autoProcessQueue: false,
         init: function() {
          var i = 0;
          this.on('sending', function (internal_data, xhr, formData) {
            console.log('sending');
            formData.append("feed_source[images]["+i+"]", internal_data);
            i++;
            $.each(_this.user, function(key, value){
              formData.append(key, value);
            });
          });
         }
        });
      });
    },
    methods: {
      createUser() {
        // this.user['feed_source[title]'] = this.$refs.title.value;
        // if (this.fileLength >= 1) {
          // this.$refs.myVueDropzone.processQueue();
          this.dropzone.processQueue();
        // } else {
        //   $.ajax({
        //     url: this.url,
        //     data: this.user,
        //     type: 'POST',
        //     dataType: 'json',
        //   }).done(function(data) {
        //     console.log(data);
        //   });
        // }
      }
    }
  }
</script>
