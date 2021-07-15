En este proyecto hemos realizado juego de navegador conocido como match-3 : https://cabezadenispero.github.io/matcheadas/

Lo hemos hecho entre:

María Cecilia Teisaire: https://github.com/CeciTeser

San Ruidiaz: https://github.com/San-rui

María Dolores Garcia: https://github.com/Cabezadenispero

Para Ada, en el módulo en el que se evalúa estructuras de control.

Hemos desarrollado una aplicación construyendo una grilla donde se controla el input de quien juegue, aplicando la logica del juego y funcionalidades como un sistema de puntuación de dificultad para crear una experiencia totalmente interactiva.

Dado que el módulo anterior que hemos visto ha sido HTML y CSS, hemos comenzado nuestro proyecto por el armado de diseño y luego nos hemos enfocado en agregar las funcionalidades correspondientes a JavaScript.

El diseño que debimos seguir es el siguiente que encontrarán aquí: https://frontend-proyecto-matcheadas.adaitw.org/

Las funcionalidades que hemos tenido que darle al editor de memes han sido las siguientes:

*   Debe generar una grilla
*   Debe llenar la grilla con ítems aleatorios
*   Debe seleccionarse un ítem al hacer click en él
*   Al clickear un nuevo ítem, si este no se encuentra adyacente al seleccionado, debe seleccionarse el nuevo ítem cleado
*   Al clickear un nuevo ítem, si este no encuentra adyacente al seleccionado, debe intercambiar las posiciones de ambos ítems
*   Debe eliminar grupos horizontales
*   Debe chequear si hay grupos horizontales. 3 o más ítems iguales en fila
*   Debe eliminar los ítem en grupos horizontales
*   Debe hacer descender el bloque de ítems que quedó por encima del espacio dejado por los ítems eliminados
*   Debe rellenar el espacio vacío restante con ítems aleatorios
*   Debe repetir pasos del 6.a al 6.d hasta que no queden más grupos horizontales
*   Debe eliminar grupos horizontales. 3 o más ítems iguales en columna
*   Debe generar un tablero sin grupos. Al generar una nueva partida, el tablero no debería tener ning´¨ún presente
*   Debe volver los ítems a sus lugares originales si no hay grupos encontrados. Al intercambiar dos ítems, si dicha operación no generó ningún grupo, deben intercambiarse nuevamente las posiciones de dichos ítems
*   Debe llevar la cuenta del puntaje. Al eliminar ítems se suman puntos (100 por cada uno). Al comenzar una nueva partida se reinician los puntos
*   Las partidas deben tener una duración. Cada partida debe durar 30 segundos, al terminar el tiempo debe aparecer un modal con un puntaje obtenido y preguntar si se quiere reiniciar o comenzar una nueva partida
*   Debe poderse reiniciar el juego. Si se reinicia el juego, se debe comenzar un mismo juego en la misma dificultad (es decir, tamaño de grilla)


Funcionalidades avanzadas: 
*   Debe contar con combos. Un combo es un grupo de ítems eliminados. Mientras siga habiendo grupos que se sigan eliminando luego de una jugada, el modificador de combos debe ir aumentando en 1. Cuando ya no se encuentran más combos (es decir, más grupos para eliminar), el modificador de combos debe volver a 1
*   Debe modificar puntaje en base al modificador de combos. Cuando hay un modificador de combo x3 los puntos obtenidos se multiplican por ese modificador (en este caso, un ítem eliminado vale 300 puntos)
*   Debe poderse elegir la dificultad. Debe tener 3 dificultades a elegir en cada nueva partida:
    Fácil: grilla de 9x9
    Normal: grilla de 8x8
    Difícil: grilla de 7x7

