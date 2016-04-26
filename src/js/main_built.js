require(['pixi', 'chromium/main'], function (PX, App) {
    'use strict';
    /* Just an entrance point */
    PX.loader.add('assets/sprites.json')
            .load(() => new App(document.getElementById('app')));
});
