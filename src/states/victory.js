var victoryState = {
    create: function () {
        let text = game.add.image(0, 0, 'victory-text');
        var wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        wkey.onDown.addOnce(this.start, this);

        var slide1key = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
        var slide2key = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
        var slide3key = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
        slide1key.onDown.addOnce(this.startSlide1, this);
        slide2key.onDown.addOnce(this.startSlide2, this);
        slide3key.onDown.addOnce(this.startSlide3, this);

        let startTween = game.add.tween(text);
        startTween.to({ alpha: 0.05 }, 1000, Phaser.Easing.Cubic.Out, true, 0, -1, true);
    },

    start: function () {
        game.state.start('menu');
    },

    startSlide1: function () {
        goFullScreen();
        game.state.start('slide1');
    },
    startSlide2: function () {
        goFullScreen();
        game.state.start('slide2');
    },
    startSlide3: function () {
        goFullScreen();
        game.state.start('slide3');
    }
}