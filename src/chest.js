Chest = function (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'chest');

    this.scale.setTo(scaleIndex, scaleIndex);

    this.enable = true;

    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.collideWorldBounds = true;
    this.body.gravity.y = 700;
    this.immovable = true;

    game.add.existing(this);
};

Chest.prototype = Object.create(Phaser.Sprite.prototype);
Chest.prototype.constructor = Chest;

Chest.prototype.update = function () {

};

Chest.prototype.openAction = function (_this, agent) {
    if (this.enable) {
        //game.state.start('test');
        agent.win(this);
    }
}