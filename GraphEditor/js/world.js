class World {
    constructor(graph, { roadWidth = 100, roundness = 3 } = {}) {
        this.graph = graph;
        this.roadWidth = roadWidth;
        this.roundness = roundness;
        this.roadBorders = [];
        this.envelopes = [];
        this.generate();
    }

    generate() {
        // reset envelopes 
        this.envelopes.length = 0;

        for (const segment of this.graph.segments) {
            this.envelopes.push(
                new Envelope(segment, this.roadWidth, this.roundness)
            );
        }

        this.roadBorders = Polygon.union(this.envelopes.map(envelope => envelope.polygon));
    }

    draw(ctx) {
        for (const envelope of this.envelopes) {
            envelope.draw(ctx, { fill: "#BBB", stroke: "#BBB", lineWidth: 15 });
        }

        // add road lines between segments
        for (const segment of this.graph.segments) {
            segment.draw(ctx, { color: "white", width: 6, dash: [10, 10] });
        }

        for (const segment of this.roadBorders) {
            segment.draw(ctx, { color: "white", width: 4 });
        }
    }
}