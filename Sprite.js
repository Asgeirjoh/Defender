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
    this.image = image;

    this.width = image.width;
    this.height = image.height; 
	
	this.scale = image.scale;
}

Sprite.prototype.drawAt = function (ctx, x, y) {
    ctx.drawImage(this.image, x, y);
};

Sprite.prototype.drawCentredAt = function (ctx, cx, cy, rotation, frame) {
    if (rotation === undefined) rotation = 0;
	
    var w = this.width, h = this.height;

	if(w > 32){
		this.scale = 32 / w;
	}
	
	if(frame < 0){
		frame = 0;
	}
	
    ctx.save();
    ctx.translate(cx, cy);    
	ctx.scale(this.scale, this.scale);
	
    ctx.drawImage(this.image, 1, (h / 2) * frame, w, (h / 2), -cx + (g_canvas.width / 2) - (w / 2), -cy + (g_canvas.height / 2), w * 2, h);
    ctx.restore();
};

Sprite.prototype.drawWrappedCentredAt = function (ctx, cx, cy, rotation, frame) {

    // Get "screen width"
    var sw = g_canvas.width;

    // Draw primary instance
    this.drawWrappedVerticalCentredAt(ctx, cx, cy, rotation, frame);
};

Sprite.prototype.drawWrappedVerticalCentredAt = function (ctx, cx, cy, rotation, frame) {

    // Get "screen height"
    var sh = g_canvas.height;

    // Draw primary instance
    this.drawCentredAt(ctx, cx, cy, rotation, frame);
};
