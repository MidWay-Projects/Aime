window.onload = function() {
  const bestScore = localStorage.getItem('highScore');
  if (bestScore) {
    document.getElementById('bestScore').textContent = bestScore;
  }
};

document.getElementById('closeButton').addEventListener('click', function() {
  document.getElementById('menu-shadow').style.display = 'none';
  startGame();
});

let points = 0;
let dotLimit = 15;
let gameInterval;
let gameRunning = false;

function generateDot() {
  const game = document.getElementById('game');
  const dot = document.createElement('div');
  dot.classList.add('dot');
  
  const randomNumber = Math.random();
  if (randomNumber < 0.25) {
    dot.classList.add('red');
    dot.addEventListener('click', function() {
      endGame();
      playDead();
    });
    
    setTimeout(function() {
      game.removeChild(dot);
    }, 5000);
  } 
  
  else {
    dot.classList.add('blue');
    dot.addEventListener('click', function() {
      points++;
      document.getElementById('points').textContent = points;
      game.removeChild(dot);
    });
  }
  
  const posX = Math.random() * (game.offsetWidth - 40);
  const posY = Math.random() * (game.offsetHeight - 40);
  
  dot.style.left = posX + 'px';
  dot.style.top = posY + 'px';
  
  game.appendChild(dot);
  
  if (document.querySelectorAll('.dot').length >= dotLimit) {
    clearInterval(gameInterval);
    endGame();
    playDead();
  }
}



function startGame() {
  if (!gameRunning) {
    points = 0;
    document.getElementById('points').textContent = points;
    gameRunning = true;
    gameInterval = setInterval(generateDot, 650);
  }
}

function saveRecord(score) {
  const highScore = localStorage.getItem('highScore');
  if (!highScore || score > highScore) {
    localStorage.setItem('highScore', score);
    document.getElementById('bestScore').textContent = score;
  }
}

function endGame() {
  clearInterval(gameInterval);
  const game = document.getElementById('game');
  const dots = document.querySelectorAll('.dot');
  dots.forEach(dot => game.removeChild(dot));
  gameRunning = false;
  document.getElementById('menu-shadow').style.display = 'flex';
  saveRecord(points);
}

function playDead() {
  const audio = new Audio('dead.mp3');
  audio.play();
}

document.getElementById('closeRules').addEventListener('click', function() {
  document.getElementById('rules-shadow').style.display = 'none';
});

document.getElementById('rulesOpen').addEventListener('click', function() {
  document.getElementById('rules-shadow').style.display = 'flex';
});
