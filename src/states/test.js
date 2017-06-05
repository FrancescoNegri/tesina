var testState = {
    create: function() {
        var nameLabel = game.add.text(80, 80, 'Testing (premere W per andare al livello 2)', {font: '25px Arial', fill: '#FFFFFF'});

        var wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        wkey.onDown.addOnce(this.start, this);
    },

    start: function() {
        game.state.start('level1');
    }
}