/*global defineSuite*/
defineSuite([
        'Scene/PolylineMaterialAppearance',
        'Core/Cartesian3',
        'Core/GeometryInstance',
        'Core/PolylineGeometry',
        'Renderer/ClearCommand',
        'Scene/Appearance',
        'Scene/Material',
        'Scene/Primitive',
        'Specs/createCamera',
        'Specs/createContext',
        'Specs/createFrameState',
        'Specs/render'
    ], function(
        PolylineMaterialAppearance,
        Cartesian3,
        GeometryInstance,
        PolylineGeometry,
        ClearCommand,
        Appearance,
        Material,
        Primitive,
        createCamera,
        createContext,
        createFrameState,
        render) {
    "use strict";

    var context;
    var us;
    var frameState;

    beforeAll(function() {
        context = createContext();
    });

    afterAll(function() {
        context.destroyForSpecs();
    });

    beforeEach(function() {
        frameState = createFrameState(context, createCamera());
        us = context.uniformState;
        us.update(frameState);
    });

    it('constructor', function() {
        var a = new PolylineMaterialAppearance();

        expect(a.material).toBeDefined();
        expect(a.material.type).toEqual(Material.ColorType);
        expect(a.vertexShaderSource).toBeDefined();
        expect(a.fragmentShaderSource).toBeDefined();
        expect(a.renderState).toEqual(Appearance.getDefaultRenderState(true, false));
        expect(a.vertexFormat).toEqual(PolylineMaterialAppearance.VERTEX_FORMAT);
        expect(a.translucent).toEqual(true);
        expect(a.closed).toEqual(false);
    });

    it('renders', function() {
        var primitive = new Primitive({
            geometryInstances : new GeometryInstance({
                geometry : new PolylineGeometry({
                    positions : [
                        new Cartesian3(0.0, -1.0, 0.0),
                        new Cartesian3(0.0, 1.0, 0.0)
                    ],
                    width : 10.0,
                    vertexFormat : PolylineMaterialAppearance.VERTEX_FORMAT,
                    followSurface: false
                })
            }),
            appearance : new PolylineMaterialAppearance({
                material : Material.fromType(Material.PolylineOutlineType),
                translucent : false
            }),
            asynchronous : false
        });

        ClearCommand.ALL.execute(context);
        expect(context.readPixels()).toEqual([0, 0, 0, 0]);

        render(frameState, primitive);
        expect(context.readPixels()).not.toEqual([0, 0, 0, 0]);
    });

}, 'WebGL');
