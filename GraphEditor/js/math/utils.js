function getNearestPoint(loc, points, threshold = Number.MAX_SAFE_INTEGER) {
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
    return Math.hypot(point1.x - point2.x, point1.y - point2.y);
}