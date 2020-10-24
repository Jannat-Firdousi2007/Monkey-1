var monkey, monkey_running, ground, bananaImage, obstacleImage, bananaGroup, obstacleGroup, foodGroup;

var survivalTime, score;

var PLAY = 1;
var END = 0;
var gameState = PLAY;


function preload() {
  
  monkey_running = loadAnimation("monkey_0.png", "monkey_1.png", "monkey_2.png", "monkey_3.png", "monkey_4.png", "monkey_5.png",  "monkey_6.png", "monkey_7.png", "monkey_8.png");

  bananaImage = loadImage("banana.png");
  
  obstacleImage = loadImage("obstacle.png");
  
  
}


function setup() {
  
  createCanvas(400,400);
   
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  TimeGroup = createGroup();
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("monkey", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x);
  
  score = 0;
  survivalTime = 0;
}

function draw(){
  background("white");
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score :", + score, 500,50);
  
  stroke("white");
  textSize(20);
  fill("black");
  text("Survival Time :", + survivalTime, 100,50);
  
  monkey.collide(ground);
  
  if(gameState === PLAY){
    monkey.changeAnimation("running", monkey_running);
    
    survivalTime = Math.ceil(frameCount/frameRate());
  }
  
  if(ground.x < 0) {
    ground.x = ground.width/2;
  }
  
  if(keyDown("space")) {
    monkey.velocityY = -10;
  }
  
  if(FoodGruop.isTouching(monkey)) {
    FoodGroup.destroyEach();
    score = score + 5;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  obstaclesGroup.setLifetimeEach(-1);
  
  food();
  obstacles();
  
  if(obstacleGroup.isTouching(monkey)) {
    gameState = END;
}
  
  if(gameState === END) {
    obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
    survivalTime.visible = false;
    
    stroke("blue");
    textSixe(20);
    fill("blue");
    text("Game Over", 200,200);
    
}
  
  drawSprites();
}

function food(){
  
  if(frameCount % 80 === 0){
    banana = createSprite(400,350,40,10);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(120,200));
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.lifetime = 200;
    
    FoodGroup.add(banana);
  }
    
}

function obstacles(){
  
   if(frameCount % 300 === 0){
    obstacle = createSprite(250,325,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -3;
    obstacle.lifetime = 200;
     
    obstacleGroup.add(obstacle);
  }
  
}





