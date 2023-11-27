
//Funcion paro de juego al superar valor de 22

function paroJuego(valor1, valor2) {

    if (valor1 > 22 || valor2 > 22) {

        document.getElementById('pedir-cartas').disabled = true;
        document.getElementById('pedir-cartas-crupier').disabled = true;

        let parada = document.getElementById(`ganador`);

        setTimeout(function () {
            parada.innerHTML = "PERDISTE";
        }, 1350)
    }
}

//Funcion que dirime ganador y empates

function ganador(valor1, valor2) {



    if (valor1 > valor2) {

        let ganador = document.getElementById(`ganador`);
        ganador.innerHTML = "GANA BANCA";
        document.getElementById('pedir-cartas').disabled = true;
        document.getElementById('pedir-cartas-crupier').disabled = true;
        document.getElementById('plantarseJ').disabled = true;
        document.getElementById('plantarseC').disabled = true;

    } else if (valor1 < valor2) {
        let ganador = document.getElementById(`ganador`);
        ganador.innerHTML = `GANA "${nombreJugador}"`;
        document.getElementById('pedir-cartas').disabled = true;
        document.getElementById('pedir-cartas-crupier').disabled = true;
        document.getElementById('plantarseJ').disabled = true;
        document.getElementById('plantarseC').disabled = true;

    } else if (valor1 == valor2) {
        let ganador = document.getElementById(`ganador`);
        ganador.innerHTML = "EMPATE";
        document.getElementById('pedir-cartas').disabled = true;
        document.getElementById('pedir-cartas-crupier').disabled = true;
        document.getElementById('plantarseJ').disabled = true;
        document.getElementById('plantarseC').disabled = true;


    }

}

//Funcion usada al pulsar plantarse el jugador

function plantarseJ() {

    document.getElementById('pedir-cartas').disabled = true;
    document.getElementById('pedir-cartas-crupier').disabled = true;

    //al pulsar plantarse el jugador, imprimo quien ha gadado
    ganador(sumaC, sumaJ);

}

//Funcion usada al pulsar plantarse el crupier

function plantarseC() {

    document.getElementById('pedir-cartas').disabled = false;
    document.getElementById('pedir-cartas-crupier').disabled = true;

}

//Funcion usada al pulsar nueva partida

function nuevaPartida() {

    sumaJ = 0;
    sumaC = 0;
    document.getElementById('pedir-cartas').disabled = true;
    document.getElementById('pedir-cartas-crupier').disabled = true;
    document.getElementById('plantarseJ').disabled = true;
    document.getElementById('plantarseC').disabled = true;

}
