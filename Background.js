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
};

Background.prototype.render = function(du) {
    this.wrapPosition();
    g_sprites.background.drawAt(ctx, this.cx + offset, 0);
};

Background.prototype.wrapPosition = function(du) {
    offset = util.wrapRange(offset, -1600, 400);
};

function camera() {

}
