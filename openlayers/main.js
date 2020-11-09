import 'ol/ol.css';
import Map from 'ol/Map';
import OSM, {ATTRIBUTION} from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import {Vector} from 'ol/layer';
import View from 'ol/View';
import * as olProj from 'ol/proj';
import {TileDebug} from 'ol/source';
import {addMarker} from './service/marker'
import {Icon, Style} from 'ol/style';

var mySuperLayer = new TileLayer({

    source: new OSM({
        attributions: [
            'All maps © <a href="https://www.opencyclemap.org/">OpenCycleMap</a>',
            ATTRIBUTION ],
        url: 'http://localhost:3000/proxy/{z}/{x}/{y}',
        //url: 'https://{a-c}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png' + '?apikey=0e6fc415256d4fbb9b5166a718591d71',
    })
})

const coord = olProj.transform([18.584784, 47.190287], 'EPSG:4326', 'EPSG:3857');

var map = new Map({
    layers: [
        new TileLayer({
            source: new OSM(),
        }),
        new TileLayer({
            source: new TileDebug(),
        }),
        new Vector({
            source: addMarker([18.584784, 47.190287]),
            style: new Style({
                image: new Icon({
                    anchor: [0.5, 46],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'pixels',
                    src: 'https://openlayers.org/en/latest/examples/data/icon.png'
                })
            })
        }),
    ],
    target: 'map',
    view: new View({
        center: coord,
        zoom: 15,
        maxZoom: 18,
    }),
});

map.on('click', function(evt) {
    var feature = map.forEachFeatureAtPixel(evt.pixel,
        function (feature) {
            return feature;
        });
    console.warn(feature);
});
