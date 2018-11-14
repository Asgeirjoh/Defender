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
    this.randomisePosition();
    this.updateFrames();

};

Friends.prototype = new Entity();

Friends.prototype.randomisePosition = function () {
    this.cx = this.cx || Math.random() * g_canvas.width;
    this.cy = 490;
};
// Initial, inheritable, default values
Friends.prototype.cx = 200;
Friends.prototype.cy = 200;
Friends.prototype.velX = 0;
Friends.prototype.velY = 0;
Friends.prototype.numSubSteps = 1;
Friends.prototype.frame = 0;
Friends.prototype.scale = 0.5;

Friends.prototype.update = function(du) {
    if(this.frame === 0){
        this.cx += 0.2;
    }else if(this.frame === 1){
        this.cx -= 0.2;
    }
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
    var a = Math.floor(Math.random() * 2); 
    this.frame = a;
} 



Friends.prototype.updateFrame = function(){
	
	if (keys[this.KEY_LEFT]) {
		this.frame = 0;		       	
    }
	
    if (keys[this.KEY_RIGHT]) {    
		this.frame = 1;			
    }
};

Friends.prototype.wrapPosition = function () {
    offset = util.wrapRange(offset, -3000, 0);
};

Friends.prototype.render = function (ctx) {	
    g_sprites.mans.drawCentredAt(
        ctx, this.cx+offset, this.cy, this.frame, this.scale);
};
