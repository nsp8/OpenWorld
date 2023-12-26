class Graph {
    constructor(points = [], segments = []) {
        this.points = points;
        this.segments = segments;
    }

    draw(ctx) {
        for (const segment of this.segments) {
            segment.draw(ctx);
        }

        for (const point of this.points) {
            point.draw(ctx);
        }

    }

    containsPoint(point) {
        return this.points.find((p) => p.equals(point));
    }

    addPoint(point) {
        if (!this.containsPoint(point)) {
            this.points.push(point);
        }
    }

    removePoint(point) {
        const segments = this.getAssociatedSegments(point);
        for (const segment of segments) {
            this.removeSegment(segment);
        }
        this.points.splice(this.points.indexOf(point), 1);
    }

    containsSegment(segment) {
        return this.segments.find((s) => s.equals(segment));
    }

    addSegment(segment) {
        if (!this.containsSegment(segment)) {
            this.segments.push(segment);
        } else {
            console.log(`Already exists (${segment.point1.x}, ${segment.point1.y}) --- (${segment.point2.x}, ${segment.point2.y})`);
        }
    }

    removeSegment(segment) {
        this.segments.splice(this.segments.indexOf(segment), 1);
    }

    getAssociatedSegments(point) {
        const segments = [];
        for (const s of this.segments) {
            if (s.includes(point)) {
                segments.push(s);
            }
        }
        return segments;
    }

    clearGraph() {
        this.points.length = 0;
        this.segments.length = 0;
    }

}