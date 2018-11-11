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
}

Sprite.prototype.drawAt = function (ctx, x, y) {
    ctx.drawImage(this.image, x, y);
};

Sprite.prototype.drawCentredAt = function (ctx, cx, cy, frame, scale) {   
	
    var w = this.width, h = this.height;
	
    ctx.save();
    ctx.translate(cx, cy);    
	ctx.scale(scale, scale);
	
    ctx.drawImage(this.image, 0, (h / 2) * frame, w, (h / 2), -cx + (g_canvas.width / 2) - (w / 2), -cy + (g_canvas.height / 2), w * 2, h);
    ctx.restore();
};

