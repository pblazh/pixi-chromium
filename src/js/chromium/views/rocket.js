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
        PX.extras.MovieClip.call(this, [0, 1, 2, 3, 4].map(function(n){return PIXI.Texture.fromFrame('fire_0' + n + '.png')}));
        this.animationSpeed = 0.33;
        this.play();
    }
    FireView = tools.extend(FireView, PX.extras.MovieClip);

    function TieView(){
        this.angle = 0;
        this.points = [];
        let dx = 50/5;
        for (var i = 0; i < 5; i++) {
            this.points.push(new PIXI.Point(i * dx, 0));
        };
        PX.mesh.Rope.call(this, PIXI.Texture.fromImage("tie.png"), this.points);
        this.rotation = Math.PI/2;
    }
    TieView = tools.extend(TieView, PX.mesh.Rope);
    TieView.prototype.update = function(distance){
        this.angle += 0.5;
        for(let i = 0, l = this.points.length; i<l; i++){
            this.points[i].y = i * Math.sin(this.angle + i) * 2;
        }
    }

    function RocketView(){
        PX.Container.call(this);

        this.speedX = 0;
        this.speedY = 0;
        this.accelerationX = 0;
        this.accelerationY = 0;

        const DX = 70;
        this.body = new BodyView();
        this.body.x = -DX;

        this.bluredBody = new BodyView();
        this.bluredBody.x = -DX;
        this.bluredBody.alpha = 0.7;

        this.addChild(this.bluredBody);

        this.fireView = new FireView();
        this.fireView.x = 50 - DX;
        this.fireView.y = 135;
        this.addChild(this.fireView);

        this.addChild(this.body);

        this.tieView = new TieView();
        this.tieView.x = 26 - DX;
        this.tieView.y = 86;
        this.addChild(this.tieView);
    }

    RocketView = tools.extend(RocketView, PX.Container);

    RocketView.prototype.move = function(distance){
        this.tieView.update(distance);
        this.speedX *= 0.9;
        this.speedY *= 0.9;

        this.accelerationX *= 0.99;
        this.accelerationY *= 0.99;

        this.speedX += this.accelerationX;
        this.speedY += this.accelerationY;

        this.speedX = Math.max(-5, Math.min(5, this.speedX));
        this.speedY = Math.max(-5, Math.min(5, this.speedY));

        this.body.gotoAndStop(this.speedX > 0.1 ? 2 : (this.speedX < -0.1 ? 0 : 1));
        this.bluredBody.blur.blurX = this.speedX * 200;
        this.bluredBody.blur.blurY = this.speedY * 200;
        this.bluredBody.x = this.body.x - this.speedX * 20;
        this.bluredBody.y = this.body.y - this.speedY * 20;

        this.rotation = this.speedX / 5;
        this.fireView.animationSpeed = 0.25 + (Math.abs(this.speedX) + Math.abs(this.speedY));

        this.x += this.speedX * 5;
        this.y += this.speedY * 5;
    }

    RocketView.prototype.accelerateX = function(acceleration){
        this.accelerationX = acceleration;
    }
    RocketView.prototype.accelerateY = function(acceleration){
        this.accelerationY = acceleration;
    }

    return RocketView;
});
