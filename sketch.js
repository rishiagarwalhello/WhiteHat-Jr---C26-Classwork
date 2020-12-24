var man, man_animation; //Character
var story = 1, play = 2, win = 3, lose = 4, gs = story; //Game States
var start, start_img; //Start Button
var bkg1, bkg2, bkg_img; //Background
var inv_ground1, inv_ground2 //Invisible grounds for Standing
var speed = 3; //Initaial Speed of the man
var h1, h2, h3, h1_img, h2_img, h3_img; //Hurdles
var f1, f2, f3, f4, f1_img, f2_img, f3_img, f4_img; //Food
var win, win_img, lose, lose_img;

function preload() {
  start_img = loadImage("start.png");
  bkg_img = loadImage("bkg.jpeg");
  h1_img = loadImage("h1.jpeg");
  h2_img = loadImage("h2.jpeg");
  h3_img = loadImage("h3.jpeg");
  f1_img = loadImage("f1.jpg");
  f2_img = loadImage("f2.jpg");
  f3_img = loadImage("f3.jpg");
  f4_img = loadImage("f4.jpg");
  win_img = loadImage("win.png");
  lose_img = loadImage("lose.gif");
  man_animation = loadAnimation("m1.jpeg", "m2.jpeg", "m3.jpeg", "m4.jpeg", "m5.jpeg", "m6.jpeg", "m7.jpeg", "m8.jpeg");
  man_win_img = loadImage("man_win.jpg");
  man_lose_img = loadImage("man_lose.jpg");
}
//Loading the images and the animations

function setup() {
  createCanvas(750, 750);
  
  bkg_img.width = 750;
  bkg_img.height = 750;

  man = createSprite(80, 160);
  man.addAnimation("man", man_animation);
  man.scale = 0.6;

  man_win = createSprite(150,420);
  man_win.addImage(man_win_img);
  
  win = createSprite(375,140);
  win.addImage(win_img);
  win.scale = 2;
  
  man_lose = createSprite(150,420);
  man_lose.addImage(man_lose_img);
  man_lose.scale=1.5;
  
  lose = createSprite(375,140);
  lose.addImage(lose_img);
  lose.scale=0.3;
  
  start = createSprite(375, 685);
  start.addImage(start_img);
  start.scale = 0.3;

  bkg1 = createSprite(375, 375);
  bkg1.addImage(bkg_img);
  bkg2 = createSprite(1125, 375);
  bkg2.addImage(bkg_img);

  inv_ground1 = createSprite(375, 630, 750, 10);
  inv_ground1.visible=false;
  
  f1_grp = new Group();
  f2_grp = new Group();
  f3_grp = new Group();
  f4_grp = new Group();
  h1_grp = new Group();
  h2_grp = new Group();
  h3_grp = new Group();
}

function draw() {
  background("white");

  if (gs === story) {
    background(rgb(173, 255, 47));

    bkg1.visible = false;
    bkg2.visible = false;
    man_win.visible = false;
    man_lose.visible=false;
    win.visible=false;
    lose.visible=false;
    
    drawSprites();

    textSize(55);
    stroke("red");
    strokeWeight(4);
    fill("white");
    text("Story of the Game", 165, 70);
    line(160, 80, 616, 80);

    textSize(35);
    stroke("black");
    strokeWeight(3);
    fill("lightgrey");
    text("Harish goes to his Office, usually", 140, 170);
    text("by his car... But, one day...", 140, 220);
    text("he forgot to put enough diesel in his car !", 40, 275);
    text("And...now, he has to walk to his Office.", 40, 325);
    text("He has a number of hurdles in his path...", 40, 375);
    text("Can u help him reach his Office faster ?", 40, 425);
    text("Harish's speed increases every time he", 40, 475);
    text("gets the food. But, if he touches any hurdle,", 40, 525);
    text("his speed will reduce as well. He will reach", 40, 575);
    text("the Office, once his speed becomes 20 !!", 40, 625);

    if (mousePressedOver(start)) {
      gs = play;
    }
  }
  else if (gs === play) {
    bkg1.visible = true;
    bkg2.visible = true;

    bkg1.velocityX = -speed - 5;
    bkg2.velocityX = -speed - 5;

    if (bkg1.x < -375) {
      bkg1.x = 375;
      bkg2.x = 1125;
    }
    //Infinite Scrolling Background

    man.depth = bkg1.depth + 1;
    man.depth = bkg2.depth + 1;
    man.x = 130;
    man.scale = 1;
    if (keyDown("space")&&man.y>200||keyDown("up")&&man.y>200){
      man.velocityY = -20;
    }
    man.velocityY = man.velocityY + 0.8;
    man.collide(inv_ground1);
    man.setCollider("rectangle", -5, -10, 120, 265);

    start.visible = false;

    f1_func();
    f2_func();
    f3_func();
    f4_func();
    h1_func();
    h2_func();
    h3_func();

    if (f1_grp.isTouching(man)) {
      speed++;
      f1_grp.destroyEach();
    }
    if (f2_grp.isTouching(man)) {
      speed++;
      f2_grp.destroyEach();
    }
    if (f3_grp.isTouching(man)) {
      speed++;
      f3_grp.destroyEach();
    }
    if (f4_grp.isTouching(man)) {
      speed++;
      f4_grp.destroyEach();
    }
    if (h1_grp.isTouching(man)) {
      speed--;
      h1_grp.destroyEach();
    }
    if (h2_grp.isTouching(man)) {
      speed--;
      h2_grp.destroyEach();
    }
    if (h3_grp.isTouching(man)) {
      speed--;
      h3_grp.destroyEach();
    }
    
    if (speed===20) {
      gs=win;
    }
    if (speed===0) {
      gs=lose;
    }

    drawSprites();

    textSize(35);
    stroke("grey");
    strokeWeight(4);
    fill("violet");
    text("Speed = " + speed + " Units", 40, 65);
  }
  else if (gs === win) {
    background(rgb(300,10,50));
    
    bkg1.visible=false;
    bkg2.visible=false;
    man.visible=false;
    f1_grp.visible=false;
    f2_grp.visible=false;
    f3_grp.visible=false;
    f4_grp.visible=false;
    h1_grp.visible=false;
    h2_grp.visible=false;
    h3_grp.visible=false;
    
    man_win.visible=true;
    win.visible=true;
    
    drawSprites();
    
    textSize(45);
    strokeWeight(4);
    stroke("blue");
    fill("white");
    text("Harish Thanks you",260,350);
    text("...for helping him, reach",260,420);
    text("his office faster !! 😁",260,490);
  }
  else if (gs === lose) {
    background("grey");
    
    bkg1.visible=false;
    bkg2.visible=false;
    man.visible=false;
    f1_grp.visible=false;
    f2_grp.visible=false;
    f3_grp.visible=false;
    f4_grp.visible=false;
    h1_grp.visible=false;
    h2_grp.visible=false;
    h3_grp.visible=false;
    
    man_lose.visible=true;
    lose.visible=true;
    
    drawSprites();
    
    textSize(45);
    strokeWeight(4);
    stroke("white");
    fill("blue");
    text("Unfortunately...",280,350);
    text("you were unable to",280,420);
    text("help Harish, reach",280,490);
    text("his office on time !! 😞",280,560);
  }
}

function f1_func() {
  if (frameCount % round(random(200, 300)) === round(random(-10, 10))) {
    f1 = createSprite(900, round(random(20, 520)));
    f1.addImage(f1_img);
    f1.scale = 0.35;
    f1.velocityX = -speed - 5;
    f1.depth = man.depth - 1;
    f1.lifetime = 1050 / -speed - 5;
    f1_grp.add(f1);
  }
}

function f2_func() {
  if (frameCount % round(random(200, 300)) === round(random(-10, 10))) {
    f2 = createSprite(900, round(random(20, 520)));
    f2.addImage(f2_img);
    f2.scale = 0.35;
    f2.velocityX = -speed - 5;
    f2.depth = man.depth - 1;
    f2.lifetime = 1050 / -speed - 5;
    f2_grp.add(f2);
  }
}

function f3_func() {
  if (frameCount % round(random(200, 300)) === round(random(-10, 10))) {
    f3 = createSprite(900, round(random(20, 520)));
    f3.addImage(f3_img);
    f3.scale = 0.35;
    f3.velocityX = -speed - 5;
    f3.depth = man.depth - 1;
    f3.lifetime = 1050 / -speed - 5;
    f3_grp.add(f3);
  }
}

function f4_func() {
  if (frameCount % round(random(200, 300)) === round(random(-10, 10))) {
    f4 = createSprite(900, round(random(20, 520)));
    f4.addImage(f4_img);
    f4.scale = 0.35;
    f4.velocityX = -speed - 5;
    f4.depth = man.depth - 1;
    f4.lifetime = 1050 / -speed - 5;
    f4_grp.add(f4);
  }
}

function h1_func() {
  if (frameCount % round(random(250, 500)) === round(random(-10, 10))) {
    h1 = createSprite(900, 520);
    h1.addImage(h1_img);
    h1.scale=1;
    h1.velocityX = -speed - 5;
    h1.depth = man.depth - 1;
    h1.lifetime = 1050 / -speed - 5;
    h1_grp.add(h1);
  }
}

function h2_func() {
  if (frameCount % round(random(250, 500)) === round(random(-10, 10))) {
    h2 = createSprite(900, 545);
    h2.addImage(h2_img);
    h2.scale=2.5;
    h2.velocityX = -speed - 5;
    h2.depth = man.depth - 1;
    h2.lifetime = 1050 / -speed - 5;
    h2_grp.add(h2);
  }
}

function h3_func() {
  if (frameCount % round(random(250, 500)) === round(random(-10, 10))) {
    h3 = createSprite(900, 500);
    h3.addImage(h3_img);
    h3.scale=0.8;
    h3.velocityX = -speed - 5;
    h3.depth = man.depth - 1;
    h3.lifetime = 1050 / -speed - 5;
    h3_grp.add(h3);
  }
}