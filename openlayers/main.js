import 'ol/ol.css';
import Map from 'ol/Map';
import OSM, {ATTRIBUTION} from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import {Vector} from 'ol/layer';
import View from 'ol/View';
import * as olProj from 'ol/proj';
import {TileDebug} from 'ol/source';
import {addMarker} from './service/marker'
import {addTiles} from './service/tile'
import {Icon, Style} from 'ol/style';
import * as axios from 'axios';

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
        })
    ],
    target: 'map',
    view: new View({
        center: coord,
        zoom: 15,
        maxZoom: 18,
    }),
});

axios.default.get('http://localhost:3000/marker').then((a) => {
    console.log(a.data);
    map.addLayer(new Vector({
        source: addMarker(a.data),
        maxZoom: 18,
        minZoom: 2,
        style: new Style({
            image: new Icon({
                anchor: [0.5, 46],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                src: 'https://openlayers.org/en/latest/examples/data/icon.png'
            })
        })
    }));

    addTiles(map, a.data);
})

map.on('click', function(evt) {
    var feature = map.forEachFeatureAtPixel(evt.pixel,
        function (feature) {
            return feature;
        });
    map.getView().animate({
        center: olProj.transform([feature.values_.data.lat, feature.values_.data.lng], 'EPSG:4326', 'EPSG:3857'),
        zoom: 17,
        duration: Math.abs(map.getView().getZoom() - 18) * 200
    })

    const id = feature.values_.data.id
    axios.default.get(`http://localhost:3000/marker/meta/${id}`).then((a) => {
         console.log(a);
    });
});
