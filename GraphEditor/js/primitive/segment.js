class Segment {
    constructor(point1, point2) {
        this.point1 = point1;
        this.point2 = point2;
    }

    draw(
        ctx,
        {
            width = 2,
            color = "black",
            dash = []
        } = {}) {
        ctx.beginPath();
        ctx.lineWidth = width;
        ctx.strokeStyle = color;
        ctx.setLineDash(dash);
        ctx.moveTo(this.point1.x, this.point1.y);
        ctx.lineTo(this.point2.x, this.point2.y);
        ctx.stroke();
        ctx.setLineDash([]); // reset to not affect subsequent lines
    }

    equals(segment) {
        return this.includes(segment.point1) && this.includes(segment.point2);
    }

    includes(point) {
        return this.point1.equals(point) || this.point2.equals(point);
    }

}