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
   
	this._imageFrames = this.height / this._SPRITE_HEIGHT;		
}

Sprite.prototype.getImageFrames = function(){
	return this._imageFrames;
};

Sprite.prototype.getSpriteWidth = function(){
	return this.width;
};

Sprite.prototype.getSpriteHeight = function(){
	return this._SPRITE_HEIGHT;
};

Sprite.prototype.drawAt = function (ctx, x, y) {
    ctx.drawImage(this.image, x, y);
};

Sprite.prototype.drawCentredAt = function (ctx, cx, cy, frame, scale) {    
    
    var w = this.width,
        h = this.height;

    ctx.save();
    ctx.translate(cx, cy);    
    ctx.scale(scale, scale);
 
    ctx.drawImage(this.image, 0, this._SPRITE_HEIGHT * frame, w, this._SPRITE_HEIGHT, -w/2, -h/2, w, h);
    
    ctx.restore();
}; 

Sprite.prototype.drawWrappedCentredAt = function (ctx, cx, cy, frame, scale) {
    
    // Get "screen width"
    var sw = g_canvas.width;
    
    // Draw primary instance
    this.drawWrappedVerticalCentredAt(ctx, cx, cy, frame, scale);
    
    // Left and Right wraps
    this.drawWrappedVerticalCentredAt(ctx, cx - sw, cy, frame, scale);
    this.drawWrappedVerticalCentredAt(ctx, cx + sw, cy, frame, scale);
};

Sprite.prototype.drawWrappedVerticalCentredAt = function (ctx, cx, cy, frame, scale) {

    // Get "screen height"
    var sh = g_canvas.height;
    
    // Draw primary instance
    this.drawCentredAt(ctx, cx, cy, frame, scale);
    
    // Top and Bottom wraps
    this.drawCentredAt(ctx, cx, cy - sh, frame, scale);
    this.drawCentredAt(ctx, cx, cy + sh, frame, scale);
};
