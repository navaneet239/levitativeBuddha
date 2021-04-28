var SET = 0,
  PLAY = 1,
  END = 2;
var gameState = SET;

var bk, bkk;

var bud, budR;

var lotus, lotusR;

var info, infobk;


var jump, jumpbk;

var baw, bawR, up, upR, down, downR

var devil, devilbk, devilGroup;

var skull, skullbk, skullGroup;

var coin, coinbk, coinGroup;

var pack, packItem = 0,
  packbk;

var score = 0;

var hold;



function preload() {

  bkk = loadImage("istockphoto-1177124681-170667a.jpg");

  budR = loadImage("Buddha.png");

  infobk = loadImage("info.png");

  devilbk = loadImage("devil.png");

  skullbk = loadImage("skull.png");

  coinbk = loadImage("coin.png");

  packbk = loadImage("coin.png");

  jumpbk = loadImage("hgtB.png");

  lotusR = loadImage("lotus.png");

  upR = loadImage("up.png");

  downR = loadImage("down.png");

  bawR = loadImage("greenBk.jpg");






}

function setup() {

  createCanvas(windowWidth, windowHeight);
  background("black");

  bk = createSprite(200, 200, 400, 400);
  bk.addImage(bkk);
  bk.scale = 1.75;
  //bk.velocityX = -5;

  info = createSprite(35, 35, 10, 10);
  info.addImage(infobk);
  info.scale = 0.07

  lotus = createSprite(155, 350, 100, 10);
  lotus.addImage(lotusR);
  lotus.setCollider("rectangle", 0, 0, 65, 85, 0)
  lotus.scale = 0.35;
  lotus.visible = true;

  bud = createSprite(150, 300, 50, 50);
  bud.addImage(budR);
  bud.scale= 0.35;
 // bud.setCollider("rectangle", 0, 0, 65, 85, 0)
 // bud.debug = true





  pack = createSprite(info.x + 40, info.y, 20, 20);
  pack.addImage(packbk);
  pack.scale = 0.25
  
    
  hold = createSprite(width/2, 60,width,10);
  hold.shapeColor = "red";

  coinGroup = createGroup();

  devilGroup = createGroup();

  skullGroup = createGroup();

  baw = createSprite(width - 110, 242.5, 200, 335)
  baw.shapeColor = "green";
  baw.addImage(bawR);
  baw.scale = 0.44

  Sd1 = createSprite(width - 75, 207.5, 15, 200);
  Sd1.shapeColor = "yellow";

  Sd2 = createSprite(width - 125, 207.5, 15, 200);
  Sd2.shapeColor = "yellow";

  Tp1 = createSprite(width - 100, 300, 50, 15);
  Tp1.shapeColor = "yellow";

  Tp2 = createSprite(width - 100, 300 - 185, 50, 15);
  Tp2.shapeColor = "yellow";

  up = createSprite(width - 130, 350, 25, 25);
  up.addImage(upR);
  up.scale = 0.5

  down = createSprite(width - 60, 350, 25, 25);
  down.addImage(downR);
  down.scale = 0.5


  jump = createSprite(width - 100, 300, 200, 100);
  jump.shapeColor = "white";
  jump.addImage(jumpbk);
  jump.scale = 0.10;
  jump.setCollider("rectangle", 0, 0, 275, 100, 0)
  jump.debug = false;



}

function draw() {

  drawSprites();

  jump.collide(Tp2);
  jump.collide(Tp1);

  bud.collide(lotus);
  
  text("Score: " + score, width - 200, 25, fill("white"),textSize(20));


  
  text("Levitation hight", width - 180, 85, fill("black"),textSize(20))

  text("0m -", width - 175, 280, fill("white"),textSize(17))

  text("25m -", width - 185, 240, fill("white"),textSize(17))

  text("50m -", width - 185, 200, fill("white"),textSize(17))

  text("75m -", width - 185, 160, fill("white"),textSize(17))

  text("100m -", width - 195, 115, fill("white"),textSize(17))


  if (mouseIsOver(info)) {
    
    text("press the up and down buttons to move up and down", 10, 55, fill("white"),textSize(17.5));

    text("from the devil and the skull and obtain", 10, 70, fill("white"),textSize(17.5));

    text("the potion to boost your potion pack. if you go to the devil", 10, 85, fill("white"),textSize(17.5));

    text("your score and potion pack will become zero but", 10, 100, fill("white"),textSize(17.5));

    text("if you go to the skull,", 10, 115, fill("white"),textSize(17.5));

    text("you are dead.", 10, 130, fill("red"),textSize(17.5));

  }

  text("Buddha", bud.x + 20, bud.y - 40, fill("white"), textSize(20));

  text("= " + packItem, pack.x + 20, pack.y + 5)


  if (gameState === SET) {
    packItem = 0;
    bk.velocityX = 0;

    text("Lets start the journey", width/2 - 130, 140, fill("white"),textSize(25))
    text(" of Buddha's levitation.", width/2 - 150, 170, fill("white"),textSize(25))
    text("click on Buddha to start", width/2 - 150, 200, fill("white"), textSize(25))



    if (mousePressedOver(bud)) {
      gameState = PLAY;

      bud.velocityY = -2;
      lotus.velocityY = -2;


      
    }


  }

  if (gameState === PLAY) {
    
    score = score + Math.round(setFrameRate() / 60);
    
    bk.velocityX = -(8 + 3 * score / 100);

    if (bk.x < 0) {
      bk.x = bk.width / 2;
    }

    evil1();

    evil2();

    potion();



    if(bud.y < 350 || lotus.y < 300){

      bud.velocityY = 0;
      lotus.velocityY = 0;

    }

    if(mousePressedOver(up)){
      jump.y = jump.y - 5

    }
  
    if(mousePressedOver(down)){
      jump.y = jump.y + 5
  
    }

      bud.y = jump.y;
      lotus.y = jump.y + 60



    


    if (coinGroup.isTouching(bud)) {
      packItem = packItem + 1
    }

    if(skullGroup.isTouching(bud)){
      gameState = END;
      bud.velocityY = 0;
    }
    
    if(devilGroup.isTouching(bud)){
      score = 0;
      packItem = 0;
    }
    


  }

  if (gameState === END){
    bk.velocityX = 0;
    
    devilGroup.setVelocityXEach(0);
    devilGroup.destroyEach();
    
    skullGroup.setVelocityXEach(0);
    skullGroup.destroyEach();
    
    coinGroup.setVelocityXEach(0);
    coinGroup.destroyEach();
    
    devilGroup.setLifetimeEach(-1);
    skullGroup.setLifetimeEach(-1);
    coinGroup.setLifetimeEach(-1);
    
    text("click on Buddha to restart",width/2 - 150,200, textSize(30));
    
    if (mousePressedOver(bud)){
      replay();
    }
  }
  
}

function evil1() {

  if (frameCount % 230 === 0) {
    devil = createSprite(baw.x - 125, 300, 20, 20);
    devil.addImage(devilbk);
    devil.scale = 0.5;
    devil.velocityX = -(8 + 3 * score / 100);
    devil.y = random(180, 300);
    devil.debug = false;
    devil.setCollider("rectangle",0,0,75,75,0);

    
    devil.lifetime = width/-(8 + 3 * score / 100);
    
    devilGroup.add(devil);

        //adjust the depth
        //baw.depth = devil.depth
        //devil.depth = devil.depth + 1;

    

  }
}

function evil2() {

  if (frameCount % 100 === 0) {
    skull = createSprite(baw.x - 125, 300, 20, 20);
    skull.addImage(skullbk);
    skull.scale = 0.55;
    skull.velocityX = -(8 + 3 *  score / 100);
    skull.y = random(180, 300);
    skull.debug = false;
    skull.setCollider("circle",0,0,67.5);
    
    skull.lifetime = width/-(8 + 3 * score / 100);
    
    skullGroup.add(skull);

  }
}

function potion() {

  if (frameCount % 150 === 0) {
    coin = createSprite(baw.x - 125, 150, 20, 20);
    coin.addImage(coinbk);
    coin.scale = 0.75;
    coin.velocityX = -(8 + 3 * score / 100);

    coin.setCollider("circle", 0, 0, 40);

    coin.lifeItem = width/-(8 + 3 * score / 100);
    
    coinGroup.add(coin);
  }

}

function replay (){
  
  gameState = PLAY;
  
  packItem = 0;
  
  score = 0;

  lotus.y = 350;
  
  bud.y = lotus.y - 50;

  jump.y = 300

  
}