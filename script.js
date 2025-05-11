
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let player = { x: 100, y: 100, size: 40 };
let bots = Array.from({length: 5}, (_, i) => ({ x: 200 + i*60, y: 100, size: 40 }));

function drawPlayer() {
    ctx.fillStyle = "blue";
    ctx.fillRect(player.x, player.y, player.size, player.size);
}
function drawBots() {
    ctx.fillStyle = "red";
    bots.forEach(bot => ctx.fillRect(bot.x, bot.y, bot.size, bot.size));
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawBots();
    requestAnimationFrame(update);
}
update();
