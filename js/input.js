let inputDirection = { x: 0, y: -1 };
let lastInputDirection = { x: 0, y: 0 };
let gamePaused = true;

window.addEventListener('keydown', e => {
    switch( e.key ){
        case 'ArrowUp':
            if( lastInputDirection.y == 0 ){ // No permitir mover hacia arriba si nos movemos hacia abajo
                inputDirection = { x: 0, y: -1 };
            }
            break;
        case 'ArrowDown':
            if( lastInputDirection.y == 0 ){ // No permitir mover hacia abajo si nos movemos hacia arriba
                inputDirection = { x: 0, y: 1 };
            }
            break;
        case 'ArrowLeft':
            if( lastInputDirection.x == 0 ){ // No permitir mover hacia la izq. si nos movemos hacia la derecha
                inputDirection = { x: -1, y: 0 };
            }
            break;
        case 'ArrowRight':
            if( lastInputDirection.x == 0 ){ // No permitir mover hacia la derecha si nos movemos hacia la izq.
                inputDirection = { x: 1, y: 0 };
            }
            break;
        case " ": // Espacio
            toggleGamePaused();
            break;
    }
});

document.getElementById('start-button').addEventListener('click', () => {
    toggleGamePaused();
});

function toggleGamePaused(){
    gamePaused = !gamePaused;
}

export function getInputDirection(){
    lastInputDirection = inputDirection;
    return inputDirection;
}

export function isGamePaused(){
    return gamePaused;
}