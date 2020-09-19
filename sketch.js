var bg;
var player, playerImage
var ballImage
var enemy, enemyImage
var wallsArray = []
var backgroundSprite
var ballsArray = []
var gameState = "play"
var lives = 2
var retry
var speed
var house

function preload(){
  randomBackground()
  playerImage = loadAnimation("lol/openmouth.png", "lol/closemouth.png")
  enemyImage = loadAnimation("lol2/1.png","lol2/2.png","lol2/3.png")
  ballImage = loadImage("lol2/pinkball.png")
}

function setup(){
  createCanvas(displayWidth, displayHeight-120);

  backgroundSprite = createSprite(displayWidth/2, displayHeight/2, 200, 200)
  backgroundSprite.depth = 0
  backgroundSprite.x = backgroundSprite.width/2
  backgroundSprite.addImage(bg)
  backgroundSprite.velocityX = -2
  backgroundSprite.scale = 3

  player = createSprite(70, 60, 100, 100)
  player.addAnimation("player", playerImage)
  player.scale = 0.2  
  player.debug = true
  player.setCollider("circle", 0, 0, 80)
  enemy = createSprite(1525,40,100,100)
  enemy.velocityY = -3
  enemy.addAnimation("enemy", enemyImage)
  enemy.scale = 0.2

  house = createSprite(displayWidth/2+750, displayHeight/4-200, 50, 50)

  retry = createSprite(displayWidth/2, displayHeight/2)
  retry.visible = false

  
  for(var x = 150;x<displayWidth;x = x+200){
    var wall = createSprite(x, displayHeight/2-125, 10, displayHeight-100)
    wall.shapeColor = "red"
    wallsArray.push(wall)

    var wall1 = createSprite(x+100, displayHeight/2, 10, displayHeight-100)
    wall1.shapeColor = "blue"
    wallsArray.push(wall1)
  }
}

function draw() {

  background("green");
  speed = World.frameCount
  drawSprites(  );
  if(gameState === "play"){
    if (backgroundSprite.x<300){
      backgroundSprite.x = backgroundSprite.width/2
    }
    if(player.isTouching(house)){
      player.velocityX = 0
      player.velocityY = 0
      gameState = "end"
      push()
      textSize(40)
      stroke("pink")
      fill("red")
      strokeWeight(6)
      text("you win! noice",displayWidth/2-180, displayHeight/2-100)
      pop()
    }
    for(i = 0;i<wallsArray.length;i++){
      if(player.isTouching(wallsArray[i])){
        player.x = 70
        player.y = 60
        player.velocityX = 0
        player.velocityY = 0
        lives--
      }
    }
    
    for(i = 0;i<ballsArray.length;i++){
      if(player.isTouching(ballsArray[i])){
        player.x = 70
        player.y = 60
        player.velocityX = 0
        player.velocityY = 0
        lives--
      }
    }

    var edges = createEdgeSprites()

    for(i = 0;i<ballsArray.length;i++){
     ballsArray[i].bounceOff(edges[2])
     ballsArray[i].bounceOff(edges[3])
    }
  
    player.bounceOff(edges)
    enemy.bounceOff(edges)
    

  if (keyWentDown(UP_ARROW)){
    player.velocityY = -(2+speed/500)
    player.velocityX = 0
  }

  if (keyWentDown(DOWN_ARROW)){
    player.velocityY = (2+speed/500)
    player.velocityX = 0
  }

  if (keyWentDown(LEFT_ARROW)){
    player.velocityY = 0
    player.velocityX = -(2+speed/500)
  }

  if (keyWentDown(RIGHT_ARROW)){
    player.velocityY = 0
    player.velocityX = (2+speed/500)
  }

  fireBalls();

  if (lives===0){
    gameState = "end"
  }
  }else if(gameState === "end"){
  backgroundSprite.velocityX = 0
  retry.visible = true
  push()
  textSize(40)
  stroke("pink")
  fill("red")
  strokeWeight(6)
  text("you lose! Try again lol",displayWidth/2-180, displayHeight/2-100)
  pop()
  enemy.velocityY = 0

  for(i = 0;i<ballsArray.length;i++){
    
      ballsArray[i] .velocityX = 0
      ballsArray[i] .velocityY = 0

  }
  if(mousePressedOver(retry)){
    reset()
  }
  }
  
  textSize(25)
  stroke("red")
  text("life(s) Remaining = "+lives,70,30)
}
function reset(){
  retry.visible = false 
  gameState = "play"
  lives = 2
  speed = 0
  
  for(i = 0;i<ballsArray.length;i++){
    ballsArray[i] .destroy()
}

enemy.velocityY = -3

}

function randomBackground(){
   var rand = Math.round(random(1,3))
   console.log(rand)
   switch(rand){
    case 1:bg = loadImage("lol/1.jpg");
     break;
     case 2:bg = loadImage("lol/2.jpg");
     break;
     case 3:bg = loadImage("lol/3.jpg");
     break;
     default:break; } }

     function fireBalls(){
       if(World.frameCount%100===0){
        balls =  createSprite(1525, 40, 100, 100)
        balls.scale = 0.4
        balls.addImage("fireBall", ballImage)
        balls.velocityX = -2
        balls.velocityY = random(-3,5)
        balls.y = enemy.y
        balls.lifetime = random(100,200)
        ballsArray.push(balls)
        balls.debug = true
        balls.setCollider("rectangle", 0, 0, 150, 100)
       }
     }