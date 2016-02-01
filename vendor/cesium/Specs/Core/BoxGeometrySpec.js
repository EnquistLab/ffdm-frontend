/*global defineSuite*/
defineSuite([
        'Core/BoxGeometry',
        'Core/AxisAlignedBoundingBox',
        'Core/Cartesian3',
        'Core/VertexFormat',
        'Specs/createPackableSpecs'
    ], function(
        BoxGeometry,
        AxisAlignedBoundingBox,
        Cartesian3,
        VertexFormat,
        createPackableSpecs) {
    "use strict";

    it('constructor throws without maximum corner', function() {
        expect(function() {
            return new BoxGeometry({
                maximum : new Cartesian3()
            });
        }).toThrowDeveloperError();
    });

    it('constructor throws without minimum corner', function() {
        expect(function() {
            return new BoxGeometry({
                minimum : new Cartesian3()
            });
        }).toThrowDeveloperError();
    });

    it('constructor creates optimized number of positions for VertexFormat.POSITIONS_ONLY', function() {
        var m = BoxGeometry.createGeometry(new BoxGeometry({
            minimum : new Cartesian3(-1, -2, -3),
            maximum : new Cartesian3(1, 2, 3),
            vertexFormat : VertexFormat.POSITION_ONLY
        }));

        expect(m.attributes.position.values.length).toEqual(8 * 3);
        expect(m.indices.length).toEqual(12 * 3);
    });

    it('constructor computes all vertex attributes', function() {
        var minimumCorner = new Cartesian3(0, 0, 0);
        var maximumCorner = new Cartesian3(1, 1, 1);
        var m = BoxGeometry.createGeometry(new BoxGeometry({
            minimum : minimumCorner,
            maximum : maximumCorner,
            vertexFormat : VertexFormat.ALL
        }));

        expect(m.attributes.position.values.length).toEqual(6 * 4 * 3);
        expect(m.attributes.normal.values.length).toEqual(6 * 4 * 3);
        expect(m.attributes.tangent.values.length).toEqual(6 * 4 * 3);
        expect(m.attributes.binormal.values.length).toEqual(6 * 4 * 3);
        expect(m.attributes.st.values.length).toEqual(6 * 4 * 2);

        expect(m.indices.length).toEqual(12 * 3);

        expect(m.boundingSphere.center).toEqual(Cartesian3.ZERO);
        expect(m.boundingSphere.radius).toEqual(Cartesian3.magnitude(maximumCorner) * 0.5);
    });

    it('fromDimensions throws without dimensions', function() {
        expect(function() {
            return BoxGeometry.fromDimensions();
        }).toThrowDeveloperError();
    });

    it('fromDimensions throws with negative dimensions', function() {
        expect(function() {
            return BoxGeometry.fromDimensions({
                dimensions : new Cartesian3(1, 2, -1)
            });
        }).toThrowDeveloperError();
    });

    it('fromDimensions', function() {
        var m = BoxGeometry.createGeometry(BoxGeometry.fromDimensions({
            dimensions : new Cartesian3(1, 2, 3),
            vertexFormat : VertexFormat.POSITION_ONLY
        }));

        expect(m.attributes.position.values.length).toEqual(8 * 3);
        expect(m.indices.length).toEqual(12 * 3);
    });

    it('fromAxisAlignedBoundingBox throws with no boundingBox', function() {
        expect(function() {
            return BoxGeometry.fromAxisAlignedBoundingBox(undefined);
        }).toThrowDeveloperError();
    });

    it('fromAxisAlignedBoundingBox', function() {
        var min = new Cartesian3(-1, -2, -3);
        var max = new Cartesian3(1, 2, 3);
        var m = BoxGeometry.fromAxisAlignedBoundingBox(new AxisAlignedBoundingBox(min, max));
        expect(m._minimum).toEqual(min);
        expect(m._maximum).toEqual(max);
    });

    createPackableSpecs(BoxGeometry, new BoxGeometry({
        minimum : new Cartesian3(1.0, 2.0, 3.0),
        maximum : new Cartesian3(4.0, 5.0, 6.0),
        vertexFormat : VertexFormat.POSITION_AND_NORMAL
    }), [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0]);
});
