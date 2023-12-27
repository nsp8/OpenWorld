function getNearestPoint(loc, points, threshold = Number.MAX_SAFE_INTEGER) {
    // returns the nearest point on the graph from the current mouse position, within a threshold of distance
    let minimumDistance = Number.MAX_SAFE_INTEGER;
    let nearest = null;
    for (const point of points) {
        const distance = getDistance(point, loc);
        if (distance < minimumDistance && distance < threshold) {
            minimumDistance = distance;
            nearest = point;
        }
    }
    return nearest;
}

function getDistance(point1, point2) {
    // calculates the Euclidean distance between two points
    return Math.hypot(point1.x - point2.x, point1.y - point2.y);
}

function vectorAdd(point1, point2) {
    // calculates the vector addition of two points on the graph
    return new Point(point1.x + point2.x, point1.y + point2.y);
}

function vectorSubtract(point1, point2) {
    // calculates the vector subtraction of two points on the graph
    return new Point(point1.x - point2.x, point1.y - point2.y);
}

function vectorScale(point, scaler) {
    // calculates the scaled point a point on the graph
    return new Point(point.x * scaler, point.y * scaler);
}