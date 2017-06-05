FengMengbo = function (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'fengMengbo');
    this.enable = true;
    this.runSpeed = 150;
    this.scalingFactor = 4;
    //this.cursors = game.input.keyboard.createCursorKeys();

    this.animations.add('idle', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 6);
    this.animations.add('walk', [20, 21, 22, 23, 24, 25, 26, 27], 12);

    this.scale.setTo(this.scalingFactor, this.scalingFactor);
    this.anchor.setTo(0.5, 0);

    this.initPlayerBody();

    game.add.existing(this);
};

FengMengbo.prototype = Object.create(Phaser.Sprite.prototype);
FengMengbo.prototype.constructor = FengMengbo;

FengMengbo.prototype.update = function () {
    if (this.enable) {
        this.animations.play('idle');
    }
    else {
        
    }
};

//ACTIONS
FengMengbo.prototype.actions = function (action) {
    switch (action) {
        case 'walk-left':
            this.scale.setTo(-1 * this.scalingFactor, 1 * this.scalingFactor);
            this.body.velocity.x = -this.runSpeed;
            if (this.body.velocity.y == 0) this.animations.play('walk')
            else if (this.body.velocity.y > 0) this.animations.play('jump-down')
            else this.animations.play('jump-up');
            break;

        case 'walk-right':
            this.scale.setTo(1 * this.scalingFactor, 1 * this.scalingFactor);
            this.body.velocity.x = this.runSpeed;
            if (this.body.velocity.y == 0) this.animations.play('walk')
            else if (this.body.velocity.y > 0) this.animations.play('jump-down')
            else this.animations.play('jump-up');
            break;

        case 'jump':
            this.body.velocity.y = -450;
            //this.animations.play('jump');
            break;

        case 'idle':
            //this.scale.setTo(1 * this.scalingFactor, 1 * this.scalingFactor);
            this.body.velocity.x = 0;
            if (this.body.velocity.y == 0) this.animations.play('idle')
            else if (this.body.velocity.y > 0) this.animations.play('jump-down')
            else this.animations.play('jump-up');
            break;
    }
}

FengMengbo.prototype.initPlayerBody = function () {
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.collideWorldBounds = true;
    this.body.gravity.y = 700;

    var bodyDims = { width: this.body.width / this.scalingFactor, height: this.body.height / this.scalingFactor - 3 };
    var bodyScalingFactor = { x: 3, y: 0.6 };
    //this.body.setSize(bodyDims * bodyScalingFactor.x, bodyDims * bodyScalingFactor.y, (bodyDims - (bodyDims * bodyScalingFactor.x)) / 2, (bodyDims - (bodyDims * bodyScalingFactor.y)) / 2);
    this.body.setSize(bodyDims.width * bodyScalingFactor.x, bodyDims.height * bodyScalingFactor.y, (bodyDims.width - (bodyDims.width * bodyScalingFactor.x)) / 2, bodyDims.height - (bodyDims.height * bodyScalingFactor.y));

    this.enable = true;
}

