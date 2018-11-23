// ==========
// SHIP STUFF
// ==========

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

// A generic contructor which accepts an arbitrary descriptor object
function Friends(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }

	this.setup();

    this.updateFrames();
    this.stepLength = 10;
	this.leftStepCount = this.stepLength;
	this.rightStepCount = this.stepLength;
    this.randomisePosition();

	spatialManager.register(this);
};

Friends.prototype = new Entity();
Friends.prototype.scale = 1;
Friends.prototype.isRegistered = false;

Friends.prototype.getRadius = function(){
	return (g_sprites.ship.getSpriteWidth() / 2) * 0.5;
};

Friends.prototype.randomisePosition = function () {
    this.cx = this.cx || Math.random() * g_canvas.width;
    this.cy = 590;
};

Friends.prototype.update = function(du) {

    if(this.frameIndex === 0 || this.frameIndex === 1){
		this.cx -= 0.2;
		this.rightStepCount = this.stepLength;
		if(this.leftStepCount == this.stepLength){
			if(this.frameIndex != 0){
				this.frameIndex = 0;
			}
			else if(this.frameIndex == 0){
				this.frameIndex = 1;
			}
			this.leftStepCount = 0;
		}
		else this.leftStepCount++;
    }else if(this.frameIndex === 3 || this.frameIndex === 2){
        this.cx += 0.2;
		this.leftStepCount = this.stepLength;
		if(this.rightStepCount == this.stepLength){
			if(this.frameIndex != 3){
				this.frameIndex = 3;
			}
			else if(this.frameIndex == 3){
				this.frameIndex = 2;
			}
			this.rightStepCount = 0;
		}
		else this.rightStepCount++;
    }
    this.wrapPosition();
};

Friends.prototype.setPos = function (cx, cy) {
    this.cx = cx;
    this.cy = cy;
};

Friends.prototype.getPos = function () {
    return {posX : this.cx, posY : this.cy};
};

Friends.prototype.reset = function () {
    this.setPos(this.reset_cx, this.reset_cy);
	this.frame = 1;
};

Friends.prototype.updateFrames = function(){
    var a = Math.floor(Math.random() * 4);
    this.frameIndex = a;
}

Friends.prototype.wrapPosition = function () {
    var halfwidth = g_canvas.width/2;
	let mapSize = 1000;
    this.cx = util.wrapRange(this.cx, halfwidth, mapSize + halfwidth);
};

Friends.prototype.render = function (ctx) {

    g_sprites.mans.drawWrappedCentred(
        ctx,this.frameIndex, this.cx, this.cy);
};
