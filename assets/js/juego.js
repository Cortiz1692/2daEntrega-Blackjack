let baraja = [];
const tipos = ['C', 'D', 'H', 'S'];
const letras = ['A', 'J', 'Q', 'K'];
 
let puntosJugador = 0,
    puntosComputadora = 0;

//Referencia del Html 
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');

const CartasJugador = document.querySelector('#jugador-cartas'); 
const CartasComputadora = document.querySelector('#computadora-cartas'); 

const puntos = document.querySelectorAll('small');

// Funcion que crea baraja
const crearBaraja = () => {

    for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos) {
            baraja.push(i + tipo);
        }

    }
    for (let tipo of tipos) {
        for (let letra of letras) {
            baraja.push(letra + tipo);
        }
    }
    console.log(baraja);
    return baraja;
}
crearBaraja();

//Funcion que toma una carta

const pedirCarta = () => {
    if (baraja.length === 0) {
        alert('ya no hay cartas');
    }
    const cartas = baraja[Math.floor(Math.random() * baraja.length)];
    const carta = baraja.pop();
    
    return cartas;
}

//pedirCarta();
const valorCarta = (carta) => {

    const valor = carta.substring(0, carta.length - 1);
    return ( isNaN( valor ) ) ? 
            ( valor === 'A' ) ? 11 : 10
            : valor * 1;
}

//Computadora
const turnoComputadora = (ptsMinimos) => {
 do{
    const carta = pedirCarta();

    puntosComputadora = puntosComputadora + valorCarta(carta);
    puntos[1].innerText = puntosComputadora;   
  
  
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png`;
    imgCarta.classList.add('carta');
    CartasComputadora.append(imgCarta);

    if(ptsMinimos > 21){
        break;
    }

 } while( (puntosComputadora < ptsMinimos) && (ptsMinimos <=21) );
 setTimeout(() => {
    if(puntosComputadora === ptsMinimos){
        alert ('Es un empate')
    }else if(ptsMinimos > 21){
        alert('Lo siento perdiste')
    }else if(puntosComputadora > 21){
        alert('Felicidades, Ganasteee!!!');
    }else{
        alert('Perdiste :(')
    }
}, 100 );
 

}

//Eventos

 btnPedir.addEventListener('click', (e) => {
    e.preventDefault();
  const carta = pedirCarta();

  puntosJugador = puntosJugador + valorCarta(carta);
  puntos[0].innerText = puntosJugador;   


  const imgCarta = document.createElement('img');
  imgCarta.src = `assets/cartas/${ carta }.png`;
  imgCarta.classList.add('carta');
  CartasJugador.append(imgCarta);

  if ( puntosJugador > 21 ){
    alert ("usted a perdido el Juego !!!!");
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
  }else if(puntosJugador === 21){
    alert ("Felicitaciones!!! lograste el maximo puntaje")
    btnPedir.disabled = true; 
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
}

 });

 btnDetener.addEventListener ('click', ()=>{
    btnPedir.disabled = true;
    btnDetener.disabled = true;

    turnoComputadora(puntosJugador);


 });

 btnNuevo.addEventListener ('click', ()=> {
    let nombre = prompt('Bienvenido, Ingresa tu nombre');

    alert ('Hola ' + nombre + ' para empezar a jugar tienes que pedir una carta ¡¡ Muchos exitos :)!!');
    console.clear();

    baraja= [];
    baraja = crearBaraja();

    puntosJugador = 0;
    puntosComputadora = 0;

    puntos [0].innerText = 0;
    puntos [1].innerText = 0;

    CartasComputadora.innerHTML =''; 
    CartasJugador.innerHTML= '';
    btnPedir.disabled = false;
    btnDetener.disabled = false;






 });






