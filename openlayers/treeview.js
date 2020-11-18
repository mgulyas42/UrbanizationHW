import 'bootstrap-treeview/dist/bootstrap-treeview.min'


$('#tree').treeview({data: getTree()});

function getTree() {
    // Some logic to retrieve, or generate tree structure
    return [
        {
            text: "Parent 1",
            state: {
                checked: false,
                disabled: false,
                expanded: false,
                selected: false
            },
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
