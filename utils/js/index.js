

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

    sacoValor = sacoRepresentacion.map(item => item.replace(/[CDTP]/g, ''));//Uso expresion regular para quitar las letras de la bajaja (CDTP)


    //Creo Objeto

    let cartas = new carta(sacoImagen, sacoValor, sacoRepresentacion);//devuelve Objeto carta


    //paso valores del objeto a variables

    let valor = cartas["getValor"];
    let representacion = cartas["getRepresentacion"];
    let imagen = cartas["getImagen"];


    //quito carta de la baraja


    for (let index = 0; index < baraja.length; index++) {

        if (baraja[index] == representacion) {

            baraja.splice(index, 1);
        }

    }


    //Imprimo cartas segun esas variables

    let mano = document.getElementById(`mano-${participante}`);

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


    paroJuego(sumaC, sumaJ); //llamo funcion paro juego si superan 21

}



