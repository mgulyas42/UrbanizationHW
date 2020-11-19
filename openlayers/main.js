import 'ol/ol.css';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import * as olProj from 'ol/proj';
import {TileDebug} from 'ol/source';
import {addTiles} from './service/tile'
import * as axios from 'axios';
import {markerVector} from './marker'

const coord = olProj.transform([18.584784, 47.190287], 'EPSG:4326', 'EPSG:3857');

var map = new Map({
    layers: [
        new TileLayer({
            source: new OSM(),
        }),
        new TileLayer({
            source: new TileDebug(),
        }),
        markerVector
    ],
    target: 'map',
    view: new View({
        center: coord,
        zoom: 15,
        maxZoom: 18,
    }),
});

axios.default.get('http://localhost:3000/marker').then((a) => addTiles(map, a.data))

map.on('click', function (evt) {
    var feature = map.forEachFeatureAtPixel(evt.pixel,
        function (feature) {
            return feature;
        });

    const item = feature.values_.data.item;
    const packageName = feature.values_.data.packageName;

    map.getView().animate({
        center: olProj.transform([item.lat, item.lng], 'EPSG:4326', 'EPSG:3857'),
        zoom: 17,
        duration: Math.abs(map.getView().getZoom() - 18) * 200
    })

    axios.default.get(`http://localhost:3000/marker/meta/${packageName}/${item.id}`).then((a) => {
        console.log(a);
    });
});

$("#kaki").click(e => {
  axios.default.post(
    'http://localhost:3000/almafa',
    $('#tree').treeview('getChecked').map((v) => v.tags).filter((v => !!v)),
    {responseType: 'blob'}
  ).then((res) => {
    downloadZip(res.data);
  })
})

function downloadZip(data) {
  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'file.zip');
  document.body.appendChild(link);
  link.click();
}

exports.map = map;
