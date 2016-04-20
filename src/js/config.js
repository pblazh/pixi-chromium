'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_',
        },
        easel: {
            exports: 'createjs',
        },
    },
    paths: {
        pixi: '../bower_components/pixi.js/bin/pixi.min',
        signals: '../bower_components/js-signals/dist/signals.min',

        constants: './chromium/constants',
        tools: './utils/tools',
    },
});
