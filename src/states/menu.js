var menuState = {
    create: function () {

        var nameLabel = game.add.text(80, 80, 'My first game - TESINA', { font: '25px Arial', fill: '#FFFFFF' });
        var startLabel = game.add.text(80, game.world.height - 80, 'press the W key', { font: '25px Arial', fill: '#FFFFFF' });

        var wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        wkey.onDown.addOnce(this.start, this);
    },

    start: function () {

        game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        if (fullScreen) game.scale.startFullScreen(false);
        game.canvas.style.cursor = 'none';
        game.state.start('level1');
    }
}