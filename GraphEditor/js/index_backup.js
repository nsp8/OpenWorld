const points = [
    new Point(200, 200),
    new Point(500, 200),
    new Point(400, 400),
    new Point(100, 300),
];

const segments = [
    new Segment(points[0], points[1]),
    new Segment(points[0], points[2]),
    new Segment(points[0], points[3]),
    new Segment(points[1], points[2]),
];
const graph = new Graph(points, segments);
function clearGraph() {
    graph.clearGraph();
    reDraw(ctx);
}

function addRandomPoint() {
    graph.addPoint(
        // new Point(100, 300),
        new Point(Math.random() * myCanvas.width, Math.random() * myCanvas.height)
    );
    reDraw(ctx);
}

function removeRandomSegment() {
    if (graph.segments.length == 0) {
        alert("No segments to remove!");
    }
    const index = Math.floor(Math.random() * graph.segments.length);
    graph.removeSegment(graph.segments[index]);
    reDraw(ctx);
}


function removeRandomPoint() {
    if (graph.points.length == 0) {
        alert("No points to remove!");
    }
    const index = Math.floor(Math.random() * graph.points.length);
    graph.removePoint(graph.points[index]);
    reDraw(ctx);
}

function addRandomSegment() {
    const index1 = Math.floor(Math.random() * graph.points.length);
    const index2 = Math.floor(Math.random() * graph.points.length);
    if (index1 != index2) {
        graph.addSegment(
            new Segment(graph.points[index1], graph.points[index2])
        );
    } else {
        console.log("Can't have segment to the same point");
    }
    reDraw(ctx);
}

function addEnforceRandomSegment() {
    let graph_segments = graph.segments.length;
    while (graph.segments.length != graph_segments + 1) {
        addRandomSegment();
    }
}
