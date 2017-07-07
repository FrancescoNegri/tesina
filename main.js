var game = new Phaser.Game(/*window.screen.height * (16/9) * scalingFactor*/ 1024, /*window.screen.height * scalingFactor*/ 576, Phaser.WEBGL, 'gameDiv', null, true, false);

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('level1', level1State);
game.state.add('level2', level2State);
game.state.add('huizinga', huizingaState);
game.state.add('victory', victoryState);

game.state.add('slide1', slide1State);
game.state.add('slide2', slide2State);
game.state.add('slide3', slide3State);

game.state.start('boot');