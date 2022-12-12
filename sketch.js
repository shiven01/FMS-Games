let stage = "main menu setup";
let button1;
let button2;
let button3;
let button4;
let button5;

let startButton;

let paused = false;

let pauseButton;
let pauseResume;
let pauseMainMenu;
let pauseOptions; //placeholder

let pongData = [200,35*9,6,3,0];//[ballX, ballY, dx, dy,paddleY]
let pongLives = 5;
let pongScore = 0;
let pongMaxScore = 0;

let dotsX = 30;
let dotsY = 30;
let dotsR = 20;
let dotsTimer = 30;
let dotsScore = 0;
let dotsMaxScore = 0;
let dotsButton;

let dodgeData = []; //dx,dy,x,y,r
let dodgeTimer = 3;
let dodgeScore = 0;
let dodgeIntensity = 0.1;
let dodgeMaxScore = 0;

let cbg = "#412234"
let cbg2 = "#2E4052"

let cbutton = "#388D8D"
let cbb = "#00000000"

let ctext = "#FFFFFF"
let cstroke = "#FFFFFF"
let cspecial = "#FFAD0A"
let cx = "#42D9C8"


function setup() {
  let canvasWidth = 70;
  createCanvas(canvasWidth*16, canvasWidth*9);
  textFont("Bahnschrift Light");
  textStyle(BOLD)
  background(cbg);
  
  //textAlign(LEFT,BASELINE)
}

function draw() {
  textAlign(LEFT,BASELINE)
  if (stage=="main menu setup") {
    textAlign(LEFT,BASELINE)
    removeElements();
    background(cbg);
    fill(ctext)
    //fill("black")
    
    let titleTextSize = 100;
    let buttonTextSize = "48px";
    let leftMargin = 50;
    let upMargin = 120;
    let spc = 80;
    
    textSize(titleTextSize);
    text("main menu", leftMargin,upMargin);
    upMargin +=50;
    
    button1 = createButton("pong");
    button1.style("font-family", "Bahnschrift Light");
    button1.style("font-size", buttonTextSize);
    button1.style("background-color",cbutton)
    button1.style("color",ctext)
    button1.style("border-color",cbb)
    button1.position(leftMargin,upMargin);
    upMargin +=spc;
    
    button2 = createButton("dots");
    button2.style("font-family", "Bahnschrift Light");
    button2.style("font-size", buttonTextSize);
    button2.style("background-color",cbutton)
    button2.style("color",ctext)
    button2.style("border-color",cbb)
    button2.position(leftMargin,upMargin);
    upMargin +=spc;
    
    button3 = createButton("dodge");
    button3.style("font-family", "Bahnschrift Light");
    button3.style("font-size", buttonTextSize);
    button3.style("background-color",cbutton)
    button3.style("color",ctext)
    button3.style("border-color",cbb)
    button3.position(leftMargin,upMargin);
    upMargin +=spc;
    
    button4 = createButton("options (placeholder)");
    button4.style("font-family", "Bahnschrift Light");
    button4.style("font-size", buttonTextSize);
    button4.style("background-color",cbutton)
    button4.style("color",ctext)
    button4.style("border-color",cbb)
    button4.position(leftMargin,upMargin);
    upMargin +=spc;
    
//     button5 = createButton("quit");
//     button5.style("font-family", "Bahnschrift Light");
//     button5.style("font-size", buttonTextSize);
//     button5.position(leftMargin,upMargin);
//     upMargin +=spc;

    button1.mousePressed(b1);
    button2.mousePressed(b2);
    button3.mousePressed(b3);
    button4.mousePressed(b4);
    //button5.mousePressed(b5);
    
    stage = "main menu";
  }
  if (stage == "main menu") {
    //do nothing
  }
  
  if (stage == "pong setup") {
    removeElements();
    clear();
    background(cbg);
    
    //background("#00aaaa");
    //background("light blue");
    //line(width/2,0,width/2,height);
    textSize(100);
    text("pong game",width/2-255,height/2-50);
   
    pauseSetup();
    
    startSetup()
    
    pongData = [200,35*9,6,3,0];//[ballX, ballY, dx, dy,paddleY]
    pongLives = 5;
    pongScore = 0;
    pongMaxScore = 0;
    
    stage = "pong start"
    
    textSize(30)
  }
  if (stage == "pong restart") {
    removeElements();
    clear();
    background(cbg);
    
    pauseSetup();
    
    pongData = [200,35*9,6,3,0];//[ballX, ballY, dx, dy,paddleY]
    pongLives = 5;
    pongScore = 0;
    pongMaxScore = 0;
    
    stage = "pong game"
  }
  
  if (stage == "pong game") {
    let r=15;
    let length = 120;
    let barX = 100;
    clear()
    background(cbg);
    
    stroke(cstroke)
    fill(cbg2)
    rect(50,50,width-100,height-100)
    
    noStroke()
    fill(cx)
    circle(pongData[0],pongData[1],r*2);
    
    textAlign(CENTER,CENTER)
    fill("black")
    text(pongLives,pongData[0],pongData[1])
    
    let goalX = 1000;
    let goalY = height/2
    let goalR = 25;
    
    fill(cspecial)
    circle(goalX,goalY,goalR*2)
    
    const xmax = 70*16-50;
    const xmin = 50;
    const ymax = 70*9-50
    
    fill(cx)
    
    let recty = min(max(mouseY,xmin+length/2),ymax-length/2)-length/2;
    
    rect(100,recty,10,length);
    
    nfx = pongData[0]+pongData[2]*0.3; //nextframe x
    nfy = pongData[1]+pongData[3]*0.3
    
    if (barX-r < nfx && nfx < barX+r+10 && (mouseY-length/2-r)<nfy && nfy<(mouseY+length/2+r)) {
      pongData[2] = abs(pongData[2]);
      let dx = pongData[2]; let dy = pongData[3];
      let pongSpeed = sqrt(dx*dx + dy*dy);
      let angle =atan2(dy,dx);
      let adjust = (pongData[1]-mouseY)/length
      angle += adjust;
      
      pongData[2] = pongSpeed*cos(angle);
      pongData[3] = pongSpeed*sin(angle);
    }
    
    let dGoal = sqrt((nfx-goalX)**2+(nfy-goalY)**2)
    
    if (dGoal<goalR+r+5) {
      pongScore++;
      let dx = pongData[2]; let dy = pongData[3];
      let pongSpeed = sqrt(dx*dx + dy*dy);
      pongSpeed *=1.03;
      
      let angle = atan2(pongData[0]-goalX,pongData[1]-goalY);
      
      pongData[2] = pongSpeed*cos(angle);
      pongData[3] = pongSpeed*sin(angle);
      
      if (nfx<goalX) pongData[2] = -abs(pongData[2]);
      if (nfx>goalX) pongData[2] = abs(pongData[2]);
      
      if (nfy<goalY) pongData[3] = -abs(pongData[3]);
      if (nfy>goalY) pongData[3] = abs(pongData[3]);
      
    }
    
    if (pongData[0]>xmax-r) pongData[2]*=-1;
    if (pongData[0]<xmin+r) { 
      pongData[2]*=-1;
      pongLives--;
    }
    
    if (pongData[1]>ymax-r || pongData[1]<xmin+r) pongData[3]*=-1;
    
    pongData[0] += pongData[2];
    pongData[1] += pongData[3];
    
    if (pongScore>pongMaxScore) pongMaxScore=pongScore;
    
    textAlign(LEFT,BASELINE)
    fill(ctext)
    textSize(30)
    text("lives: "+pongLives,50,40);
    text("your score: "+pongScore,400,40)
    text("high score: "+pongMaxScore,750,40)
    
    if (pongLives <=0) {
        stage = "pong game over"
        
        fill("black")
        textSize(100);
    
        text("game over",width/2-245,height/2-20)
        textAlign(CENTER,CENTER)
        
        restartSetup()
    }
  }
  
  if (stage == "dots setup") {
    removeElements();
    clear();
    background(cbg);
    //line(width/2,0,width/2,height);
    textSize(100);
    text("dots game",width/2-235,height/2-50);
   
    pauseSetup();
    
    startSetup()
    
    dotsX = random(70*15)+35;
    dotsY = random(70*8)+35;
    dotsR = random(40, 100);
    dotsTimer = 30;
    dotsScore = 0;
    
    stage = "dots start"
    
    textSize(30)
  }
  if (stage == "dots restart") {
    removeElements();
    clear();
    background(cbg);
   
    pauseSetup();
    
    dotsX = random(70*15)+35;
    dotsY = random(70*8)+35;
    dotsR = random(40, 100);
    dotsTimer = 30;
    dotsScore = 0;
    
    stage = "dots game"
    
    textSize(30)
  }
  if (stage == "dots game") {
    background(cbg);
    //dotsTimer
    fill(ctext)
    textAlign(CENTER, CENTER);
    textSize(100);
    text(dotsTimer, width/2, height/2);
    
    fill(cspecial)
    noStroke()
    circle(dotsX, dotsY, dotsR);
    
    fill(ctext)
    
    if (frameCount % 60 == 0 && dotsTimer > 0) {
      dotsTimer --;
    }
    if (dotsTimer == 0) {
      removeElements();
      clear();
      background(cbg)
      text("game over",width/2,height/2-50);
      
      textSize(40)
      text("score: " + dotsScore, width/2, height/2+100);
      text("high score: " + dotsMaxScore, width/2, height/2+150)
      
      if (dotsScore==dotsMaxScore) text("new high score!", width/2, height/2+200)
      
      restartSetup()
      
      stage = "dots game over"
    }

    //dotsScore
    if (dotsTimer!=0) {
      textSize(50);
      if (dotsScore>dotsMaxScore) dotsMaxScore=dotsScore;
      text("score: " + dotsScore, width/2+200, 40);
      text("high score: " + dotsMaxScore, width/2-200, 40)
    }

    //Dots
    var distance = dist(mouseX, mouseY, dotsX,dotsY);

    if (distance <= dotsR/2 && dotsTimer != 0) {
      dotsX = random(70*15)+35;
      dotsY = random(70*8-100)+35;
      dotsR = random(40, 100);
      dotsScore += 1;
    }
  }
  
  if (stage == "dodge setup") {
    removeElements();
    clear();
    background(cbg);
    //background("#00aaaa");
    //line(width/2,0,width/2,height);
    textSize(100);
    text("dodge game",width/2-255,height/2-50);
   
    pauseSetup();
    
    startSetup()
    
    dodgeData = [];
    dodgeTimer = 3;
    dodgeIntensity = 0.1;
    dodgeScore = 0;
    
    stage = "dodge start"
    
    textSize(30)
  }
  if (stage == "dodge restart") {
    removeElements();
    clear();
    background(cbg);
   
    pauseSetup();
    
    dodgeData = [];
    dodgeTimer = 3;
    dodgeIntensity = 0.1;
    dodgeScore = 0;
    
    stage = "dodge game"
    
    textSize(30)
  }
  
  if (stage == "dodge game") {
    textAlign(LEFT,BASELINE)
    clear();
    background(cbg);
    let mr = 7.5;
    
    fill(cbg)
    stroke(ctext)
    rect(50,50,width-100,height-100)
    
    noStroke()
    fill(ctext)
    text("dodgeballs in: "+dodgeTimer,50,40);
    text("your score: "+dodgeScore,400,40)
    text("high score: "+dodgeMaxScore,750,40)
    
    const xmax = 70*16-50;
    const xmin = 50;
    const ymax = 70*9-50
    
    let mx = min(max(mouseX,xmin+mr),xmax-mr);
    let my = min(max(mouseY,xmin+mr),ymax-mr);
    fill(cx)
    circle(mx,my,mr*2);
    fill(cspecial);
    
    if (frameCount % 60 == 0 && dodgeTimer > 0) {
      dodgeTimer--;
      dodgeScore++;
      if (dodgeScore>dodgeMaxScore) dodgeMaxScore=dodgeScore;
    }
    
    if (dodgeTimer==0) {
      let zone=100;
      let v = 1+random(5,10)*2*dodgeIntensity;
      let r = random(10,20)+10*dodgeIntensity;
      
      for (let i=0;i<1+10*dodgeIntensity;i++) {
        let dir = random(0,2*PI);
    
        if ((mx+cos(dir)*zone>50+r)&&(mx+cos(dir)*zone<16*70-50-r)&&(my+sin(dir)*zone>50+r)&&(my+sin(dir)*zone<9*70-50-r)) {
          dodgeData.push([cos(dir)*v,sin(dir)*v,cos(dir)*zone+mx,sin(dir)*zone+my,r])
        }
        else i--;
      }
      dodgeTimer = 10;
      dodgeIntensity+=0.03;
    }
    
    for (let i=0;i<dodgeData.length;i++) {
      let r = dodgeData[i][4];
      circle(dodgeData[i][2],dodgeData[i][3],r*2);
      if (dodgeData[i][2]>xmax-r || dodgeData[i][2]<xmin+r) dodgeData[i][0]*=-1;
      if (dodgeData[i][3]>ymax-r || dodgeData[i][3]<xmin+r) dodgeData[i][1]*=-1;
      dodgeData[i][2]+=dodgeData[i][0];
      dodgeData[i][3]+=dodgeData[i][1];
    }
    fill("white")
    
    for (let i=0;i<dodgeData.length;i++) {
      let r = dodgeData[i][4];
      let dx = mx-dodgeData[i][2];
      let dy = my-dodgeData[i][3];
      if (sqrt(dx*dx+dy*dy)<r+mr/2) {
        stage = "dodge game over"
        
        fill(ctext)
        textSize(100);
    
        text("game over",width/2-245,height/2-20)
        textAlign(CENTER,CENTER)
        
        restartSetup()
      }
    }
  }
  
  if (matchAll(stage,"pause").length!=0) {
    pauseButton.hide();
    pauseMainMenu.show();
    pauseResume.show();
  }
  
}

function restartGame() {
  if (matchAll(stage, "over").length!=0) {
    switch(stage) {
      case "dodge game over":
        stage = "dodge restart";
        break;
      case "dots game over":
        stage = "dots restart"
        break;
      case "pong game over":
        stage = "pong restart"
        break; 
    }
  }
  resumeFunc()
  restartButton.hide();
}

function startGame() {
  if (matchAll(stage, "start").length!=0) {
    switch(stage) {
      case "dodge start":
        stage = "dodge game";
        break;
      case "dots start":
        stage = "dots game"
        break;
      case "pong start":
        stage = "pong game"
        break; 
    }
    startButton.hide();
  }
}

function b1() {
  if (stage=="main menu") 
    stage = "pong setup";
}
function b2() {
  if (stage=="main menu") 
  stage = "dots setup";
}
function b3() {
  if (stage=="main menu") 
  stage = "dodge setup";
}
function b4() {
  print("b4");//placeholder
  //if (stage=="main menu") 
  //stage = "options setup";
}
function b5() {
  print("b5");//placeholder
}

function pauseSetup() {
  let mid = width/2-40;
  //let  =
  pauseButton = createButton("Pause");
  pauseButton.style("font-family", "Bahnschrift Light");
  pauseButton.style("font-size", "25px");
  pauseButton.style("background-color",cbutton)
  pauseButton.style("color",ctext)
  pauseButton.style("border-color",cbb)
  pauseButton.position (1000,10);
  
  pauseResume = createButton("Resume");
  pauseResume.style("font-family", "Bahnschrift Light");
  pauseResume.style("font-size", "25px");
  pauseResume.style("background-color",cbutton)
  pauseResume.style("color",ctext)
  pauseResume.style("border-color",cbb)
  pauseResume.position (mid,200);
  
  pauseMainMenu = createButton("Main Menu");
  pauseMainMenu.style("font-family", "Bahnschrift Light");
  pauseMainMenu.style("font-size", "25px");
  pauseMainMenu.style("background-color",cbutton)
  pauseMainMenu.style("color",ctext)
  pauseMainMenu.style("border-color",cbb)
  pauseMainMenu.position (mid,250);
  
  pauseButton.mousePressed(pauseFunc);
  pauseResume.mousePressed(resumeFunc);
  pauseMainMenu.mousePressed(mainMenuFunc);
  pauseResume.hide();
  pauseMainMenu.hide();
}

function restartSetup() {
  restartButton = createButton("restart!");
  restartButton.style("font-family", "Bahnschrift Light");
  restartButton.style("font-size", "48px");
  restartButton.position(width/2-90,height/2);
  
  restartButton.style("background-color",cbutton)
  restartButton.style("color",ctext)
  restartButton.style("border-color",cbb)

  restartButton.mousePressed(restartGame)
}

function startSetup() {
  startButton = createButton("start!");
  startButton.style("font-family", "Bahnschrift Light");
  startButton.style("font-size", "48px");
  startButton.position(width/2-65,height/2);
  
  startButton.style("background-color",cbutton)
  startButton.style("color",ctext)
  startButton.style("border-color",cbb)

  startButton.mousePressed(startGame)
}

function pauseFunc() {
  paused = true;
  //rect(0,0,width,height)
  //background("#ffffff66")
  switch(stage) {
    case "pong game":
      stage="pong pause";
      break;
    case "dots game":
      stage="dots pause";
      break;
    case "dodge game":
      stage="dodge pause";
      break;
  }
  
  pauseButton.hide();
  pauseResume.show();
  pauseMainMenu.show();
}

function resumeFunc() {
  paused = false;
  //background("#00000066")
  
  pauseResume.hide();
  pauseMainMenu.hide();
  pauseButton.show()
  //pauseOptions.hide();
  
  switch(stage) {
    case "pong pause":
      stage="pong game";
      break;
    case "dots pause":
      stage="dots game";
      break;
    case "dodge pause":
      stage="dodge game";
      break;
  }
}

function mainMenuFunc() {
  stage = "main menu setup";
  pauseResume.hide();
  pauseMainMenu.hide();
}
  
function keyPressed() {
  if (keyCode === ESCAPE) {
    if (matchAll(stage,"pause").length!=0) { //if paused, then resume 
      resumeFunc();
      return;
    }
    if (matchAll(stage,"game").length!=0) {//if gaming, then pause 
      pauseFunc();
      return;
    }
    if (matchAll(stage,"start").length!=0) {//if gaming, then pause 
      if (paused) resumeFunc()
      else pauseFunc()
      return;
    }
  }
}
