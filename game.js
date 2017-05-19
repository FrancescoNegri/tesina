//  Note that this html file is set to pull down Phaser 2.5.0 from the JS Delivr CDN.
//  Although it will work fine with this tutorial, it's almost certainly not the most current version.
//  Be sure to replace it with an updated version before you start experimenting with adding your own code.
var game = new Phaser.Game(/*window.screen.height * (16/9) * scalingFactor*/ 1024, /*window.screen.height * scalingFactor*/ 576, Phaser.CANVAS, 'gameDiv', null, false, false);

var debugMode = true;

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('test', testState);

game.state.start('boot');