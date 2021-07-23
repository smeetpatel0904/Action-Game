score=0;
cross=true;

audio = new Audio('music.mp3');
audioEnd = new Audio('gameover.mp3');
audio.play();

document.onkeydown = function(e){
    console.log('key code is', e.keyCode);
    if(e.keyCode==38)
    {
        player=document.querySelector('.player');
        player.classList.add('animatePlayer');
        setTimeout(() => {
            player.classList.remove('animatePlayer');
        }, 700);
    }
    if(e.keyCode==39){
        player=document.querySelector('.player');
        playerX = parseInt(window.getComputedStyle(player,null).getPropertyValue('left'));
        player.style.left = playerX + 112 + 'px';
    }
    if(e.keyCode==37){
        player=document.querySelector('.player');
        playerX = parseInt(window.getComputedStyle(player,null).getPropertyValue('left'));
        player.style.left = (playerX - 112) + 'px';
    }
}

setInterval(() => {
    player = document.querySelector('.player');
    obstacle = document.querySelector('.obstacle');
    gameOver = document.querySelector('.gameOver');
    
    dx = parseInt(window.getComputedStyle(player,null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(player,null).getPropertyValue('top'));
    
    ox = parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('left'));  
    oy = parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('top'));

    // dx = window.getComputedStyle(player,null).getPropertyValue('left');
    // dy = window.getComputedStyle(player,null).getPropertyValue('top');
    
    // ox = window.getComputedStyle(obstacle,null).getPropertyValue('left');  
    // oy = window.getComputedStyle(obstacle,null).getPropertyValue('top');
    // console.log(dx,ox,dy,oy)
    
    offsetX= Math.abs(dx-ox);
    offsetY= Math.abs(dy-oy);
    if(offsetX<80 && offsetY<55){
        gameOver.innerHTML = "Game Over- Reload to play again";
        obstacle.classList.remove('obstacleAni');
        audioEnd.play();
        setTimeout(() => {
            audioEnd.pause();
            // audio.pause();
        }, 1000);
       
    }

    else if(offsetX<80 && cross) {
        audio.play();
        cross=false;
        score += 1;
        updateScore(score);
        setTimeout(() => {
            cross=true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle,null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
            console.log('New Animation Duration: '+newDur);
        }, 1000);
    }

}, 10);

function updateScore(score){
    scoreCard = document.querySelector('.scoreCard')
    scoreCard.innerHTML = "Your Score: "+score
}