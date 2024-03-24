document.body.addEventListener('keydown',(event)=>{
    if(event.key==='r')
        play('rock');
    else if (event.key==='p')
        play('paper');
    else if (event.key==='s')
        play('scissors');
    else if(event.key==='a')
        autoplay();
    else if(event.key==='Backspace')
        reset();
    else if (event.key=='y')
        choice('Yes');
    else if (event.key=='n')
        choice('No');
});

let s=JSON.parse(localStorage.getItem('s'))||{
    w:0,
    l:0,
    t:0
};

let isAutoPlay=false;
let intrvl;

update();

function autoplay(){
    if (!isAutoPlay){
        document.querySelector('.auto').innerHTML='Stop Playing';
        intrvl=setInterval(function(){
            const c=move();
            play(c);
        },1000);
        isAutoPlay=true;
    }
    else{
        document.querySelector('.auto').innerHTML='Auto Play';
        clearInterval(intrvl);
        isAutoPlay=false;
    }
}

function play(p){
    const c=move();
    let d='';
    if (p==='rock'){
        if (c==='rock')
            d='Tie';
        else if(c==='paper')
            d='You Lose';
        else if(c==='scissors')
            d='You Win';                         
    }
    else if(p==='paper'){
        if (c==='rock')
            d='You Win';
        else if(c==='paper')
            d='Tie';
        else if(c==='scissors')
            d='You Lose';
    }
    else if(p==='scissors'){
        if (c==='rock')
            d='You Lose';
        else if(c==='paper')
            d='You Win';
        else if(c==='scissors')
            d='Tie';
    }
    if(d==='You Win')
        s.w+=1;
    else if(d==='You Lose')
        s.l+=1;
    else if(d==='Tie')
        s.t+=1;

    localStorage.setItem('s',JSON.stringify(s));

    document.querySelector('.result').innerHTML=d;
    document.querySelector('.moves').innerHTML=`You <img src="images/${p}-emoji.png" class="choice"> 
    <img src="images/${c}-emoji.png" class="choice"> Computer `;
    update();
}

function update(){
    document.querySelector('.score').innerHTML=`Wins: ${s.w}, Losses: ${s.l}, Ties: ${s.t}`;
}

document.querySelector('.game').addEventListener('click',()=>{
    play('rock');
})
document.querySelector('.rst').addEventListener('click',()=>{
    // console.log('reset');
    
    reset();
});

function reset(){
    document.querySelector('.reset').innerHTML=`
        Are you sure want to reset the score?
        <button class="b b1">Yes</button><button class="b b2">No</button>
    `;
    document.querySelector('.b1').addEventListener('click',()=>{
        choice('Yes');
    });
    document.querySelector('.b2').addEventListener('click',()=>{
        choice('No');
    });
}


function choice(c){
    if (c==='Yes'){
        s.w=0;
        s.l=0;
        s.t=0;
        localStorage.removeItem('s');
        update();
        document.querySelector('.reset').innerHTML='';
        document.querySelector('.moves').innerHTML='';
    }
    else if(c==='No'){
        document.querySelector('.reset').innerHTML='';
    }
        
}

function move(){
    let c='';
    const r=Math.random();

    if (r>=0 && r<1/3)
        c='rock';
    else if(r>=1/3 && r<2/3)
        c='paper';
    else
        c='scissors';
    return c;
}
