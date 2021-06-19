let size;

const selectLevel = (selectLevelOnCompleteCallback) =>{
    swal({title: "!Bienvenida!",
        text: "En matcheADAs tu objetivo es juntar tres o más items del mismo tipo, ya sea en fila o en columna. Para eso, selecciona un item y a continuación un item adyacente para intercambiarlos de lugar. \n \n Si se forma un grupo, esos items se eliminarán y ganarás puntos. ¡Sigue armando grupos de tres o más antes de que se acabe el tiempo! \n \n Controles \n Click izquierdo: selección. \n Enter o espacio: selección. \n Flechas o WASD: movimiento e intercambio." ,
        button: "A Jugar",
        closeOnClickOutside: false,
    }).then((valor) => {
        if(valor){
            swal({title: "Nuevo juego",
        text: "Selecciona una dificultad",
        closeOnClickOutside: false,
        buttons: {
        facil: {
            text: "Facil",
            value: "easy",
        },
        normal: {
            text: "normal",
            value: "normal",
        },
        dificil: {
            text: "dificil",
            value: "difficult",
        }
        },
    }).then((value) => {
        let level = 0;
        switch (value) {

            case "easy":
            level = 9;
            break;
            
            case "normal":
            level = 8;
            break;
        
            case "difficult":
            level = 7;
            break;
        }
        size = level;
        selectLevelOnCompleteCallback(size);
    });
        }
        
    });
};
window.addEventListener('load', selectLevel(function(size){
    initilizeMatrix(size);
    displayGrid();
}));

// Initilize Matrix game

const matrixData = []; 

const initilizeMatrix = (size) => {
    for(let i = 0; i < size; i ++){
        let row = [];
        for(let j = 0; j < size; j ++){
            const cell = Math.floor(Math.random() * (7 - 1) ) + 1;
            row.push(cell);
        }
        matrixData.push(row);
    }
}

// Show Grid game

const grid = document.getElementById('grid');

const displayGrid = () => {
    let positionY = 0;
    const cellWidth = (grid.offsetWidth / matrixData.length);
    const cellHeight = (grid.offsetHeight / matrixData.length);
    for(let y = 0; y < matrixData.length; y++){
        let positionX = 0;
        for(let x = 0; x < matrixData[y].length; x++){
    
            let cellDiv = document.createElement('div');
            cellDiv.style.width = cellWidth + 'px';
            cellDiv.style.height = cellHeight + 'px';
            cellDiv.style.left = positionX + 'px';
            cellDiv.style.top = positionY + 'px';
            cellDiv.style.borderRadius = '5px'; 
            cellDiv.className = 'grid-cell';
            grid.appendChild(cellDiv);
            const value = matrixData[y][x]
            switch(value){
                case 1:
                    cellDiv.style.backgroundColor = 'red';
                    break;
                case 2:
                    cellDiv.style.backgroundColor = 'blue';
                    break;
                case 3:
                    cellDiv.style.backgroundColor = 'white';
                    break;
                case 4:
                    cellDiv.style.backgroundColor = 'orange';
                    break;
                case 5:
                    cellDiv.style.backgroundColor = 'green';
                    break;
                case 6:
                    cellDiv.style.backgroundColor = 'yellow';
                    break;
                            
            } 
            positionX += cellWidth;
        }
        positionY += cellHeight;
    }
}
