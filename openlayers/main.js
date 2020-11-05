import 'ol/ol.css';
import Map from 'ol/Map';
import OSM, {ATTRIBUTION} from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import * as olProj from 'ol/proj';
import ImageLayer from 'ol/layer/Image';
import Projection from 'ol/proj/Projection';
import Static from 'ol/source/ImageStatic';
import {getCenter} from 'ol/extent';

var openCycleMapLayer = new TileLayer({
    source: new OSM({
        attributions: [
            'All maps © <a href="https://www.opencyclemap.org/">OpenCycleMap</a>',
            ATTRIBUTION ],
        url:
            'https://{a-c}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png' +
            '?apikey=0e6fc415256d4fbb9b5166a718591d71',
    }),
});

var openSeaMapLayer = new TileLayer({
    source: new OSM({
        attributions: [
            'All maps © <a href="http://www.openseamap.org/">OpenSeaMap</a>',
            ATTRIBUTION ],
        opaque: false,
        url: 'https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png',
    }),
});

var mySuperLayer = new TileLayer({
    source: new OSM({
        attributions: [
            'All maps © <a href="http://www.openseamap.org/">OpenSeaMap</a>',
            ATTRIBUTION ],
        opaque: false,
        url: 'http://localhost:3000/proxy',
    }),
});


// Map views always need a projection.  Here we just want to map image
// coordinates directly to map coordinates, so we create a projection that uses
// the image extent in pixels.
var extent = [0, 0, 1, 1];
//extent = [18.584784, 47.190287, 50, 50]
var projection = new Projection({
    code: 'xkcd-image',
    units: 'pixels',
    extent: extent,
});

var myImageLayer = new ImageLayer({
    source: new Static({
        attributions: '© <a href="http://xkcd.com/license.html">xkcd</a>',
        url: 'http://localhost:3000/proxy',
        projection: projection,
        resolutions: [62, 62],
        imageExtent: extent,
    }),
    //visible: false,
    minZoom: 2,
    maxZoom: 16,
})
/*
var map = new Map({
    //layers: [openCycleMapLayer, openSeaMapLayer, mySuperLayer],
    layers: [ myImageLayer ],
    target: 'map',
    view: new View({
        maxZoom: 18,
        center: [2068848.69, 5973189.25],
        zoom: 15,
    }),
});*/


var map = new Map({
    layers: [ openCycleMapLayer, myImageLayer ],
    target: 'map',
    view: new View({
        projection: 'EPSG:4326',
        center: [18.584784, 47.190287],
        zoom: 2,
        maxZoom: 16,
    }),
});
//47.190287	18.584784

console.log(olProj.transform([18.584784, 47.190287], 'EPSG:4326', 'EPSG:3857'))
//map.getView().setCenter(olProj.transform([47.190287, 18.584784], 'EPSG:4326', 'EPSG:3857'));
//map.getView().setZoom(5);
