import { getInputDirection } from "./input.js";
import { GRID_SIZE } from './grid.js';

export const SNAKE_SPEED = 7; // Veces por segundo que se mueve la serpiente
// Guardamos los "segmentos" (cuadraditos) de la serpiente
const snakeBody = [
    {x: 11, y: 11}
];
let newSegments = 0;

export function update(){
    addSegments();
    const inputDirection = getInputDirection();
    // Desde el penúltimo segmento hasta el primero
    for( let i = snakeBody.length - 2; i >= 0; i-- ){
        // El segmento anterior es igual al segmento actual (creamos una copia)
        snakeBody[i+1] = { ...snakeBody[i] };
    }
    snakeBody[0].x = calculateXPosition(inputDirection);
    snakeBody[0].y = calculateYPosition(inputDirection);
}

export function draw(gameBoard){
    // Recorremos cada segmento de la serpiente y lo mostramos en el grid
    snakeBody.forEach( segment => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.classList.add('snake');
        gameBoard.appendChild( snakeElement );
    });
}

// Calcula la posición de la cabeza teniendo en cuenta que puede atravesar paredes y aparecer por el otro lado
function calculateXPosition(inputDirection){
    let newSnakeBodyX;
    if( snakeBody[0].x + inputDirection.x == GRID_SIZE + 1 ){
        newSnakeBodyX = 1;
    } else if( snakeBody[0].x + inputDirection.x == 0 ){
        newSnakeBodyX = GRID_SIZE;
    } else{
        newSnakeBodyX =  snakeBody[0].x + inputDirection.x;
    }
    return newSnakeBodyX;
}

// Calcula la posición de la cabeza teniendo en cuenta que puede atravesar paredes y aparecer por el otro lado
function calculateYPosition(inputDirection){
    let newSnakeBodyY;
    if( snakeBody[0].y + inputDirection.y == GRID_SIZE + 1 ){
        newSnakeBodyY = 1;
    } else if( snakeBody[0].y + inputDirection.y == 0 ){
        newSnakeBodyY = GRID_SIZE;
    } else{
        newSnakeBodyY =  snakeBody[0].y + inputDirection.y;
    }
    return newSnakeBodyY;
}

export function expandSnake( amount ){
    newSegments += amount;
}

// Calcula si una posición "x,y" coincide con alguno de los segmentos de la serpiente
export function onSnake( position, { ignoreHead = false } = {} ){
    return snakeBody.some( (segment, index) => {
        if( ignoreHead && index == 0 ){
            return false;
        }
        return equalPositions( segment, position );
    });
}

export function getSnakeHead(){
    return snakeBody[0];
}

export function snakeIntersection(){
    return onSnake(snakeBody[0], { ignoreHead: true });
}

function equalPositions( pos1, pos2 ){
    return pos1.x === pos2.x && pos1.y === pos2.y;
}

function addSegments() {
    // Añadimos al final tantos segmentos como hayamos especificado
    const ultimoSegmento = snakeBody[snakeBody.length-1];
    for( let i = 0; i < newSegments; i++ ){
        snakeBody.push({ ...ultimoSegmento });
    }
    newSegments = 0;
}