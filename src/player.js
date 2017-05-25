Player = function (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'player');
    this.enable = true;
    this.runSpeed = 150;
    this.scalingFactor = 4;
    this.cursors = game.input.keyboard.createCursorKeys();

    this.gamepad = { enable: false };
    this.initGamepad();

    //this.animations.add('idle', [0, 1], 3);
    //this.animations.add('walk', [15, 16, 17], 12);
    this.animations.add('idle', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 12);
    this.animations.add('walk', [20, 21, 22, 23, 24, 25, 26, 27], 12);
    this.animations.add('jump-up', [12], 12);
    this.animations.add('jump-down', [13], 12);

    this.scale.setTo(this.scalingFactor, this.scalingFactor);
    this.anchor.setTo(0.5, 0);

    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.collideWorldBounds = true;
    this.body.gravity.y = 700;

    var bodyDims = {width: this.body.width / this.scalingFactor, height: this.body.height / this.scalingFactor - 3};
    var bodyScalingFactor = { x: 0.5, y: 0.6 };
    //this.body.setSize(bodyDims * bodyScalingFactor.x, bodyDims * bodyScalingFactor.y, (bodyDims - (bodyDims * bodyScalingFactor.x)) / 2, (bodyDims - (bodyDims * bodyScalingFactor.y)) / 2);
    this.body.setSize(bodyDims.width * bodyScalingFactor.x, bodyDims.height * bodyScalingFactor.y, (bodyDims.width - (bodyDims.width * bodyScalingFactor.x)) / 2, bodyDims.height - (bodyDims.height * bodyScalingFactor.y) );

    this.game.camera.follow(this);

    game.add.existing(this);
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function () {
    if (this.enable) {
        this.checkForGamepad();

        if (!this.gamepad.enable)
            this.updateKeyboard();

        if (this.gamepad.enable) {
            this.updateGamepad();
        }
    }
};

//CUTSCENES
Player.prototype.win = function (_target, callback) {
    if (this.enable) {
        _target.enable = false;
        this.body.velocity.x = 0;
        this.enable = false;

        var targetCenterX = Math.floor(_target.x + (_target.width / 2));

        var winningTween = this.game.add.tween(this);
        winningTween.to({ x: targetCenterX }, 8 * Math.abs(targetCenterX - this.x), null, true);
        winningTween.onUpdateCallback(function () {
            if (targetCenterX > this.x) this.scale.setTo(1 * this.scalingFactor, 1 * this.scalingFactor)
            else this.scale.setTo(-1 * this.scalingFactor, 1 * this.scalingFactor);
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

//KEYBOARD
Player.prototype.updateKeyboard = function () {
    if (this.cursors.left.isDown /*&& this.body.velocity.y == 0*/) {
        this.actions('walk-left');
    }
    else if (this.cursors.right.isDown /*&& this.body.velocity.y == 0*/) {
        this.actions('walk-right');
    }
    else if (!this.gamepad.enable) {
        this.actions('idle');
    }

    if (this.cursors.up.isDown && this.body.velocity.y == 0) {
        this.actions('jump');
    }
    /*else if (this.cursors.up.isDown) {
        this.y += -this.runSpeed;
    }
    else if (this.cursors.down.isDown) {
        this.y += this.runSpeed;
    }*/
}

//GAMEPAD
Player.prototype.initGamepad = function () {
    this.gamepad.indicator = game.add.sprite(10, 10, 'controller-indicator');
    this.gamepad.indicator.scale.x = this.gamepad.indicator.scale.y = 2;
    this.gamepad.indicator.animations.frame = 1;
    this.gamepad.indicator.fixedToCamera = true;

    this.gamepad.pad1 = game.input.gamepad.pad1;

    //this.player.gamepad.enable = true;
    //this.player.gamepad.pad = this.pad1;
}
Player.prototype.checkForGamepad = function () {
    // Pad "connected or not" indicator

    if (game.input.gamepad.supported && game.input.gamepad.active && this.gamepad.pad1.connected) {

        this.gamepad.indicator.animations.frame = 0;
        this.gamepad.enable = true;
    }

    else {

        this.gamepad.indicator.animations.frame = 1;
        this.gamepad.enable = false;
    }
}
Player.prototype.updateGamepad = function () {

    //LEFT STICK
    if (this.gamepad.pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) || this.gamepad.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1) {
        this.actions('walk-left');
    }
    else if (this.gamepad.pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) || this.gamepad.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1) {
        this.actions('walk-right');
    }
    else {
        this.actions('idle');
    }
    /*if (this.gamepad.pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_UP) || this.gamepad.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.1) {
        this.y--;
    }
    else if (this.gamepad.pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_DOWN) || this.gamepad.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > 0.1) {
        this.y++;
    }*/

    //BUTTONS
    if (this.gamepad.pad1.justPressed(Phaser.Gamepad.XBOX360_A) && this.body.velocity.y == 0) {
        this.actions('jump');
    }

    //RIGHT STICK
    /*
    if (this.gamepad.pad1.connected) {
        var rightStickX = this.gamepad.pad1.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_X);
        var rightStickY = this.gamepad.pad1.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_Y);
        if (rightStickX) {
            this.x += rightStickX * 10;
        }
        if (rightStickY) {
            this.y += rightStickY * 10;
        }
    }*/
}

//ACTIONS
Player.prototype.actions = function (action) {
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

