var loadState = {
    preload: function() {
        var loadingLabel = game.add.text(80, 150, 'loading...', {font: '30px Courier', fill: '#ffffff'});
        
        game.load.spritesheet('player', 'assets/panda.png', 32, 32);
    },

    create: function() {
        game.state.start('menu');
    }
}