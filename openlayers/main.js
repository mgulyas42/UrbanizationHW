import 'ol/ol.css';
import Map from 'ol/Map';
import OSM, {ATTRIBUTION} from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import * as olProj from 'ol/proj';
import XYZ from 'ol/source/XYZ';
import ImageLayer from 'ol/layer/Image';
import Projection from 'ol/proj/Projection';
import Static from 'ol/source/ImageStatic';
import {TileDebug} from 'ol/source';
import TileGrid from 'ol/tilegrid/TileGrid';
import {getCenter, getWidth} from 'ol/extent';

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


var projExtent = olProj.get('EPSG:4326').getExtent();
console.log(projExtent);
var startResolution = getWidth(projExtent) / 256;
var resolutions = new Array(22);
for (var i = 0, ii = resolutions.length; i < ii; ++i) {
    resolutions[i] = startResolution / Math.pow(2, i);
}
var tileGrid = new TileGrid({
    extent: [-13884991, 2870341, -7455066, 6338219],
    resolutions: resolutions,
    tileSize: [256, 256]
});

/*var mySuperLayer = new TileLayer({
    source: new XYZ({
        url: 'http://localhost:3000/proxy/{z}/{x}/{y}',
        wrapX: false,
        tileGrid: tileGrid
    })
});*/
var mySuperLayer = new TileLayer({

    source: new OSM({
        attributions: [
            'All maps © <a href="https://www.opencyclemap.org/">OpenCycleMap</a>',
            ATTRIBUTION ],
        url: 'http://localhost:3000/proxy/{z}/{x}/{y}.png',
        //url: 'https://{a-c}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png' + '?apikey=0e6fc415256d4fbb9b5166a718591d71',
    })
})


// Map views always need a projection.  Here we just want to map image
// coordinates directly to map coordinates, so we create a projection that uses
// the image extent in pixels.
/*var extent = [0, 0, 16, 16];
//extent = [18.584784, 47.190287, 50, 50]
var projection = new Projection({
    code: 'xkcd-image',
    units: 'pixels',
    extent: extent,
});*/

/*var myImageLayer = new ImageLayer({
    source: new Static({
        attributions: '© <a href="http://xkcd.com/license.html">xkcd</a>',
        url: 'http://localhost:3000/proxy',
        projection: 'EPSG:4326',
        resolutions: [16, 16],
        imageExtent: extent,
    }),
    //visible: false,
    minZoom: 10,
    maxZoom: 18,
})*/
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
    layers: [
        new TileLayer({
            source: new OSM(),
        }),
        new TileLayer({
            source: new TileDebug(),
        }),
        mySuperLayer
    ],
    target: 'map',
    view: new View({
        //projection: 'EPSG:4326',
        center: [18.584784, 47.190287],
        zoom: 15,
        maxZoom: 18,
    }),
});
//47.190287	18.584784

console.log(olProj.transform([18.584784, 47.190287], 'EPSG:4326', 'EPSG:3857'))
//map.getView().setCenter(olProj.transform([47.190287, 18.584784], 'EPSG:4326', 'EPSG:3857'));
//map.getView().setZoom(5);
