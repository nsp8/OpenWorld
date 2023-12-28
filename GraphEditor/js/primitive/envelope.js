class Envelope {
    constructor(skeleton, envelopeWidth, borderRadius) {
        this.skeleton = skeleton;
        this.polygon = this.#generatePolygon(envelopeWidth, borderRadius);
    }

    #generatePolygon(width, borderRadius) {
        const { point1, point2 } = this.skeleton;
        const radius = width / 2;

        // angle between the points p1 and p2
        const alpha = getAngle(vectorSubtract(point1, point2));

        // angular offset of each point based on the angle counter clockwise and clockwise
        const p1Neighbours = this.getNeighbouringPoints(point1, { radius, alpha, smoothingFactor: borderRadius });
        const p2Neighbours = this.getNeighbouringPoints(point2, { radius, alpha, smoothingFactor: borderRadius, isEnd: true });
        return new Polygon([...p1Neighbours, ...p2Neighbours]);
    }

    draw(ctx, options) {
        this.polygon.draw(ctx, options);
        // testing the intersections of segments
        // this.polygon.drawSegments(ctx);
    }

    getNeighbouringPoints(point, { radius, alpha, smoothingFactor = 20, isEnd = false } = {}) {
        const step = Math.PI / Math.max(1, smoothingFactor);
        const offsetAngleClock = alpha + Math.PI / 2;
        const offsetAngleCounterClock = alpha - Math.PI / 2;
        const points = [];
        for (let i = offsetAngleCounterClock; i <= offsetAngleClock; i += step) {
            let angle = isEnd ? (Math.PI + i) : i;
            points.push(translateAngular(point, angle, radius));
        }
        return points;
    }

}
