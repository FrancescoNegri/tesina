Chest = function (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'chest');

    this.scale.setTo(scaleIndex - 1, scaleIndex - 1);

    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.collideWorldBounds = true;
    this.body.gravity.y = 700;
    this.immovable = true;
    this.body.setSize(5, 30);

    game.add.existing(this);
};

Chest.prototype = Object.create(Phaser.Sprite.prototype);
Chest.prototype.constructor = Chest;

Chest.prototype.update = function() {
    
};

Chest.prototype.openAction = function(_this, agent) {
    game.state.start('test');
}