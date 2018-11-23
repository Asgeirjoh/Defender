// ============
// SPRITE STUFF
// ============

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

// Construct a "sprite" from the given `image`.
function Sprite(image) {
	this._SPRITE_DIMENSION = 32;
    this.image = image;
	this.mapSize = g_canvas.width;
    this.width = image.width;
    this.height = image.height;

	this._imageFrames = image.width / this._SPRITE_DIMENSION;
}

Sprite.prototype.getImageFrames = function(){
	return this._imageFrames;
};

Sprite.prototype.getSpriteWidth = function(){
	return (this.width / this._imageFrames);
};

Sprite.prototype.getSpriteHeight = function(){
	return this.height;
};

Sprite.prototype.drawMinimap = function (ctx, x, y, sx, sy) {
	this.x = x;
	this.y = y;
	ctx.drawImage(this.image, x, y, sx, sy);
};

Sprite.prototype.drawAt = function (ctx, x, y) {
    this.x = x;
    this.y = y;
    ctx.drawImage(this.image, x, y);
};

Sprite.prototype.drawCentred = function (ctx, cx, cy, rotation) {
    this.x = cx;
    this.y = cy;
    if (rotation === undefined) rotation = 0;

    var w = this.width,
        h = this.height;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rotation);
    ctx.scale(this.scale, this.scale);

    // drawImage expects "top-left" coords, so we offset our destination
    // coords accordingly, to draw our sprite centred at the origin
    ctx.drawImage(this.image, -w/2, -h/2);

    ctx.restore();
};


Sprite.prototype.drawCentredAt = function (ctx, cx, cy, frame, scale){
	let w = this.getSpriteWidth();
	let h = this.getSpriteHeight();
	let f = frame * w;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(scale, scale);

	ctx.drawImage(this.image, f, 0, w, h, (-w / 2), (-h / 2), w, h);
    ctx.restore();
};


Sprite.prototype.drawWrappedCentredAt = function (ctx, cx, cy, frame, scale) {

    // Get "screen width"
    var sw = g_canvas.width;

    // Draw primary instance
    this.drawWrappedVerticalCentredAt(ctx, cx, cy, frame, scale);

    // Left and Right wraps
    this.drawWrappedVerticalCentredAt(ctx, cx - this.mapSize, cy, frame, scale);
    this.drawWrappedVerticalCentredAt(ctx, cx + this.mapSize, cy, frame, scale);
};

Sprite.prototype.drawWrappedVerticalCentredAt = function (ctx, cx, cy, frame, scale) {

    // Get "screen height"
    var sh = g_canvas.height;

    this.drawCentredAt(ctx, cx, cy, frame, scale);
};

Sprite.prototype.drawWrappedCentred = function (ctx, frame, cx, cy) {

    // Get "screen width"
    var sw = g_canvas.width;

    // Draw primary instance
    this.drawWrappedVerticalCentred(ctx, cx, cy, frame);

    // Left and Right wraps
    this.drawWrappedVerticalCentred(ctx, cx - this.mapSize, cy, frame);
    this.drawWrappedVerticalCentred(ctx, cx + this.mapSize, cy, frame);
};

Sprite.prototype.drawWrappedVerticalCentred = function (ctx, cx, cy, frame) {

    // Get "screen height"
    var sh = g_canvas.height;

    this.drawSpriteIndex(ctx, frame, cx, cy);
};

Sprite.prototype.drawSpriteIndex = function(ctx, index, cx, cy){
    ctx.save();
    ctx.drawImage(this.image, (index*this.width/4)-1, 0, this.width/4,50, cx-this.width/3/2, cy-this.height/2, this.width/4, this.height);
    ctx.restore();
};
