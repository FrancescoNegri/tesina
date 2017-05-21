var loadState = {
    preload: function() {
        var loadingLabel = game.add.text(80, 150, 'loading...', {font: '30px Courier', fill: '#ffffff'});
        
        game.load.spritesheet('player', 'assets/player.png', 25, 45);
        game.load.spritesheet('chest', 'assets/chest.png', 32, 32);
        game.load.spritesheet('controller-indicator', 'assets/controller-indicator.png', 16, 16);

        game.load.tilemap('tilemap', 'assets/map/level.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles', 'assets/tileset.png');
    },

    create: function() {
        game.state.start('menu');
    }
}