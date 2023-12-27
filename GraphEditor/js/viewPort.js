class ViewPort {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.zoom = 1;

        // centering the canvas viewport
        this.center = new Point(canvas.width / 2, canvas.height / 2);
        this.offset = vectorScale(this.center, -1)
        this.drag = {
            start: new Point(0, 0),
            end: new Point(0, 0),
            offset: new Point(0, 0),
            active: false
        };

        this.#addEventListeners();
    }

    #addEventListeners() {
        this.canvas.addEventListener("mousewheel", this.#handleMouseWheel.bind(this));
        this.canvas.addEventListener("mousedown", this.#handleMouseDown.bind(this));
        this.canvas.addEventListener("mousemove", this.#handleMouseMove.bind(this));
        this.canvas.addEventListener("mouseup", this.#handleMouseUp.bind(this));
    }

    resetViewPort() {
        // restore since scale is called for each frame
        this.ctx.restore();

        // clear graph
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // save the state
        this.ctx.save();

        // translate everything to the center in the beginning
        this.ctx.translate(this.center.x, this.center.y);

        // scale with the inverse of the viewport's zoom
        // called for each frame
        this.ctx.scale(1 / this.zoom, 1 / this.zoom);

        // translate the viewport with the calculated offset
        const offset = this.getOffset();
        this.ctx.translate(offset.x, offset.y);

    }

    getMouseOnScaling(evt, { subtractDragOffset = false } = {}) {
        // recalculating the point coordinates, taking into consideration the offset and center information
        const point = new Point(
            (evt.offsetX - this.center.x) * this.zoom - this.offset.x,
            (evt.offsetY - this.center.y) * this.zoom - this.offset.y
        );

        // on dragging middle wheel, the new segment can move away from the direction of motion
        // to rectify this, we subtract the offset from the point
        return subtractDragOffset ? vectorSubtract(point, this.drag.offset) : point;
    }

    getOffset() {
        return vectorAdd(this.offset, this.drag.offset);
    }

    #handleMouseWheel(evt) {
        const zoomDirection = Math.sign(evt.deltaY);
        const step = 0.1;
        this.zoom += zoomDirection * step;
        this.zoom = Math.max(1, Math.min(5, this.zoom));
    }

    #handleMouseDown(evt) {
        // middle mouse button click starts the dragging motion
        if (evt.button == 1) {
            this.drag.start = this.getMouseOnScaling(evt);
            this.drag.active = true;
        }
    }

    #handleMouseMove(evt) {
        // move the viewport
        if (this.drag.active) {
            this.drag.end = this.getMouseOnScaling(evt);
            this.drag.offset = vectorSubtract(this.drag.end, this.drag.start);
        }
    }

    #handleMouseUp(evt) {
        // terminated the dragging motion and reset the viewport when the mouse button is lifted
        if (this.drag.active) {
            this.offset = vectorAdd(this.offset, this.drag.offset);
            this.drag = {
                start: new Point(0, 0),
                end: new Point(0, 0),
                offset: new Point(0, 0),
                active: false
            };
        }
    }
}