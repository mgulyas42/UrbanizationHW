<template>
  <div>
    <VueFileAgent
        ref="vueFileAgent"
        :theme="'list'"
        :multiple="false"
        :deletable="true"
        :meta="true"
        :accept="'.zip'"
        :maxSize="'1024MB'"
        :maxFiles="14"
        :helpText="'Choose images or zip files'"
        :errorText="{
        type: 'Invalid file type. Only zip Allowed',
        size: 'Files should not exceed 1024MB in size',
      }"
        @select="filesSelected($event)"
        @ended="ended($event)"
        @submit="submit($event)"
        @beforedelete="onBeforeDelete($event)"
        @delete="fileDeleted($event)"
        v-model="fileRecords"
    ></VueFileAgent>
    <button class="btn btn-success" style="width: 100%" :disabled="!fileRecordsForUpload.length" @click="uploadFiles()">
      Upload {{ fileRecordsForUpload.length }} files
      <PackageUp></PackageUp>
    </button>
    <br>
    <button class="btn btn-danger" style="margin-top: 30px; width: 100%" @click="download">
      Download Tree
      <PackageDown></PackageDown>
    </button>
    <span class="transition-ease-in-out" style="width: 100px; height: 100px"></span>
  </div>
</template>


<script>
import { cilPencil, cilSettings } from '@coreui/icons'
import Vue from 'vue';
import VueFileAgent from 'vue-file-agent';
import VueFileAgentStyles from 'vue-file-agent/dist/vue-file-agent.css';
import * as axios from "axios";
import { Feature } from "ol";
import { Point } from "ol/geom";
import { fromLonLat } from "ol/proj";
import MarkerService from "@/containers/MarkerService";
import PackageDown from 'vue-material-design-icons/PackageDown';
import PackageUp from 'vue-material-design-icons/PackageUp';
import store from "@/store";

Vue.use(VueFileAgent);

function downloadZip(data) {
  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'file.zip');
  document.body.appendChild(link);
  link.click();
}



export default {
  name: 'PackageHandler2',
  components: {MarkerService, PackageDown, PackageUp},
  icons: {cilPencil},
  data: function () {
    return {
      fileRecords: [],
      uploadUrl: 'http://localhost:3000/upload',
      uploadHeaders: { 'X-Test-Header': 'vue-file-agent' },
      fileRecordsForUpload: [], // maintain an upload queue
    };
  },
  methods: {
    download: () => {
      const treeDataOptions = store.state.treeData.options;

      const selectedItems = [];
      store.state.treeData.value.forEach((item) => {
        let option = store.state.treeData.options.find((o) => o.id === item);

        if (!option) {
          option = treeDataOptions.find((o) => o.id === item.match(/^(.*)\|[0-9]*$/)[1]).children.find((i) => i.id === item)
        }
        option.tags ? selectedItems.push(option.tags) : selectedItems.push(...option.children.map((c) => c.tags));
      });
      axios.default.post('http://localhost:3000/download', selectedItems, {responseType: 'blob'}).then((res) => downloadZip(res.data))
    },

    uploadFiles: function () {
      // Using the default uploader. You may use another uploader instead.
      this.$refs.vueFileAgent.upload(this.uploadUrl, this.uploadHeaders, this.fileRecordsForUpload).then(d => {
        console.warn('res', d);
        const store = this.$store;
        axios.default.get('http://localhost:3000/data').then((a) => {
          store.state.treeData.options = [];
          for (const [packageName, values] of Object.entries(a.data)) {
            store.state.treeData.options.push({
              id: packageName,
              label: packageName,
              children: values.map((item) => {
                return {
                  id: packageName + '|' + item.id,
                  label: item.title,
                  tags: {...item, packageName}
                }
              })
            });
          }

          this.$store.state.treeData.options.forEach(rootPackage => {
            console.log(rootPackage);
            const features = rootPackage.children.map(data => new Feature({
              geometry: new Point(fromLonLat([data.tags.lat, data.tags.lng])),
              data: data.tags,
              style: MarkerService.defaultStyle
            }));
            MarkerService.markerVector.getSource().addFeatures(features);
          })
        });
      }).catch(e => {
        console.warn(e);
      })

      this.fileRecordsForUpload = [];
    },
    deleteUploadedFile: function (fileRecord) {
      // Using the default uploader. You may use another uploader instead.
      this.$refs.vueFileAgent.deleteUpload(this.uploadUrl, this.uploadHeaders, fileRecord);
    },
    filesSelected: function (fileRecordsNewlySelected) {
      var validFileRecords = fileRecordsNewlySelected.filter((fileRecord) => !fileRecord.error);
      this.fileRecordsForUpload = this.fileRecordsForUpload.concat(validFileRecords);
    },
    onBeforeDelete: function (fileRecord) {
      var i = this.fileRecordsForUpload.indexOf(fileRecord);
      if (i !== -1) {
        // queued file, not yet uploaded. Just remove from the arrays
        this.fileRecordsForUpload.splice(i, 1);
        var k = this.fileRecords.indexOf(fileRecord);
        if (k !== -1) this.fileRecords.splice(k, 1);
      } else {
        if (confirm('Are you sure you want to delete?')) {
          this.$refs.vueFileAgent.deleteFileRecord(fileRecord); // will trigger 'delete' event
        }
      }
    },
    fileDeleted: function (fileRecord) {
      var i = this.fileRecordsForUpload.indexOf(fileRecord);
      if (i !== -1) {
        this.fileRecordsForUpload.splice(i, 1);
      } else {
        this.deleteUploadedFile(fileRecord);
      }
    },
    ended: function(event) {
      console.warn(event);
    },
    submit: function(event) {
      console.warn('submit', event);
    }
  },
};
</script>
