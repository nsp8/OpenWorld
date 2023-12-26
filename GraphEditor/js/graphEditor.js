class GraphEditor {
    constructor(canvas, graph) {
        this.canvas = canvas;
        this.graph = graph;
        this.ctx = this.canvas.getContext("2d");
        this.selected = null;
        this.hovered = null;
        this.mousePoint = null;
        this.dragging = false;
        this.#addEventListeners();
    }

    #addEventListeners() {

        // Remove context menu (on right click)
        this.canvas.addEventListener("contextmenu", (evt) => evt.preventDefault());

        // remove draggability when mouse button is released
        this.canvas.addEventListener("mouseup", () => this.dragging = false);

        // note: this of the GraphEditor is bound here to pass to the handler function
        // Mouse click
        this.canvas.addEventListener("mousedown", this.#handleMouseDown.bind(this));

        // Mouse move: highlight points on hovering over them
        this.canvas.addEventListener("mousemove", this.#handleMouseMove.bind(this));
    }

    #handleMouseDown(evt) {

        // check for right click: remove on right click
        if (evt.button == 2) {

            // prioritizing selecting over hovering
            if (this.selected) {
                // de-select point(s) by clicking anywhere on the board
                this.selected = null;
            } else if (this.hovered) {
                this.#removePoint(this.hovered);
            }
        }

        // left click
        if (evt.button == 0) {
            if (this.hovered) {
                this.#selectPoint(this.hovered);
                // enable dragging for this point
                this.dragging = true;
                return;
            }
            this.graph.addPoint(this.mousePoint);

            // add a segment between points
            this.#selectPoint(this.mousePoint);

            // set the current point as selected and hovered
            this.selected = this.mousePoint;
            this.hovered = this.mousePoint;
        }
    }

    #handleMouseMove(evt) {
        this.mousePoint = new Point(evt.offsetX, evt.offsetY);
        this.hovered = getNearestPoint(this.mousePoint, this.graph.points, 10);
        if (this.dragging) {
            // move points on mouse drag
            this.selected.x = this.mousePoint.x;
            this.selected.y = this.mousePoint.y;
        }
    }

    #removePoint(point) {
        this.graph.removePoint(point);
        this.hovered = null;
        if (this.selected == point) {
            this.selected = null;
        }
    }

    #selectPoint(point) {
        // get the previously "selected" (added) point, if it exists
        if (this.selected) {
            // and add a segment between the previous and current point
            this.graph.addSegment(new Segment(this.selected, point));
        }
        this.selected = point;
    }

    display() {
        this.graph.draw(this.ctx);
        if (this.hovered) {
            this.hovered.draw(this.ctx, { fill: true });
        }
        if (this.selected) {
            const intent = this.hovered ? this.hovered : this.mousePoint;
            // draw a dashed line segment from the selected point 
            new Segment(this.selected, this.mousePoint).draw(ctx, { dash: [3, 3] });
            this.selected.draw(this.ctx, { outline: true });
        }
    }
}