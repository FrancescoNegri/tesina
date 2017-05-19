const runSpeed = 150;

Player = function (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'player');
    this.enable = true;
    this.cursors = game.input.keyboard.createCursorKeys();;

    this.animations.add('idle', [0, 1], 3);
    this.animations.add('walk', [15, 16, 17], 12);

    this.scale.setTo(scaleIndex, scaleIndex);
    this.anchor.setTo(0.5, 0);

    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.collideWorldBounds = true;
    this.body.gravity.y = 700;

    var bodyDims = this.body.width / scaleIndex;
    var bodyScalingFactor = {x: 0.6, y: 0.85};
    this.body.setSize(bodyDims * bodyScalingFactor.x, bodyDims * bodyScalingFactor.y, (bodyDims - (bodyDims * bodyScalingFactor.x)) / 2, (bodyDims - (bodyDims * bodyScalingFactor.y)) / 2);

    this.game.camera.follow(this);

    game.add.existing(this);
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function () {
    if (this.enable) {
        if (this.cursors.left.isDown /*&& this.body.velocity.y == 0*/) {
            this.scale.setTo(-1 * scaleIndex, 1 * scaleIndex);
            this.body.velocity.x = -runSpeed;
            this.animations.play('walk');
        }
        else if (this.cursors.right.isDown /*&& this.body.velocity.y == 0*/) {
            this.scale.setTo(1 * scaleIndex, 1 * scaleIndex);
            this.body.velocity.x = runSpeed;
            this.animations.play('walk');
        }
        else {
            this.animations.play('idle');
            this.scale.setTo(1 * scaleIndex, 1 * scaleIndex);
            this.body.velocity.x = 0;
        }

        if (this.cursors.up.isDown && this.body.velocity.y == 0) {
            this.body.velocity.y = -450;
        }
        /*else if (this.cursors.up.isDown) {
            this.y += -runSpeed;
        }
        else if (this.cursors.down.isDown) {
            this.y += runSpeed;
        }*/
    }
};

Player.prototype.win = function (_target, callback) {
    if (this.enable) {
        _target.enable = false;
        this.body.velocity.x = 0;
        this.enable = false;

        var targetCenterX = Math.floor(_target.x + (_target.width / 2));

        var winningTween = this.game.add.tween(this);
        winningTween.to({ x: targetCenterX }, 8 * Math.abs(targetCenterX - this.x), null, true);
        winningTween.onUpdateCallback(function () {
            if (targetCenterX > this.x) this.scale.setTo(1 * scaleIndex, 1 * scaleIndex)
            else this.scale.setTo(-1 * scaleIndex, 1 * scaleIndex);
            this.animations.play('walk')
        }, this);
        winningTween.onComplete.addOnce(function () {
            //OPEN ANIMATION

            callback();
            this.enable = true;
        }, this);

        winningTween.start();
    }
}

