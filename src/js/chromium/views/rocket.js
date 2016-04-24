define(
    ['pixi', 'constants', 'tools'],
    function(PX, constants, tools){
    'use strict';

    function BodyView(){
        PX.extras.MovieClip.call(this, [0, 1, 2].map(function(n){return PIXI.Texture.fromFrame('rocket_0' + n + '.png')}));
        this.animationSpeed = 0.25;

        this.blur = new PIXI.filters.BlurFilter();
        this.blur.blurX = 0;
        this.filters = [this.blur];
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
        this.speed = 0;
        this.acceleration = 0;

        const DX = 70;
        this.body = new BodyView();
        this.body.x = -DX;

        this.bluredBody = new BodyView();
        this.bluredBody.x = -DX;

        let fireView = new FireView();
        fireView.x = 55 - DX;
        fireView.y = 135;
        this.addChild(fireView);

        this.addChild(this.bluredBody);
        this.addChild(this.body);

        let tieView = new TieView();
        tieView.x = 18 - DX;
        tieView.y = 83;
        this.addChild(tieView);
    }

    RocketView = tools.extend(RocketView, PX.Container);

    RocketView.prototype.update = function(angle){
        this.speed *= 0.9;
        this.acceleration *= 0.99;
        this.speed += this.acceleration;
        this.speed = Math.max(-1, Math.min(1, this.speed));

        this.body.gotoAndStop(this.speed > 0.1 ? 2 : (this.speed < -0.1 ? 0 : 1));
        this.bluredBody.blur.blurX = this.speed * 150;
        this.bluredBody.x = this.body.x - this.speed * 10;
    }

    return RocketView;
});
