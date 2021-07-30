var mcar,mcarImg;
var bcar,wcar,ycar;
var bcarImg,wcarImg,ycarImg;
var road, roadImg;
var bg,bgImg;
var blackCarG,whiteCarG,yellowCarG;
var diamond,diamondImg,diamondG;
var gameOver,gameOverImg,bSound;
var restart,restartImg,gSound;


var score = 0;
var speed = 0;

// game State
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
mcarImg = loadImage("main car.png");
bcarImg = loadImage("black car.png");
wcarImg = loadImage("white car.png");
ycarImg = loadImage("mustard car.png");
roadImg = loadImage("road3.png");
//bgImg = loadImage("bg.jpg");
diamondImg = loadImage("diamond1.png");
gameOverImg = loadImage("gameOver.png");
restartImg = loadImage("restart.png");
gSound = loadSound("rocket.mp3");
bSound= loadSound("blast.wav");
}

function setup() {
createCanvas(windowWidth,windowHeight);
// background
//bg = createSprite(width-500,130);
//bg.addImage(bgImg);

// path
road = createSprite(width/2,500);
road.addImage(roadImg);
road.scale=2.1;
road.velocityY=15;



//b1.visible = false;

// players car 
 mcar = createSprite(width/2,height-75,20,20);
 mcar.addImage(mcarImg); 
 mcar.scale=0.3;
 mcar.setCollider("rectangle",30,0,235,500);
//mcar.debug=true;

// game over 
gameOver = createSprite(width/2,height/2);
gameOver.addImage(gameOverImg);
gameOver.visible = false;

// restart 
restart = createSprite(width/2,height-500);
restart.addImage(restartImg);
restart.scale=0.7;
restart.visible = false;
// groups
blackCarG = new Group();
whiteCarG = new Group();
yellowCarG = new Group();
diamondG = new Group();

//game sound
 gSound.play();

}

function draw() {
    
    if (gameState===PLAY){
        background(0);
       
        
        
       // mcar.x = World.mouseX;
        //mcar.y = World.mouseY;
        gameOver.visible = false;
        restart.visible = false;
        
        speed = speed + Math.round(road.velocityY/30);
          road.velocityY = (6 + 3*score/100);

        if((touches.length > 0 ||keyDown("right")))
        {
            mcar.x = mcar.x+15;
            touches = [];
            
        }
        if ((touches.length > 0 ||keyDown("left")))
        {
         mcar.x = mcar.x-15;
         touches = [];
        }
        edges= createEdgeSprites();
        mcar.collide(edges);
        if(road.y > height){
        road.y = height/2;
        }
        createbcar();
        createwcar();
        createycar();
        createDiamonds();
        if ( diamondG.isTouching(mcar)){
            diamondG.destroyEach();
            score=score+300;
        }
    
        else if (blackCarG.isTouching(mcar)){
            gameState=END;
            bSound.play();
            blackCarG.setVelocityEach(0);
            whiteCarG.setVelocityEach(0);
            yellowCarG.setVelocityEach(0);
        }
        else if (whiteCarG.isTouching(mcar)){
            gameState=END;
            bSound.play();
            blackCarG.setVelocityEach(0);
            whiteCarG.setVelocityEach(0);
            yellowCarG.setVelocityEach(0);
        }
        else if (yellowCarG.isTouching(mcar)){
            gameState=END;
            bSound.play();
            blackCarG.setVelocityEach(0);
            whiteCarG.setVelocityEach(0);
            yellowCarG.setVelocityEach(0);
        }
         

    }
    else if (gameState===END){
      gameOver.visible = true;
      restart.visible = true;
      

      road.velocityY = 0;

      if(mousePressedOver(restart) || touches.length>0){
        reset();
        touches = [];
      }
    }
    
    
    drawSprites();
    textSize(20);
    fill(255);
    text("$core:"+score,310,30);
    text("Speed*"+speed,150,30);
}
function createbcar(){
    if (World.frameCount % 200 == 0){
     bcar = createSprite(Math.round(random(50,width-50),40,10,10));
     bcar.addImage(bcarImg);
     bcar.scale=0.3;
     bcar.velocityY=3;
     bcar.lifetime=250;
     blackCarG.add(bcar);
    }
}
function createwcar(){
    if (World.framecount % 310 == 0){
    wcar = createSprite(Math.round(random(50,width-50),40,10,10));
    wcar.addImage(wcarImg);
    wcar.scale=0.3;
    wcar.velocityY=3;
    wcar.lifetime=250;
    whiteCarG.add(wcar);
    }
}
function createycar(){
    if (World.frameCount % 410 == 0){
    ycar = createSprite(Math.round(random(50,width-50),40,10,10));
    ycar.addImage(ycarImg);
    ycar.scale=0.5;
    ycar.velocityY=3;
    ycar.lifetime=250;
    yellowCarG.add(ycar);
    }
}
function createDiamonds(){
    if (World.frameCount % 530 == 0){
    diamond = createSprite(Math.round(random(50,width-50),40,10,10));
    diamond.addImage(diamondImg);
    diamond.scale=0.03;
    diamond.velocityY=5;
    diamond.lifetime=250;
    diamondG.add(diamond);
    }
}
function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;
    blackCarG.destroyEach();
    whiteCarG.destroyEach();
   yellowCarG.destroyEach();
   diamondG.destroyEach();
   road.velocityY=15;
   score = 0;
}