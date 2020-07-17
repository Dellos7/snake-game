import { update as updateSnake, draw as drawSnake, snakeIntersection, SNAKE_SPEED } from './snake.js';
import { update as updateFood, draw as drawFood } from './food.js';
import { isGamePaused } from './input.js';

let lastRenderTime = 0;
let gameOver = false;
let gamePaused = true;
const gameBoard = document.getElementById('game-board');

function main( currentTime ){
    if( gameOver ){
        if( confirm('You lost. Press ok to restart') ){
            window.location = '/';
        }
        return;
    }
    // Llama a la función cuando la ventana está lista para renderizarse
    window.requestAnimationFrame(main);
    // Segundos desde la ultima vez que se renderizó
    const secondsSinceLastRender = ( currentTime - lastRenderTime ) / 1000;
    // Segundos que deben pasar entre 2 renderizados
    const secondsBetweenSnakeRenders = 1 / SNAKE_SPEED;
    // Si no han pasado los segundos necesarios, no renderizamos
    if( secondsSinceLastRender < secondsBetweenSnakeRenders ) return;
    lastRenderTime = currentTime;
    gamePaused = isGamePaused();
    if( !gamePaused ){
        update();
        draw();
    }
    controlScreen();
}

window.requestAnimationFrame(main);

function update(){
    updateSnake();
    updateFood();
    checkDeath();
}

function draw(){
    gameBoard.innerHTML = ''; // Limpiamos el tablero para redibujar la serpiente
    drawSnake(gameBoard);
    drawFood(gameBoard);
}

function checkDeath(){
    //gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
    gameOver = snakeIntersection();
}

function controlScreen(){
    const controlScreenEl = document.querySelector('.control-screen');
    if( gamePaused ){
        controlScreenEl.classList.remove('oculto');
    } else{
        controlScreenEl.classList.add('oculto');
    }
}