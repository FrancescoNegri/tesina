var victoryState = {
    create: function () {
        let text = game.add.image(0, 0, 'victory-text');
        var wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        wkey.onDown.addOnce(this.start, this);

        let startTween = game.add.tween(text);
        startTween.to({ alpha: 0.05 }, 1000, Phaser.Easing.Cubic.Out, true, 0, -1, true);
    },

    start: function () {
        game.state.start('menu');
    }
}