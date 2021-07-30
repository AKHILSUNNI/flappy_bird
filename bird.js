var can = document.getElementById("game");
var con = can.getContext("2d");

var collis_var = false;
var gameWin = false;

// load images
var bg = new Image();
bg.src = "image/bg.png";
var fg = new Image();
fg.src = "image/fg.png";
var bird = new Image();
bird.src = "image/bird.png";
var pipeNorth = new Image();
pipeNorth.src = "image/pipeNorth.png";
var pipeSouth = new Image();
pipeSouth.src = "image/pipeSouth.png";

// add audio
var fly = new Audio();
fly.src = "audio/sounds_fly.mp3";
var scor = new Audio();
scor.src = "audio/sounds_score.mp3";
var winner2 = new Audio();
winner2.src = "audio/winner2.mp3";
var audio_dead2 = new Audio();
audio_dead2.src = "audio/audio_dead2.mp3";

//bird object
var Bird = {
    x : 25,
    y : 125
};

//to cretae dynamic replay

document.addEventListener("mousedown", (ev) =>{
    let mouse ={
        x : ev.x - can.offsetLeft,
        y : ev.y - can.offsetTop
    }
    if(collis_var){
        if(mouse.x >=can.width/2 && mouse.y >= can.height/2-25 && mouse.x < can.width/2+112 && mouse.y < can.height/2-25+30){
            location.reload();
        }
    }
})

//to create stroke

document.addEventListener("mousemove",(ev) =>{
    let mouse ={
        x : ev.x - can.offsetLeft,
        y : ev.y - can.offsetTop
    }
    if(collis_var){
        if(mouse.x >=can.width/2 && mouse.y >= can.height/2-25 && mouse.x < can.width/2+112 && mouse.y < can.height/2-25+30){
            con.strokeStyle ="black";
            con.strokeRect(can.width/2,can.height/2-25,112,30);
        }
    }
})
  
//to cretae dynamic restart

document.addEventListener("mousedown", (ev) =>{
    let mouse ={
        x : ev.x - can.offsetLeft,
        y : ev.y - can.offsetTop
    }
    if(gameWin){
        if(mouse.x >=can.width/2 && mouse.y >= can.height/2-25 && mouse.x < can.width/2+112 && mouse.y < can.height/2-25+30){
            location.reload();
        }
    }
})

//to create dynamic text

document.addEventListener("mousemove",(ev) =>{
    let mouse ={
        x : ev.x - can.offsetLeft,
        y : ev.y - can.offsetTop
    }
    if(gameWin){
        if(mouse.x >=can.width/2 && mouse.y >= can.height/2-25 && mouse.x < can.width/2+112 && mouse.y < can.height/2-25+30){
            con.strokeStyle ="black";
            con.strokeRect(can.width/2,can.height/2-25,112,30);
            con.fillStyle = "black";
            con.font = "28px verdana";
            con.fillText("REPLAY",can.width/2,can.height/2);
        }
    }
})

// when key is pressed birds motion 

document.addEventListener("keydown",up);
function up (ev){
    fly.play();
    if(ev.keyCode === 38)
    Bird.y -= 30;
    if(ev.keyCode === 40)
    Bird.y += 30;
}

// pipe array
var pipe = [];
pipe[0] = {
    x : can.width,
    y : 0
};

var score = 0;

// collision function
function collision(){
    collis_var = true;
    clearInterval(game);
}

// draw image

function draw(){

    // some values
    var gap = 85;
    var constant = pipeNorth.height+gap ;

    con.drawImage(bg,0,0);
    con.drawImage(bird,Bird.x,Bird.y);
    Bird.y += 0.75;
    for(var i = 0; i < pipe.length; i++){
        con.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        con.drawImage(pipeSouth,pipe[i].x,pipe[i].y + constant);
        pipe[i].x--;

            if(pipe[i].x == 104){
                //creating new set of pipe
                
                    pipe.push({
                        x : can.width,
                        y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
                    });
                }
        
        if(pipe[i].x == 5){
            scor.play();
           score++;
        }
    // collision
     if((Bird.y+bird.height) >= can.height-fg.height || (Bird.x + bird.width >= pipe[i].x && Bird.x <= pipe[i].x + pipeNorth.width)
        && (Bird.y <= pipe[i].y + pipeNorth.height || Bird.y + bird.height >= pipe[i].y + constant)){
            audio_dead2.play();
            collision();
     }

  
    }
    con.drawImage(fg,0,can.height-fg.height);
    con.fillStyle = "black";
    con.font = "28px verdana";
    con.fillText("SCORE : "+score,10,can.height-20);
    if (collis_var){
        // reload button
    con.fillStyle = "white";
    con.fillRect(can.width/2,can.height/2-25,112,30);
    con.fillStyle = "red";
    con.font = "28px verdana";
    con.fillText("RELOAD",can.width/2,can.height/2);
    }
     
    if(score >= 30){
        gameWin = true;
        clearInterval(game);
    }
    // when gamer wins

     if(gameWin){
         winner2.play();
         con.fillStyle = "white";
         con.font = "30px verdana";
         con.fillText("WINNER..WINNER",10,50);

         //creating replay button

         con.fillStyle = "red";
         con.fillRect(can.width/2,can.height/2-25,112,30);
         con.fillStyle = "white";
         con.font = "28px verdana";
         con.fillText("REPLAY",can.width/2,can.height/2);

     }
    
}
draw();
var game = setInterval(draw,15);