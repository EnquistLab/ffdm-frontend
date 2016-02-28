/*global define*/
define([
        '../../Core/defined',
        '../../Core/defineProperties',
        '../../Core/DeveloperError',
        '../../ThirdParty/knockout',
        '../createCommand'
    ], function(
        defined,
        defineProperties,
        DeveloperError,
        knockout,
        createCommand) {
    "use strict";

    /**
     * A view model that represents each item in the {@link BaseLayerPicker}.
     *
     * @alias ProviderViewModel
     * @constructor
     *
     * @param {Object} options The object containing all parameters.
     * @param {String} options.name The name of the layer.
     * @param {String} options.tooltip The tooltip to show when the item is moused over.
     * @param {String} options.iconUrl An icon representing the layer.
     * @param {ProviderViewModel~CreationFunction|Command} options.creationFunction A function or Command
     *        that creates one or more providers which will be added to the globe when this item is selected.
     *
     * @see BaseLayerPicker
     * @see ImageryProvider
     * @see TerrainProvider
     */
    var ProviderViewModel = function(options) {
        //>>includeStart('debug', pragmas.debug);
        if (!defined(options.name)) {
            throw new DeveloperError('options.name is required.');
        }
        if (!defined(options.tooltip)) {
            throw new DeveloperError('options.tooltip is required.');
        }
        if (!defined(options.iconUrl)) {
            throw new DeveloperError('options.iconUrl is required.');
        }
        if (typeof options.creationFunction !== 'function') {
            throw new DeveloperError('options.creationFunction is required.');
        }
        //>>includeEnd('debug');

        var creationCommand = options.creationFunction;
        if (!defined(creationCommand.canExecute)) {
            creationCommand = createCommand(creationCommand);
        }

        this._creationCommand = creationCommand;

        /**
         * Gets the display name.  This property is observable.
         * @type {String}
         */
        this.name = options.name;

        /**
         * Gets the tooltip.  This property is observable.
         * @type {String}
         */
        this.tooltip = options.tooltip;

        /**
         * Gets the icon.  This property is observable.
         * @type {String}
         */
        this.iconUrl = options.iconUrl;

        knockout.track(this, ['name', 'tooltip', 'iconUrl']);
    };

    defineProperties(ProviderViewModel.prototype, {
        /**
         * Gets the Command that creates one or more providers which will be added to
         * the globe when this item is selected.
         * @memberof ProviderViewModel.prototype
         *
         * @type {Command}
         */
        creationCommand : {
            get : function() {
                return this._creationCommand;
            }
        }
    });

    /**
     * A function which creates one or more providers.
     * @callback ProviderViewModel~CreationFunction
     * @returns {ImageryProvider|TerrainProvider|ImageryProvider[]|TerrainProvider[]}
     *          The ImageryProvider or TerrainProvider, or array of providers, to be added
     *          to the globe.
     */

    return ProviderViewModel;
});
