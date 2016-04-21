define(
    ['pixi', 'constants', './controller', './views/main'],
    function(PX, constants, Controller, MainView){
    'use strict';

    let App = {
        time: 0,
        stage: null,
        init: function(node){
            this.stage = new MainView();
            this.renderer = new PX.autoDetectRenderer(constants.GAME_WIDTH,
                                                   constants.GAME_HEIGHT);
            node.appendChild(this.renderer.view);

            this.ticker = PX.ticker.shared;
            this.ticker.autoStart = true;
            this.ticker.add(this.update.bind(this));

            this.controller = new Controller();
            this.controller.start();
            this.controller.updated.add(this.stage.change.bind(this.stage));
        },
        update: function(time){
            this.time += time;
            this.stage.update(this.time);
            this.renderer.render(this.stage);
        },
    };

    let app = function(node){
        this.init(node);
    };
    app.prototype = App;

    return app;
});
