import 'bootstrap-treeview/dist/bootstrap-treeview.min'
import * as olProj from 'ol/proj';
import 'regenerator-runtime/runtime'
import { fromLonLat } from 'ol/proj';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
const map = require('./main').map;
import * as axios from 'axios';


axios.default.get('http://localhost:3000/marker').then((a) => {
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

    init(data);
});

function init(data) {

    const markerSource = getMarkerSource();
    const tree = $('#tree');

    tree.treeview({
        data: data,
        //multiSelect: true,
        showCheckbox: true
    });

    tree.on('nodeSelected', function (event, data) {
        console.log('nodeSelected');

        map.getView().animate({
            center: olProj.transform([data.tags.lat, data.tags.lng], 'EPSG:4326', 'EPSG:3857'),
            zoom: 17,
            duration: Math.abs(map.getView().getZoom() - 18) * 200
        })
    });

    tree.on('nodeUnselected', function (event, data) {
        // Your logic goes here
        console.log('nodeUnselected');
    });

    tree.on('nodeChecked', function (event, data) {
        // Your logic goes here
        console.log('nodeChecked');
        if(data.nodes) {
            data.nodes.forEach(node => $('#tree').treeview('checkNode', [node.nodeId, {silent: false}]));
        }
        else{
            markerSource.addFeature(new Feature({
                geometry: new Point(fromLonLat([data.tags.lat, data.tags.lng])),
                data: data.tags,
            }))
        }
    });

    tree.on('nodeUnchecked', function (event, data) {
        // Your logic goes here
        console.log('nodeUnchecked');
        if(data.nodes) {
            data.nodes.forEach(node => $('#tree').treeview('uncheckNode', [node.nodeId, {silent: false}]));
        }
        else{
            removeSelectedFeature(markerSource, data.tags.id);
        }
    });
}

function getMarkerSource(){
    let source;

    map.getLayers().forEach(function (layer) {
        if (layer.get('name') !== undefined && layer.get('name') === 'markers') {
            source = layer.getSource();
        }
    });

    return source;
}

async function removeSelectedFeature(markerSource, selectedFeatureID) {
    const selectedFeature = markerSource
        .getFeatures()
        .find(feature => feature.values_.data.id === selectedFeatureID);

    markerSource.removeFeature(selectedFeature);
}
