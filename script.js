window.onload = function () {
    swal({title: "!Bienvenida!",
        text: "En matcheADAs tu objetivo es juntar tres o más items del mismo tipo, ya sea en fila o en columna. Para eso, selecciona un item y a continuación un item adyacente para intercambiarlos de lugar. \n \n Si se forma un grupo, esos items se eliminarán y ganarás puntos. ¡Sigue armando grupos de tres o más antes de que se acabe el tiempo! \n \n Controles \n Click izquierdo: selección. \n Enter o espacio: selección. \n Flechas o WASD: movimiento e intercambio." ,
        button: "A Jugar",
        closeOnClickOutside: false,
        button: "A jugar",
    })
    .then((valor) => {
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
    })
    .then((value) => {
        switch (value) {

            case "easy":
            swal("se tiene q abrir el juego facil");
            break;
            
            case "normal":
            swal("se tiene q abrir el juego normal");
            break;
        
            case "difficult":
            swal("se tiene q abrir el juego dificil");
            break;
        }
    });
        }
        
    });}
