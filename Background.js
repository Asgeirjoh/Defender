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
    //this.minimap(ctx);
    /*ctx.translate(offset, 0);
    g_sprites.background.drawAt(ctx, 0, 0);
    ctx.setTransform(1, 0, 0, 1, 0, 0);*/
};

Background.prototype.wrapPosition = function(du) {
    offset = util.wrapRange(offset, -mapSize, 0);
};

Background.prototype.minimap = function(ctx) {
  util.fillBox(ctx, 200, 0, 600, 100, "white");
  g_sprites.background1.drawMinimap(ctx, 200, 5, 600, 100);
  util.drawBorder(ctx, 200, 0, 600, 100, "5", "green");
  for (var i = 0; i < 40; i++) {
    if (typeof entityManager._friends[i] != "undefined") {
      util.fillBox(ctx, 100 + entityManager._friends[i].cx/5, entityManager._friends[i].cy/5 - 5, 5, 5, "blue");
    }
  }
  util.fillBox(ctx, 200 + -offset/5, entityManager._ships[0].cy/5 - 5, 5, 5, "green");
  console.log(offset);
}
