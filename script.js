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
              text: "Fácil",
              value: "easy",
            },
            normal: {
                text: "Normal",
                value: "normal",
            },
            dificil: {
                text: "Difícil",
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
    
    console.log("matrixData", matrixData);
    match_search  (matrixData);

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
      let image=document.createElement("img");
      cellDiv.style.width = cellWidth + 'px';
      cellDiv.style.height = cellHeight + 'px';
      cellDiv.style.left = positionX + 'px';
      cellDiv.style.top = positionY + 'px';
      cellDiv.style.borderRadius = '5px'; 
      cellDiv.className = 'grid-cell';
      grid.appendChild(cellDiv);
      cellDiv.appendChild(image);

      cellDiv.setAttribute('data-y', `[${matrixData.indexOf(matrixData[y])}]`);
      cellDiv.setAttribute('data-x', `[${matrixData.indexOf(matrixData[x])}]`);

      image.style.pointerEvents='none';
            
      cellDiv.addEventListener('click', e=>{
        e.stopPropagation();
        console.log(e.target)
      
      })

  const value = matrixData[y][x]
    switch(value){
      case 1:
        image.setAttribute("src","./images/icons/beach-ball.svg");
        break;
      case 2:
        image.setAttribute("src","./images/icons/crab.svg");
        break;
      case 3:
        image.setAttribute("src","./images/icons/palm.svg");
        break;
      case 4:
        image.setAttribute("src","./images/icons/icecream.svg");
        break;
      case 5:
        image.setAttribute("src","./images/icons/pineapple.svg");
        break;
      case 6:
        image.setAttribute("src","./images/icons/surfboard.svg");
        break;
                    
    } 
      positionX += cellWidth;
  }
        positionY += cellHeight;
  }
};


// Function game

let match_grid = [];

const match_search  = () => {

    let hasMatchRow=false;
    let hasMatchColumn=false;

    let resultado=[];
    console.table(matrixData)
  console.log("en row")
    for(let row = 0; row < matrixData.length; row++) {
      hasMatchRow=match_group_by_row(matrixData, row);
      resultado.push(hasMatchRow)
    }
    console.log("en column")
      // Search in column
    for(let column = 0; column < matrixData[0].length; column++) {
      hasMatchColumn=match_group_by_column(matrixData, column);
      resultado.push(hasMatchColumn)
    }

    console.log(resultado)
  
    if (resultado.includes(true)){
    down_elements(matrixData)
    }

}


// Match in row

const match_group_by_row = (full_grid, row) => {
  
  let group_start = -1;
  let group_end = -1;
  let group_size = 0;
  let number_of_column = full_grid[row].length;
  let last_element = false;
  let hasMatch=false;

  for(let column = 0; column < (number_of_column-1); column++) {
    if(full_grid[row][column]=='x') continue;
    last_element = (column+1 == number_of_column-1) ? true : false;

    if(full_grid[row][column]==full_grid[row][column+1]) {
        
      if(group_start == -1) { 
        group_start = column 
        if(last_element) {
        group_end = column
        }
        else {
          group_end = column+1
        }
        
      }
      else {
        group_end = column+1 
      }
      
      if(last_element) {
        group_size = group_end - group_start;
        
        if(group_size >= 2) {
          for(let j = group_start; j < group_end+1; j++) {
            full_grid[row][j] = 'x'
            hasMatch=true;
            
          }
        }
      }
    }
    else { 
      if(group_start != -1) { 
        group_size = group_end - group_start;

        if(group_size >= 2) {
          for(let k = group_start; k < group_end+1; k++) {
            full_grid[row][k] = 'x';
            hasMatch=true;
            
          }
        }
        
        group_start = -1
        group_end = -1
        
      }
    }
  }
  return hasMatch
  
}

// Match in column

const match_group_by_column = (full_grid, column) => {

let group_start = -1;
let group_end = -1;
let group_size = 0;
let number_of_rows = full_grid.length;
let last_element = false;
let hasMatch=false; 

  for(let row = 0; row < (number_of_rows-1); row++) {
    if(full_grid[row][column]=='x') continue;
    last_element = (row+1 == number_of_rows-1) ? true : false;

    if(full_grid[row][column]==full_grid[row+1][column]) {
      
      if(group_start == -1) { 
        group_start = row 
        if(last_element) {
          group_end = row
        }
        else {
          group_end = row+1
        }
        
      }
      else {

        group_end = row+1 
      }

      if(last_element) {
        group_size = group_end - group_start;

        if(group_size >= 2) {
          for(let h = group_start; h < group_end+1; h++) {
            full_grid[h][column] = 'x';
            hasMatch=true;
          }
        }
      }
    }
    else { 
      
      if(group_start != -1) { 
        group_size = group_end - group_start;

        if(group_size >= 2) {
          for(let z = group_start; z < group_end+1; z++) {
            full_grid[z][column] = 'x';
            hasMatch=true;
          }
        }

        group_start = -1
        group_end = -1

      }
    }
  }
  return hasMatch;

}

const down_elements=(matriz)=>{
    let l=0;
    while (l<10){
        for (let i=0; i< matriz.length-1; i++){
        
            for(let j=0; j<  matriz[i].length; j++){
                if( matriz[i+1][j]==='x' && matriz[i+1]!=undefined){
                    matriz[i+1][j]=matriz[i][j]
                    matriz[i][j]='x'
                
                }

            }
        }
    l++
    }
console.log("Matriz con x desplazadas",matriz)
match_search(matrixData) 
}


// const complete_grid=(matriz)=>{
//     let output= false;

//     for (let i=0; i< matriz.length; i++){

//         const array=matriz[i];

//         for (let j=0; j< array.length; j++){
//             if(array[j] === array [j+1] && array[j+1] === array [j+2]){
//                 output=true
//             }
//         }

//     }

//   console.log("Matriz complete grid",matriz)
// }
