<template>

  <CSidebar
      fixed
      :minimize="minimize"
      :show="show"
      @update:show="(value) => $store.commit('set', ['sidebarShow', value])"
  >
    <CSidebarBrand class="d-md-down-none" to="/">
      <img
          src="http://oktatas.mik.uni-pannon.hu/pluginfile.php/1/theme_enlightlite/logo/1604907398/cimer_szines_99_transparent.png"></img>
    </CSidebarBrand>
    <div class="example-drag">
      <div v-show="$refs.upload && $refs.upload.dropActive" class="drop-active">
        <h3>Drop files to upload</h3>
      </div>
    </div>
    <iframe name="dummyframe" id="dummyframe" style="display: none;"></iframe>

    <form id="uploadForm" action="http://localhost:3000/upload" method="post" enctype="multipart/form-data">
      <div class="example-btn">
        <label for="myFile" class="btn btn-info" style="margin: 0; width: 50%;">Import File</label>
        <input id="myFile" type="file" name="filename" style="visibility:hidden; width: 0; height:0"/>
        <!--<file-upload
            class="btn btn-primary"
            post-action="http://localhost:3000/upload"
            :multiple="false"
            :drop="true"
            :drop-directory="true"
            ref="upload">
          <i class="fa fa-plus"></i>
          Select files
        </file-upload>-->
        <button type="submit" class="btn btn-success" style="width: 50%">
          <i class="fa fa-arrow-up" aria-hidden="true"></i>
          Upload
        </button>
        <!--
        <button type="button" class="btn btn-danger"  v-else @click.prevent="$refs.upload.active = false">
          <i class="fa fa-stop" aria-hidden="true"></i>
          Stop Upload
        </button> -->
      </div>
    </form>
    <div class="example-btn" style="margin-top:20px; width:100%;">
      <button id="kaki" style="margin: auto; width: 100%" type="button" class="btn btn-danger"><i
          class="fa fa-file-archive-o">Download</i></button>
    </div>
    <CRenderFunction flat :content-to-render="$options.nav"/>
    <CSidebarMinimizer
        class="d-md-down-none"
        @click.native="$store.commit('set', ['sidebarMinimize', !minimize])"
    />
  </CSidebar>
</template>

<script>
import nav from './_nav'
import FileUpload from 'vue-upload-component'
import $ from 'jquery'

export default {
  name: 'TheSidebar',
  nav,
  components: {
    FileUpload,
  },
  computed: {
    show() {
      return this.$store.state.sidebarShow
    },
    minimize() {
      return this.$store.state.sidebarMinimize
    }
  },
  data: function () {
    return {
      file: null,
      uploader: null
    }
  },
  mounted() {
    this.$nextTick(function () {
      this.uploader = this.$refs.uploader
    });

    $('#uploadForm').submit(
        function (e) {
          $.ajax({
            url: 'http://localhost:3000/upload',
            type: 'POST',
            data: new FormData(this),
            processData: false,
            contentType: false,
            success: function (result) {
              location.reload();
            }
          });
          e.preventDefault();
        }
    );
  },
  methods: {
    /**
     * Has changed
     * @param  Object|undefined   newFile   Read only
     * @param  Object|undefined   oldFile   Read only
     * @return undefined
     */
    inputFile: function (newFile, oldFile) {
      if (newFile && oldFile && !newFile.active && oldFile.active) {
        // Get response data
        console.log('response', newFile.response)
        if (newFile.xhr) {
          //  Get the response status code
          console.log('status', newFile.xhr.status)
        }
      }
    },
    /**
     * Pretreatment
     * @param  Object|undefined   newFile   Read and write
     * @param  Object|undefined   oldFile   Read only
     * @param  Function           prevent   Prevent changing
     * @return undefined
     */
    inputFilter: function (newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        // Filter non-image file
        if (!/\.(jpeg|jpe|jpg|gif|png|webp|zip)$/i.test(newFile.name)) {
          return prevent()
        }
      }

      // Create a blob field
      newFile.blob = ''
      let URL = window.URL || window.webkitURL
      if (URL && URL.createObjectURL) {
        newFile.blob = URL.createObjectURL(newFile.file)
      }
    }
  }
}
</script>

<style>
.example-drag label.btn {
  margin-bottom: 0;
  margin-right: 1rem;
}

.example-drag .drop-active {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  position: fixed;
  z-index: 9999;
  opacity: .6;
  text-align: center;
  background: #000;
}

.example-drag .drop-active h3 {
  margin: -.5em 0 0;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  font-size: 40px;
  color: #fff;
  padding: 0;
}
</style>
