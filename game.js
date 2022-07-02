

var player
var platforms
var cursors

var startSystem
var score = 0
var scoreText
var game

document.addEventListener("DOMContentLoaded", Main, false)
var gameID = document.querySelector('#gameID')
function Main()
{
    console.log('Main');

    // Création du jeu
    game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameID' , { preload: preload, create: create, update: update })

}

function preload()
{
    game.stage.backgroundColor = '#cccccc'

    game.load.image('sky', 'assets/sky.png')
    game.load.image('ground', 'assets/platform.png')
    game.load.image('star', 'assets/star.png')

    game.load.spritesheet('heros', 'assets/dude.png', 32, 48)
}

function create() 
{
    game.physics.startSystem(Phaser.Physics.ARCADE) // lois de la physique

    game.add.image(400, 300, 'sky') // ajoute le bg du jeu

    platforms = game.add.group() // ajoute les platforms dans  un groupe
    platforms.enableBody = true // applique les lois de la physique a ce groupe

    //Creation du sol
    var ground = platforms.create(0, game.world.height - 64, 'ground')
    ground.scale.setTo(2, 2)
    ground.body.immovable = true

    //Creation des limites du terrain
    var ledge = platforms.create(400, 400, 'ground')
    ledge.body.immovable = true
    ledge = platforms.create(-150, 250, 'ground')
    ledge.body.immovable = true;

    scoreText = game.add.text(10, 10, 'Vos points : 0', {fontSize: '33px', fill: '#fff'})

    player = game.add.sprite(32, game.world.height - 150, 'heros')
    game.physics.arcade.enable(player)
    
    player.body.bounce.y = 0.2
    player.body.gravity.y = 300
    player.body.collideWorldBounds = true

    player.animations.add('left', [], 10, true)
    player.animations.add('right', [], 10, true)

    cursors = game.input.keyboard.createCursorKeys()
}

function update() 
{
    game.physics.arcade.collide(player, platforms)
    game.physics.arcade.collide(stars, platforms)
    game.physics.arcade.overlap(player, stars, collectStar, null, this)

    player.body.velocity.x = 0

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -150
        player.animations.play('left')
    } else if (cursors.right.isDown)
    {
        player.body.velocity.x = 150
        player.animations.play('right')
    } else
    {
        player.animations.stop()
        player.frame = 4
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -350
    }
}