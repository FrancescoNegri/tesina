var menuState = {
    create: function () {
        let logo = game.add.image(0, 0, 'title-text');

        let style = { font: "bold 40px Arial", fill: "#000000"};
        // let nameLabel = game.add.text(80, 80, 'My first game - TESINA', style);
         let startLabel = game.add.text(80, game.world.height - 80, 'Premi W per iniziare!', style);
        // nameLabel.anchor.setTo(0.5, 0.5);
         startLabel.anchor.setTo(0.5, 0.5);

        // nameLabel.x = game.world.centerX;
         startLabel.x = game.world.centerX;


        let wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        wkey.onDown.addOnce(this.start, this);

        //Blinking text
        let textTween = game.add.tween(startLabel);
        textTween.to({alpha: .05}, 500, null, true, 100, -1, true);
    },

    start: function () {
        goFullScreen();
        game.canvas.style.cursor = 'none';
        game.state.start('level1');
    }
}