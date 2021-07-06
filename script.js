const delay = (ms) => new Promise((res) => setTimeout(res, ms));

let size;
const matrixData = [];

const grid = document.getElementById('grid');

let match_grid = [];

let firstClick = null;
let secondClick = null;

let firstItemValue=[];
let secondItemValue = [];

let emptyCell=0;

//------Alert wellcome and choose level -------

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

//-------Initilize Matrix game--------------

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
    emptyCell=0;
    scorevalue.innerHTML=0;
}

//------------ Show Grid game------------------

const displayGrid = () => {
  grid.innerHTML="";


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

      cellDiv.setAttribute('data-y', `${matrixData.indexOf(matrixData[y])}`);
      cellDiv.setAttribute('data-x', `${matrixData.indexOf(matrixData[x])}`);

      image.style.pointerEvents='none'; 

    cellDiv.addEventListener('click', e=>{
        e.stopPropagation();
        console.log(e.target);
        play(e)
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

//-------- Start play----------

const play= async (e)=>{
  if(firstClick==null){
    firstClick=e.target;
  }
  else if (firstClick !=null){
    secondClick=e.target; 
    if(checkAdjacent(firstClick,secondClick)){
      switchItems(firstClick,secondClick)

        if (match_search()){
          //sumar puntos
          score(matrixData);
          fillEmpyItems (matrixData);  
        }else{
          
          await delay(1000)
          if (secondClick && firstClick){
            switchItems(secondClick, firstClick)
            firstClick = null;
            secondClick = null;
          }
        }
    } 
  }
}

//----- Check if elements is adjacent--------

const checkAdjacent=(firstClick,secondClick)=>{

      const firstClickX= Number(firstClick.dataset.x);
      const firstClickY= Number(firstClick.dataset.y);
      const secondClickX= Number(secondClick.dataset.x);
      const secondClickY= Number(secondClick.dataset.y);
  console.log("esta funcion comprueba si es adyacente")
  if(firstClickX === secondClickX){
      console.log("estoy en la misma columna")
      return (firstClickY === secondClickY - 1) || (firstClickY === secondClickY + 1);

  } else if (firstClickY === secondClickY){
    console.log("estoy en la misma fila")            
    return (firstClickX === secondClickX -1) || (firstClickX === secondClickX +1);
  }
    return false
}

//----- Switch items if adjacent--------

const switchItems=(firstClick, secondClick)=>{

  let imageSrcFirst = firstClick.firstChild.getAttribute('src');
  let imageSrcSecond = secondClick.firstChild.getAttribute('src');
  
  firstClick.firstChild.setAttribute('src',imageSrcSecond);
  secondClick.firstChild.setAttribute('src',imageSrcFirst);

    fx = firstClick.getAttribute('data-x');
    fy = firstClick.getAttribute('data-y');
    sx = secondClick.getAttribute('data-x');
    sy = secondClick.getAttribute('data-y');

    let valueFirstCell = matrixData[fy][fx];
    let valueSecondCell = matrixData[sy][sx];

    matrixData[fy][fx] = valueSecondCell;
    matrixData[sy][sx] = valueFirstCell;

    console.log("primero", valueFirstCell);
    console.log("segundo",valueSecondCell);

    console.log(matrixData);
    match_search(matrixData)
    
}

//--------Search for matches row and column--------------

const match_search  = () => {

    let hasMatchRow=false;
    let hasMatchColumn=false;

    let resultado=[];
    let hasMatch=false;
    //console.table(matrixData)
    console.log("en row")

    //---- Search in row
    for(let row = 0; row < matrixData.length; row++) {
      const rta = match_group_by_row(matrixData, row);
      if(rta) hasMatch = true
      //resultado.push(hasMatchRow)
    }
    console.log("en column")
    //---- Search in column
    for(let column = 0; column < matrixData[0].length; column++) {
      const rta = match_group_by_column(matrixData, column);

      if(rta) hasMatch = true
      //resultado.push(hasMatchColumn)
    }

    if (hasMatch){
      //await delay(3000)
      downItems(matrixData)
    }
  
  return hasMatch;

}

//---------- Match in row------------

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

//--------- Match in column----------

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

//---------- Down items and Fill -------------

const downItems=(matriz)=>{
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
    };
score(matrixData)
fillEmpyItems (matrixData);    
match_search(matrixData);
displayGrid();


firstClick = null;
secondClick = null;
}


const fillEmpyItems=(matriz)=>{

  for (let i=0; i< matriz.length; i++){
    for(let j=0; j<  matriz[i].length; j++){
      if(matriz[i][j]=='x'){
        matriz[i][j]=Math.floor(Math.random() * (7 - 1) ) + 1;
      }
    }
  } 
}

const scorevalue= document.getElementById('score');

const score =(matriz)=>{



  for (let i=0; i< matriz.length; i++){
    for(let j=0; j<  matriz[i].length; j++){
      if(matriz[i][j]=='x'){
        emptyCell++;
      }
    }
  }
  scorevalue.innerHTML= emptyCell*200;
  console.log("celdas", emptyCell)
};

