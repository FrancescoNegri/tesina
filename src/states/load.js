var loadState = {
    preload: function () {
        var loadingLabel = game.add.text(80, 150, 'loading...', { font: '30px Courier', fill: '#ffffff' });

        //SPRITES
        game.load.spritesheet('player', 'assets/player1.png', 25, 45);
        game.load.spritesheet('feng-mengbo', 'assets/feng-mengbo.png', 25, 45);
        game.load.spritesheet('chest', 'assets/chest.png', 32, 32);
        game.load.spritesheet('book', 'assets/book.png', 32, 28);
        game.load.spritesheet('liana', 'assets/liana.png', 15, 60);

        //UI
        game.load.spritesheet('controller-indicator', 'assets/ui/controller-indicator.png', 16, 16);
        game.load.spritesheet('speech-bubble', 'assets/ui/speech-bubble.png', 32, 32);
        game.load.spritesheet('x-button', 'assets/ui/x-button.png', 16, 16);
        game.load.spritesheet('speaker-indicator', 'assets/ui/speaker-indicator.png', 22, 32);

        //AUDIO
        game.load.audio('intro', 'assets/audio/intro.m4a');
        game.load.audio('jump', 'assets/audio/jump.wav');
        game.load.audio('success', 'assets/audio/success.wav');
        game.load.audio('woo', 'assets/audio/woo.wav');
        game.load.audio('feng-run', 'assets/audio/feng-run.wav');


        //BACKGROUND
        game.load.image('bg_layer1', 'assets/bg/plx-1.png');
        game.load.image('bg_layer2', 'assets/bg/plx-2.png');
        game.load.image('bg_layer3', 'assets/bg/plx-3.png');
        game.load.image('bg_layer4', 'assets/bg/plx-4.png');
        game.load.image('bg_layer5', 'assets/bg/plx-5.png');
        //TILED MAP
        game.load.tilemap('level1', 'assets/map/level1.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('level2', 'assets/map/level2.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tileset', 'assets/tileset.png');

        //NINE PACKS PLUGIN
        game.load.atlasXML('blueSheet', 'assets/ui/blueSheet.png', 'assets/ui/blueSheet.xml');
    },

    create: function () {
        game.cache.addNinePatch('blue_button02', 'blueSheet', 'blue_button02.png', 5, 5, 5, 20);
        game.state.start('menu');
    }
}