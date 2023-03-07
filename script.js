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
      let noCalifica = document.createElement("p");
      noCalifica.innerHTML = "<p>Lo sentimos no tenemos un prestamo para ofrecerte</p>";
      document.body.append(noCalifica);
      return;
    }

    let montoPagar = document.createElement("p");
    montoPagar.innerHTML = `<p>Hola ${nombres} ${apellido}, el monto total a pagar es de $ ${montoTotal}<p>`
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

  return Math.ceil(montoTotal);
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


datosPrestamo(); 