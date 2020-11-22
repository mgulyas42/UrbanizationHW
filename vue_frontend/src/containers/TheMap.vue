<template>
  <div ref="map-root"
       style="width: 100%; height: 100%">
    <TheTreeView/>
    <MarkerService/>
    <TheContextMenu :map="olMap"/>
  </div>
</template>

<script>
import View from 'ol/View'
import Map from 'ol/Map'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import 'ol/ol.css'
import * as axios from "axios";
import TheContextMenu from "@/containers/ContextMenu";
import TheTreeView from "@/containers/TreeView";
import MarkerService from "@/containers/MarkerService";
import store from "@/store";
import {Feature} from "ol";
import {Point} from "ol/geom";
import {fromLonLat} from "ol/proj";

export default {
  name: 'TheMap',
  components: {MarkerService, TheContextMenu, TheTreeView},
  data: () => ({
    // store OL objects on the component instance
    olMap: {}
  }),

  mounted() {
    const map = new Map({
      // the map will be created using the 'map-root' ref
      target: this.$refs['map-root'],
      layers: [
        // adding a background tiled layer
        new TileLayer({
          source: new OSM() // tiles are served by OpenStreetMap
        }),
        MarkerService.markerVector
      ],

      // the map view will initially show the whole world
      view: new View({
        zoom: 0,
        center: [0, 0],
        constrainResolution: true
      }),
    });

    this.olMap = map;

    axios.default.get('http://localhost:3000/data').then((a) => {
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






    /*$("#kaki").click(e => {
      axios.default.post(
          'http://localhost:3000/data',
          $('#tree').treeview('getChecked').map((v) => v.tags).filter((v => !!v)),
          {responseType: 'blob'}
      ).then((res) => {
        downloadZip(res.data);
      })
    })*/

    function downloadZip(data) {
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'file.zip');
      document.body.appendChild(link);
      link.click();
    }
  }
}
</script>
