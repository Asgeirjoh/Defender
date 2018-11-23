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
    g_sprites.background.drawAt(ctx, this.cx + offset, 0);
};

Background.prototype.wrapPosition = function(du) {
    offset = util.wrapRange(offset, -mapSize, 0);
};
