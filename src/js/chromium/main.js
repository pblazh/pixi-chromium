define(
    ['pixi', 'constants', './views/main'],
    function(PX, constants, MainView){
    'use strict';

    let App = {
        stage: null,
        init: function(node){
            this.stage = new MainView();
            this.renderer = new PX.autoDetectRenderer(constants.GAME_WIDTH,
                                                   constants.GAME_HEIGHT);
            node.appendChild(this.renderer.view);

            this.ticker = PX.ticker.shared;
            this.ticker.autoStart = !false;
            this.ticker.add((time) => this.renderer.render(this.stage));
        },
        update: function(){
            this.renderer.render(this.stage);
        },
    };

    let app = function(node){
        this.init(node);
    };
    app.prototype = App;

    return app;
});
