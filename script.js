// TODO: 
// character walking animations
// 
//
//


// constants
h = window.innerHeight;
w = window.innerWidth;

var character = document.getElementById('character');
var p = document.getElementsByClassName('platform');

gravity = .2;

var fadeout = document.getElementById('fadeout');
var fadeCount = 0;

function Character(obj,x,y,xvel,yvel,og){
    this.obj = obj;
    this.x = x;
    this.y = y;
    this.xvel = xvel;
    this.yvel = yvel;
    this.ongroud = og;
    this.jumping = 0;
    this.jtimer = 0;
    this.jheight = 10;
    this.jstrength = -10;
    this.jumping = 0;
    this.speed = 5;
    this.nearestObj;
};

var c = new Character(character,100,100,0,0,0);

// update the scene
function updateScene(){
    updatePlayer(c);
}

scene = setInterval(updateScene,10);

// update objects
function updatePlayer(c){
    //detect collisions

    cols = checkForCollision(c,p);
    c.onground = cols.og;
    c.ydist = cols.ydist;
    //console.log(cols.og);
    // player movement
    if (cols.ongroud != 1){
        if (c.yvel <= 10){
            c.yvel += gravity;
        }

    }else{
        c.yvel = 0.000000;
    }

    if (cols.y != null){

        c.yvel=0;
        //c.y = cols.y;
        c.onground = 1;

        //c.xvel=0;
        if (cols.ydist <= 50){
            c.y = cols.y;
        }
        if (cols.ydist > 50){
            c.xvel = -c.xvel;
            console.log('stop');
        }

    }else{
        c.onground = 0;
    }
    //console.log(cols.x);
    if (cols.x != null){
        //c.xvel=0;
        c.x = cols.x;
    }else{
        c.onground = 0;
    }

    if (c.jtimer > 0){
        c.jtimer-=1;
        c.jumping = 1;
        c.yvel = c.jstrength;
    }else{
        c.jumping = 0;
    }

    //console.log(c.yvel);
    c.x += c.xvel;
    c.y += c.yvel;
    
    c.obj.style.left = c.x + 'px';
    c.obj.style.top = c.y + 'px';
    
    if (cols.og == 1){
       // console.log('ground');
    }else{
        //console.log('air');
    }

}

function checkForCollision(c,p){
    let cols = {
        x: null,
        y: null,
        xdist: null,
        ydist: null,
        og: 0,
        obj: null
    }
    for (let x = 0; x < p.length; x++){
        if (((c.y + c.obj.offsetHeight) >= p[x].offsetTop && (c.y + c.obj.offsetHeight) <= (p[x].offsetTop+p[x].offsetHeight)) && ((((c.x-(c.obj.offsetWidth/2)) + c.obj.offsetWidth) >= p[x].offsetLeft && (c.x-(c.obj.offsetWidth/2)) + c.obj.offsetWidth <= (p[x].offsetLeft+p[x].offsetWidth)))){
            cols.y = (p[x].offsetTop-c.obj.offsetHeight);
            cols.og = 1;
            cols.ydist = (c.y + c.obj.offsetHeight) -  p[x].offsetTop;
            c.nearestObj=p[x];
        }else{
            cols.og = 0;
        }
    }

    return cols;
}

// player controls
function jump(){
    console.log(c.ydist);
    if (c.ydist==0){
        c.jtimer = c.jheight;
    }
}

var right = document.getElementById('right');
function goRight(){
    console.log('right');
    c.xvel=c.speed;

    moveAnimation('r',1);
}
function stopRight(){
    c.xvel=0; 

    moveAnimation('r',0);
}
right.addEventListener('mousedown', ()=>{
    goRight();
});
right.addEventListener('mouseup', ()=>{
    stopRight();
});
right.addEventListener('pointerdown', ()=>{
    goRight();
});
right.addEventListener('pointerup', ()=>{
    stopRight();
});

var left = document.getElementById('left');
function goLeft(){
    console.log('right');
    c.xvel= -c.speed;

    moveAnimation('l',1);
}
function stopLeft(){
    c.xvel=0; 

    moveAnimation('l',0);
    
}
left.addEventListener('mousedown', ()=>{
    goLeft();
});
left.addEventListener('mouseup', ()=>{
    stopLeft();
});
left.addEventListener('pointerdown', ()=>{
    goLeft();
});
left.addEventListener('pointerup', ()=>{
    stopLeft();
});

function selectObj(){
    if (c.ydist==0){
        console.log(c.nearestObj);
        c.nearestObj.style.backgroundColor = 'red';
        children = c.nearestObj.childNodes;
        leaveAnimation();
        setTimeout(backupAnimation,2000);
        if (children[0].innerText.length > 5){

            setInterval(leavePage,10);
            let leave = setTimeout(()=>{
                goToLink(children[0].innerText);
            },2000);
        }
    }
}

function goToLink(link){
    window.location.href = link;
}


function leavePage(){
    fadeCount +=.01;
    fadeout.style.opacity = fadeCount;
}

var cleye = document.getElementById('cleye');
var creye = document.getElementById('creye');
var cbody = document.getElementById('cbody');
var crleg = document.getElementById('crleg');
var clleg = document.getElementById('clleg');
var crarm = document.getElementById('crarm');
var clarm = document.getElementById('clarm');
var chead = document.getElementById('chead');
//0: text
//1: div#chead
//2: text
//3: div#cbody.cbodyF
//4: text
//5: div#crleg.crlegF
//6: text
//7: div#clleg.cllegF
//8: text
//9: div#crarm.crarmF
//10: text
//11: div#clarm.clarmF

function moveAnimation(dir,type){
    if (type == 1){
        if (dir=='r'){
            cleye.classList.add('cleyeR');
            cleye.classList.remove('cleyeF');

            crleg.classList.add('crlegR');
            crleg.classList.remove('crlegF');

            clleg.classList.add('cllegR');
            clleg.classList.remove('cllegF');

            crarm.classList.add('crarmR');
            crarm.classList.remove('crarmF');

            clarm.classList.add('clarmR');
            clarm.classList.remove('clarmF');
        }else{
            creye.classList.add('creyeL');
            creye.classList.remove('creyeF');

            crleg.classList.add('crlegR');
            crleg.classList.remove('crlegF');

            clleg.classList.add('cllegR');
            clleg.classList.remove('cllegF');

            crarm.classList.add('crarmR');
            crarm.classList.remove('crarmF');

            clarm.classList.add('clarmR');
            clarm.classList.remove('clarmF');
        }
    }else{
        creye.classList.remove('creyeL');   
        creye.classList.add('creyeF');

        cleye.classList.remove('cleyeR');   
        cleye.classList.add('cleyeF');

        crleg.classList.remove('crlegR');
        crleg.classList.add('crlegF');

        clleg.classList.remove('cllegR');
        clleg.classList.add('cllegF');

        crarm.classList.remove('crarmR');
        crarm.classList.add('crarmF');

        clarm.classList.remove('clarmR');
        clarm.classList.add('clarmF');
    }
}

function leaveAnimation(){
    console.log('leave');
    crarm.classList.remove('crarmF');
    crarm.classList.add('crarmD');

    clarm.classList.remove('clarmF');
    clarm.classList.add('clarmD');

    chead.classList.remove('cheadF');
    chead.classList.add('cheadD');
}

function backupAnimation(){
    console.log('leave');
    crarm.classList.add('crarmF');
    crarm.classList.remove('crarmD');

    clarm.classList.add('clarmF');
    clarm.classList.remove('clarmD');

    chead.classList.add('cheadF');
    chead.classList.remove('cheadD');
}