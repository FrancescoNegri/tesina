Chest = function (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'chest');

    this.scalingFactor = 3;
    this.scale.setTo(this.scalingFactor, this.scalingFactor);
    this.enable = true;

    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.collideWorldBounds = true;
    this.body.gravity.y = 0;
    this.immovable = true;

    var bodyDims = { width: this.body.width / this.scalingFactor, height: this.body.height / this.scalingFactor - 4 };
    var bodyScalingFactor = { x: 4.5, y: 1 };
    this.body.setSize(bodyDims.width * bodyScalingFactor.x, bodyDims.height * bodyScalingFactor.y, (bodyDims.width - (bodyDims.width * bodyScalingFactor.x)), bodyDims.height - (bodyDims.height * bodyScalingFactor.y));

    this.closed = true;

    game.add.existing(this);
};

Chest.prototype = Object.create(Phaser.Sprite.prototype);
Chest.prototype.constructor = Chest;

Chest.prototype.update = function () {
};

Chest.prototype.startCutscene = function (_this) {
    if (this.enable) {
        this.enable = false;
        let _chest = this;
        let _player = _this.player;

        _player.enable = false;
        _player.onCutscene = true;
        _player.body.velocity.x = 0;
        _player.animations.play('idle');
        _player.body.velocity.y = -400;
        let wooSound = game.add.audio('woo');
        wooSound.play();
        game.time.events.add(Phaser.Timer.SECOND * 0, () => {

            new SpeechBox(game, _player, 'Finalmente! Ecco il tesoro nascosto in questa giungla!!', true, () => {
                let approachChestTween = this.game.add.tween(_player);
                approachChestTween.to({ x: _chest.x - .5 * tileSize }, 1000, null, true)
                approachChestTween.onUpdateCallback(function () {
                    _player.animations.play('walk');
                }, _player);
                approachChestTween.onComplete.addOnce(function () {
                    _player.onCutscene = false;
                    _player.body.velocity.x = 0;
                    _player.animations.play('idle');

                    new SpeechBox(game, _player, 'Sembra nasconda proprio un bel tesoro! Devo aprirla assolutamente!!', true, () => {
                        _chest.frame = 1;
                        let openSound = game.add.audio('chest-open');
                        openSound.play();
                        game.time.events.add(Phaser.Timer.SECOND * 1, () => {
                            game.camera.fade(null, 1500);
                            game.camera.onFadeComplete.add(() => { game.state.start('victory'); }, this);
                        })
                    });
                });
                approachChestTween.start();
            });
        }, this);
    }
}