// ============
// SPRITE STUFF
// ============

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

// Construct a "sprite" from the given `image`,
//
function Sprite(image) {
	this._SPRITE_HEIGHT = 32;
    this.image = image;

    this.width = image.width;
    this.height = image.height;
	this._imageFrames = this.height / this._SPRITE_HEIGHT ;		
}

Sprite.prototype.getImageFrames = function(){
	return this._imageFrames;
};

Sprite.prototype.getSpriteHeight = function(){
	return this._SPRITE_HEIGHT;
};

Sprite.prototype.drawAt = function (ctx, x, y) {
    ctx.drawImage(this.image, x, y);
};

Sprite.prototype.drawCentredAt = function (ctx, cx, cy, frame, scale) {   
	
    var w = this.width, h = this.height / this._imageFrames;	
    ctx.save();   
	ctx.scale(scale, scale);	
    ctx.drawImage(this.image, 0, h * frame, w, h, cx, cy, w, h);
    ctx.restore();
};

