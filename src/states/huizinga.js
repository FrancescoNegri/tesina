var huizingaState = {
    create: function () {
        //let textStyle = {font: 'bold 40pt Aladin', fill: 'white', boundsAlignH: 'center', boundsAlignV: 'middle'}
        let text = game.add.image(0, 0, 'huizinga-text');
        text.alpha = 0;
        let startTween = game.add.tween(text);
        startTween.to({ alpha: 1 }, 3000, Phaser.Easing.Linear.None, true, 1000);
        game.time.events.add(Phaser.Timer.SECOND * 10, () => {
            let exitTween = game.add.tween(text);
            exitTween.to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0);
            exitTween.onComplete.addOnce(() => {
                game.time.events.add(Phaser.Timer.SECOND * 1, () => {
                    goFullScreen();
                    game.state.start('victory');
                }, this);
            }, this);
        }, this);
    }
}