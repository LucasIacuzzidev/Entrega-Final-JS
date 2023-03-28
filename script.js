Swal.fire({
  icon: 'info',
  title: 'Simulador de prestamos personales',
  text: 'Coderhouse  Comisión 48665 ',
  footer: '<a href="https://github.com/IacuzziDev/preEntrega3JS">Repositorio de gitHub</a>'
})

// Objeto Deudor // 
function Deudor(nombre, apellido, totalAdeudado) {
  this.nombre = nombre;
  this.apellido = apellido;
  this.totalAdeudado = totalAdeudado;
}

// Array de deudores // 
const deudores = [];

// Función para solicitar los datos del préstamo // 
const datosPrestamoForm = document.getElementById("datosPrestamo");

function datosPrestamo() {
  const sueldoMinimo = 100000;
  datosPrestamoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombres = document.getElementById("name").value;
    const apellido = document.getElementById("lastName").value;
    let sueldo = parseFloat(document.getElementById("income").value);
    const montoPrestamo = parseFloat(document.getElementById("prestamoMonto").value);
    const cantidadMeses = parseInt(document.getElementById("cuotas").value);
    const montoTotal = simuladorDeIntereses(montoPrestamo, cantidadMeses);
    const deudor = new Deudor(nombres, apellido, montoTotal);
    deudores.push(deudor)

    if (sueldo < sueldoMinimo) {
      datosPrestamoForm.reset();
      let noCalifica = document.createElement("p");
      noCalifica.innerHTML = "<p>Lo sentimos no tenemos un prestamo para ofrecerte</p>";
      noCalifica.style.textAlign = "center";
      document.body.append(noCalifica);
      return;
    }

    let montoPagar = document.createElement("p");
    const resultado = simuladorDeIntereses(montoPrestamo, cantidadMeses);
    montoPagar.innerHTML = `Hola ${nombres} ${apellido}, el monto total a pagar es de $ ${resultado.montoTotal} en ${cantidadMeses} cuotas de $ ${resultado.valorCuota} cada una.`;    montoPagar.style.textAlign = "center";
    document.body.append(montoPagar);

    const montosAdeudados = deudores.map((deudor) => deudor.totalAdeudado);
      const montosDeudasGrandes = deudores.filter((deudor) => deudor.totalAdeudado > 50000);
      console.log("Montos adeudados:", montosAdeudados);
      console.log("Montos de deudas mayores a 50000:", montosDeudasGrandes);
      const ultimoDeudor = deudores[deudores.length - 1];
      console.log(`El último deudor agregado es: ${ultimoDeudor.nombre} ${ultimoDeudor.apellido} con un total adeudado de $${ultimoDeudor.totalAdeudado}`); // Solo el ultimo deudor 
      console.log(deudores); // Array de deudores (almacena cada simulacion de prestamo.)
    datosPrestamoForm.reset();
  });
}

// Función para simular los intereses del préstamo // 
function simuladorDeIntereses(montoPrestamo, cantidadMeses) {
  const tasaInteres = 0.08;
  let montoTotal = montoPrestamo;

  for (let i = 0; i < cantidadMeses; i++) {
    montoTotal += montoTotal * tasaInteres;
  }

  const valorCuota = Math.ceil(montoTotal / cantidadMeses);

  return { montoTotal: Math.ceil(montoTotal), valorCuota };
}

// Modo Dark-Light 
const botonFondo = document.getElementById("botonFondo");

botonFondo.addEventListener("click", ()=>{
  document.body.classList.toggle("dark");
  if(document.body.classList.contains("dark")){
      localStorage.setItem("modo", "dark")
  }else {
      localStorage.setItem("modo", "light");
  }
})

//modo del localStorage 

const modo = localStorage.getItem("modo");
if (modo === "dark"){
  document.body.classList.add("dark");
}else{
  document.body.classList.remove("dark");
};

// Solicito precio del Dolar a una api 

const btnMostrarDolar = document.getElementById("btnMostrarDolar");

btnMostrarDolar.addEventListener("click", function() {
  const apiDolarDiv = document.getElementById("apiDolarDiv");

const myHeaders = new Headers();
myHeaders.append("apikey", "W8cxMLy0feP0ih2ulpognCIeEaF0TAZ3");

let requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

function mostrarDolarOficial() {
  fetch("https://api.apilayer.com/fixer/convert?to=ars&from=usd&amount=1", requestOptions)
    .then(response => response.json())
    .then(result => {
      const dolarOficial = parseFloat(result.result.toFixed(2));
      apiDolarDiv.innerHTML = `<p>Dolar Oficial: $${dolarOficial}</p>`;
    })
    .catch(error => console.log('error', error)); 
}

btnMostrarDolar.addEventListener("click", mostrarDolarOficial);

});


datosPrestamo(); 