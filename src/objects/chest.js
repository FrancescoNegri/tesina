Chest = function (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'chest');

    this.scalingFactor = 3;
    this.scale.setTo(this.scalingFactor, this.scalingFactor);
    this.enable = true;

    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.collideWorldBounds = true;
    this.body.gravity.y = 700;
    this.immovable = true;

    this.animations.add('closed'[0]);
    this.animations.add('opened', [1]);

    var bodyDims = { width: this.body.width / this.scalingFactor, height: this.body.height / this.scalingFactor - 4};
    var bodyScalingFactor = { x: 3, y: 0.8 };
    this.body.setSize(bodyDims.width * bodyScalingFactor.x, bodyDims.height * bodyScalingFactor.y, (bodyDims.width - (bodyDims.width * bodyScalingFactor.x)) / 2, bodyDims.height - (bodyDims.height * bodyScalingFactor.y));

    this.closed = true;

    game.add.existing(this);
};

Chest.prototype = Object.create(Phaser.Sprite.prototype);
Chest.prototype.constructor = Chest;

Chest.prototype.update = function () {
    if (this.closed) this.animations.play('closed')
    else this.animations.play('opened');
};

Chest.prototype.openAction = function (_this, agent) {
    if (this.enable) {
        //game.state.start('test');
        agent.win(this, () => {
            this.closed = false;
            game.state.start('test');
        });
    }
}