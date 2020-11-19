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
    const feature = map.forEachFeatureAtPixel(evt.pixel,
        function (feature) {
            return feature;
        });

    const tree = $('#tree');
    const title = feature.values_.data.title;

    const searchResult = tree.treeview('search', [ title, {
        ignoreCase: true,     // case insensitive
        exactMatch: false,    // like or equals
        revealResults: true,  // reveal matching nodes
    }]);

    tree.treeview('selectNode', [ searchResult[0], { silent: false } ]);
    $(`[data-nodeid=${searchResult[0].nodeId}]`).get(0).scrollIntoView()
    tree.treeview('clearSearch');
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
