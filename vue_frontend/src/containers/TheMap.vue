<template>
  <div ref="map-root"
       style="width: 100%; height: 100%">
    <TheMarker :map="olMap"></TheMarker>
    <!--<button class="openbtn" onclick="openNav()">&#9776;</button>-->
  </div>
</template>

<script>
import View from 'ol/View'
import Map from 'ol/Map'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import 'ol/ol.css'
import * as axios from "axios";
import { addTiles } from "@/service/tile";
import MarkerService from "./MarkerService";
import { Feature } from "ol";
import { Point } from "ol/geom";
import { fromLonLat } from "ol/proj";
import TheMarker from "@/containers/ContextMenuContainer";

export default {
  name: 'TheMap',
  components: {TheMarker},
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
    //this.olMap.push(map);
    //console.log(map);
    //init(map);

    axios.default.get('http://localhost:3000/data').then((a) => addTiles(map, a.data))
    // this is where we create the OpenLayers map

    /*$("#kaki").click(e => {
      axios.default.post(
          'http://localhost:3000/data',
          $('#tree').treeview('getChecked').map((v) => v.tags).filter((v => !!v)),
          {responseType: 'blob'}
      ).then((res) => {
        downloadZip(res.data);
      })
    })*/


    axios.default.get('http://localhost:3000/data').then((a) => {
      let data = [];

      for (const [packageName, values] of Object.entries(a.data)) {
        data.push({
          text: packageName,
          nodes: values.map((item) => {
            return {
              tags: {...item, packageName},
              text: item.title
            };
          })
        });
      }

      data.forEach(rootPackage => {
        const features = rootPackage.nodes.map(data => new Feature({
          geometry: new Point(fromLonLat([data.tags.lat, data.tags.lng])),
          data: data.tags,
          style: MarkerService.uncheckedStyle
        }));
        MarkerService.markerVector.getSource().addFeatures(features);
      })

      //createTreeEvents(data);
    });

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
