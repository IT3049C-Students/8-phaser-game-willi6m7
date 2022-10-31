const config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 800,
    height: 640,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: {
        preload,
        create,
        update
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: false
        }
    }
};

const game = new Phaser.Game(config);
let ball;
let player1;
let player2;
let isGameStarted = false;
let cursors;
const paddleSpeed = 350;
let keys = {};
let p1victoryText;
let p2victoryText;

function preload(){
    this.load.image('ball', '../assets/ball.png');
    this.load.image('paddle', '../assets/paddle.png');
}
function create(){
    ball = this.physics.add.sprite(
        this.physics.world.bounds.width / 2,
        this.physics.world.bounds.height / 2,
        'ball'
    );
    ball.setCollideWorldBounds(true);
    ball.setBounce(1, 1);

    player1 = this.physics.add.sprite(
        this.physics.world.bounds.width - (ball.body.width / 2 + 1),
        this.physics.world.bounds.height / 2,
        'paddle'
    )
    player1.setImmovable(true);
    player1.setCollideWorldBounds(true);

    player2 = this.physics.add.sprite(
        ball.body.width / 2 + 1,
        this.physics.world.bounds.height / 2,
        'paddle'
    )
    player2.setImmovable(true);
    player2.setCollideWorldBounds(true);

    cursors = this.input.keyboard.createCursorKeys();
    keys.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keys.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

    this.physics.add.collider(ball, player1);
    this.physics.add.collider(ball, player2);

    p1victoryText = this.add.text(
        this.physics.world.bounds.width / 2,
        this.physics.world.bounds.height / 2,
        'Player 1 wins!'
    );
    p1victoryText.setVisible(false);
    p2victoryText = this.add.text(
        this.physics.world.bounds.width / 2,
        this.physics.world.bounds.height / 2,
        'Player 2 wins!'
    );
    p2victoryText.setVisible(false);
}
function update(){
    if(!isGameStarted){
        const initialVelocityX = (Math.random() * 150) + 200;
        const initialVelocityY = (Math.random() * 150) + 200;
        ball.setVelocityX(initialVelocityX);
        ball.setVelocityY(initialVelocityY);
        isGameStarted = true;
    }

    if(ball.body.x > player1.body.x){
        p2victoryText.setVisible(true);
        ball.setVelocityX(0);
        ball.setVelocityY(0);
    }
    if(ball.body.x < player2.body.x){
        p1victoryText.setVisible(true);
        ball.setVelocityX(0);
        ball.setVelocityY(0);
    }


    player1.body.setVelocityY(0);
    player2.body.setVelocityY(0);
    if(cursors.up.isDown){
        player1.body.setVelocityY(-paddleSpeed);
    }
    if(cursors.down.isDown){
        player1.body.setVelocityY(paddleSpeed);
    }
    if(keys.w.isDown){
        player2.body.setVelocityY(-paddleSpeed);
    }
    if(keys.s.isDown){
        player2.body.setVelocityY(paddleSpeed);
    }
    if(ball.body.setVelocityY > paddleSpeed){
        ball.body.setVelocityY(paddleSpeed);
    }
    if(ball.body.setVelocityY < paddleSpeed){
        ball.body.setVelocityY(-paddleSpeed);
    }
}







// var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

// var paddle1;
// var paddle2;
// function preload(){
//     game.load.image('paddle','assets/paddle.png');
// }
// function create(){
//     paddle1 = create_paddle(0,game.world.centerY)
//     paddle2 = create_paddle(game.world.width - 16,game.world.centerY);
// }
// function update(){
//     control_paddle(paddle1,game,input.y);
// }
// function create_paddle(x,y){
//     var paddle = game.add.sprite(x,y,'paddle');
//     paddle.anchor.setTo(0.5,0.5);
//     game.physics.arcade.enable(paddle);
//     paddle.body.collideWorldBounds = true;

//     return paddle;
// }

// function control_paddle(paddle,y){
//     paddle.y = y;

//     if(paddle.y < paddle.height / 2){
//         paddle.y = paddle.height / 2;
//     } else if(paddle.y > game.world.height - paddle.height / 2){
//         paddle.y = game.world.height - paddle.height / 2;
//     }
//}




//     preload() {
//       // This method is called once at the beginning
//       // It will load all the assets, like sprites and sounds  
//     }
//     create() {
//       // This method is called once, just after preload()
//       // It will initialize our scene, like the positions of the sprites
//     }
//     update() {
//       // This method is called 60 times per second after create() 
//       // It will handle all the game's logic, like movements
//     }
//   }

//   new Phaser.Game({
//     width: 700, // Width of the game in pixels
//     height: 400, // Height of the game in pixels
//     backgroundColor: '#3498db', // The background color (blue)
//     scene: mainScene, // The name of the scene we created
//     physics: { default: 'arcade' }, // The physics engine to use
//     parent: 'game', // Create the game inside the <div id="game"> 
//  });