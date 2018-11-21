// ========
// ENTITIES
// ========

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

// =========================
// CREATE INITIAL BACKGROUND
// =========================

var Background1 = new Background({
    cx : 0,
    cy : 0,
    velX : 0
});


// =============
// GATHER INPUTS
// =============

function gatherInputs() {
    // Nothing to do here!
    // The event handlers do everything we need for now.
}

// =================
// UPDATE SIMULATION
// =================

// GAME-SPECIFIC UPDATE LOGIC

// GAME-SPECIFIC DIAGNOSTICS
var g_allowMixedActions = true;
var g_useGravity = false;
var g_useAveVel = true;

var KEY_MIXED   = keyCode('N');
var KEY_GRAVITY = keyCode('G');
var KEY_AVE_VEL = keyCode('V');

var KEY_HALT  = keyCode('H');
var KEY_RESET = keyCode('R');

var KEY_0 = keyCode('0');

var KEY_1 = keyCode('1');

var KEY_K = keyCode('K');

function processDiagnostics() {

    if (eatKey(KEY_MIXED))
        g_allowMixedActions = !g_allowMixedActions;

    if (eatKey(KEY_GRAVITY)) g_useGravity = !g_useGravity;

    if (eatKey(KEY_AVE_VEL)) g_useAveVel = !g_useAveVel;

    if (eatKey(KEY_HALT)) entityManager.haltShips();

    if (eatKey(KEY_RESET)) entityManager.resetShips();

    if (eatKey(KEY_0)) entityManager.toggleRocks();

    if (eatKey(KEY_1)) entityManager.generateShip({
	cx : g_mouseX,
	cy : g_mouseY});

    if (eatKey(KEY_K)) entityManager.killNearestShip(
        g_mouseX, g_mouseY);
}

// =================
// RENDER SIMULATION
// =================

// GAME-SPECIFIC RENDERING
function renderSimulation(ctx) {
    Background1.render(ctx);
    entityManager.render(ctx);
}

// =============
// PRELOAD STUFF
// =============

var g_images = {};

function requestPreloads() {

  var requiredImages = {
  ship  	   		: "Pictures/playerSheet.png",
  bullet     		: "Pictures/shot.png",
  background1 		: "Pictures/Background1.png",
  background2 		: "Pictures/Background2.png",
      enemy	   		: "Pictures/enemySheet.png",
      defender   		: "Pictures/defender.png",
      play	   		: "Pictures/play.png",
      menu			: "Pictures/menu.png",
      control			: "Pictures/control.png",
      controls_active	: "Pictures/controls_active.png",
      black 			: "Pictures/black.png",
      play1 			: "Pictures/play1.png",
      back 			: "Pictures/back.png",
      back_active 	: "Pictures/back_active.png",
      man             : "Pictures/man.png",
      mans            : "Pictures/mans.png",
      bombs           : "Pictures/bomb.png",
  };


    imagesPreload(requiredImages, g_images, preloadDone);
}

var g_sprites = {};

function preloadDone() {

    g_sprites.ship = new Sprite(g_images.ship);
    g_sprites.background1 = new Sprite(g_images.background1);
    g_sprites.background2 = new Sprite(g_images.background2);
    g_sprites.bullet = new Sprite(g_images.bullet);
    g_sprites.enemy = new Sprite(g_images.enemy);
    g_sprites.play1 = new Sprite(g_images.play1);
    g_sprites.black = new Sprite(g_images.black);
    g_sprites.back = new Sprite(g_images.back);
    g_sprites.back_active = new Sprite(g_images.back_active);
    g_sprites.play = new Sprite(g_images.play);
    g_sprites.defender = new Sprite(g_images.defender);
    g_sprites.menu = new Sprite(g_images.menu);
    g_sprites.menu = new Sprite(g_images.menu);
    g_sprites.control = new Sprite(g_images.control);
    g_sprites.controls_active = new Sprite(g_images.controls_active);
    g_sprites.man = new Sprite(g_images.man);
    g_sprites.mans = new Sprite(g_images.mans);
    g_sprites.bombs = new Sprite(g_images.bombs);
    main.init();

}

// Kick it off
requestPreloads();
