const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const playerSize = 40;
const botSize = 40;
let player = { x: 100, y: 500, color: 'blue' };
let bullets = [];
let bots = [];
let isJumping = false;
let jumpVelocity = 0;
const gravity = 0.8;

document.getElementById('loading').style.display = 'none';

function createBots(qty = 3) {
  bots = [];
  for (let i = 0; i < qty; i++) {
    bots.push({
      x: 400 + i * 60,
      y: 500,
      color: 'red',
      alive: true
    });
  }
}

function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, playerSize, playerSize);
}

function drawBots() {
  bots.forEach(bot => {
    if (bot.alive) {
      ctx.fillStyle = bot.color;
      ctx.fillRect(bot.x, bot.y, botSize, botSize);
    }
  });
}

function drawBullets() {
  ctx.fillStyle = 'yellow';
  bullets.forEach(b => ctx.fillRect(b.x, b.y, 5, 5));
}

function moveLeft() {
  player.x -= 10;
}
function moveRight() {
  player.x += 10;
}
function shoot() {
  bullets.push({ x: player.x + playerSize / 2, y: player.y });
}
function jump() {
  if (!isJumping) {
    isJumping = true;
    jumpVelocity = -12;
  }
}

function update() {
  if (isJumping) {
    player.y += jumpVelocity;
    jumpVelocity += gravity;

    if (player.y >= 500) {
      player.y = 500;
      isJumping = false;
    }
  }

  bullets.forEach(b => (b.y -= 5));

  bullets = bullets.filter(b => b.y > 0);

  bots.forEach(bot => {
    bullets.forEach(bullet => {
      if (
        bullet.x > bot.x &&
        bullet.x < bot.x + botSize &&
        bullet.y > bot.y &&
        bullet.y < bot.y + botSize
      ) {
        bot.alive = false;
      }
    });
  });

  bots = bots.filter(bot => bot.alive);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  drawBots();
  drawBullets();
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

createBots();
gameLoop();
