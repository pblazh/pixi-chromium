define(
    ['pixi', 'constants', 'tools'],
    function(PX, constants, tools){
    'use strict';

    function TotalScoreView(score){
        PX.Container.call(this);

        let text = new PIXI.Text('' + score, {
            font : '168px Serif',
            fill : 0xff7e00,
            align : 'center',
            stroke : '0x000000',
            strokeThickness : 20,
        });
        this.addChild(text);

        this.pivot.x = this.width/2;
        this.pivot.y = this.height/2;
    }
    TotalScoreView = tools.extend(TotalScoreView, PX.Container);


    return TotalScoreView;
});
