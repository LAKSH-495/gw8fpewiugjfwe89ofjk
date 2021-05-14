var car, carImage;
var road,roadImage;
var car1,car1Image;
var car2,car2Image;
var car3,car3Image;
var car4,car4Image;
var cars, carsGroup;
var hole,holeImage,holeGroup;
var gameOverSound;
var fuelSound;
var gameOver,gameOverImage;
var fuel,fuelImage,fuelGroup;
var score = 0;
var PLAY=1;
var END=0;
var gameState=PLAY;

function preload(){
  carImage = loadImage("car1.jpeg");
  roadImage = loadImage("Road.jpeg");
  car1Image = loadImage("car2.jpeg");
  car2Image = loadImage("car3.jpeg");
  car3Image = loadImage("car4.jpeg");
  car4Image = loadImage("car5.jpeg");
  holeImage = loadImage("HOLES.jpeg");
  gameOverSound = loadSound("Crash.mp3");
  fuelSound = loadSound("FUEL.wav");
  gameOverImage = loadImage("gameOver.png");
  fuelImage = loadImage("fuel.jpeg")
}

function setup() {
  createCanvas(displayWidth,displayHeight);
  road = createSprite(500,300);
  road.addImage("roads",roadImage);
  road.scale=3;
  
  car = createSprite(300,250);
  car.addImage("cars",carImage);
  car.scale=0.4;
    
  gameOver = createSprite (280,300);
  gameOver.addImage("gameover",gameOverImage);
  
  carsGroup = new Group();
  fuelGroup = new Group();
  holeGroup = new Group();  
  
  score = 0;
  
  

}

function draw() {
       
 

 
  if(gameState === PLAY){
    gameOver.visible = false;
  
    if(keyDown("up")){
      car.y = car.y - 10;
    }    
    
    if(keyDown("down")){
      car.y = car.y + 10;
    }
    
    
    
     if(car.isTouching(fuelGroup)){
      score = score+50;
      fuelGroup.destroyEach(); 
      fuelSound.play(); 
     }
    
    if(car.y === 0 || car.y === 600){
      score = score-30
    }

    if(car.velocityX <=1 && car.velocityY <=1){
    camera.position.x = displayWidth/2;
    camera.position.y = displayHeight/2
  }
    //camera.position.x = displayWidth/2;
    //camera.position.y = cars[index-1].y; 


    
    
   EnemyCars();
   khada();   
   petrol();
    
    if(car.isTouching(carsGroup) || car.isTouching(holeGroup) || car.y < -1 || car.y >601){
      gameState = END;
      gameOverSound.play();
    }
  
  } 
  else if(gameState === END){
    gameOver.visible = true
    carsGroup.velocityX=0;
    road.velocityX=0;
    car.velocityX=0;
    carsGroup.setVelocityXEach(0);
    holeGroup.setVelocityXEach(0);
    fuelGroup.setVelocityXEach(0);

  }
   drawSprites();

       textSize(20);
       fill("white")
       text("Score : "+score,100,30)
}


function EnemyCars(){
  if(World.frameCount % 80 === 0){
    cars = createSprite(0,300);
    cars.scale=0.4;
    var r = Math.round(random(1,4))
    if(r == 1){
      cars.addImage("car2",car1Image);
    }
    else if(r == 2){
      cars.addImage("car3",car2Image);
    }    
    else if(r == 3){
      cars.addImage("car4",car3Image);
    }
    else if(r == 4){
      cars.addImage("car5",car4Image);
    }
    cars.y = Math.round(random(10,500)); 
    carsGroup.lifetime = 300;
    carsGroup.add(cars);
    cars.velocityX=7;
  }
}

function khada(){
  if(World.frameCount % 200 === 0){
    hole = createSprite(0,500);
    hole.addImage("holes",holeImage);
    hole.scale=0.2;
    var rand = Math.round(random(100,500));
    hole.velocityX = 7;
    holeGroup.lifetime = 300;
    holeGroup.add(hole);
  }
}

function petrol(){
  if(World.frameCount % 250 === 0){
    fuel = createSprite(0,500);
    fuel.addImage("fuels",fuelImage);
    fuel.scale=0.15
    var ran = Math.round(random(100,500))
    fuel.velocityX = 7;
    fuelGroup.lifetime = 300;
    fuelGroup.add(fuel);
  }
}