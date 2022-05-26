var garden,startScreen,rabbit,apple,orangeL,redL;
var gardenImg,rabbitImg,carrotImg,orangeImg,redImg,lowerGravImg,resetGravImg;
var myAudio = new Audio("TemmieVillageUndertale.mp3");
var eatSound = new Audio("Eat.mp3");
var vomitSound = new Audio("Vomit.mp3");
var poisonSound = new Audio("Poison.mp3");
var appleSpeed = 5;
var orangeSpeed = 3;
var redSpeed = 3;
var gamestate = "start";
var lowerGrav;
var resetGrav;
var foodPoints = 0;
var slowCost = 5
var appleSaturation = 1;
frameRate = 30;
myAudio.play();
myAudio.loop = true


function preload(){
  gardenImg = loadImage("garden.png");
  rabbitImg = loadImage("rabbit.png");
  appleImg = loadImage("apple.png");
  orangeImg = loadImage("orangeLeaf.png");
  redImg = loadImage("redImage.png");
  startImg = loadImage("startSprite.jpg")
  invisImg = loadImage("invis.png")
  lowerGravImg = loadImage("LowerGrav.png")
  resetGravImg = loadImage("ResetGrav.png")
}

if(foodPoints == 100){
  appleSaturation = 2
}
if(foodPoints == 250){
  appleSaturation = 4
}
if(foodPoints == 500){
  appleSaturation = 8
}



function setup(){
  
createCanvas(400,400);
garden=createSprite(200,200);

rabbit = createSprite(160,340,20,20);
rabbit.scale =0.09;
rabbit.setCollider("rectangle",0,0,rabbit.width,rabbit.height)

rabbit.addImage(rabbitImg);

apples = new Group();
oranges = new Group();
reds = new Group();

}

//start of function draw-------------------------------------------------------
function draw() {
  background(0);
  appleSpeed *= 1.0005
  orangeSpeed *= 1.0005
  redSpeed *= 1.0005

  if(keyWentDown("r")){
    if(foodPoints >= slowCost){
    appleSpeed = appleSpeed / 1.5
    console.log(appleSpeed)
    orangeSpeed = orangeSpeed / 1.5
    console.log(orangeSpeed)
    redSpeed = redSpeed / 1.5
    console.log(redSpeed)
    foodPoints = foodPoints - slowCost
    slowCost = Math.round(slowCost*1.2)
    console.log(slowCost)
    }
}
  if(keyWentDown("e")){
    if(foodPoints >= 100){
    appleSpeed = 5
    console.log(appleSpeed)
    orangeSpeed = 3
    console.log(orangeSpeed)
    redSpeed = 3
    console.log(redSpeed)
    foodPoints = foodPoints - slowCost
    slowCost = Math.round(slowCost*1.2)
    console.log(slowCost)
    }
  }
  

  if(foodPoints < 0){
    gamestate = "lose"
    //console.log("Wow you seriously lost!?!?!?")
  }
  if(foodPoints == 1000){
    gamestate = "win"
    //console.log("I'm proud of you!")
  }
  
  if(gamestate == "play"){
    rabbit.x = World.mouseX;
  }
  
  edges= createEdgeSprites();
  rabbit.collide(edges);
  
   drawSprites();
  
  
  if(gamestate == "start"){
    garden.addImage(startImg)
    fill("white")
    text("Press 0 to start game",20,50);
    text("Apples give you a food point",20,65);
    text("Orange leaves taste bad and lower food points by 1",20,80);
    text("Red leaves are poisonous and... I don't want to explain what happens.",20,95);
    text("Press r at any time to lower the gravity with hunger magic!",20,110);
    text("Press e at any time to reset the gravity with hunger magic!",20,125);
    text("Resetting gravity only works if you have over 100 food points",20,140);
    text("Hunger magic costs more and more food points each time.",20,155);
    text("Gravity obviously makes food drop faster",20,170);
    text("Get 1000 hunger points to win. Good Luck!",20,190);
    if(keyWentDown("0")){
      gamestate = "play"
      garden.addImage(gardenImg)
      lowerGrav = createSprite(40,150,80,110)
      lowerGrav.addImage(lowerGravImg)
      lowerGrav.scale = 0.4
      resetGrav = createSprite(360,150,80,110)
      resetGrav.addImage(resetGravImg)
      resetGrav.scale = 0.4
    }
  
  }
  else if(gamestate == "play"){
    fill("white")
    text(foodPoints,10,10);
    fill("white")
    text(slowCost,35,195)
  }
  else if(gamestate == "lose"){
    //console.log("how did you lose?!?!?!?")
  }
  if (frameCount % 50 == 0) {
    if (gamestate == "start"){
     console.log("No food will drop...")
    }
    else if(gamestate == "play"){
     console.log("Food is incoming!")
     var select_sprites = Math.round(random(1,6));
     console.log("sprite randomiser= "+ select_sprites);
     console.log(appleSpeed)
     if (select_sprites == 1) {
       createRed();
     } else if (select_sprites == 2) {
       createOrange();
     }else {
       createApples();
     }
    }
  }
  
  if(apples.isTouching(rabbit)){
   console.log("nomnomnom")
   apples.destroyEach()
   foodPoints = foodPoints + appleSaturation
   eatSound.play();
 }
 if(oranges.isTouching(rabbit)){
   console.log("not tasty. BLEH!")
   oranges.destroyEach()
   foodPoints-=1
   vomitSound.play();
 }
 if(reds.isTouching(rabbit)){
   console.log("AAAAAAAAAAAAAAAAAA I'M DYING!")
   reds.destroyEach()
   foodPoints = -69420
   poisonSound.play();
 }
  }
//end of function draw-------------------------------------------------------

function createApples() {
apple = createSprite(random(50, 350),40, 10, 10);
apple.addImage(appleImg);
apple.scale=0.07;
apple.velocityY = appleSpeed;
apple.lifetime = 150;
apples.add(apple)  
}

function createOrange() {
orangeL = createSprite(random(50, 350),40, 10, 10);
orangeL.addImage(orangeImg);
orangeL.scale=0.08;
orangeL.velocityY = orangeSpeed;
orangeL.lifetime = 150;
oranges.add(orangeL)
}

function createRed() {
redL = createSprite(random(50, 350),40, 10, 10);
redL.addImage(redImg);
redL.scale=0.06;
redL.velocityY = redSpeed;
redL.lifetime = 150;
reds.add(redL)
}
