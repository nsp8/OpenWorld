class Polygon {
    constructor(points) {
        this.points = points;
        this.segments = [];
        for (let i = 1; i <= points.length; i++) {
            this.segments.push(
                new Segment(points[i - 1], points[i % points.length])
            );
        }
    }

    static union(polygons) {
        Polygon.breakAll(polygons);
        const keepSegments = [];
        for (let i = 0; i < polygons.length; i++) {
            for (const segment of polygons[i].segments) {
                let keep = true;
                for (let j = 0; j < polygons.length; j++) {
                    // checking only for segments not in their own polygons
                    if (i != j) {
                        if (polygons[j].midPointContainsSegment(segment)) {
                            keep = false;
                            break;
                        }
                    }
                }
                if (keep) {
                    keepSegments.push(segment);
                }
            }
        }
        return keepSegments;
    }

    containsPoint(point, { threshold = Number.MIN_SAFE_INTEGER } = {}) {
        const outerPoint = new Point(threshold, threshold);
        let intersectionCount = 0;
        for (const segment of this.segments) {
            const intersection = getIntersection(outerPoint, point, segment.point1, segment.point2);
            if (intersection) { intersectionCount++; }
        }
        // if the intersection count is even => the point is outside, and thus doesn't contain the point
        // otherwise, it does contain the point (polgons can be complex and can have odd/even number of intersections)
        return intersectionCount % 2 == 1;
    }

    midPointContainsSegment(segment) {
        const midPoint = getMidPoint(segment.point1, segment.point2);
        return this.containsPoint(midPoint, -1000);
    }

    static breakAll(polygons) {
        for (let i = 0; i < polygons.length - 1; i++) {
            for (let j = i + 1; j < polygons.length; j++) {
                Polygon.break(polygons[i], polygons[j]);
            }
        }
    }

    static break(polgon1, polgon2) {
        const segments1 = polgon1.segments;
        const segments2 = polgon2.segments;
        for (let i = 0; i < segments1.length; i++) {
            for (let j = 0; j < segments2.length; j++) {
                // get intersection between P1, P2 of the first segment and P1, P2 of the second segment
                const intersection = getIntersection(
                    segments1[i].point1,
                    segments1[i].point2,
                    segments2[j].point1,
                    segments2[j].point2,
                );
                // check if segments intersect and if the segments don't intersect exactly at the tip
                if (intersection && intersection.offset != 1 && intersection.offset != 0) {
                    const point = new Point(intersection.x, intersection.y);

                    // keep a reference of the P2 of segment 1
                    let aux = segments1[i].point2;
                    // and replace P2 of the segment 1 with this point
                    segments1[i].point2 = point;
                    // so that the new segment can start from the aux
                    segments1.splice(i + 1, 0, new Segment(point, aux));

                    // repeating the same for the second segment
                    aux = segments2[j].point2;
                    // and replace P2 of the segment 2 with this point
                    segments2[j].point2 = point;
                    // so that the new segment can start from the aux
                    segments2.splice(j + 1, 0, new Segment(point, aux));
                }
            }
        }
    }

    drawSegments(ctx) {
        for (const segment of this.segments) {
            segment.draw(ctx, { color: getRandomColor(), width: 5 });
        }
    }

    draw(ctx, { stroke = "blue", lineWidth = 2, fill = "rgba(0,0,255,0.3)" } = {}) {
        ctx.beginPath();
        ctx.fillStyle = fill;
        ctx.strokeStyle = stroke;
        ctx.lineWidth = lineWidth;
        ctx.moveTo(this.points[0].x, this.points[0].y);
        for (let i = 1; i < this.points.length; i++) {
            ctx.lineTo(this.points[i].x, this.points[i].y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }
}
