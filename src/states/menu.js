var menuState = {
    create: function () {
        let style = { font: "bold 40px Arial", fill: "#fff"};
        let nameLabel = game.add.text(80, 80, 'My first game - TESINA', style);
        let startLabel = game.add.text(80, game.world.height - 80, 'press the W key', style);
        nameLabel.anchor.setTo(0.5, 0.5);
        startLabel.anchor.setTo(0.5, 0.5);

        nameLabel.x = game.world.centerX;
        startLabel.x = game.world.centerX;


        let wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        wkey.onDown.addOnce(this.start, this);
    },

    start: function () {

        game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        if (fullScreen) game.scale.startFullScreen(false);
        game.canvas.style.cursor = 'none';
        game.state.start('level1');
    }
}