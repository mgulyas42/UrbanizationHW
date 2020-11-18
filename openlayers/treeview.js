import 'bootstrap-treeview/dist/bootstrap-treeview.min'

//https://www.npmjs.com/package/bootstrap-treeview


$('#tree').treeview({
    data: getTree(),
    multiSelect: true,
    showCheckbox: true
});

$('#tree').on('nodeSelected', function(event, data) {
    console.log('nodeSelected');
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
            text: "Parent 2"
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
