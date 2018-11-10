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

// ====================
// CREATE INITIAL SHIPS
// ====================

entityManager.generateShip({
    cx : 400,
    cy : 200
});

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
function updateSimulation(du) {

    processDiagnostics();

    entityManager.update(du);

    // Prevent perpetual firing!
    eatKey(Ship.prototype.KEY_FIRE);
}

// GAME-SPECIFIC DIAGNOSTICS
var g_allowMixedActions = true;
var g_useGravity = false;
var g_useAveVel = true;

var KEY_MIXED   = keyCode('M');;
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
	ship  	   : "Pictures/playerSheet.png",
	bullet     : "Pictures/shot.png",
	background : "Spacepic.png"
    };

    imagesPreload(requiredImages, g_images, preloadDone);
}

var g_sprites = {};

function preloadDone() {

    g_sprites.ship = new Sprite(g_images.ship);
    g_sprites.background = new Sprite(g_images.background);
    g_sprites.bullet = new Sprite(g_images.bullet);
    main.init();
}

// Kick it off
requestPreloads();
