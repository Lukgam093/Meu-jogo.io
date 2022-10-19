var caminho1,caminho2,caminho3,caminho4,caminho5,caminho6;
var inimigos, inimigosGroup;
var alvo, score = 0, vidas = 3;
var jogador, jogador2, jogador3;
var bala,balasRoxa,balasAzul;
var gamestate = 0;
var ativaAmarelo = true;

function setup(){
  createCanvas(windowWidth-50, windowHeight-50);

  caminho1 = createSprite(0, 100, 200, 30);
  caminho2 = createSprite(100, 235, 30, 300);
  caminho3 = createSprite(335, 400, 500, 30);
  caminho4 = createSprite(580, 265, 30, 300);
  caminho5 = createSprite(790, 125, 450, 30);
  caminho6 = createSprite(1005, 385, 30, 550);

  alvo = createSprite(1010, height-40, 200, 200);
  alvo.shapeColor = "brown";

  inimigosGroup = new Group();

  balasRoxa = new Group();
  balasAzul = new Group();
  

  //jogadores
  jogador = createSprite(1200, 100, 40, 40);
  jogador.shapeColor = "blue";
  jogador2 = createSprite(1200, 250, 40, 40);
  jogador2.shapeColor = "yellow";
  jogador2.debug = true;
  
  jogador3 = createSprite(1200, 400, 40, 40);
  jogador3.shapeColor = "purple";
  
  //botão inicial
  button = createButton("jogar");
  button.position(width/2, height/2);
  button.size(200,100);

  //pagina inicial
  titulo = createElement("h2");
  titulo.position(width/2, height/2-150);
  titulo.html("defesa de torre");

}

function draw(){
  background("green");

    //estado inicial
  if(gamestate === 0){
    background("blue");
    button.mouseClicked(()=>{
      titulo.hide();
      button.hide();
      gamestate = 1;
    })
  }
  
   //estado jogar
  if(gamestate === 1){
   
    //mostrando pontuação e vidas
  textSize(30);
  fill("yellow");
  text("score:" + score, 50, 60);
  text("vidas:" + vidas, 50, 25);

  gerarInimigo();
  
  //movimentando os inimigos pelo caminho
  for(var i = 0;i<inimigosGroup.length;i = i+1){
    if(inimigosGroup[i].x === 100){
      inimigosGroup[i].setVelocity(0, 4);
    }
    
    if(inimigosGroup[i].y === 400){
      inimigosGroup[i].setVelocity(4, 0);
    }

    if(inimigosGroup[i].x === 580){
      inimigosGroup[i].setVelocity(0, -4);
    }
    
    if(inimigosGroup[i].x === 580 && inimigosGroup[i].y === 124){
      inimigosGroup[i].setVelocity(4, 0);
    }

    if(inimigosGroup[i].x === 1004){
      inimigosGroup[i].setVelocity(0, 4);
    }
  }

  //movimentando jogador com mouse
  if(mousePressedOver(jogador)){
    moverJogadores(jogador);
  }
  if(mousePressedOver(jogador2)){
    moverJogadores(jogador2);
  }
  if(mousePressedOver(jogador3)){
    moverJogadores(jogador3);
  }

  //arma do jogador roxo
  if(keyDown("UP_ARROW")){
    gerarBalas(jogador3.x, jogador3.y, 0, -6, balasRoxa);
  }
  if(keyDown("DOWN_ARROW")){
    gerarBalas(jogador3.x, jogador3.y, 0, 6, balasRoxa);
  }
  if(keyDown("RIGHT_ARROW")){
    gerarBalas(jogador3.x, jogador3.y, 6, 0, balasRoxa);
  }
  if(keyDown("LEFT_ARROW")){
    gerarBalas(jogador3.x, jogador3.y, -6, 0, balasRoxa);
  }
  if(inimigosGroup.isTouching(balasRoxa)){
    for(var i = 0;i<inimigosGroup.length;i = i+1){
      if(inimigosGroup[i].isTouching(balasRoxa)){
       inimigosGroup[i].destroy();
       balasRoxa.destroyEach();
       score = score + 5;
      } 
  }
}

//arma do jogador azul
if(keyDown("W")){
  gerarBalas(jogador.x, jogador.y, 0, -6, balasAzul);
}
if(keyDown("S")){
  gerarBalas(jogador.x, jogador.y, 0, 6, balasAzul);
}
if(keyDown("D")){
  gerarBalas(jogador.x, jogador.y, 6, 0, balasAzul);
}
if(keyDown("A")){
  gerarBalas(jogador.x, jogador.y, -6, 0, balasAzul);
}
if(balasAzul.isTouching(inimigosGroup)){
  for(var i = 0;i<inimigosGroup.length;i = i+1){
    if(inimigosGroup[i].isTouching(balasAzul)){
      if(inimigosGroup[i].velocityY < 0){
        inimigosGroup[i].velocityY = inimigosGroup[i].velocityY - 3;
      }
      if(inimigosGroup[i].velocityY > 0){
        inimigosGroup[i].velocityY = inimigosGroup[i].velocityY + 3;
      }
      if(inimigosGroup[i].velocityX > 0){
        inimigosGroup[i].velocityX = inimigosGroup[i].velocityY + 3;
      }
    }
  }
}

  //arma do jogador amarelo
  if(keyWentDown("E")){
    if(ativaAmarelo === true){
      jogador2.setCollider("rectangle", 0, 0, 250, 250);
    if(inimigosGroup.isTouching(jogador2)){
      for(var i = 0;i<inimigosGroup.length;i = i+1){
        if(inimigosGroup[i].isTouching(jogador2)){
         inimigosGroup[i].destroy();
         score = score + 5;
        } 
    }
    ativaAmarelo = false;
    }
  }
  }
  if(keyWentUp("E")){
    jogador2.setCollider("rectangle", 0, 0, 40, 40);
  }

  //ativando amarelo apos 100 frames
  if(frameCount%100 === 0){
    ativaAmarelo = true
  }

  //verificando colisão do inimigo com o alvo
  if(inimigosGroup.isTouching(alvo)){
    for(var i = 0;i<inimigosGroup.length;i = i+1){
     if(inimigosGroup[i].isTouching(alvo)){
      inimigosGroup[i].destroy();
      vidas = vidas - 1;
     } 
    }
  } 

  //condição para o fim de jogo
  if(vidas === 0){
    gamestate = 2;
  }

  drawSprites();
  }

  //estado final
  if(gamestate === 2){
    background("red");
    textSize(40);
    fill("black");
    text("Boa sorte na proxima vez!!!", width/2-200, height/2);
  }
}

function gerarInimigo(){
  if(frameCount%Math.round(random(10, 100)) === 0){
    inimigos = createSprite(0, 100, 15, 15);
  inimigos.shapeColor = "red";
  inimigos.velocityX = 4;
inimigosGroup.add(inimigos);
}
  }

  function moverJogadores(index){
    index.x = World.mouseX;
    index.y = World.mouseY;
  }

  function gerarBalas(x,y,vx,vy,group){
    bala = createSprite(x, y, 10, 10);
    bala.shapeColor = "orange";
    bala.velocityY = vy;
    bala.velocityX = vx;
    group.add(bala);
  }