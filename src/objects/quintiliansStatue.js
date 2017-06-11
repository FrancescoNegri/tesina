QuintiliansStatue = function (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'quintilian');

    this.scalingFactor = 4.5;
    this.scale.setTo(this.scalingFactor, this.scalingFactor);
    this.enable = true;

    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.collideWorldBounds = true;
    this.body.gravity.y = 0;
    this.immovable = true;

    var bodyDims = { width: this.body.width / this.scalingFactor, height: this.body.height / this.scalingFactor - 4 };
    var bodyScalingFactor = { x: 5, y: 0.3 };
    this.body.setSize(bodyDims.width * bodyScalingFactor.x, bodyDims.height * bodyScalingFactor.y, (bodyDims.width - (bodyDims.width * bodyScalingFactor.x)) / 2, bodyDims.height - (bodyDims.height * bodyScalingFactor.y));

    this.closed = true;

    game.add.existing(this);
};

QuintiliansStatue.prototype = Object.create(Phaser.Sprite.prototype);
QuintiliansStatue.prototype.constructor = QuintiliansStatue;

QuintiliansStatue.prototype.update = function () {
};

QuintiliansStatue.prototype.startCutscene = function (_this) {
    if (this.enable) {
        this.enable = false;
        let _quintiliansStatue = this;
        let _player = _this.player;

        _player.enable = false;
        _player.onCutscene = true;
        _player.body.velocity.x = 0;
        if (_player.x > _quintiliansStatue.x) _player.scale.x = -1 * _player.scalingFactor;
        let wooSound = game.add.audio('woo');
        wooSound.play();
        game.time.events.add(Phaser.Timer.SECOND * 0, () => {
            let approachStatueTween = this.game.add.tween(_player);
            if (_player.x < _quintiliansStatue.x) approachStatueTween.to({ x: _quintiliansStatue.x - 1 * tileSize }, 400, null, true)
            else approachStatueTween.to({ x: _quintiliansStatue.x + 2.2 * tileSize }, 400, null, true)
            approachStatueTween.onUpdateCallback(function () {
                _player.animations.play('walk');
            }, _player);
            approachStatueTween.onComplete.addOnce(function () {
                _player.onCutscene = false;
                _player.body.velocity.x = 0;

                new SpeechBox(game, _player, 'Wooooow!! \nQuesta stauta sembra davvero molta antica! \nSarei proprio curioso di scoprire chi raffigura...', true, () => {
                    new SpeechBox(game, _player, "Guarda un po'! Mi sembra proprio che lì in basso ci sia una targhetta dorata. \nProverò a darle un'occhiata più da vicino...", true, () => {
                        let successSound = game.add.audio('success');
                        successSound.play();
                        _quintiliansStatue.frame = 1;
                        new SpeechBox(game, _player, "Complimenti! Hai raccolto la TARGHETTA DORATA!", false, () => {
                            new SpeechBox(game, _player, "C'è proprio una scritta, ma faccio fatica a leggerla...\n'MORES QUOQUE SE INTER LUDENDUM SIMPLICIUS DETEGUNT' - M. F. Quintilianus", true, () => {
                                new SpeechBox(game, _player, "Mhmhmhm...avrei proprio fatto meglio a studiare più latino al Liceo...\nPerò il nome Quintiliano mi dice qualcosa...", true, () => {
                                    new SpeechBox(game, _player, "Comunque non ho altro tempo da perdere! \nUn tesoro mi aspetta!!", true, () => {
                                        _player.enable = true;
                                        _player.onCutscene = false;

                                        wooSound.play();
                                    })
                                })
                            })
                        })
                    })
                });
            });
            approachStatueTween.start();
        }, this);
    }
}