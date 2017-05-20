var testState = {
    create: function() {
        var nameLabel = game.add.text(80, 80, 'Testing (premere W)', {font: '25px Arial', fill: '#FFFFFF'});

        var wkey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        wkey.onDown.addOnce(this.start, this);
    },

    start: function() {
        game.state.start('play');
    }
}