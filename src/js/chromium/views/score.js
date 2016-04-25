define(
    ['pixi', 'constants', 'tools'],
    function(PX, constants, tools){
    'use strict';

    function ScoreView(score){
        PX.Container.call(this);

        let text = new PIXI.Text('' + score, {
            font : '56px Serif',
            fill : 0xff7e00,
            align : 'center',
            stroke : '0x000000',
            strokeThickness : 10,
        });
        this.addChild(text);

        this.pivot.x = this.width/2;
        this.pivot.y = this.height/2;

        let ticker = PIXI.ticker.shared;
        let update = (function(time) {
            this.scale.x += 0.03;
            this.scale.y += 0.03;
            this.alpha -= 0.02;
            if(this.alpha <= 0){
                this.parent.removeChild(this);
                ticker.remove(update);
            }
        }).bind(this);

        ticker.add(update);
    }
    ScoreView = tools.extend(ScoreView, PX.Container);


    return ScoreView;
});
