

/* https://github.com/gonri1/blackJack2 */


//Establezco variables que voy a necesitar

let cartas = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
let palos = ['C', 'D', 'T', 'P'];
let sumaJ = 0;
let sumaC = 0;



//Principio partida, tira Crupier, desabilitamos jugador, y ambos plantarse

document.getElementById('pedir-cartas').disabled = true;
document.getElementById('plantarseJ').disabled = true;
document.getElementById('plantarseC').disabled = true;

// Combinamos los palos y las cartas con un doble bucle

let baraja = [];

for (let i = 0; i < palos.length; i++) {
    for (let j = 0; j < cartas.length; j++) {
        baraja.push(cartas[j] + palos[i]);
    }
}



// Barajo cartas con una funcion nativa


/* Sacamos una funcion de esta pagina con funciones ya realziadas


        https://underscorejs.org/ */


baraja = _.shuffle(baraja);



//console.log(baraja);//Carta barajada

//Importo clase carta

//CREANDO Clase Tipo Carta

class carta {

    imagen;
    valor;
    representacion;

    constructor(imagen, valor, representacion) {
        this.imagen = imagen;
        this.valor = (valor == "J" || valor == "Q" || valor == "K") ? 10 : valor;
        this.representacion = representacion;
    }

    //getters

    get getImagen() {
        return this.imagen;

    };

    get getValor() {

        return this.valor;
    }


    get getRepresentacion() {
        return this.representacion;

    };

}

//Creo funcion que me imprima las cartas

function printCartas(jugadas, baraja, participante) {

    let sacoRepresentacion = [];
    let sacoImagen = [];
    let sacoValor = [];
    let a = 0;

    // saco la representacion de manera aleatoria

    while (a < jugadas) {
        sacoRepresentacion[a] = baraja[Math.floor(Math.random() * baraja.length)];
        a++;
    }

    //en base a lo anterior, saco la src de la imagen

    for (let index = 0; index < sacoRepresentacion.length; index++) {
        sacoImagen.push(`images/${sacoRepresentacion[index]}.png`);
    }

    //en base a lo anterior, saco la el valor de la carta

    sacoValor = sacoRepresentacion.map(item => item.replace(/[CDTP]/g, ''));


    //Creo Objeto

    let cartas = new carta(sacoImagen, sacoValor, sacoRepresentacion);//devuelve Objeto carta


    //paso valores del objeto a variables

    let valor = cartas["getValor"];
    let representacion = cartas["getRepresentacion"];
    let imagen = cartas["getImagen"];


    //quito carta de la baraja

    for (let index = 0; index < baraja.length; index++) {

        if (baraja[index] == representacion) {

            baraja = baraja.splice(index, 1);
        }

    }

    //Imprimo cartas segun esas variables

    let mano = document.getElementById(`mano-${participante}`);

    // Suponiendo que 'imagen' y 'representacion' están definidos antes de este código

    setTimeout(function () {
        mano.innerHTML += `<img src="utils/${imagen}" alt="${representacion}" style="width: 50px;">`;
    }, 900);



    //manejo los valores de los contadores segun sea el jugador

    if (participante == 'jugador') {
        document.getElementById('plantarseJ').disabled = false;
        sumaJ += parseInt(valor);

        let valores = document.getElementById(`valor-${participante}`);
        setTimeout(function () {
            valores.innerHTML = sumaJ + " Puntos";
        }, 1200);

    } else if (participante == 'crupier') {

        document.getElementById('plantarseC').disabled = false;
        sumaC += parseInt(valor);

        let valores = document.getElementById(`valor-${participante}`);
        setTimeout(function () {
            valores.innerHTML = sumaC + " Puntos";
        }, 1200);
    }

    //paro juego si superan 21

    paroJuego(sumaC, sumaJ);
}



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

function plantarseJ() {

    document.getElementById('pedir-cartas').disabled = true;
    document.getElementById('pedir-cartas-crupier').disabled = true;

    //al pulsar plantarse el jugador, imprimo quien ha gadado
    ganador(sumaC, sumaJ);

}
function plantarseC() {

    document.getElementById('pedir-cartas').disabled = false;
    document.getElementById('pedir-cartas-crupier').disabled = true;

}


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


function nuevaPartida() {

    sumaJ = 0;
    sumaC = 0;
    document.getElementById('pedir-cartas').disabled = true;
    document.getElementById('pedir-cartas-crupier').disabled = true;
    document.getElementById('plantarseJ').disabled = true;
    document.getElementById('plantarseC').disabled = true;

}
