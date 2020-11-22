import * as olProj from 'ol/proj';
import 'regenerator-runtime/runtime'
import {fromLonLat} from 'ol/proj';
import {Feature} from 'ol';
import {Point} from 'ol/geom';
import * as axios from 'axios';
import map from '../containers/TheMap'


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

function createTreeEvents(data) {
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

    tree.on('nodeChecked', function (event, data) {
        console.log('nodeChecked');
        if (data.nodes) {
            data.nodes.forEach(node => $('#tree').treeview('checkNode', [node.nodeId, {silent: false}]));
        } else {
            setFeatureStyle(data.tags.id, checkedStyle);
        }
    });

    tree.on('nodeUnchecked', function (event, data) {
        console.log('nodeUnchecked');
        if (data.nodes) {
            data.nodes.forEach(node => $('#tree').treeview('uncheckNode', [node.nodeId, {silent: false}]));
        } else {
            setFeatureStyle(data.tags.id, uncheckedStyle);
        }
    });
}

function setFeatureStyle(featureId, style) {
    const selectedFeature = MarkerService.markerVector.getSource()
        .getFeatures()
        .find(feature => feature.values_.data.id === featureId)

    selectedFeature.setStyle(style)
}

function findTreeElement(feature){
    const tree = $('#tree');
    const title = feature.values_.data.title;

    const searchResult = tree.treeview('search', [ title, {
        ignoreCase: true,     // case insensitive
        exactMatch: false,    // like or equals
        revealResults: true,  // reveal matching nodes
    }]);

    $(`[data-nodeid=${searchResult[0].nodeId}]`).get(0).scrollIntoView()
    tree.treeview('clearSearch');

    return searchResult[0];
}

export default {
  selectTreeElement : (feature) => {
    $('#tree').treeview('selectNode', [ findTreeElement(feature), { silent: true } ]);
  },
  checkTreeElement : (feature) => {
    const element = findTreeElement(feature);
    $('#tree').treeview('selectNode', [ element, { silent: true } ]);
    $('#tree').treeview('checkNode', [ element, { silent: false } ]);
  }
}
