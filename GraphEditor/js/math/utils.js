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

function translateAngular(loc, angle, offset) {
    return new Point(
        loc.x + (Math.cos(angle) * offset),
        loc.y + (Math.sin(angle) * offset)
    );
}

function getAngle(point) {
    return Math.atan2(point.y, point.x);
}

function linearInterpolation(a, b, t) {
    return a + (b - a) * t;
}

function getIntersection(A, B, C, D) {
    const tTop = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x);
    const uTop = (C.y - A.y) * (A.x - B.x) - (C.x - A.x) * (A.y - B.y);
    const bottom = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y);
    if (bottom != 0) {
        const t = tTop / bottom;
        const u = uTop / bottom;
        if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
            return {
                x: linearInterpolation(A.x, B.x, t),
                y: linearInterpolation(A.y, B.y, t),
                offset: t
            };
        }
    }
    return null;
}

function getRandomColor() {
    const hue = 290 + Math.random() * 260;
    return `hsl(${hue}, 100%, 60%)`;
}

function getMidPoint(point1, point2) {
    return new Point((point1.x + point2.x) / 2, (point1.y + point2.y) / 2);
}
