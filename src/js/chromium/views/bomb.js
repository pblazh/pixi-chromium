define(
    ['pixi', 'constants', 'tools'],
    function(PX, constants, tools){
    'use strict';

    function FireView(){
        PX.extras.MovieClip.call(this, [0, 1, 2].map(function(n){return PIXI.Texture.fromFrame('ignition_0' + n + '.png')}));
        this.x = this.y = 30;
        this.animationSpeed = 0.25;
        this.play();
    }
    FireView = tools.extend(FireView, PX.extras.MovieClip);

    function BodyView(){
        PX.Sprite.call(this, PIXI.Texture.fromFrame('bomb.png'));
    }
    BodyView = tools.extend(BodyView, PX.Sprite);

    function BombView(){
        PX.Container.call(this);
        this.addChild(new BodyView());
        this.addChild(new FireView());

        this.pivot.x = this.width/2;
        this.pivot.y = this.height/2;

        let direction = Math.random() > 0.5 ? 1 : -1;
        this.speed = (0.01 + Math.random() * 0.02) * direction;
        this.angle = 0;
        this.speedY = 0;
        this.speedX = 0;
    }

    BombView = tools.extend(BombView, PX.Container);

    BombView.prototype.move = function(distance){
        this.angle += this.speed;
        this.speedX = Math.cos(this.angle) * 1;
        this.speedY = Math.abs(Math.sin(this.angle) * 2);

        this.rotation = this.speedX / 5;
        this.x += this.speedX;
        this.y += this.speedY;
    }

    return BombView;
});
