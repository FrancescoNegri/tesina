var menuState = {
    create: function () {
        let logo = game.add.image(0, 0, 'title-text');
        let start = game.add.image(0, 0, 'title-start');

        let startKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        startKey.onDown.addOnce(this.start, this);

        //Blinking text
        let startTween = game.add.tween(start);
        startTween.to({ alpha: 0.05 }, 1000, Phaser.Easing.Cubic.Out, true, 0, -1, true);
    },

    start: function () {
        goFullScreen();
        game.canvas.style.cursor = 'none';
        game.state.start('level1');
    }
}