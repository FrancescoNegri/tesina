let gamepad;

var menuState = {
    create: function () {
        gamepad = game.input.gamepad;

        let logo = game.add.image(0, 0, 'title-text');
        let start = game.add.image(0, 0, 'title-start');

        let startKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        startKey.onDown.addOnce(this.start, this);

        var slide1key = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
        var slide2key = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
        var slide3key = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
        slide1key.onDown.addOnce(this.startSlide1, this);
        slide2key.onDown.addOnce(this.startSlide2, this);
        slide3key.onDown.addOnce(this.startSlide3, this);

        //Blinking text
        let startTween = game.add.tween(start);
        startTween.to({ alpha: 0.05 }, 1000, Phaser.Easing.Cubic.Out, true, 0, -1, true);
    },

    start: function () {
        goFullScreen();
        game.canvas.style.cursor = 'none';
        game.state.start('level1');
    },

    update: function () {
        if (gamepad.supported && gamepad.active && gamepad.pad1.connected) {
            if (gamepad.pad1.justReleased(Phaser.Gamepad.XBOX360_A, 30)) {
                this.start();
            }
        }
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