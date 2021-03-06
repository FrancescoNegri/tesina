var slide3State = {
    create: function () {
        let text = game.add.image(0, 0, 'slide3-img')

        var slide1key = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
        var slide2key = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
        var slide3key = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
        var backtovictorykey = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        slide1key.onDown.addOnce(this.startSlide1, this);
        slide2key.onDown.addOnce(this.startSlide2, this);
        slide3key.onDown.addOnce(this.startSlide3, this);
        backtovictorykey.onDown.addOnce(this.esc, this);
    },

    esc: function () {
        game.state.start('menu');
    },

    startSlide1: function () {
        game.state.start('slide1');
    },
    startSlide2: function () {
        game.state.start('slide2');
    },
    startSlide3: function () {
        game.state.start('slide3');
    }
}