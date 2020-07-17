import { onSnake, expandSnake } from './snake.js';
import { randomGridPosition } from './grid.js';

const EXPANSION_RATE = 1;
let food = getRandomFoodPosition();

export function update(){
    if( onSnake(food) ){ // La serpiente se come la comida
        expandSnake(EXPANSION_RATE);
        food = getRandomFoodPosition();
    }
}

export function draw(gameBoard){
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    gameBoard.appendChild( foodElement );
}

function getRandomFoodPosition(){
    let newFoodPosition;
    while( !newFoodPosition || onSnake(newFoodPosition) ){
        newFoodPosition = randomGridPosition();
    }
    return newFoodPosition;
}