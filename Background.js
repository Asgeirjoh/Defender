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
    g_sprites.background2.drawAt(ctx, offset/3, 100);
    g_sprites.background1.drawAt(ctx, this.cx + offset, 100);
    this.miniMap(ctx);
    this.topScreen(ctx);
    /*ctx.translate(offset, 0);
    g_sprites.background.drawAt(ctx, 0, 0);
    ctx.setTransform(1, 0, 0, 1, 0, 0);*/
};

Background.prototype.wrapPosition = function(du) {
    offset = util.wrapRange(offset, -mapSize, 0);
};

Background.prototype.miniMap = function(ctx) {
  ctx.save();
  ctx.beginPath();
  util.fillBox(ctx, 200, 0, 600, 100, "black");
  g_sprites.backgroundMinimap.drawMinimap(ctx, 200, 0, 600, 100);
  util.drawBorder(ctx, 198, 0, 602, 100, "3", "green");
  ctx.clip();
  for (var i = 0; i < 40; i++) {
    if (typeof entityManager._friends[i] != "undefined") {
      util.fillBox(ctx, 97 + entityManager._friends[i].cx/5, (entityManager._friends[i].cy - 100)/5 - 5, 5, 5, "blue");
    }
  }
  util.fillBox(ctx, 200 + 2 + -offset/5.05 - 3, (entityManager._ships[0].cy - 100)/5 - 5, 7, 7, "white");
  ctx.restore();
}

Background.prototype.topScreen = function(ctx) {
  util.drawBorder(ctx, 0, 0, mapSize, 100, "3", "green");
}
