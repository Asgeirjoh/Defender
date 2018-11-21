// ==========
// BACKGROUND
// ==========

"use strict";
/*jslint nomen: true, white: true, plusplus: true*/

function Background(descr) {
  for (var property in descr) {
      this[property] = descr[property];
  }
}
Background.prototype.cx = 0;
Background.prototype.velX = 0;

Background.prototype.update = function(du) {
    this.wrapPosition();
};

Background.prototype.render = function(ctx) {
    g_sprites.background2.drawAt(ctx, offset/3, 0);
    g_sprites.background1.drawAt(ctx, this.cx + offset, 0);
    /*ctx.translate(offset, 0);
    g_sprites.background.drawAt(ctx, 0, 0);
    ctx.setTransform(1, 0, 0, 1, 0, 0);*/
};

Background.prototype.wrapPosition = function(du) {
    offset = util.wrapRange(offset, -mapSize, 0);
};
