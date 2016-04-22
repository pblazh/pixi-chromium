define(
    ['pixi', 'constants', 'tools'],
    function(PX, constants, tools){
    'use strict';

    function BodyView(){
        PX.extras.MovieClip.call(this, [0, 1, 2].map(function(n){return PIXI.Texture.fromFrame('rocket_0' + n + '.png')}));
        this.animationSpeed = 0.25;
    }
    BodyView = tools.extend(BodyView, PX.extras.MovieClip);


    function FireView(){
        PX.extras.MovieClip.call(this, [0, 1, 2].map(function(n){return PIXI.Texture.fromFrame('fire_0' + n + '.png')}));
        this.animationSpeed = 0.25;
        this.play();
    }
    FireView = tools.extend(FireView, PX.extras.MovieClip);

    function TieView(){
        PX.extras.MovieClip.call(this, [0, 1, 2].map(function(n){return PIXI.Texture.fromFrame('tie_0' + n + '.png')}));
        this.animationSpeed = 0.25;
        this.play();
    }
    TieView = tools.extend(TieView, PX.extras.MovieClip);

    function RocketView(){
        PX.Container.call(this);

        const DX = 70;
        this.body = new BodyView();
        this.body.x = -DX;

        let fireView = new FireView();
        fireView.x = 55 - DX;
        fireView.y = 135;
        this.addChild(fireView);

        this.addChild(this.body);

        let tieView = new TieView();
        tieView.x = 18 - DX;
        tieView.y = 83;
        this.addChild(tieView);
    }

    RocketView = tools.extend(RocketView, PX.Container);

    RocketView.prototype.tilt = function(angle){
        if(angle < 0){
            this.body.gotoAndStop(0);
        }else if(angle > 0){
            this.body.gotoAndStop(2);
        }else{
            this.body.gotoAndStop(1);
        }
    }

    return RocketView;
});
