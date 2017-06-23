var bootState = {
    preload: function () {
        game.load.image('loading', 'assets/loading.png');
    },
    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVeritcally = true;
        game.scale.refresh();

        if (!audioFlag) game.sound.mute = true;

        game.input.gamepad.start();

        game.state.start('load');
    }
}