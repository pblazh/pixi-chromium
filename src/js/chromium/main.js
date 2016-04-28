define(
    ['pixi', 'constants', './controller', './game', './views/gamefield', './views/keyboard'],
    function(PX, constants, Controller, Game, Gamefield, KeyboardView){
    'use strict';

    let App = {
        time: 0,
        stage: null,
        init: function(node){
            this.stage = new Gamefield();
            this.renderer = new PX.autoDetectRenderer(constants.GAME_WIDTH,
                                                   constants.GAME_HEIGHT);
            node.appendChild(this.renderer.view);

            let keyboard = new KeyboardView();
            keyboard.x = 20;
            keyboard.y = 510;
            this.stage.addChild(keyboard);
            this.ticker = PX.ticker.shared;
            this.ticker.add(this.update.bind(this));

            let controller = new Controller();
            this.game = new Game(this.stage);
            this.game.complete.add(()=> controller.stop());

            controller.start();
            controller.updated.add(this.game.change.bind(this.game));
            controller.updated.add(keyboard.change.bind(keyboard));

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
