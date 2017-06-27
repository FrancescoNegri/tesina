let gamepad;

var menuState = {
    create: function () {
        gamepad = game.input.gamepad;

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
    },

    update: function () {
        if (gamepad.supported && gamepad.active && gamepad.pad1.connected) {
            if (gamepad.pad1.justReleased(Phaser.Gamepad.XBOX360_A, 30)) {
                this.start();
            }
        }
    }
}