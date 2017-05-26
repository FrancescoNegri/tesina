var loadState = {
    preload: function() {
        var loadingLabel = game.add.text(80, 150, 'loading...', {font: '30px Courier', fill: '#ffffff'});
        
        game.load.spritesheet('player', 'assets/player.png', 25, 45);
        game.load.spritesheet('chest', 'assets/chest.png', 32, 32);
        game.load.spritesheet('controller-indicator', 'assets/utils/controller-indicator.png', 16, 16);

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
    },

    create: function() {
        game.state.start('menu');
    }
}