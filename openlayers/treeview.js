import 'bootstrap-treeview/dist/bootstrap-treeview.min'
var main = require('./main');
import * as olProj from 'ol/proj';
var map = require('./main').map;



$('#tree').treeview({
    data: getTree(),
    //multiSelect: true,
    showCheckbox: true
});

$('#tree').on('nodeSelected', function(event, data) {
    console.log('nodeSelected');
    console.log(data);
    console.log(map);
    console.log(Math.abs(map.getView().getZoom() - 18) * 200);
    console.log(map.getView().getZoom());
    console.log(olProj.transform([18.584784, 47.190287], 'EPSG:4326', 'EPSG:3857'));
    map.getView().animate({
        center: olProj.transform([18.584784, 47.190287], 'EPSG:4326', 'EPSG:3857'),
        zoom: 17,
        duration: Math.abs(map.getView().getZoom() - 18) * 200
    })
    // Your logic goes here
});

$('#tree').on('nodeUnselected', function(event, data) {
    // Your logic goes here
    console.log('nodeUnselected');
});

$('#tree').on('nodeChecked', function(event, data) {
    // Your logic goes here
    console.log('nodeChecked');
    data.nodes.forEach(node => $('#tree').treeview('checkNode', [ node.nodeId, { silent: true } ]));
});

$('#tree').on('nodeUnchecked', function(event, data) {
    // Your logic goes here
    console.log('nodeUnchecked');
    data.nodes.forEach(node => $('#tree').treeview('uncheckNode', [ node.nodeId, { silent: true } ]));
});


function getTree() {
    // Some logic to retrieve, or generate tree structure
    return [
        {
            text: "Parent 1",
            nodes: [
                {
                    text: "Child 1",
                    nodes: [
                        {
                            text: "Grandchild 1"
                        },
                        {
                            text: "Grandchild 2"
                        }
                    ]
                },
                {
                    text: "Child 2"
                }
            ]
        },
        {
            text: "Velencei Tav",
            tags: ["18.584784", "47.190287"]
        },
        {
            text: "Parent 3"
        },
        {
            text: "Parent 4"
        },
        {
            text: "Parent 5"
        }
    ];
}
