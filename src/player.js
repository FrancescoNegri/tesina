const scaleIndex = 4;
const runSpeed = 150;

Player = function (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'player');

    this.cursors = game.input.keyboard.createCursorKeys();;
    
    this.animations.add('idle', [0, 1], 3);
    this.animations.add('walk', [15, 16, 17], 12);

    this.scale.setTo(scaleIndex, scaleIndex);
    this.anchor.setTo(0.5, 0);
    
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.collideWorldBounds = true;
    this.body.gravity.y = 400;

    game.add.existing(this);
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
    if (this.cursors.left.isDown && this.body.velocity.y == 0) {
        this.scale.setTo(-1 * scaleIndex, 1 * scaleIndex); 
        this.body.velocity.x = -runSpeed;
        this.animations.play('walk');
    }
    else if (this.cursors.right.isDown && this.body.velocity.y == 0) {
        this.scale.setTo(1 * scaleIndex, 1 * scaleIndex); 
        this.body.velocity.x = runSpeed;
        this.animations.play('walk');
    }
    /*else if (this.cursors.up.isDown) {
        this.y += -runSpeed;
    }
    else if (this.cursors.down.isDown) {
        this.y += runSpeed;
    }*/
    else {
        this.animations.play('idle');
        this.scale.setTo(1 * scaleIndex, 1 * scaleIndex); 
        this.body.velocity.x = 0;
    }
};

