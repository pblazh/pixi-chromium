define(
    ['pixi', 'constants', './controller', './game', './views/gamefield'],
    function(PX, constants, Controller, Game, Gamefield){
    'use strict';

    let App = {
        time: 0,
        stage: null,
        init: function(node){
            this.stage = new Gamefield();
            this.renderer = new PX.autoDetectRenderer(constants.GAME_WIDTH,
                                                   constants.GAME_HEIGHT);
            node.appendChild(this.renderer.view);

            this.ticker = PX.ticker.shared;
            this.ticker.autoStart = true;
            this.ticker.add(this.update.bind(this));


            this.game = new Game(this.stage);

            let controller = new Controller();
            controller.start();
            controller.updated.add(this.game.change.bind(this.game));
        },
        update: function(time){
            this.time += time;
            this.game.update(this.time);

            this.renderer.render(this.stage);
        },
    };

    let app = function(node){
        this.init(node);
    };
    app.prototype = App;

    return app;
});
