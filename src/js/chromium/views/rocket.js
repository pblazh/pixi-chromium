define(
    ['pixi', 'constants', 'tools'],
    function(PX, constants, tools){
    'use strict';


    function FireView(){
        PX.MovieClip.call(this, [0, 1, 2].map(function(n){return PIXI.Texture.fromFrame('fire_0' + n + '.png')}));
        this.animationSpeed = 0.25;
        this.play();
    }
    FireView = tools.extend(FireView, PX.MovieClip);

    function TieView(){
        PX.MovieClip.call(this, [0, 1, 2].map(function(n){return PIXI.Texture.fromFrame('tie_0' + n + '.png')}));
        this.animationSpeed = 0.25;
        this.play();
    }
    TieView = tools.extend(TieView, PX.MovieClip);

    function RocketView(){
        PX.Container.call(this);

        let fireView = new FireView();
        fireView.x = 55;
        fireView.y = 135;
        this.addChild(fireView);

        this.addChild(new PX.Sprite(PIXI.Texture.fromFrame('rocket_00.png')));

        let tieView = new TieView();
        tieView.x = 18;
        tieView.y = 83;
        this.addChild(tieView);
    }
    RocketView = tools.extend(RocketView, PX.Container);

    return RocketView;
});
